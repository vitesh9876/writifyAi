// Handwriting Engine: LaTeX formula parsing, Superscript/Subscript, and Auto-Mistake Strikethroughs

export interface ProcessedWord {
  word: string;
  hasStrike: boolean;
  strikeStyle?: "single" | "double" | "wavy" | "scratch";
  isCorrection?: boolean;
}

export interface ProcessedLine {
  words: ProcessedWord[];
  rawText: string;
}

// Superscripts and subscripts mappings
const SUPERSCRIPTS: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾", "n": "ⁿ", "i": "ⁱ", "x": "ˣ", "y": "ʸ", "a": "ᵃ", "b": "ᵇ"
};

const SUBSCRIPTS: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎", "a": "ₐ", "e": "ₑ", "o": "ₒ", "x": "ₓ", "i": "ᵢ"
};

/**
 * Transforms LaTeX math expressions into Unicode handwriting-friendly symbols
 */
export function formatLatexMath(input: string): string {
  if (!input) return "";

  let res = input;

  // 1. Strip basic text formatting
  res = res.replace(/\\(?:text|mathrm|mathbf|mathit|mathsf|mb|operatorname)\{([^}]*)\}/g, "$1");

  // 2. Fractions: \frac{a}{b} -> (a)/(b) or a/b
  let prev = "";
  while (prev !== res) {
    prev = res;
    res = res.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_, num, den) => {
      const n = num.trim();
      const d = den.trim();
      return `${n}/${d}`;
    });
  }

  // 3. Square roots: \sqrt[3]{x} -> ³√(x), \sqrt{x} -> √(x)
  res = res.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, (_, root, val) => {
    const r = root.trim().split("").map((c: string) => SUPERSCRIPTS[c] || c).join("");
    return `${r}√(${val.trim()})`;
  });
  res = res.replace(/\\sqrt\{([^}]+)\}/g, (_, val) => {
    const v = val.trim();
    return v.length === 1 ? `√${v}` : `√(${v})`;
  });

  // 4. Superscripts: ^2 -> ², ^{12} -> ¹²
  res = res.replace(/\^\{([^}]+)\}/g, (_, chars) => {
    return chars.split("").map((c: string) => SUPERSCRIPTS[c] || c).join("");
  });
  res = res.replace(/\^([0-9a-zA-Z+-])/g, (_, char) => SUPERSCRIPTS[char] || char);

  // 5. Subscripts: _1 -> ₁, _{12} -> ₁₂
  res = res.replace(/_\{([^}]+)\}/g, (_, chars) => {
    return chars.split("").map((c: string) => SUBSCRIPTS[c] || c).join("");
  });
  res = res.replace(/_([0-9a-zA-Z+-])/g, (_, char) => SUBSCRIPTS[char] || char);

  // 6. Common math symbols
  res = res
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\pm/g, "±")
    .replace(/\\le/g, "≤")
    .replace(/\\ge/g, "≥")
    .replace(/\\ne/g, "≠")
    .replace(/\\approx/g, "≈")
    .replace(/\\infty/g, "∞")
    .replace(/\\pi/g, "π")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\theta/g, "θ")
    .replace(/\\Delta/g, "Δ");

  return res;
}

/**
 * Parses content into lines and words, applying realistic student typos/cross-outs when enabled
 */
export function processHandwritingText(
  rawContent: string,
  autoMistakesEnabled: boolean,
  mistakeRate: number, // 0 to 10
  defaultStrikeStyle: "single" | "double" | "wavy" | "scratch" = "wavy"
): ProcessedLine[] {
  const formatted = formatLatexMath(rawContent);
  const rawLines = formatted.split("\n");

  let wordCounter = 0;

  return rawLines.map((lineStr, lineIdx) => {
    if (!lineStr.trim()) {
      return { words: [{ word: "\u00A0", hasStrike: false }], rawText: "" };
    }

    const rawTokens = lineStr.split(" ");
    const words: ProcessedWord[] = [];

    for (let i = 0; i < rawTokens.length; i++) {
      const token = rawTokens[i];
      if (!token) continue;

      wordCounter++;

      // Check for explicit markdown strike: ~~wavy:word~~ or ~~word~~
      const explicitStrike = token.match(/^~~(?:(single|double|wavy|scratch):)?(.*?)~~$/);
      if (explicitStrike) {
        const style = (explicitStrike[1] as any) || defaultStrikeStyle;
        const clean = explicitStrike[2];
        words.push({ word: clean, hasStrike: true, strikeStyle: style });
        continue;
      }

      // Check for automatic student typos / cross-outs
      // e.g., if mistakeRate is 2%, trigger approximately every ~40-50 words
      const shouldAutoMistake =
        autoMistakesEnabled &&
        mistakeRate > 0 &&
        token.length >= 4 &&
        !token.includes("/") &&
        !token.includes("√") &&
        ((wordCounter * 17 + lineIdx * 13) % Math.max(12, Math.round(100 / mistakeRate))) === 3;

      if (shouldAutoMistake) {
        // Create an organic typo: transpose two adjacent letters or swap a letter
        const typo = createRealisticTypo(token);
        words.push({
          word: typo,
          hasStrike: true,
          strikeStyle: defaultStrikeStyle,
        });
        // Immediately follow with the correct word
        words.push({
          word: token,
          hasStrike: false,
          isCorrection: true,
        });
      } else {
        words.push({
          word: token,
          hasStrike: false,
        });
      }
    }

    return { words, rawText: lineStr };
  });
}

function createRealisticTypo(w: string): string {
  if (w.length <= 3) return w;
  const chars = w.split("");
  // Swap 2 letters near middle
  const idx = Math.min(chars.length - 2, Math.max(1, Math.floor(chars.length / 2)));
  const temp = chars[idx];
  chars[idx] = chars[idx + 1];
  chars[idx + 1] = temp;
  return chars.join("");
}
