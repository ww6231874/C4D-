import { Palette } from './types';

export const TRANSLATIONS = {
  zh: {
    appTitle: "C4D 配色工坊",
    connectTitle: "欢迎使用 Palette Studio",
    connectDesc: "专为 Cinema 4D 打造的 AI 配色工具。\n请先连接您的 Google Cloud API Key 以开始生成。",
    connectBtn: "连接 API Key",
    billingHelp: "需要帮助? 查看计费与 API 文档",
    searchPlaceholder: "搜索色卡 (如: 赛博朋克, 莫兰迪...)",
    allPalettes: "全部色卡",
    generated: "AI 生成",
    generate: "生成",
    exportC4D: "导出 C4D",
    noResults: "未找到相关色卡",
    generateWithAI: "使用 AI 生成",
    generating: "正在生成中...",
    suggestedThemes: "推荐主题",
    settings: "设置",
    theme: "主题",
    language: "语言",
    likes: "热度",
    copyHex: "复制 HEX",
    copied: "已复制"
  },
  en: {
    appTitle: "C4D Palette Studio",
    connectTitle: "Welcome to Palette Studio",
    connectDesc: "AI-powered color tools for Cinema 4D.\nPlease connect your Google Cloud API Key to start.",
    connectBtn: "Connect API Key",
    billingHelp: "Need help? Check Billing & API Docs",
    searchPlaceholder: "Search palettes (e.g. Cyberpunk, Morandi...)",
    allPalettes: "All Palettes",
    generated: "Generated",
    generate: "Generate",
    exportC4D: "Export C4D",
    noResults: "No palettes found",
    generateWithAI: "Generate with AI",
    generating: "Generating...",
    suggestedThemes: "Suggested Themes",
    settings: "Settings",
    theme: "Theme",
    language: "Language",
    likes: "Likes",
    copyHex: "Copy HEX",
    copied: "Copied"
  }
};

// ==========================================
// 1. 源自艺术与画派 (ART & PAINTING)
// ==========================================

export const MORANDI_PALETTES: Palette[] = [
  { id: 'art-mo-1', name: '静物时光', colors: ['#7D8A8F', '#AAB6BB', '#CED6D9', '#4E5F64'], likes: 1240, tags: ['莫兰迪', '静谧'] },
  { id: 'art-mo-2', name: '干枯玫瑰', colors: ['#D48A96', '#E4C3C8', '#BCA0A3', '#8C6F72'], likes: 1150, tags: ['莫兰迪', '温柔'] },
  { id: 'art-mo-3', name: '燕麦拿铁', colors: ['#D9D0C1', '#C7BBA5', '#8F8474', '#5E5649'], likes: 980, tags: ['莫兰迪', '高级灰'] },
  { id: 'art-mo-4', name: '雾霾蓝', colors: ['#6D85C0', '#95A6C8', '#BCCBE5', '#576785'], likes: 1320, tags: ['莫兰迪', '冷调'] },
  { id: 'art-mo-5', name: '灰豆绿', colors: ['#8FBC8F', '#A8C9A8', '#6E8B6E', '#E0EBE0'], likes: 890, tags: ['莫兰迪', '自然'] },
];

export const MACARON_PALETTES: Palette[] = [
  { id: 'art-ma-1', name: '少女梦境', colors: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7'], likes: 1450, tags: ['马卡龙', '甜美'] },
  { id: 'art-ma-2', name: '薄荷苏打', colors: ['#98FF98', '#E0FFFF', '#AFEEEE', '#FFFFFF'], likes: 920, tags: ['马卡龙', '清爽'] },
  { id: 'art-ma-3', name: '淡丁香', colors: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#F8F8FF'], likes: 880, tags: ['马卡龙', '浪漫'] },
  { id: 'art-ma-4', name: '柠檬奶油', colors: ['#FFFACD', '#FFF4BD', '#FFDEAD', '#FFFFFF'], likes: 760, tags: ['马卡龙', '明亮'] },
];

export const MONDRIAN_PALETTES: Palette[] = [
  { id: 'art-mon-1', name: '风格派构成', colors: ['#FF0000', '#0000FF', '#FFFF00', '#FFFFFF'], likes: 670, tags: ['蒙德里安', '几何'] },
  { id: 'art-mon-2', name: '百老汇爵士', colors: ['#D32F2F', '#1976D2', '#FBC02D', '#212121'], likes: 540, tags: ['蒙德里安', '现代'] },
  { id: 'art-mon-3', name: '红黄蓝黑', colors: ['#E62933', '#00529C', '#FDD52D', '#1C1C1C'], likes: 610, tags: ['蒙德里安', '经典'] },
];

export const MUCHA_PALETTES: Palette[] = [
  { id: 'art-mu-1', name: '新艺术女神', colors: ['#DAA520', '#556B2F', '#CD853F', '#FFE4C4'], likes: 820, tags: ['穆夏', '华丽'] },
  { id: 'art-mu-2', name: '黄道十二宫', colors: ['#B8860B', '#8B4513', '#2F4F4F', '#F5DEB3'], likes: 750, tags: ['穆夏', '复古'] },
  { id: 'art-mu-3', name: '宝石与花', colors: ['#800000', '#D2691E', '#006400', '#FFD700'], likes: 690, tags: ['穆夏', '装饰'] },
];

export const OIL_PAINT_PALETTES: Palette[] = [
  { id: 'art-oil-1', name: '戴珍珠耳环', colors: ['#E3C16F', '#2A4C65', '#9BA0A8', '#141414'], likes: 930, tags: ['油画', '古典'] },
  { id: 'art-oil-2', name: '星月夜', colors: ['#1C2A4D', '#324A75', '#C6A828', '#E6E2D0'], likes: 1100, tags: ['油画', '梵高'] },
  { id: 'art-oil-3', name: '睡莲', colors: ['#4B634A', '#7A9175', '#98A9B4', '#C99DAB'], likes: 880, tags: ['油画', '莫奈'] },
];

// ==========================================
// 2. 源自自然与物质 (NATURE & MATERIAL)
// ==========================================

export const EARTH_PALETTES: Palette[] = [
  { id: 'nat-ea-1', name: '撒哈拉', colors: ['#C2B280', '#D2B48C', '#A0522D', '#8B4513'], likes: 1050, tags: ['大地色', '沙漠'] },
  { id: 'nat-ea-2', name: '秋日森林', colors: ['#556B2F', '#8B4513', '#DAA520', '#F5DEB3'], likes: 940, tags: ['大地色', '温暖'] },
  { id: 'nat-ea-3', name: '岩石海岸', colors: ['#708090', '#778899', '#2F4F4F', '#D3D3D3'], likes: 820, tags: ['大地色', '沉稳'] },
  { id: 'nat-ea-4', name: '极简主义', colors: ['#F5F5DC', '#E6E6FA', '#DCDCDC', '#A9A9A9'], likes: 1120, tags: ['大地色', '高级'] },
];

export const CANDY_PALETTES: Palette[] = [
  { id: 'nat-ca-1', name: '波普糖果', colors: ['#FF69B4', '#FFFF00', '#00BFFF', '#7CFC00'], likes: 600, tags: ['糖果色', '活力'] },
  { id: 'nat-ca-2', name: '泡泡糖', colors: ['#FF1493', '#00CED1', '#FFD700', '#FF4500'], likes: 580, tags: ['糖果色', '童真'] },
];

export const ICE_CREAM_PALETTES: Palette[] = [
  { id: 'nat-ic-1', name: '海盐香草', colors: ['#F3E5AB', '#E0FFFF', '#B0E0E6', '#FFFFFF'], likes: 890, tags: ['冰淇淋', '夏日'] },
  { id: 'nat-ic-2', name: '草莓圣代', colors: ['#FFF0F5', '#FFB7C5', '#FF69B4', '#8B0000'], likes: 740, tags: ['冰淇淋', '甜美'] },
  { id: 'nat-ic-3', name: '抹茶红豆', colors: ['#F0FFF0', '#98FF98', '#8B4513', '#D2691E'], likes: 810, tags: ['冰淇淋', '清新'] },
];

// ==========================================
// 3. 源自地域与文化 (REGION & CULTURE)
// ==========================================

export const CHINESE_PALETTES: Palette[] = [
  { id: 'cn-1', name: '故宫红墙', colors: ['#E60012', '#FFB61E', '#3E4145', '#F0F0F0'], likes: 888, tags: ['中国传统色', '庄重'] },
  { id: 'cn-2', name: '青花瓷', colors: ['#003472', '#2E59A7', '#6D85C0', '#F2FDFF'], likes: 756, tags: ['中国传统色', '雅致'] },
  { id: 'cn-3', name: '千里江山', colors: ['#1A6840', '#3C905D', '#98C39D', '#D4C48D'], likes: 921, tags: ['中国传统色', '山水'] },
  { id: 'cn-4', name: '敦煌飞天', colors: ['#D16E3F', '#EAB76B', '#3B8686', '#A0C4B8'], likes: 634, tags: ['中国传统色', '壁画'] },
  { id: 'cn-5', name: '胭脂粉黛', colors: ['#9D2933', '#F0C9CF', '#D48A96', '#5E3C3E'], likes: 420, tags: ['中国传统色', '妆容'] },
];

export const JAPANESE_PALETTES: Palette[] = [
  { id: 'jp-1', name: '侘寂之美', colors: ['#8C887D', '#595450', '#BFB5A8', '#2E2D2A'], likes: 923, tags: ['日和色', '侘寂'] },
  { id: 'jp-2', name: '樱花祭', colors: ['#FEDFE1', '#F6BFBC', '#D9A6A3', '#5B3234'], likes: 723, tags: ['日和色', '春'] },
  { id: 'jp-3', name: '蓝染工艺', colors: ['#0F2350', '#165E83', '#6A92AC', '#EBF2F5'], likes: 810, tags: ['日和色', '工艺'] },
  { id: 'jp-4', name: '京都秋叶', colors: ['#C7B370', '#8F4A39', '#594436', '#2E2925'], likes: 689, tags: ['日和色', '古都'] },
];

export const MEDITERRANEAN_PALETTES: Palette[] = [
  { id: 'reg-med-1', name: '圣托里尼', colors: ['#FFFFFF', '#0077BE', '#0000CD', '#87CEEB'], likes: 1020, tags: ['地中海', '蓝白'] },
  { id: 'reg-med-2', name: '西西里艳阳', colors: ['#FFA500', '#FF4500', '#FFD700', '#228B22'], likes: 670, tags: ['地中海', '热情'] },
  { id: 'reg-med-3', name: '托斯卡纳', colors: ['#D2691E', '#8B4513', '#556B2F', '#FFFFE0'], likes: 590, tags: ['地中海', '田园'] },
];

export const FRENCH_PALETTES: Palette[] = [
  { id: 'fr-1', name: '巴黎清晨', colors: ['#F5F5DC', '#E0FFFF', '#B0C4DE', '#778899'], likes: 620, tags: ['法式浪漫', '优雅'] },
  { id: 'fr-2', name: '勃艮第红', colors: ['#800020', '#A52A2A', '#CD5C5C', '#F08080'], likes: 480, tags: ['法式浪漫', '红酒'] },
];

export const NORDIC_PALETTES: Palette[] = [
  { id: 'no-1', name: '北欧极简', colors: ['#FFFFFF', '#D3D3D3', '#808080', '#000000'], likes: 900, tags: ['北欧极简', '设计'] },
  { id: 'no-2', name: '峡湾深蓝', colors: ['#003366', '#4682B4', '#87CEEB', '#F0F8FF'], likes: 780, tags: ['北欧极简', '自然'] },
];

// ==========================================
// 4. 基于视觉效果 (VISUAL EFFECTS)
// ==========================================

export const NEON_CYBER_PALETTES: Palette[] = [
  { id: 'vis-neo-1', name: '赛博朋克', colors: ['#000000', '#1A1A1A', '#FF003C', '#00F0FF'], likes: 1100, tags: ['霓虹/赛博', '科幻'] },
  { id: 'vis-neo-2', name: '蒸汽波', colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#2B003B'], likes: 950, tags: ['霓虹/赛博', '潮流'] },
  { id: 'vis-neo-3', name: '电光紫', colors: ['#4B0082', '#8A2BE2', '#9370DB', '#E6E6FA'], likes: 670, tags: ['霓虹/赛博', '梦幻'] },
];

export const MONOCHROME_PALETTES: Palette[] = [
  { id: 'vis-mono-1', name: '极致黑白', colors: ['#000000', '#FFFFFF', '#000000', '#FFFFFF'], likes: 880, tags: ['黑白灰', '经典'] },
  { id: 'vis-mono-2', name: '五度灰', colors: ['#000000', '#333333', '#777777', '#BBBBBB'], likes: 760, tags: ['黑白灰', '过渡'] },
  { id: 'vis-mono-3', name: '工业质感', colors: ['#2b2d42', '#8d99ae', '#edf2f4', '#161a1d'], likes: 650, tags: ['黑白灰', '冷峻'] },
];

export const RETRO_PALETTES: Palette[] = [
  { id: 'vis-ret-1', name: '80年代迪斯科', colors: ['#FF1493', '#00BFFF', '#32CD32', '#FFD700'], likes: 880, tags: ['复古美学', '活力'] },
  { id: 'vis-ret-2', name: '旧照片', colors: ['#8B4513', '#A0522D', '#CD853F', '#DEB887'], likes: 620, tags: ['复古美学', '记忆'] },
];


export const ALL_INITIAL_PALETTES = [
  ...MORANDI_PALETTES,
  ...MACARON_PALETTES,
  ...MONDRIAN_PALETTES,
  ...MUCHA_PALETTES,
  ...OIL_PAINT_PALETTES,
  ...EARTH_PALETTES,
  ...CANDY_PALETTES,
  ...ICE_CREAM_PALETTES,
  ...CHINESE_PALETTES,
  ...JAPANESE_PALETTES,
  ...MEDITERRANEAN_PALETTES,
  ...FRENCH_PALETTES,
  ...NORDIC_PALETTES,
  ...NEON_CYBER_PALETTES,
  ...MONOCHROME_PALETTES,
  ...RETRO_PALETTES
];

export const SUGGESTED_THEMES = [
  "Cyberpunk 2077",
  "Wes Anderson",
  "Morandi",
  "Bauhaus",
  "Y2K",
  "Ghibli",
  "Vaporwave"
];

// ==========================================
// APP CONFIG
// ==========================================

export const CATEGORIES = [
  { id: '全部', enLabel: 'All Palettes', label: '全部色卡', icon: 'LayoutGrid', desc: '浏览灵感库' },
  
  { type: 'header', enLabel: 'Art & Painting', label: '源自艺术' },
  { id: '莫兰迪', enLabel: 'Morandi', label: '莫兰迪色系', icon: 'Palette', desc: '静谧/高级灰' },
  { id: '马卡龙', enLabel: 'Macaron', label: '马卡龙色系', icon: 'Cookie', desc: '清新/甜美' },
  { id: '蒙德里安', enLabel: 'Mondrian', label: '蒙德里安', icon: 'Grid', desc: '红黄蓝/构成' },
  { id: '穆夏', enLabel: 'Mucha', label: '穆夏色系', icon: 'Feather', desc: '华丽/装饰' },
  { id: '油画', enLabel: 'Oil Painting', label: '古典油画', icon: 'Image', desc: '厚重/质感' },

  { type: 'header', enLabel: 'Nature', label: '源自自然' },
  { id: '大地色', enLabel: 'Earth Tone', label: '大地色系', icon: 'Mountain', desc: '温暖/沉稳' },
  { id: '糖果色', enLabel: 'Candy', label: '糖果色系', icon: 'Lollipop', desc: '高饱和/波普' },
  { id: '冰淇淋', enLabel: 'Ice Cream', label: '冰淇淋色系', icon: 'IceCream', desc: '夏日/清凉' },

  { type: 'header', enLabel: 'Region & Culture', label: '源自地域' },
  { id: '中国传统色', enLabel: 'Chinese Trad.', label: '中国传统色', icon: 'Brush', desc: '国风/雅致' },
  { id: '日和色', enLabel: 'Japanese', label: '日和/侘寂', icon: 'Flower', desc: '朴素/自然' },
  { id: '地中海', enLabel: 'Mediterranean', label: '地中海', icon: 'Waves', desc: '蓝白/阳光' },
  { id: '法式浪漫', enLabel: 'French', label: '法式浪漫', icon: 'Heart', desc: '优雅/慵懒' },
  { id: '北欧极简', enLabel: 'Nordic', label: '北欧极简', icon: 'Snowflake', desc: '冷静/设计' },

  { type: 'header', enLabel: 'Visual FX', label: '视觉效果' },
  { id: '霓虹/赛博', enLabel: 'Neon / Cyber', label: '霓虹/赛博', icon: 'Zap', desc: '科幻/迷幻' },
  { id: '黑白灰', enLabel: 'Monochrome', label: '黑白灰', icon: 'Circle', desc: '极致/光影' },
  { id: '复古美学', enLabel: 'Retro', label: '复古美学', icon: 'Disc', desc: '怀旧/胶片' },
];