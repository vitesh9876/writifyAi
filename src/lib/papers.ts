export interface NotebookItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const NOTEBOOK_TEMPLATES: NotebookItem[] = [
  {
    id: "classic1",
    name: "Classic White",
    image: "/papers/Classic1.webp",
    description: "Standard clean white paper with natural soft folds",
  },
  {
    id: "classic2",
    name: "Natural Ruled Notebook",
    image: "/papers/Classic2.webp",
    description: "Spiral bound notebook with crisp red margin line and ruled rows",
  },
  {
    id: "nb3",
    name: "Cream Parchment",
    image: "/papers/nb3.webp",
    description: "Cream parchment aesthetic with subtle antique grain",
  },
  {
    id: "nb4",
    name: "Recycled Grey",
    image: "/papers/nb4.webp",
    description: "Textured grey recycled paper sheet",
  },
  {
    id: "nb5",
    name: "Double-Ruled Margin",
    image: "/papers/nb5.webp",
    description: "White paper with double black ruler framed borders",
  },
  {
    id: "nb6",
    name: "Single Framed Border",
    image: "/papers/nb6.webp",
    description: "Framed clean page with single border margin",
  },
  {
    id: "nb7",
    name: "Spiral Desk Pad",
    image: "/papers/nb7.webp",
    description: "Open left-side spiral notebook on natural wooden desk",
  },
  {
    id: "nb8",
    name: "Top Wire Sketchpad",
    image: "/papers/nb8.webp",
    description: "Top wire-bound sketch notepad with ballpoint pen on wood",
  },
  {
    id: "nb9",
    name: "Ivory Writing Pad",
    image: "/papers/nb9.webp",
    description: "Textured ivory writing pad",
  },
  {
    id: "nb10",
    name: "Vintage Binder Sheet",
    image: "/papers/nb10.webp",
    description: "Vintage binder notebook",
  },
  {
    id: "nb11",
    name: "Executive Journal Sheet",
    image: "/papers/nb11.webp",
    description: "Executive journal paper",
  },
  {
    id: "nb12",
    name: "Minimalist Desk Sheet",
    image: "/papers/nb12.jpg",
    description: "Minimalist desk sheet",
  },
  {
    id: "nb13",
    name: "Artisan Drawing Sheet",
    image: "/papers/nb13.jpg",
    description: "Artisan textured drawing sheet",
  },
  {
    id: "nb14",
    name: "Classic School Exercise Copy",
    image: "/papers/nb14.jpg",
    description: "Classic school exercise copy",
  },
];

export interface PaperTemplate {
  id: string;
  name: string;
  category: "Notebook" | "Stationery" | "Scroll";
  previewUrl: string;
  hasRuledLines: boolean;
  lineSpacing: number; // in pixels
  lineColor: string;
  marginLineColor?: string;
  marginOffset?: number;
  bgTextureClass: string;
}

export const PAPER_TEMPLATES: PaperTemplate[] = [
  {
    id: "classic_white",
    name: "Classic White Notebook (Ruled)",
    category: "Notebook",
    previewUrl: "/papers/Classic1.webp",
    hasRuledLines: true,
    lineSpacing: 32,
    lineColor: "#cbd5e1",
    marginLineColor: "#f43f5e",
    marginOffset: 80,
    bgTextureClass: "bg-[#fdfdfd]"
  },
  {
    id: "natural_paper",
    name: "Natural Cream Paper (Ruled)",
    category: "Notebook",
    previewUrl: "/papers/Classic2.webp",
    hasRuledLines: true,
    lineSpacing: 32,
    lineColor: "#cbd5e1",
    marginLineColor: "#e11d48",
    marginOffset: 85,
    bgTextureClass: "bg-[#fcfaf2]"
  },
  {
    id: "college_ruled",
    name: "College Ruled Clean Page",
    category: "Notebook",
    previewUrl: "/papers/nb3.webp",
    hasRuledLines: true,
    lineSpacing: 28,
    lineColor: "#94a3b8",
    marginLineColor: "#ef4444",
    marginOffset: 75,
    bgTextureClass: "bg-[#ffffff]"
  },
  {
    id: "vintage_journal",
    name: "Vintage Kraft Journal (Blank)",
    category: "Notebook",
    previewUrl: "/papers/nb4.webp",
    hasRuledLines: false,
    lineSpacing: 32,
    lineColor: "transparent",
    bgTextureClass: "bg-[#f5ebd7]"
  },
  {
    id: "grid_math",
    name: "Graph / Grid Engineering Sheet",
    category: "Notebook",
    previewUrl: "/papers/nb5.webp",
    hasRuledLines: true,
    lineSpacing: 24,
    lineColor: "#e2e8f0",
    bgTextureClass: "bg-[#fafafa]"
  },
  {
    id: "stationery_rose",
    name: "Victorian Rose Stationery",
    category: "Stationery",
    previewUrl: "/papers/p2.png",
    hasRuledLines: false,
    lineSpacing: 34,
    lineColor: "transparent",
    bgTextureClass: "bg-gradient-to-b from-[#fff5f5] via-[#ffffff] to-[#fff1f2]"
  },
  {
    id: "stationery_parchment",
    name: "Aged Parchment Scroll",
    category: "Scroll",
    previewUrl: "/papers/p8.png",
    hasRuledLines: false,
    lineSpacing: 36,
    lineColor: "transparent",
    bgTextureClass: "bg-[#f4eccf]"
  }
];

export interface ScannerFilter {
  id: string;
  name: string;
  badge: string;
  description: string;
  cssFilter: string;
}

export const SCANNER_EFFECTS: ScannerFilter[] = [
  {
    id: "none",
    name: "Original (No Filter)",
    badge: "Raw",
    description: "Natural organic lighting without contrast boost",
    cssFilter: "none"
  },
  {
    id: "camscanner",
    name: "Magic Color (CamScanner)",
    badge: "Popular",
    description: "Whitens paper background while boosting deep dark ink contrast",
    cssFilter: "contrast(1.35) brightness(1.1) saturate(0.9)"
  },
  {
    id: "natural_daylight",
    name: "Natural Daylight (5500K)",
    badge: "True Color",
    description: "Neutral 5500K daylight with balanced paper fiber tones",
    cssFilter: "contrast(1.12) brightness(1.04) saturate(1.05)"
  },
  {
    id: "clean_document",
    name: "Clean Document Whitening",
    badge: "Crisp",
    description: "Paper whitening with enhanced handwriting legibility",
    cssFilter: "contrast(1.22) brightness(1.08)"
  },
  {
    id: "warm_desk",
    name: "Warm Study Lamp",
    badge: "Cozy",
    description: "Incandescent evening study lamp with cozy warmth",
    cssFilter: "sepia(0.24) contrast(1.12) brightness(1.03)"
  },
  {
    id: "soft_matte",
    name: "Soft Matte Journal",
    badge: "Textured",
    description: "Low-glare velvety finish with rich ink pigment",
    cssFilter: "sepia(0.08) contrast(1.08) brightness(0.98)"
  }
];

export interface ShadowOverlay {
  id: string;
  name: string;
  badge: string;
  description: string;
  overlayClass: string;
}

export const SHADOW_EFFECTS: ShadowOverlay[] = [
  {
    id: "none",
    name: "No Shadow (Clean)",
    badge: "Flat",
    description: "Clean uniform flat lighting",
    overlayClass: ""
  },
  {
    id: "phone_camera",
    name: "Phone Holding Silhouette",
    badge: "Ultra Real",
    description: "Authentic handheld phone shadow with arm & corner vignette",
    overlayClass: "before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.32)_0%,_transparent_65%)] after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(ellipse_at_top_right,_rgba(0,0,0,0.18)_0%,_transparent_55%)]"
  },
  {
    id: "study_lamp",
    name: "Warm Gooseneck Lamp",
    badge: "Natural",
    description: "Focused circular illumination cone with soft outer falloff",
    overlayClass: "before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(circle_at_30%_25%,_rgba(254,240,138,0.18)_0%,_rgba(0,0,0,0.22)_90%)]"
  },
  {
    id: "window_blinds",
    name: "Venetian Window Blinds",
    badge: "Aesthetic",
    description: "Soft diagonal afternoon window sunlight slats",
    overlayClass: "before:absolute before:inset-0 before:pointer-events-none before:bg-[repeating-linear-gradient(45deg,_rgba(0,0,0,0.06)_0px,_rgba(0,0,0,0.06)_40px,_transparent_40px,_transparent_80px)]"
  },
  {
    id: "page_curl",
    name: "3D Tactile Page Lift",
    badge: "Depth",
    description: "Subtle page margin curvature and spine shadow",
    overlayClass: "shadow-[inset_25px_0_20px_-10px_rgba(0,0,0,0.15),_inset_-10px_0_15px_-5px_rgba(0,0,0,0.08)]"
  }
];
