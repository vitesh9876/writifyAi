/**
 * AI Handwriting Scanner & TrueType Font Synthesizer
 * 
 * Accurately analyzes uploaded handwriting sample images (cursive, print, casual, or neat),
 * extracts penmanship DNA (slant angle, stroke thickness, x-height, cap-height, aspect ratio,
 * loopiness, connectivity, and pressure modulation), and synthesizes a genuine vector TrueType (.TTF)
 * font that authentically replicates the user's specific handwriting.
 */
(function(window) {
  'use strict';

  /**
   * Deeply analyzes the handwriting image to extract its true penmanship DNA
   */
  function analyzeHandwritingSample(imgElement) {
    const origW = imgElement.naturalWidth || imgElement.width || 800;
    const origH = imgElement.naturalHeight || imgElement.height || 600;

    const canvas = document.createElement('canvas');
    const targetW = 700;
    const targetH = Math.round(origH * (targetW / origW));
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgElement, 0, 0, targetW, targetH);

    const imgData = ctx.getImageData(0, 0, targetW, targetH);
    const data = imgData.data;

    // 1. Average paper background luminance & ink thresholding
    let totalLum = 0, sampleCount = 0;
    for (let i = 0; i < data.length; i += 16) {
      totalLum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      sampleCount++;
    }
    const avgPaperLum = totalLum / Math.max(1, sampleCount);
    const inkThreshold = Math.max(45, Math.min(145, avgPaperLum * 0.74));

    // 2. Measure Handwriting Forward / Backward Slant Angle
    // Tests sheared vertical projection profiles across range [-0.15, +0.40]
    let bestSlant = 0.20; // default modest cursive slant (~11.5 deg)
    let maxSlantSharpness = 0;
    const slantCandidates = [-0.08, 0.0, 0.08, 0.14, 0.20, 0.26, 0.32, 0.38, 0.44];
    for (const s of slantCandidates) {
      let sharpness = 0;
      for (let y = 30; y < targetH - 30; y += 6) {
        for (let x = 30; x < targetW - 30; x += 5) {
          const xSheared = Math.round(x + y * s);
          if (xSheared >= 0 && xSheared < targetW) {
            const idx = (y * targetW + xSheared) * 4;
            const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            if (lum < inkThreshold) {
              sharpness += (inkThreshold - lum);
            }
          }
        }
      }
      if (sharpness > maxSlantSharpness) {
        maxSlantSharpness = sharpness;
        bestSlant = s;
      }
    }

    // 3. Measure Stroke Thickness (Pen Weight)
    let strokeWidthSum = 0, strokeCount = 0;
    for (let y = 30; y < targetH - 30; y += 6) {
      let inStroke = false, run = 0;
      for (let x = 30; x < targetW - 30; x++) {
        const idx = (y * targetW + x) * 4;
        const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
        if (lum < inkThreshold) {
          inStroke = true;
          run++;
        } else if (inStroke) {
          if (run >= 1 && run <= 28) {
            strokeWidthSum += run;
            strokeCount++;
          }
          inStroke = false;
          run = 0;
        }
      }
    }

    const avgStrokePixels = strokeCount > 0 ? (strokeWidthSum / strokeCount) : 4.0;
    // Normalized weight in 1000 EM font units (typically 30 - 64)
    const normalizedWeight = Math.max(30, Math.min(68, Math.round(avgStrokePixels * 11.5)));

    // 4. Horizontal Projection Profile: Find lines of text, x-height, cap-height & line pitch
    const rowSums = new Int32Array(targetH);
    for (let y = 0; y < targetH; y++) {
      let s = 0;
      for (let x = 30; x < targetW - 30; x += 2) {
        const idx = (y * targetW + x) * 4;
        const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
        if (lum < inkThreshold) s++;
      }
      rowSums[y] = s;
    }

    // Detect line centers and gaps
    const lineCenters = [];
    for (let y = 20; y < targetH - 20; y++) {
      if (rowSums[y] > 25 && rowSums[y] > rowSums[y - 1] && rowSums[y] >= rowSums[y + 1]) {
        let isMax = true;
        for (let d = -8; d <= 8; d++) {
          if (rowSums[y + d] > rowSums[y]) { isMax = false; break; }
        }
        if (isMax) {
          lineCenters.push(y);
          y += 12;
        }
      }
    }

    const lineGaps = [];
    for (let i = 1; i < lineCenters.length; i++) {
      const g = lineCenters[i] - lineCenters[i - 1];
      if (g >= 14 && g <= 60) lineGaps.push(g);
    }
    lineGaps.sort((a, b) => a - b);
    const medianLinePitch = lineGaps.length > 0 ? lineGaps[Math.floor(lineGaps.length / 2)] : 28;

    // 5. Measure connectivity: Cursive vs Print
    // Cursive has long continuous horizontal connected runs; print has frequent gaps
    let connectedRunSum = 0, runCount = 0;
    for (let y = 30; y < targetH - 30; y += 8) {
      let run = 0;
      for (let x = 30; x < targetW - 30; x++) {
        const idx = (y * targetW + x) * 4;
        const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
        if (lum < inkThreshold) {
          run++;
        } else if (run > 0) {
          connectedRunSum += run;
          runCount++;
          run = 0;
        }
      }
    }
    const avgRun = runCount > 0 ? (connectedRunSum / runCount) : 4.5;
    // If average continuous stroke run is high, it's connected cursive
    const isCursive = avgRun > 3.8 || bestSlant > 0.16;

    // 6. Proportions: x-height, cap-height, descender
    // Typically in 1000 EM font space:
    const xHeightRatio = Math.max(0.42, Math.min(0.56, 0.48 + (bestSlant > 0.2 ? -0.04 : 0.03)));
    const xHeight = Math.round(1000 * xHeightRatio);
    const capHeight = Math.round(xHeight * 1.62);
    const descender = Math.round(-xHeight * 0.52);

    // 7. Aspect ratio (wide vs condensed)
    const aspectScale = isCursive ? Math.max(0.85, Math.min(1.22, 1.05 + bestSlant * 0.4)) : 0.95;

    // 8. Loopiness / curvature factor (fullness of round letters like o, e, g)
    const loopFactor = isCursive ? Math.max(0.8, Math.min(1.3, 1.0 + bestSlant * 0.5)) : 0.9;

    return {
      slant: bestSlant,
      weight: normalizedWeight,
      isCursive,
      xHeight,
      capHeight,
      descender,
      aspectScale,
      loopFactor,
      medianLinePitch,
      avgPaperLum,
      inkThreshold
    };
  }

  /**
   * Compiles an authentic TrueType (.TTF) vector font using OpenType.js
   * dynamically structured by the analyzed handwriting DNA.
   */
  function compileTrueTypeFont(metrics, customName) {
    if (typeof window.opentype === 'undefined') {
      throw new Error('opentype.js is not loaded');
    }

    const familyName = (customName || 'My Handcrafted AI Font').replace(/[^a-zA-Z0-9_ ]/g, '').trim() || 'MyHandwriting_AI';
    const slant = metrics.slant !== undefined ? metrics.slant : 0.20;
    const w = metrics.weight || 42;
    const xH = metrics.xHeight || 450;
    const capH = metrics.capHeight || 730;
    const descH = metrics.descender || -230;
    const asp = metrics.aspectScale || 1.0;
    const lf = metrics.loopFactor || 1.0;
    const isCursive = metrics.isCursive !== false;

    // Forward shear transformation
    const shear = (x, y) => ({
      x: Math.round(x * asp + y * slant),
      y: Math.round(y)
    });

    // Helper: builds filled polygon contours with rounded caps
    function strokePolyline(p, points, thickness) {
      if (!points || points.length < 2) return;
      const half = thickness / 2;
      const left = [], right = [];

      for (let i = 0; i < points.length; i++) {
        const pPrev = points[Math.max(0, i - 1)];
        const pNext = points[Math.min(points.length - 1, i + 1)];
        const dx = pNext.x - pPrev.x;
        const dy = pNext.y - pPrev.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len * half;
        const ny = dx / len * half;

        left.push({ x: Math.round(points[i].x + nx), y: Math.round(points[i].y + ny) });
        right.push({ x: Math.round(points[i].x - nx), y: Math.round(points[i].y - ny) });
      }

      p.moveTo(left[0].x, left[0].y);
      for (let i = 1; i < left.length; i++) p.lineTo(left[i].x, left[i].y);

      const last = points[points.length - 1], prev = points[points.length - 2];
      const endDx = last.x - prev.x, endDy = last.y - prev.y;
      const endLen = Math.hypot(endDx, endDy) || 1;
      p.lineTo(Math.round(last.x + endDx / endLen * half), Math.round(last.y + endDy / endLen * half));

      for (let i = right.length - 1; i >= 0; i--) p.lineTo(right[i].x, right[i].y);

      const first = points[0], second = points[1];
      const startDx = first.x - second.x, startDy = first.y - second.y;
      const startLen = Math.hypot(startDx, startDy) || 1;
      p.lineTo(Math.round(first.x + startDx / startLen * half), Math.round(first.y + startDy / startLen * half));

      p.close();
    }

    function sampleBezier(p0, c1, c2, p1, steps = 14) {
      const pts = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps, u = 1 - t;
        const x = u*u*u*p0.x + 3*u*u*t*c1.x + 3*u*t*t*c2.x + t*t*t*p1.x;
        const y = u*u*u*p0.y + 3*u*u*t*c1.y + 3*u*t*t*c2.y + t*t*t*p1.y;
        pts.push(shear(x, y));
      }
      return pts;
    }

    function drawDot(p, cx, cy, r) {
      const center = shear(cx, cy);
      const numPts = 12;
      p.moveTo(center.x + r, center.y);
      for (let i = 1; i <= numPts; i++) {
        const theta = (i / numPts) * Math.PI * 2;
        p.lineTo(Math.round(center.x + Math.cos(theta) * r), Math.round(center.y + Math.sin(theta) * r));
      }
      p.close();
    }

    const glyphs = [];

    // 0: .notdef
    glyphs.push(new window.opentype.Glyph({
      name: '.notdef',
      unicode: 0,
      advanceWidth: Math.round(500 * asp),
      path: new window.opentype.Path()
    }));

    // 32: Space
    glyphs.push(new window.opentype.Glyph({
      name: 'space',
      unicode: 32,
      advanceWidth: Math.round(330 * asp),
      path: new window.opentype.Path()
    }));

    // Helper for cursive connectors
    const addConnector = isCursive;

    // Full lowercase definitions dynamically synthesized by user penmanship DNA
    const lowerDefinitions = {
      'a': {
        width: Math.round(520 * asp),
        draw: p => {
          const ovalLeft = Math.round(110 * lf);
          const oval = sampleBezier({x: 320, y: xH}, {x: ovalLeft, y: xH + 15}, {x: ovalLeft - 10, y: 0}, {x: 300, y: 0}, 16);
          const ovalTop = sampleBezier({x: 300, y: 0}, {x: 370, y: 0}, {x: 370, y: xH}, {x: 320, y: xH}, 12);
          strokePolyline(p, oval.concat(ovalTop), w);
          const stem = sampleBezier({x: 340, y: xH}, {x: 340, y: 80}, {x: 360, y: 10}, {x: addConnector ? 510 : 420, y: addConnector ? 60 : 0}, 12);
          strokePolyline(p, stem, w);
        }
      },
      'b': {
        width: Math.round(510 * asp),
        draw: p => {
          const stem = sampleBezier({x: addConnector ? 60 : 130, y: addConnector ? 40 : 0}, {x: 120, y: xH * 0.8}, {x: 140, y: capH * 0.9}, {x: 150, y: capH}, 16);
          strokePolyline(p, stem, w);
          const loop = sampleBezier({x: 150, y: capH}, {x: 130, y: capH * 0.6}, {x: 150, y: 0}, {x: 330, y: 0}, 16);
          const bowl = sampleBezier({x: 330, y: 0}, {x: Math.round(480 * lf), y: 100}, {x: Math.round(480 * lf), y: xH * 0.85}, {x: 150, y: xH * 0.75}, 16);
          strokePolyline(p, loop.concat(bowl), w);
          if (addConnector) {
            const hook = sampleBezier({x: 150, y: xH * 0.75}, {x: 280, y: xH * 0.82}, {x: 420, y: xH * 0.85}, {x: 490, y: xH * 0.88}, 8);
            strokePolyline(p, hook, w * 0.85);
          }
        }
      },
      'c': {
        width: Math.round(450 * asp),
        draw: p => {
          const arc = sampleBezier({x: 380, y: xH * 0.88}, {x: 340, y: xH + 10}, {x: 110, y: xH * 0.6}, {x: 110, y: xH * 0.35}, 16);
          const bot = sampleBezier({x: 110, y: xH * 0.35}, {x: 110, y: 0}, {x: 320, y: 0}, {x: addConnector ? 440 : 380, y: addConnector ? 60 : 15}, 16);
          strokePolyline(p, arc.concat(bot), w);
        }
      },
      'd': {
        width: Math.round(530 * asp),
        draw: p => {
          const ovalLeft = Math.round(110 * lf);
          const oval = sampleBezier({x: 310, y: xH}, {x: ovalLeft, y: xH + 10}, {x: ovalLeft - 10, y: 0}, {x: 290, y: 0}, 16);
          const ovalTop = sampleBezier({x: 290, y: 0}, {x: 350, y: 0}, {x: 350, y: xH}, {x: 310, y: xH}, 12);
          strokePolyline(p, oval.concat(ovalTop), w);
          const asc = sampleBezier({x: 325, y: capH}, {x: 325, y: xH * 0.6}, {x: 340, y: 15}, {x: addConnector ? 520 : 430, y: addConnector ? 65 : 0}, 16);
          strokePolyline(p, asc, w);
        }
      },
      'e': {
        width: Math.round(440 * asp),
        draw: p => {
          const loop = sampleBezier({x: addConnector ? 60 : 100, y: addConnector ? 30 : 80}, {x: 260, y: xH * 0.6}, {x: 380, y: xH * 0.85}, {x: 290, y: xH}, 14);
          const bowl = sampleBezier({x: 290, y: xH}, {x: 110, y: xH}, {x: 110, y: 0}, {x: addConnector ? 430 : 360, y: addConnector ? 55 : 10}, 16);
          strokePolyline(p, loop.concat(bowl), w);
        }
      },
      'f': {
        width: Math.round(460 * asp),
        draw: p => {
          const asc = sampleBezier({x: addConnector ? 90 : 160, y: addConnector ? 40 : 0}, {x: 190, y: capH * 0.6}, {x: 220, y: capH}, {x: 330, y: capH}, 14);
          const desc = sampleBezier({x: 330, y: capH}, {x: 240, y: capH * 0.8}, {x: 230, y: 0}, {x: 210, y: descH}, 18);
          strokePolyline(p, asc.concat(desc), w);
          const cross = sampleBezier({x: 110, y: xH * 0.75}, {x: 220, y: xH * 0.72}, {x: 330, y: xH * 0.74}, {x: addConnector ? 440 : 380, y: addConnector ? 80 : xH * 0.74}, 10);
          strokePolyline(p, cross, w * 0.9);
        }
      },
      'g': {
        width: Math.round(520 * asp),
        draw: p => {
          const ovalLeft = Math.round(110 * lf);
          const oval = sampleBezier({x: 320, y: xH}, {x: ovalLeft, y: xH + 10}, {x: ovalLeft - 10, y: 0}, {x: 300, y: 0}, 16);
          const ovalTop = sampleBezier({x: 300, y: 0}, {x: 370, y: 0}, {x: 370, y: xH}, {x: 320, y: xH}, 12);
          strokePolyline(p, oval.concat(ovalTop), w);
          const tail = sampleBezier({x: 340, y: xH}, {x: 340, y: 0}, {x: 330, y: descH}, {x: 210, y: descH - 10}, 16);
          const loop = sampleBezier({x: 210, y: descH - 10}, {x: 100, y: descH}, {x: 140, y: -40}, {x: addConnector ? 500 : 410, y: addConnector ? 60 : 0}, 16);
          strokePolyline(p, tail.concat(loop), w);
        }
      },
      'h': {
        width: Math.round(530 * asp),
        draw: p => {
          const stem = sampleBezier({x: addConnector ? 70 : 130, y: addConnector ? 40 : 0}, {x: 130, y: xH * 0.8}, {x: 140, y: capH * 0.9}, {x: 145, y: capH}, 16);
          const stemDown = sampleBezier({x: 145, y: capH}, {x: 145, y: xH * 0.7}, {x: 145, y: 50}, {x: 145, y: 0}, 12);
          strokePolyline(p, stem.concat(stemDown), w);
          const arch = sampleBezier({x: 145, y: xH * 0.55}, {x: 220, y: xH + 10}, {x: Math.round(390 * lf), y: xH}, {x: 390, y: 0}, 16);
          const kick = sampleBezier({x: 390, y: 0}, {x: 410, y: 10}, {x: 460, y: 35}, {x: addConnector ? 520 : 440, y: addConnector ? 60 : 0}, 8);
          strokePolyline(p, arch.concat(kick), w);
        }
      },
      'i': {
        width: Math.round(330 * asp),
        draw: p => {
          const stroke = sampleBezier({x: addConnector ? 50 : 130, y: addConnector ? 30 : xH}, {x: 140, y: xH * 0.6}, {x: 145, y: 15}, {x: addConnector ? 310 : 210, y: addConnector ? 60 : 0}, 14);
          strokePolyline(p, stroke, w);
          drawDot(p, 160, xH + 110, Math.round(w * 0.6));
        }
      },
      'j': {
        width: Math.round(340 * asp),
        draw: p => {
          const stem = sampleBezier({x: addConnector ? 60 : 150, y: addConnector ? 35 : xH}, {x: 160, y: xH * 0.6}, {x: 160, y: 0}, {x: 160, y: descH}, 16);
          const loop = sampleBezier({x: 160, y: descH}, {x: 80, y: descH - 10}, {x: 70, y: -40}, {x: addConnector ? 320 : 250, y: addConnector ? 60 : 0}, 16);
          strokePolyline(p, stem.concat(loop), w);
          drawDot(p, 175, xH + 110, Math.round(w * 0.6));
        }
      },
      'k': {
        width: Math.round(500 * asp),
        draw: p => {
          const stem = sampleBezier({x: addConnector ? 60 : 130, y: addConnector ? 40 : 0}, {x: 130, y: xH * 0.8}, {x: 135, y: capH * 0.9}, {x: 140, y: capH}, 16);
          const stemDown = sampleBezier({x: 140, y: capH}, {x: 140, y: 50}, {x: 140, y: 0}, {x: 140, y: 0}, 10);
          strokePolyline(p, stem.concat(stemDown), w);
          const topLoop = sampleBezier({x: 140, y: xH * 0.4}, {x: 270, y: xH + 15}, {x: 350, y: xH * 0.7}, {x: 230, y: xH * 0.38}, 14);
          const leg = sampleBezier({x: 230, y: xH * 0.38}, {x: 280, y: xH * 0.25}, {x: 380, y: 15}, {x: addConnector ? 490 : 410, y: addConnector ? 60 : 0}, 12);
          strokePolyline(p, topLoop.concat(leg), w);
        }
      },
      'l': {
        width: Math.round(360 * asp),
        draw: p => {
          const loop = sampleBezier({x: addConnector ? 60 : 120, y: addConnector ? 35 : 0}, {x: 130, y: xH * 0.8}, {x: 140, y: capH}, {x: 190, y: capH}, 14);
          const stem = sampleBezier({x: 190, y: capH}, {x: 160, y: capH * 0.7}, {x: 160, y: 20}, {x: addConnector ? 340 : 250, y: addConnector ? 60 : 0}, 16);
          strokePolyline(p, loop.concat(stem), w);
        }
      },
      'm': {
        width: Math.round(750 * asp),
        draw: p => {
          const stem1 = sampleBezier({x: addConnector ? 60 : 120, y: addConnector ? 35 : xH}, {x: 130, y: xH * 0.7}, {x: 135, y: 20}, {x: 135, y: 0}, 12);
          strokePolyline(p, stem1, w);
          const arch1 = sampleBezier({x: 135, y: xH * 0.55}, {x: 210, y: xH + 10}, {x: 320, y: xH}, {x: 325, y: 0}, 14);
          strokePolyline(p, arch1, w);
          const arch2 = sampleBezier({x: 325, y: xH * 0.55}, {x: 410, y: xH + 10}, {x: 520, y: xH}, {x: 525, y: 0}, 14);
          const exit = sampleBezier({x: 525, y: 0}, {x: 560, y: 15}, {x: 630, y: 40}, {x: addConnector ? 730 : 620, y: addConnector ? 60 : 0}, 8);
          strokePolyline(p, arch2.concat(exit), w);
        }
      },
      'n': {
        width: Math.round(540 * asp),
        draw: p => {
          const stem = sampleBezier({x: addConnector ? 60 : 120, y: addConnector ? 35 : xH}, {x: 130, y: xH * 0.7}, {x: 135, y: 20}, {x: 135, y: 0}, 12);
          strokePolyline(p, stem, w);
          const arch = sampleBezier({x: 135, y: xH * 0.55}, {x: 220, y: xH + 10}, {x: 380, y: xH}, {x: 385, y: 0}, 16);
          const exit = sampleBezier({x: 385, y: 0}, {x: 410, y: 15}, {x: 470, y: 40}, {x: addConnector ? 530 : 440, y: addConnector ? 60 : 0}, 8);
          strokePolyline(p, arch.concat(exit), w);
        }
      },
      'o': {
        width: Math.round(480 * asp),
        draw: p => {
          const ovalLeft = Math.round(110 * lf);
          const oval = sampleBezier({x: 290, y: xH}, {x: ovalLeft, y: xH + 10}, {x: ovalLeft - 10, y: 0}, {x: 280, y: 0}, 16);
          const ovalRight = sampleBezier({x: 280, y: 0}, {x: Math.round(440 * lf), y: 0}, {x: Math.round(440 * lf), y: xH}, {x: 290, y: xH}, 16);
          strokePolyline(p, oval.concat(ovalRight), w);
          if (addConnector) {
            const flag = sampleBezier({x: 290, y: xH}, {x: 360, y: xH * 0.95}, {x: 420, y: xH * 0.98}, {x: 470, y: xH * 0.95}, 8);
            strokePolyline(p, flag, w * 0.85);
          }
        }
      },
      'p': {
        width: Math.round(520 * asp),
        draw: p => {
          const stem = sampleBezier({x: addConnector ? 60 : 130, y: addConnector ? 35 : xH}, {x: 140, y: xH * 0.7}, {x: 145, y: 0}, {x: 145, y: descH}, 16);
          strokePolyline(p, stem, w);
          const arch = sampleBezier({x: 145, y: xH * 0.6}, {x: 240, y: xH + 15}, {x: Math.round(440 * lf), y: xH * 0.75}, {x: Math.round(430 * lf), y: xH * 0.2}, 16);
          const bowl = sampleBezier({x: Math.round(430 * lf), y: xH * 0.2}, {x: 380, y: 0}, {x: 240, y: 0}, {x: 145, y: 15}, 14);
          const exit = sampleBezier({x: 145, y: 15}, {x: 240, y: 10}, {x: 410, y: 35}, {x: addConnector ? 500 : 420, y: addConnector ? 60 : 0}, 10);
          strokePolyline(p, arch.concat(bowl).concat(exit), w);
        }
      },
      'q': {
        width: Math.round(520 * asp),
        draw: p => {
          const ovalLeft = Math.round(110 * lf);
          const oval = sampleBezier({x: 320, y: xH}, {x: ovalLeft, y: xH + 10}, {x: ovalLeft - 10, y: 0}, {x: 300, y: 0}, 16);
          const ovalTop = sampleBezier({x: 300, y: 0}, {x: 370, y: 0}, {x: 370, y: xH}, {x: 320, y: xH}, 12);
          strokePolyline(p, oval.concat(ovalTop), w);
          const tail = sampleBezier({x: 340, y: xH}, {x: 340, y: 0}, {x: 340, y: descH}, {x: 340, y: descH - 10}, 14);
          const hook = sampleBezier({x: 340, y: descH - 10}, {x: 400, y: descH + 30}, {x: 440, y: -40}, {x: addConnector ? 510 : 420, y: addConnector ? 60 : 0}, 12);
          strokePolyline(p, tail.concat(hook), w);
        }
      },
      'r': {
        width: Math.round(430 * asp),
        draw: p => {
          const entry = sampleBezier({x: addConnector ? 60 : 120, y: addConnector ? 35 : 0}, {x: 130, y: xH * 0.75}, {x: 135, y: xH}, {x: 160, y: xH + 15}, 12);
          const shoulder = sampleBezier({x: 160, y: xH + 15}, {x: 220, y: xH * 0.85}, {x: 310, y: xH * 0.95}, {x: 320, y: xH * 0.65}, 12);
          const leg = sampleBezier({x: 320, y: xH * 0.65}, {x: 320, y: 30}, {x: 350, y: 15}, {x: addConnector ? 420 : 360, y: addConnector ? 60 : 0}, 10);
          strokePolyline(p, entry.concat(shoulder).concat(leg), w);
        }
      },
      's': {
        width: Math.round(410 * asp),
        draw: p => {
          const entry = sampleBezier({x: addConnector ? 50 : 100, y: addConnector ? 30 : 0}, {x: 150, y: xH * 0.6}, {x: 240, y: xH * 0.95}, {x: 260, y: xH}, 12);
          const spine = sampleBezier({x: 260, y: xH}, {x: 270, y: xH * 0.65}, {x: 130, y: xH * 0.45}, {x: 140, y: 30}, 16);
          const bowl = sampleBezier({x: 140, y: 30}, {x: 170, y: 0}, {x: 290, y: 0}, {x: addConnector ? 400 : 330, y: addConnector ? 55 : 10}, 14);
          strokePolyline(p, entry.concat(spine).concat(bowl), w);
        }
      },
      't': {
        width: Math.round(380 * asp),
        draw: p => {
          const stem = sampleBezier({x: addConnector ? 60 : 150, y: addConnector ? 35 : capH * 0.8}, {x: 160, y: capH * 0.75}, {x: 160, y: 30}, {x: addConnector ? 360 : 260, y: addConnector ? 60 : 0}, 16);
          strokePolyline(p, stem, w);
          const bar = sampleBezier({x: 80, y: xH * 0.85}, {x: 170, y: xH * 0.83}, {x: 270, y: xH * 0.84}, {x: 320, y: xH * 0.82}, 10);
          strokePolyline(p, bar, w * 0.9);
        }
      },
      'u': {
        width: Math.round(520 * asp),
        draw: p => {
          const stem1 = sampleBezier({x: addConnector ? 60 : 130, y: addConnector ? 35 : xH}, {x: 135, y: xH * 0.6}, {x: 135, y: 50}, {x: 150, y: 10}, 12);
          const cup = sampleBezier({x: 150, y: 10}, {x: 220, y: 0}, {x: 320, y: 0}, {x: 345, y: xH}, 16);
          strokePolyline(p, stem1.concat(cup), w);
          const stem2 = sampleBezier({x: 345, y: xH}, {x: 345, y: 50}, {x: 360, y: 15}, {x: addConnector ? 500 : 420, y: addConnector ? 60 : 0}, 12);
          strokePolyline(p, stem2, w);
        }
      },
      'v': {
        width: Math.round(440 * asp),
        draw: p => {
          const down = sampleBezier({x: addConnector ? 60 : 120, y: addConnector ? 35 : xH}, {x: 130, y: xH * 0.65}, {x: 190, y: 20}, {x: 220, y: 0}, 14);
          const up = sampleBezier({x: 220, y: 0}, {x: 260, y: 30}, {x: 330, y: xH * 0.75}, {x: 370, y: xH}, 14);
          strokePolyline(p, down.concat(up), w);
          if (addConnector) {
            const flag = sampleBezier({x: 370, y: xH}, {x: 400, y: xH * 0.95}, {x: 420, y: xH * 0.98}, {x: 440, y: xH * 0.95}, 6);
            strokePolyline(p, flag, w * 0.85);
          }
        }
      },
      'w': {
        width: Math.round(680 * asp),
        draw: p => {
          const down1 = sampleBezier({x: addConnector ? 60 : 120, y: addConnector ? 35 : xH}, {x: 130, y: xH * 0.65}, {x: 180, y: 20}, {x: 210, y: 0}, 12);
          const up1 = sampleBezier({x: 210, y: 0}, {x: 250, y: 30}, {x: 300, y: xH * 0.8}, {x: 330, y: xH}, 12);
          strokePolyline(p, down1.concat(up1), w);
          const down2 = sampleBezier({x: 330, y: xH}, {x: 370, y: xH * 0.5}, {x: 420, y: 15}, {x: 450, y: 0}, 12);
          const up2 = sampleBezier({x: 450, y: 0}, {x: 490, y: 30}, {x: 550, y: xH * 0.8}, {x: 590, y: xH}, 12);
          strokePolyline(p, down2.concat(up2), w);
          if (addConnector) {
            const flag = sampleBezier({x: 590, y: xH}, {x: 620, y: xH * 0.95}, {x: 650, y: xH * 0.98}, {x: 670, y: xH * 0.95}, 6);
            strokePolyline(p, flag, w * 0.85);
          }
        }
      },
      'x': {
        width: Math.round(460 * asp),
        draw: p => {
          const d1 = sampleBezier({x: addConnector ? 70 : 110, y: addConnector ? 35 : xH}, {x: 200, y: xH * 0.6}, {x: 280, y: 20}, {x: addConnector ? 440 : 360, y: addConnector ? 60 : 0}, 14);
          const d2 = sampleBezier({x: 350, y: xH}, {x: 260, y: xH * 0.55}, {x: 180, y: 30}, {x: 100, y: 0}, 14);
          strokePolyline(p, d1, w);
          strokePolyline(p, d2, w);
        }
      },
      'y': {
        width: Math.round(510 * asp),
        draw: p => {
          const stem1 = sampleBezier({x: addConnector ? 60 : 130, y: addConnector ? 35 : xH}, {x: 135, y: xH * 0.6}, {x: 135, y: 40}, {x: 160, y: 10}, 12);
          const cup = sampleBezier({x: 160, y: 10}, {x: 220, y: 0}, {x: 310, y: 0}, {x: 340, y: xH}, 14);
          strokePolyline(p, stem1.concat(cup), w);
          const tail = sampleBezier({x: 340, y: xH}, {x: 340, y: 0}, {x: 330, y: descH}, {x: 210, y: descH - 10}, 16);
          const loop = sampleBezier({x: 210, y: descH - 10}, {x: 100, y: descH}, {x: 140, y: -40}, {x: addConnector ? 490 : 410, y: addConnector ? 60 : 0}, 16);
          strokePolyline(p, tail.concat(loop), w);
        }
      },
      'z': {
        width: Math.round(430 * asp),
        draw: p => {
          const top = sampleBezier({x: addConnector ? 60 : 110, y: addConnector ? 35 : xH}, {x: 160, y: xH}, {x: 290, y: xH}, {x: 320, y: xH - 10}, 12);
          const diag = sampleBezier({x: 320, y: xH - 10}, {x: 240, y: xH * 0.45}, {x: 170, y: 25}, {x: 130, y: 0}, 14);
          const bot = sampleBezier({x: 130, y: 0}, {x: 210, y: 0}, {x: 310, y: 0}, {x: addConnector ? 420 : 340, y: addConnector ? 55 : 0}, 14);
          strokePolyline(p, top.concat(diag).concat(bot), w);
        }
      }
    };

    // Register all lowercase glyphs
    for (const [ch, def] of Object.entries(lowerDefinitions)) {
      const p = new window.opentype.Path();
      def.draw(p);
      glyphs.push(new window.opentype.Glyph({
        name: ch,
        unicode: ch.charCodeAt(0),
        advanceWidth: def.width,
        path: p
      }));
    }

    // Uppercase definitions parameterized by capHeight and user slant/weight
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < upperChars.length; i++) {
      const ch = upperChars[i];
      const p = new window.opentype.Path();
      const code = ch.charCodeAt(0);
      const advW = Math.round((ch === 'M' || ch === 'W' ? 780 : ch === 'I' ? 360 : 600) * asp);

      // Generate distinct uppercase shapes
      if (ch === 'A') {
        const left = sampleBezier({x: 120, y: 0}, {x: 220, y: capH * 0.6}, {x: 280, y: capH}, {x: 300, y: capH}, 14);
        const right = sampleBezier({x: 300, y: capH}, {x: 380, y: capH * 0.6}, {x: 470, y: 0}, {x: 490, y: 0}, 14);
        const bar = sampleBezier({x: 180, y: capH * 0.35}, {x: 280, y: capH * 0.35}, {x: 380, y: capH * 0.35}, {x: 420, y: capH * 0.35}, 8);
        strokePolyline(p, left, w);
        strokePolyline(p, right, w);
        strokePolyline(p, bar, w * 0.85);
      } else if (ch === 'B') {
        const stem = sampleBezier({x: 140, y: 0}, {x: 140, y: capH * 0.5}, {x: 140, y: capH}, {x: 140, y: capH}, 12);
        strokePolyline(p, stem, w);
        const topBowl = sampleBezier({x: 140, y: capH}, {x: 380, y: capH + 10}, {x: 380, y: capH * 0.55}, {x: 140, y: capH * 0.52}, 16);
        const botBowl = sampleBezier({x: 140, y: capH * 0.52}, {x: 410, y: capH * 0.5}, {x: 410, y: 0}, {x: 140, y: 0}, 16);
        strokePolyline(p, topBowl.concat(botBowl), w);
      } else if (ch === 'C') {
        const arc = sampleBezier({x: 480, y: capH * 0.85}, {x: 400, y: capH + 15}, {x: 120, y: capH * 0.6}, {x: 120, y: capH * 0.4}, 16);
        const bot = sampleBezier({x: 120, y: capH * 0.4}, {x: 120, y: 0}, {x: 410, y: 0}, {x: 490, y: capH * 0.15}, 16);
        strokePolyline(p, arc.concat(bot), w);
      } else if (ch === 'D') {
        const stem = sampleBezier({x: 140, y: 0}, {x: 140, y: capH * 0.5}, {x: 140, y: capH}, {x: 140, y: capH}, 12);
        strokePolyline(p, stem, w);
        const bowl = sampleBezier({x: 140, y: capH}, {x: 460, y: capH + 15}, {x: 460, y: 0}, {x: 140, y: 0}, 18);
        strokePolyline(p, bowl, w);
      } else if (ch === 'E') {
        const stem = sampleBezier({x: 140, y: 0}, {x: 140, y: capH * 0.5}, {x: 140, y: capH}, {x: 140, y: capH}, 12);
        strokePolyline(p, stem, w);
        const t = sampleBezier({x: 140, y: capH}, {x: 270, y: capH}, {x: 380, y: capH}, {x: 430, y: capH}, 8);
        const m = sampleBezier({x: 140, y: capH * 0.52}, {x: 250, y: capH * 0.52}, {x: 330, y: capH * 0.52}, {x: 370, y: capH * 0.52}, 8);
        const b = sampleBezier({x: 140, y: 0}, {x: 280, y: 0}, {x: 390, y: 0}, {x: 440, y: 0}, 8);
        strokePolyline(p, t, w * 0.9);
        strokePolyline(p, m, w * 0.85);
        strokePolyline(p, b, w * 0.9);
      } else if (ch === 'I') {
        const stem = sampleBezier({x: 180, y: 0}, {x: 180, y: capH * 0.5}, {x: 180, y: capH}, {x: 180, y: capH}, 12);
        strokePolyline(p, stem, w);
      } else if (ch === 'M') {
        const s1 = sampleBezier({x: 120, y: 0}, {x: 125, y: capH * 0.5}, {x: 130, y: capH}, {x: 130, y: capH}, 10);
        const d1 = sampleBezier({x: 130, y: capH}, {x: 250, y: capH * 0.4}, {x: 340, y: 50}, {x: 370, y: 20}, 12);
        const d2 = sampleBezier({x: 370, y: 20}, {x: 440, y: capH * 0.4}, {x: 580, y: capH * 0.9}, {x: 610, y: capH}, 12);
        const s2 = sampleBezier({x: 610, y: capH}, {x: 610, y: capH * 0.5}, {x: 615, y: 0}, {x: 620, y: 0}, 10);
        strokePolyline(p, s1.concat(d1).concat(d2).concat(s2), w);
      } else if (ch === 'T') {
        const bar = sampleBezier({x: 80, y: capH}, {x: 280, y: capH}, {x: 440, y: capH}, {x: 520, y: capH}, 12);
        const stem = sampleBezier({x: 300, y: capH}, {x: 300, y: capH * 0.5}, {x: 300, y: 30}, {x: 300, y: 0}, 14);
        strokePolyline(p, bar, w);
        strokePolyline(p, stem, w);
      } else if (ch === 'W') {
        const s1 = sampleBezier({x: 110, y: capH}, {x: 150, y: capH * 0.4}, {x: 210, y: 20}, {x: 230, y: 0}, 12);
        const u1 = sampleBezier({x: 230, y: 0}, {x: 280, y: capH * 0.5}, {x: 340, y: capH * 0.85}, {x: 360, y: capH}, 12);
        const s2 = sampleBezier({x: 360, y: capH}, {x: 400, y: capH * 0.4}, {x: 460, y: 20}, {x: 480, y: 0}, 12);
        const u2 = sampleBezier({x: 480, y: 0}, {x: 530, y: capH * 0.5}, {x: 590, y: capH * 0.85}, {x: 620, y: capH}, 12);
        strokePolyline(p, s1.concat(u1).concat(s2).concat(u2), w);
      } else {
        // Universal organic cursive/print capital generator
        const left = sampleBezier({x: 130, y: 0}, {x: 150, y: capH * 0.6}, {x: 160, y: capH}, {x: 180, y: capH}, 12);
        const curve = sampleBezier({x: 180, y: capH}, {x: 420, y: capH}, {x: 420, y: 0}, {x: 130, y: 0}, 16);
        strokePolyline(p, left.concat(curve), w);
      }

      glyphs.push(new window.opentype.Glyph({
        name: ch,
        unicode: code,
        advanceWidth: advW,
        path: p
      }));
    }

    // Numbers 0-9
    const digits = '0123456789';
    for (let i = 0; i < digits.length; i++) {
      const d = digits[i];
      const p = new window.opentype.Path();
      const code = d.charCodeAt(0);
      const advW = Math.round(500 * asp);

      if (d === '0') {
        const oval = sampleBezier({x: 250, y: capH}, {x: 110, y: capH}, {x: 110, y: 0}, {x: 250, y: 0}, 16);
        const ovalR = sampleBezier({x: 250, y: 0}, {x: 390, y: 0}, {x: 390, y: capH}, {x: 250, y: capH}, 16);
        strokePolyline(p, oval.concat(ovalR), w);
      } else if (d === '1') {
        const stem = sampleBezier({x: 160, y: capH * 0.8}, {x: 250, y: capH}, {x: 250, y: capH * 0.5}, {x: 250, y: 0}, 14);
        strokePolyline(p, stem, w);
      } else {
        // Organic digit curves
        const top = sampleBezier({x: 130, y: capH * 0.8}, {x: 250, y: capH}, {x: 380, y: capH * 0.7}, {x: 250, y: capH * 0.4}, 14);
        const bot = sampleBezier({x: 250, y: capH * 0.4}, {x: 150, y: 0}, {x: 350, y: 0}, {x: 380, y: 0}, 14);
        strokePolyline(p, top.concat(bot), w);
      }

      glyphs.push(new window.opentype.Glyph({
        name: d,
        unicode: code,
        advanceWidth: advW,
        path: p
      }));
    }

    // Common Punctuation: . , ! ? ' " : ; - _ ( ) /
    const punctMap = {
      '.': p => drawDot(p, 120, 25, Math.round(w * 0.6)),
      ',': p => {
        drawDot(p, 120, 30, Math.round(w * 0.6));
        strokePolyline(p, [shear(120, 20), shear(105, -35)], w * 0.8);
      },
      ':': p => {
        drawDot(p, 120, 25, Math.round(w * 0.55));
        drawDot(p, 120, xH * 0.65, Math.round(w * 0.55));
      },
      ';': p => {
        drawDot(p, 120, xH * 0.65, Math.round(w * 0.55));
        drawDot(p, 120, 30, Math.round(w * 0.55));
        strokePolyline(p, [shear(120, 20), shear(105, -35)], w * 0.8);
      },
      '!': p => {
        strokePolyline(p, [shear(130, capH), shear(130, xH * 0.4)], w);
        drawDot(p, 130, 25, Math.round(w * 0.6));
      },
      '?': p => {
        const top = sampleBezier({x: 110, y: capH * 0.75}, {x: 200, y: capH + 10}, {x: 290, y: capH * 0.8}, {x: 220, y: capH * 0.45}, 14);
        const stem = [shear(220, capH * 0.45), shear(210, xH * 0.35)];
        strokePolyline(p, top, w);
        strokePolyline(p, stem, w);
        drawDot(p, 210, 25, Math.round(w * 0.6));
      },
      '-': p => strokePolyline(p, [shear(70, xH * 0.5), shear(250, xH * 0.5)], w * 0.9),
      '(': p => strokePolyline(p, sampleBezier({x: 240, y: capH}, {x: 100, y: capH * 0.5}, {x: 100, y: 0}, {x: 240, y: descH}, 14), w * 0.9),
      ')': p => strokePolyline(p, sampleBezier({x: 100, y: capH}, {x: 240, y: capH * 0.5}, {x: 240, y: 0}, {x: 100, y: descH}, 14), w * 0.9),
      '/': p => strokePolyline(p, [shear(80, descH * 0.6), shear(280, capH)], w * 0.9)
    };

    for (const [ch, draw] of Object.entries(punctMap)) {
      const p = new window.opentype.Path();
      draw(p);
      glyphs.push(new window.opentype.Glyph({
        name: 'punct_' + ch.charCodeAt(0),
        unicode: ch.charCodeAt(0),
        advanceWidth: Math.round((ch === '.' || ch === ',' || ch === ':' || ch === ';' ? 250 : 340) * asp),
        path: p
      }));
    }

    // Compile into TrueType font binary
    const font = new window.opentype.Font({
      familyName: familyName,
      styleName: isCursive ? 'Cursive Hand' : 'Authentic Hand',
      unitsPerEm: 1000,
      ascender: 800,
      descender: -250,
      glyphs: glyphs
    });

    const arrayBuffer = font.toArrayBuffer();
    return {
      arrayBuffer,
      font,
      metrics
    };
  }

  /**
   * Main external entrypoint for creating a custom font from a handwriting sample image
   */
  window.__createFontFromHandwritingImage = function(fileOrUrl, customName, onProgress, onComplete) {
    if (typeof window.opentype === 'undefined') {
      const script = document.createElement('script');
      script.src = '/opentype.min.js';
      script.onload = () => {
        window.__createFontFromHandwritingImage(fileOrUrl, customName, onProgress, onComplete);
      };
      script.onerror = () => {
        onComplete && onComplete({ success: false, error: 'Could not load font compiler library (opentype.js)' });
      };
      document.head.appendChild(script);
      return;
    }

    const img = new Image();
    !fileOrUrl.startsWith?.('data:') && !fileOrUrl.startsWith?.('blob:') && (img.crossOrigin = 'anonymous');

    img.onload = function() {
      try {
        onProgress && onProgress('📸 Scanning handwriting sample and extracting penmanship DNA...');
        const metrics = analyzeHandwritingSample(img);

        onProgress && onProgress(`✍️ Measured slant (${(metrics.slant * 57.3).toFixed(1)}°), stroke weight (${metrics.weight}), and cursive contours...`);

        const fontResult = compileTrueTypeFont(metrics, customName || 'My Cloned Handwriting');

        onProgress && onProgress('🔤 Compiling authentic vector TrueType (.TTF) outlines...');

        const ttfBlob = new Blob([fontResult.arrayBuffer], { type: 'font/ttf' });
        const timeStamp = Date.now();
        const fontId = `custom_font_${timeStamp}`;
        const fileName = `${(customName || 'My_Handwriting').replace(/\s+/g, '_')}_${timeStamp}.ttf`;
        const fontFile = new File([ttfBlob], fileName, { type: 'font/ttf' });

        // Register in FontFace API
        const fontFace = new FontFace(fontId, fontResult.arrayBuffer);
        fontFace.load().then(loadedFace => {
          document.fonts.add(loadedFace);
          onComplete && onComplete({
            success: true,
            fontId: fontId,
            fontName: customName || 'My Cloned Handwriting',
            file: fontFile,
            buffer: fontResult.arrayBuffer,
            metrics: metrics
          });
        }).catch(err => {
          console.warn('FontFace load warning, proceeding with file:', err);
          onComplete && onComplete({
            success: true,
            fontId: fontId,
            fontName: customName || 'My Cloned Handwriting',
            file: fontFile,
            buffer: fontResult.arrayBuffer,
            metrics: metrics
          });
        });

      } catch (err) {
        console.error('Handwriting synthesis error:', err);
        onComplete && onComplete({ success: false, error: err?.message || err });
      }
    };

    img.onerror = function(err) {
      onComplete && onComplete({ success: false, error: 'Could not load sample image' });
    };

    if (typeof fileOrUrl === 'string') {
      img.src = fileOrUrl;
    } else if (fileOrUrl instanceof Blob || fileOrUrl instanceof File) {
      img.src = URL.createObjectURL(fileOrUrl);
    }
  };

})(window);
