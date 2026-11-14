export interface FontDefinition {
  id: string;
  name: string;
  category: string;
  url: string;
  fallbackGoogleFont: string;
  fontFamily: string;
  description: string;
  isCore?: boolean;
}

export const HANDWRITING_FONTS: FontDefinition[] = [
  {
    "id": "cursive_real",
    "name": "Cursive Real (Default)",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/Cursive_real.ttf",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Cursive Real', 'Caveat', cursive",
    "description": "Natural flowing cursive with realistic letter variations",
    "isCore": true
  },
  {
    "id": "cursive_real_2",
    "name": "Cursive Real 2 (QE Sam Roberts)",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/QESamRoberts.ttf",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Sam Roberts', 'Caveat', cursive",
    "description": "Authentic student handwriting sample with natural baseline drift",
    "isCore": true
  },
  {
    "id": "shadows_into_light",
    "name": "Shadows Into Light (Casual Ballpoint)",
    "category": "Casual",
    "url": "https://fonts.gstatic.com/s/shadowsintolight/v22/UqyNK9UOIntux_czAvDQx_ZcHqZXBNQDcg.ttf",
    "fallbackGoogleFont": "'Shadows Into Light', cursive",
    "fontFamily": "'Shadows Into Light', cursive",
    "description": "Clean, natural everyday homework ballpoint penmanship with rounded curves",
    "isCore": true
  },
  {
    "id": "homemade_apple",
    "name": "Homemade Apple (Fountain Pen Cursive)",
    "category": "Cursive",
    "url": "https://fonts.gstatic.com/s/homemadeapple/v24/Qw3EZQFXECDrI2q789EKQZJob3x9.ttf",
    "fallbackGoogleFont": "'Homemade Apple', cursive",
    "fontFamily": "'Homemade Apple', cursive",
    "description": "Authentic ink cursive with dipping fountain pen texture",
    "isCore": true
  },
  {
    "id": "cursive_3",
    "name": "Cursive 3 (Quick Notes)",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/Cursive_3.ttf",
    "fallbackGoogleFont": "'Kalam', cursive",
    "fontFamily": "'Cursive 3', 'Kalam', cursive",
    "description": "Rapid homework note style with slight forward slant",
    "isCore": true
  },
  {
    "id": "cursive_2",
    "name": "Cursive 2 (Smooth Flow)",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/Cursive_2.ttf",
    "fallbackGoogleFont": "'Marck Script', cursive",
    "fontFamily": "'Cursive 2', 'Marck Script', cursive",
    "description": "Evenly spaced fluid loops with balanced letter height",
    "isCore": true
  },
  {
    "id": "cursive_real_3",
    "name": "Cursive Real 3 (QE Scott Williams)",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/QEScottWilliams.ttf",
    "fallbackGoogleFont": "'Marck Script', cursive",
    "fontFamily": "'Scott Williams', 'Marck Script', cursive",
    "description": "Firm pen pressure with tight, readable cursive connectors",
    "isCore": true
  },
  {
    "id": "darlington",
    "name": "Darlington Calligraphy",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/Darlington.ttf",
    "fallbackGoogleFont": "'Dancing Script', cursive",
    "fontFamily": "'Darlington', 'Dancing Script', cursive",
    "description": "Elegant script with romantic loops and flourishing terminals",
    "isCore": true
  },
  {
    "id": "halimun",
    "name": "Halimun Script",
    "category": "Script",
    "url": "https://assets.handify.in/public/fonts/Halimun.ttf",
    "fallbackGoogleFont": "'Great Vibes', cursive",
    "fontFamily": "'Halimun', 'Great Vibes', cursive",
    "description": "Artistic calligraphic brush script for personal letters",
    "isCore": true
  },
  {
    "id": "southampton",
    "name": "Southampton Signature",
    "category": "Script",
    "url": "https://assets.handify.in/public/fonts/Southampton.ttf",
    "fallbackGoogleFont": "'Sacramento', cursive",
    "fontFamily": "'Southampton', 'Sacramento', cursive",
    "description": "Delicate and airy cursive signature script",
    "isCore": true
  },
  {
    "id": "tomatoes",
    "name": "Tomatoes (Organic Casual)",
    "category": "Casual",
    "url": "https://assets.handify.in/public/fonts/Tomatoes.ttf",
    "fallbackGoogleFont": "'Shadows Into Light', cursive",
    "fontFamily": "'Tomatoes', 'Shadows Into Light', cursive",
    "description": "Quirky handwritten print with playful imperfections",
    "isCore": true
  },
  {
    "id": "handwritten",
    "name": "Handwritten Print",
    "category": "Print",
    "url": "https://assets.handify.in/public/fonts/handwritten.ttf",
    "fallbackGoogleFont": "'Kalam', cursive",
    "fontFamily": "'Handwritten Print', 'Kalam', cursive",
    "description": "Everyday notebook print handwriting suitable for assignments",
    "isCore": true
  },
  {
    "id": "gh_hughes",
    "name": "GH Hughes (QE Series)",
    "category": "Print",
    "url": "https://assets.handify.in/public/fonts/QEGHHughes.ttf",
    "fallbackGoogleFont": "'Indie Flower', cursive",
    "fontFamily": "'GH Hughes', 'Indie Flower', cursive",
    "description": "Clean handwritten block print with gentle spacing",
    "isCore": true
  },
  {
    "id": "jer",
    "name": "JER Casual (QE Series)",
    "category": "Casual",
    "url": "https://assets.handify.in/public/fonts/QEJER.ttf",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'JER', 'Caveat', cursive",
    "description": "Relaxed everyday notebook handwriting",
    "isCore": true
  },
  {
    "id": "kevin_knowles",
    "name": "Kevin Knowles (QE Series)",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/QEKevinKnowles.ttf",
    "fallbackGoogleFont": "'Marck Script', cursive",
    "fontFamily": "'Kevin Knowles', 'Marck Script', cursive",
    "description": "Smooth cursive connected loops",
    "isCore": true
  },
  {
    "id": "philip_bean",
    "name": "Philip Bean (QE Series)",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/QEPhilipBean.ttf",
    "fallbackGoogleFont": "'Dancing Script', cursive",
    "fontFamily": "'Philip Bean', 'Dancing Script', cursive",
    "description": "Balanced traditional cursive pen style",
    "isCore": true
  },
  {
    "id": "natural1",
    "name": "Natural Flow 1",
    "category": "Cursive",
    "url": "https://assets.handify.in/public/fonts/natural1.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Natural Flow', 'Caveat', cursive",
    "description": "Realistic organic student notebook handwriting",
    "isCore": true
  },
  {
    "id": "multi-01",
    "name": "Writify Multi 01",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-01.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 01', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "latin-01",
    "name": "Writify Latin 01",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-01.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 01', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-02",
    "name": "Writify Latin 02",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-02.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 02', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-03",
    "name": "Writify Latin 03",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-03.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 03', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-04",
    "name": "Writify Latin 04",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-04.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 04', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-05",
    "name": "Writify Latin 05",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-05.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 05', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "multi-02",
    "name": "Writify Multi 02",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-02.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 02', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic",
    "isCore": false
  },
  {
    "id": "latin-06",
    "name": "Writify Latin 06",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-06.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 06', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-07",
    "name": "Writify Latin 07",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-07.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 07', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-08",
    "name": "Writify Latin 08",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-08.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 08', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-09",
    "name": "Writify Latin 09",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-09.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 09', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-10",
    "name": "Writify Latin 10",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-10.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 10', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-11",
    "name": "Writify Latin 11",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-11.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 11', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-12",
    "name": "Writify Latin 12",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-12.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 12', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "multi-03",
    "name": "Writify Multi 03",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-03.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 03', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "east-01",
    "name": "Writify East 01",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-01.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 01', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek, hangul, hiragana, katakana",
    "isCore": false
  },
  {
    "id": "latin-13",
    "name": "Writify Latin 13",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-13.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 13', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "multi-04",
    "name": "Writify Multi 04",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-04.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 04', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "latin-14",
    "name": "Writify Latin 14",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-14.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 14', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-15",
    "name": "Writify Latin 15",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-15.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 15', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-16",
    "name": "Writify Latin 16",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-16.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 16', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-17",
    "name": "Writify Latin 17",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-17.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 17', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-18",
    "name": "Writify Latin 18",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-18.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 18', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-19",
    "name": "Writify Latin 19",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-19.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 19', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-20",
    "name": "Writify Latin 20",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-20.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 20', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-21",
    "name": "Writify Latin 21",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-21.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 21', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-22",
    "name": "Writify Latin 22",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-22.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 22', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-23",
    "name": "Writify Latin 23",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-23.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 23', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "multi-05",
    "name": "Writify Multi 05",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-05.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 05', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic",
    "isCore": false
  },
  {
    "id": "multi-06",
    "name": "Writify Multi 06",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-06.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 06', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "multi-07",
    "name": "Writify Multi 07",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-07.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 07', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "multi-08",
    "name": "Writify Multi 08",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-08.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 08', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "multi-09",
    "name": "Writify Multi 09",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-09.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 09', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "multi-10",
    "name": "Writify Multi 10",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-10.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 10', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "multi-11",
    "name": "Writify Multi 11",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-11.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 11', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "multi-12",
    "name": "Writify Multi 12",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-12.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 12', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic",
    "isCore": false
  },
  {
    "id": "multi-13",
    "name": "Writify Multi 13",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-13.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 13', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "multi-14",
    "name": "Writify Multi 14",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-14.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 14', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "multi-15",
    "name": "Writify Multi 15",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-15.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 15', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic",
    "isCore": false
  },
  {
    "id": "multi-16",
    "name": "Writify Multi 16",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-16.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 16', 'Caveat', cursive",
    "description": "Scripts: cyrillic",
    "isCore": false
  },
  {
    "id": "multi-17",
    "name": "Writify Multi 17",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-17.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 17', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic",
    "isCore": false
  },
  {
    "id": "multi-18",
    "name": "Writify Multi 18",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-18.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 18', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "arabic-01",
    "name": "Writify Arabic 01",
    "category": "Arabic/Indic",
    "url": "https://assets.handify.in/public/fonts/Scripts/arabic/v1/writify-arabic-01.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Arabic 01', 'Caveat', cursive",
    "description": "Scripts: latin, arabic",
    "isCore": false
  },
  {
    "id": "latin-24",
    "name": "Writify Latin 24",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-24.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 24', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-25",
    "name": "Writify Latin 25",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-25.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 25', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-26",
    "name": "Writify Latin 26",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-26.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 26', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-27",
    "name": "Writify Latin 27",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-27.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 27', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-28",
    "name": "Writify Latin 28",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-28.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 28', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-29",
    "name": "Writify Latin 29",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-29.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 29', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-30",
    "name": "Writify Latin 30",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-30.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 30', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-31",
    "name": "Writify Latin 31",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-31.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 31', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-32",
    "name": "Writify Latin 32",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-32.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 32', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-33",
    "name": "Writify Latin 33",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-33.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 33', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-34",
    "name": "Writify Latin 34",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-34.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 34', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-35",
    "name": "Writify Latin 35",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-35.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 35', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-36",
    "name": "Writify Latin 36",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-36.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 36', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-37",
    "name": "Writify Latin 37",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-37.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 37', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-38",
    "name": "Writify Latin 38",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-38.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 38', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-39",
    "name": "Writify Latin 39",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-39.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 39', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-40",
    "name": "Writify Latin 40",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-40.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 40', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-41",
    "name": "Writify Latin 41",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-41.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 41', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-42",
    "name": "Writify Latin 42",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-42.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 42', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-43",
    "name": "Writify Latin 43",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-43.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 43', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-44",
    "name": "Writify Latin 44",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-44.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 44', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-45",
    "name": "Writify Latin 45",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-45.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 45', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-46",
    "name": "Writify Latin 46",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-46.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 46', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-47",
    "name": "Writify Latin 47",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-47.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 47', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-48",
    "name": "Writify Latin 48",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-48.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 48', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-49",
    "name": "Writify Latin 49",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-49.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 49', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-50",
    "name": "Writify Latin 50",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-50.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 50', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-51",
    "name": "Writify Latin 51",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-51.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 51', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-52",
    "name": "Writify Latin 52",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-52.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 52', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-53",
    "name": "Writify Latin 53",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-53.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 53', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-54",
    "name": "Writify Latin 54",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-54.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 54', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-55",
    "name": "Writify Latin 55",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-55.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 55', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-56",
    "name": "Writify Latin 56",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-56.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 56', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-57",
    "name": "Writify Latin 57",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-57.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 57', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-58",
    "name": "Writify Latin 58",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-58.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 58', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-59",
    "name": "Writify Latin 59",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-59.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 59', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "latin-60",
    "name": "Writify Latin 60",
    "category": "Latin Script",
    "url": "https://assets.handify.in/public/fonts/Scripts/latin/v1/writify-latin-60.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Latin 60', 'Caveat', cursive",
    "description": "Scripts: latin",
    "isCore": false
  },
  {
    "id": "multi-19",
    "name": "Writify Multi 19",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-19.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 19', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "east-02",
    "name": "Writify East 02",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-02.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 02', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek, hangul, hiragana, katakana",
    "isCore": false
  },
  {
    "id": "east-03",
    "name": "Writify East 03",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-03.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 03', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek, hangul, hiragana, katakana",
    "isCore": false
  },
  {
    "id": "east-04",
    "name": "Writify East 04",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-04.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 04', 'Caveat', cursive",
    "description": "Scripts: latin, hangul",
    "isCore": false
  },
  {
    "id": "east-05",
    "name": "Writify East 05",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-05.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 05', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "devanagari-01",
    "name": "Writify Devanagari 01",
    "category": "Arabic/Indic",
    "url": "https://assets.handify.in/public/fonts/Scripts/devanagari/v1/writify-devanagari-01.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Devanagari 01', 'Caveat', cursive",
    "description": "Scripts: latin, devanagari",
    "isCore": false
  },
  {
    "id": "east-06",
    "name": "Writify East 06",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-06.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 06', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "east-07",
    "name": "Writify East 07",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-07.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 07', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "east-08",
    "name": "Writify East 08",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-08.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 08', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek, hangul, hiragana, katakana",
    "isCore": false
  },
  {
    "id": "east-09",
    "name": "Writify East 09",
    "category": "East Asian",
    "url": "https://assets.handify.in/public/fonts/Scripts/east-asian/v1/writify-east-09.woff2",
    "fallbackGoogleFont": "'Noto Sans', sans-serif",
    "fontFamily": "'Writify East 09', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek",
    "isCore": false
  },
  {
    "id": "devanagari-02",
    "name": "Writify Devanagari 02",
    "category": "Arabic/Indic",
    "url": "https://assets.handify.in/public/fonts/Scripts/devanagari/v1/writify-devanagari-02.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Devanagari 02', 'Caveat', cursive",
    "description": "Scripts: latin, devanagari",
    "isCore": false
  },
  {
    "id": "devanagari-03",
    "name": "Writify Devanagari 03",
    "category": "Arabic/Indic",
    "url": "https://assets.handify.in/public/fonts/Scripts/devanagari/v1/writify-devanagari-03.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Devanagari 03', 'Caveat', cursive",
    "description": "Scripts: devanagari",
    "isCore": false
  },
  {
    "id": "multi-20",
    "name": "Writify Multi 20",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-20.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 20', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek, devanagari",
    "isCore": false
  },
  {
    "id": "multi-21",
    "name": "Writify Multi 21",
    "category": "Multilingual",
    "url": "https://assets.handify.in/public/fonts/Scripts/multilingual/v1/writify-multi-21.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Multi 21', 'Caveat', cursive",
    "description": "Scripts: latin, cyrillic, greek, devanagari",
    "isCore": false
  },
  {
    "id": "arabic-02",
    "name": "Writify Arabic 02",
    "category": "Arabic/Indic",
    "url": "https://assets.handify.in/public/fonts/Scripts/arabic/v1/writify-arabic-02.woff2",
    "fallbackGoogleFont": "'Caveat', cursive",
    "fontFamily": "'Writify Arabic 02', 'Caveat', cursive",
    "description": "Scripts: latin, arabic",
    "isCore": false
  }
];

export const INK_COLORS = [
  { id: "royal_blue", name: "Royal Gel Blue", hex: "#002f6c", sample: "bg-[#002f6c]" },
  { id: "classic_blue", name: "Ballpoint Blue", hex: "#1d4ed8", sample: "bg-[#1d4ed8]" },
  { id: "gel_black", name: "Deep Gel Black", hex: "#111827", sample: "bg-[#111827]" },
  { id: "soft_pencil", name: "Graphite Pencil", hex: "#374151", sample: "bg-[#374151]" },
  { id: "red_pen", name: "Teacher Red", hex: "#b91c1c", sample: "bg-[#b91c1c]" },
  { id: "emerald_green", name: "Emerald Ink", hex: "#047857", sample: "bg-[#047857]" },
  { id: "purple_ink", name: "Royal Violet", hex: "#6d28d9", sample: "bg-[#6d28d9]" },
];
