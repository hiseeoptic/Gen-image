import React, { forwardRef } from 'react';
import type { InfographicConfig } from '../types';

// ─── Style theme variables ────────────────────────────────────────────────────

interface StyleVars {
  bg: string;
  titleFont: string;
  titleColor: string;
  subtitleColor: string;
  textColor: string;
  sectionTitleColor: string;
  ingBg: string;
  ingBorder: string;
  stepNumBg: string;
  stepNumColor: string;
  cardBg: string;
  cardBorder: string;
  divider: string;
  ingPalette: string[];
  badges: Record<string, { bg: string; text: string; border: string }>;
}

const FONT = "'Be Vietnam Pro', 'Segoe UI', Arial, sans-serif";

const STYLES: Record<string, StyleVars> = {
  soft_pastel: {
    bg: '#f7ede0',
    titleFont: FONT,
    titleColor: '#3d2010',
    subtitleColor: '#8a6040',
    textColor: '#5a3820',
    sectionTitleColor: '#4a2c14',
    ingBg: '#fffaf4',
    ingBorder: '#e8c09a',
    stepNumBg: '#d4906a',
    stepNumColor: '#ffffff',
    cardBg: 'rgba(255,250,244,0.75)',
    cardBorder: '#e8d0b4',
    divider: '#e0c0a0',
    ingPalette: ['#f8d0b4', '#c8ecd8', '#f8e4b4', '#d4caf0', '#f4c8d8', '#c4d8f4', '#d0f0c4', '#f4d8c4'],
    badges: {
      pink:     { bg: '#fde8e0', text: '#b84030', border: '#f4b0a0' },
      mint:     { bg: '#e0f4ea', text: '#1a6040', border: '#9adcb8' },
      peach:    { bg: '#fdecd8', text: '#b86020', border: '#f4c090' },
      lavender: { bg: '#ece0f4', text: '#6a2090', border: '#c0a0e0' },
      blue:     { bg: '#dce8f8', text: '#1a4080', border: '#90b8e8' },
      green:    { bg: '#ddf4e0', text: '#1a6030', border: '#90d8a0' },
      orange:   { bg: '#fdecd4', text: '#b85010', border: '#f4b880' },
      yellow:   { bg: '#fdf4d0', text: '#a07010', border: '#f0d880' },
    },
  },
  clean_modern: {
    bg: '#ffffff',
    titleFont: FONT,
    titleColor: '#0a0a1a',
    subtitleColor: '#4a4a6a',
    textColor: '#3a3a5a',
    sectionTitleColor: '#1a1a3a',
    ingBg: '#f4f6fa',
    ingBorder: '#d4dae8',
    stepNumBg: '#2060c8',
    stepNumColor: '#ffffff',
    cardBg: '#f4f6fa',
    cardBorder: '#d4dae8',
    divider: '#d0d5e0',
    ingPalette: ['#e4ecf8', '#daf0ec', '#f8f0dc', '#ede4f8', '#daeef8', '#f0f8dc', '#f8e4e8', '#e4f0f8'],
    badges: {
      pink:     { bg: '#fce8e8', text: '#c02020', border: '#f0a8a8' },
      mint:     { bg: '#e0f4ec', text: '#186040', border: '#90d8b4' },
      peach:    { bg: '#fdecd8', text: '#c05820', border: '#f4c090' },
      lavender: { bg: '#ece0f8', text: '#601890', border: '#c0a0e8' },
      blue:     { bg: '#dce8f8', text: '#1840a0', border: '#90b8e8' },
      green:    { bg: '#ddf4e2', text: '#186030', border: '#8ed8a4' },
      orange:   { bg: '#fdecd4', text: '#b85010', border: '#f4c080' },
      yellow:   { bg: '#fdf4cc', text: '#a07010', border: '#f0d870' },
    },
  },
  dark_luxury: {
    bg: '#141414',
    titleFont: FONT,
    titleColor: '#d4af37',
    subtitleColor: '#a08858',
    textColor: '#c8b890',
    sectionTitleColor: '#d4af37',
    ingBg: 'rgba(212,175,55,0.09)',
    ingBorder: 'rgba(212,175,55,0.38)',
    stepNumBg: '#d4af37',
    stepNumColor: '#0d0d0d',
    cardBg: 'rgba(255,255,255,0.05)',
    cardBorder: 'rgba(212,175,55,0.28)',
    divider: 'rgba(212,175,55,0.22)',
    ingPalette: [
      'rgba(212,175,55,0.22)', 'rgba(80,200,140,0.18)', 'rgba(212,150,80,0.22)',
      'rgba(160,100,220,0.18)', 'rgba(80,140,220,0.18)', 'rgba(212,100,80,0.18)',
      'rgba(80,200,200,0.18)', 'rgba(220,80,160,0.18)',
    ],
    badges: {
      pink:     { bg: 'rgba(220,100,80,0.18)',  text: '#e09080', border: 'rgba(220,100,80,0.38)' },
      mint:     { bg: 'rgba(80,200,140,0.15)',  text: '#60d8a0', border: 'rgba(80,200,140,0.35)' },
      peach:    { bg: 'rgba(220,150,80,0.18)',  text: '#e0a060', border: 'rgba(220,150,80,0.38)' },
      lavender: { bg: 'rgba(160,100,220,0.18)', text: '#c080e8', border: 'rgba(160,100,220,0.38)' },
      blue:     { bg: 'rgba(80,140,220,0.18)',  text: '#80b0e8', border: 'rgba(80,140,220,0.38)' },
      green:    { bg: 'rgba(80,200,100,0.15)',  text: '#60d870', border: 'rgba(80,200,100,0.35)' },
      orange:   { bg: 'rgba(220,140,60,0.18)',  text: '#e0a050', border: 'rgba(220,140,60,0.38)' },
      yellow:   { bg: 'rgba(220,200,60,0.15)',  text: '#e0d040', border: 'rgba(220,200,60,0.35)' },
    },
  },
  colorful_vibrant: {
    bg: '#fff7ee',
    titleFont: FONT,
    titleColor: '#cc2800',
    subtitleColor: '#e06000',
    textColor: '#4a2a10',
    sectionTitleColor: '#cc2800',
    ingBg: '#ffffff',
    ingBorder: '#ffc070',
    stepNumBg: '#ff5500',
    stepNumColor: '#ffffff',
    cardBg: 'rgba(255,255,255,0.88)',
    cardBorder: '#ffc080',
    divider: '#ffd090',
    ingPalette: ['#ffe0cc', '#ccf0e0', '#ffe8c0', '#e4ccf4', '#ffd0e8', '#ccecf8', '#d8f0c0', '#f8e0cc'],
    badges: {
      pink:     { bg: '#fde0d8', text: '#c02828', border: '#f8a090' },
      mint:     { bg: '#d8f4e4', text: '#186040', border: '#88d8a4' },
      peach:    { bg: '#fdecd8', text: '#cc5000', border: '#f8c080' },
      lavender: { bg: '#ecdcf8', text: '#6010a0', border: '#c898e8' },
      blue:     { bg: '#d8e8f8', text: '#1040a8', border: '#88b0e8' },
      green:    { bg: '#d8f4dc', text: '#106030', border: '#88d898' },
      orange:   { bg: '#fde8cc', text: '#c84000', border: '#f8c078' },
      yellow:   { bg: '#fdf4c0', text: '#a07000', border: '#f0d868' },
    },
  },
  korean_minimal: {
    bg: '#f2ebe2',
    titleFont: FONT,
    titleColor: '#2c2018',
    subtitleColor: '#7a6a58',
    textColor: '#6a5848',
    sectionTitleColor: '#3a2c20',
    ingBg: 'rgba(255,250,244,0.88)',
    ingBorder: 'rgba(180,148,116,0.32)',
    stepNumBg: '#b89060',
    stepNumColor: '#ffffff',
    cardBg: 'rgba(255,250,244,0.65)',
    cardBorder: 'rgba(180,148,116,0.28)',
    divider: 'rgba(180,148,116,0.22)',
    ingPalette: ['#f0e4d4', '#d4ecd8', '#f0ecd4', '#e4d4f0', '#d4e4f0', '#d4f0d8', '#f0d4e8', '#d4ecf0'],
    badges: {
      pink:     { bg: '#f8e8e0', text: '#a84030', border: '#e8b8a8' },
      mint:     { bg: '#e4f0e8', text: '#286048', border: '#a8d8b8' },
      peach:    { bg: '#f8ece0', text: '#a86020', border: '#e8c8a0' },
      lavender: { bg: '#ece4f4', text: '#684090', border: '#c8b0e0' },
      blue:     { bg: '#e0eaf4', text: '#284888', border: '#a8c0e0' },
      green:    { bg: '#e4f0e4', text: '#285828', border: '#a8d0a8' },
      orange:   { bg: '#f8ede0', text: '#a85010', border: '#e8c4a0' },
      yellow:   { bg: '#f8f0d8', text: '#887018', border: '#e8d898' },
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getIngColor(palette: string[], i: number) {
  return palette[i % palette.length];
}

function getBadgeColors(sv: StyleVars, color: string) {
  return sv.badges[color] || sv.badges.pink;
}

// ─── Comprehensive ingredient → emoji library ─────────────────────────────────
// Order matters: more specific keywords first, generic last.
const ING_EMOJI_MAP: [string[], string][] = [
  // ── MUSHROOMS ──────────────────────────────────────────────────────────────
  [['nấm hương','nấm shiitake','shiitake'], '🍄'],
  [['nấm kim châm','enoki'], '🍄'],
  [['nấm đùi gà','king oyster','king trumpet'], '🍄'],
  [['nấm bào ngư','oyster mushroom'], '🍄'],
  [['nấm rơm','straw mushroom'], '🍄'],
  [['nấm truffle','truffle'], '🍄'],
  [['nấm mèo','wood ear','black fungus','mộc nhĩ'], '🍄'],
  [['nấm linh chi','reishi'], '🍄'],
  [['nấm'], '🍄'],

  // ── BEEF & PORK ─────────────────────────────────────────────────────────────
  [['thịt bò','bò lúc lắc','bít tết','steak','beef'], '🥩'],
  [['sườn bò','xương bò'], '🦴'],
  [['thịt heo','thịt lợn','ba chỉ','sườn heo','pork'], '🥓'],
  [['giăm bông','ham','xúc xích','sausage'], '🌭'],
  [['thịt xay','minced meat','ground meat'], '🥩'],
  [['thịt','meat'], '🥩'],

  // ── CHICKEN & POULTRY ───────────────────────────────────────────────────────
  [['đùi gà','cánh gà','ức gà'], '🍗'],
  [['thịt gà','gà','chicken','poultry'], '🍗'],
  [['vịt','duck'], '🦆'],
  [['ngỗng','goose'], '🦆'],

  // ── EGGS ────────────────────────────────────────────────────────────────────
  [['lòng đỏ trứng','egg yolk'], '🥚'],
  [['lòng trắng trứng','egg white'], '🥚'],
  [['trứng vịt lộn','balut'], '🥚'],
  [['trứng','egg'], '🥚'],

  // ── SEAFOOD ─────────────────────────────────────────────────────────────────
  [['tôm hùm','lobster'], '🦞'],
  [['tôm càng','crayfish'], '🦞'],
  [['tôm','shrimp','prawn'], '🦐'],
  [['cua','crab'], '🦀'],
  [['ghẹ'], '🦀'],
  [['mực ống','mực nang','mực','squid','calamari'], '🦑'],
  [['bạch tuộc','octopus'], '🐙'],
  [['hàu','oyster'], '🦪'],
  [['sò','ngao','vẹm','clam','mussel','scallop'], '🦪'],
  [['cá hồi','salmon'], '🐟'],
  [['cá ngừ','tuna'], '🐟'],
  [['cá tra','cá basa','cá lóc','cá chép','cá rô','cá thu'], '🐟'],
  [['cá '], '🐟'],

  // ── SOY & LEGUMES ───────────────────────────────────────────────────────────
  [['đậu hũ','đậu phụ','tofu'], '🫙'],
  [['đậu nành','soybean','soy'], '🫘'],
  [['đậu lăng','lentil'], '🫘'],
  [['đậu đỏ','red bean','kidney bean'], '🫘'],
  [['đậu xanh','mung bean'], '🫘'],
  [['đậu đen','black bean'], '🫘'],
  [['đậu trắng','white bean','cannellini'], '🫘'],
  [['đậu que','đậu đũa','green bean','string bean'], '🫛'],
  [['đậu Hà Lan','snow pea','sugar snap','pea'], '🫛'],
  [['đậu phộng','lạc','peanut'], '🥜'],
  [['đậu'], '🫘'],

  // ── LEAFY GREENS ────────────────────────────────────────────────────────────
  [['cải thảo','bắp cải trắng','napa cabbage'], '🥬'],
  [['bắp cải tím','bắp cải đỏ','red cabbage'], '🥬'],
  [['bắp cải','cabbage'], '🥬'],
  [['cải ngọt','bok choy','pak choi'], '🥬'],
  [['cải bẹ','cải bẹ xanh','mustard green'], '🥬'],
  [['rau cải','cải xanh'], '🥬'],
  [['xà lách','lettuce','arugula'], '🥬'],
  [['rau bina','spinach','chân vịt'], '🌿'],
  [['rau muống','morning glory'], '🌿'],
  [['rau mùi','ngò rí','coriander','cilantro'], '🌿'],
  [['ngò gai','mùi tàu','sawtooth herb'], '🌿'],
  [['tần ô','chrysanthemum greens'], '🌿'],
  [['húng quế','basil'], '🌿'],
  [['húng lủi','spearmint'], '🌿'],
  [['bạc hà','mint'], '🌿'],
  [['rau húng','herb'], '🌿'],
  [['lá lốt'], '🍃'],
  [['lá chanh','kaffir lime leaf'], '🍃'],
  [['lá cà ri','curry leaf'], '🍃'],
  [['lá bay','bay leaf'], '🍃'],
  [['sả','lemongrass'], '🌿'],
  [['hành lá','hành xanh','green onion','scallion'], '🌱'],
  [['hẹ','chive'], '🌱'],
  [['rau thơm','fresh herb','rau sống'], '🌿'],
  [['rau xanh','rau'], '🌿'],

  // ── ALLIUMS ─────────────────────────────────────────────────────────────────
  [['hành tây','onion'], '🧅'],
  [['hành tím','shallot'], '🧅'],
  [['hành','scallion'], '🧅'],
  [['tỏi tây','leek'], '🧄'],
  [['tỏi','garlic'], '🧄'],

  // ── ROOT VEGETABLES ─────────────────────────────────────────────────────────
  [['gừng','ginger'], '🫚'],
  [['nghệ','turmeric'], '🌿'],
  [['cà rốt','carrot'], '🥕'],
  [['củ cải trắng','daikon','radish'], '🥕'],
  [['củ cải đỏ','beet','beetroot'], '🫙'],
  [['khoai tây','potato'], '🥔'],
  [['khoai lang','sweet potato'], '🍠'],
  [['khoai môn','taro'], '🍠'],
  [['khoai mỡ','yam'], '🍠'],
  [['củ sắn','củ năng','water chestnut'], '🌰'],
  [['củ đậu','jicama'], '🌰'],
  [['măng','bamboo shoot'], '🎍'],
  [['ngó sen','lotus root'], '🌺'],
  [['khoai'], '🥔'],

  // ── CRUCIFEROUS & OTHER VEGETABLES ─────────────────────────────────────────
  [['súp lơ xanh','broccoli'], '🥦'],
  [['súp lơ trắng','súp lơ','cauliflower'], '🥦'],
  [['cải Brussels','brussels sprout'], '🥦'],
  [['cần tây','celery'], '🌿'],
  [['atisô','artichoke'], '🌺'],

  // ── PEPPERS & TOMATOES ──────────────────────────────────────────────────────
  [['ớt chuông','bell pepper','capsicum','paprika'], '🫑'],
  [['ớt xanh','green chili'], '🌶️'],
  [['ớt','chili','chile'], '🌶️'],
  [['tiêu đen','tiêu trắng','black pepper','white pepper'], '🫙'],
  [['cà chua bi','cherry tomato'], '🍅'],
  [['cà chua','tomato'], '🍅'],
  [['cà tím','eggplant','aubergine'], '🍆'],

  // ── CUCURBITS ───────────────────────────────────────────────────────────────
  [['bí đỏ','bí ngô','pumpkin','butternut squash'], '🎃'],
  [['bí xanh','bí','zucchini','courgette'], '🥒'],
  [['dưa leo','dưa chuột','cucumber'], '🥒'],

  // ── CORN ────────────────────────────────────────────────────────────────────
  [['bắp non','baby corn'], '🌽'],
  [['bắp ngô','bắp','ngô','corn'], '🌽'],

  // ── FRUITS ──────────────────────────────────────────────────────────────────
  [['bơ','avocado'], '🥑'],
  [['dừa','coconut'], '🥥'],
  [['xoài','mango'], '🥭'],
  [['dứa','thơm','khóm','pineapple'], '🍍'],
  [['dưa hấu','watermelon'], '🍉'],
  [['dưa lưới','cantaloupe','melon'], '🍈'],
  [['chuối','banana'], '🍌'],
  [['nho','grape','raisin'], '🍇'],
  [['dâu tây','strawberry'], '🍓'],
  [['việt quất','blueberry'], '🫐'],
  [['cherry','anh đào'], '🍒'],
  [['đào','peach'], '🍑'],
  [['mận','plum','prune'], '🫐'],
  [['lê','pear'], '🍐'],
  [['táo xanh','táo đỏ','táo','apple'], '🍎'],
  [['cam','orange'], '🍊'],
  [['quýt','mandarin','tangerine'], '🍊'],
  [['bưởi','grapefruit','pomelo'], '🍊'],
  [['chanh dây','passion fruit'], '🟡'],
  [['chanh vàng','lemon'], '🍋'],
  [['chanh xanh','lime'], '🍋'],
  [['chanh','citrus'], '🍋'],
  [['kiwi'], '🥝'],
  [['ổi','guava'], '🍐'],
  [['vải','lychee'], '🍒'],
  [['nhãn','longan'], '🍒'],
  [['chôm chôm','rambutan'], '🍒'],
  [['thanh long','dragon fruit','pitaya'], '🍓'],
  [['mít','jackfruit'], '🍈'],
  [['đu đủ','papaya'], '🍈'],
  [['sapoche','sapodilla'], '🍂'],
  [['sầu riêng','durian'], '🌵'],

  // ── GRAINS & NOODLES ────────────────────────────────────────────────────────
  [['gạo nếp','sticky rice','glutinous rice'], '🍙'],
  [['gạo','rice'], '🌾'],
  [['cơm','cooked rice'], '🍚'],
  [['bún bò','bún riêu','bún bò huế'], '🍜'],
  [['bún','rice noodle','vermicelli'], '🍜'],
  [['phở','pho'], '🍜'],
  [['hủ tiếu','hủ tíu'], '🍜'],
  [['miến','glass noodle','cellophane noodle'], '🍜'],
  [['mì xào','mì ăn liền','instant noodle','ramen'], '🍜'],
  [['mì udon','udon'], '🍜'],
  [['pasta','spaghetti','fettuccine','penne'], '🍝'],
  [['mì','noodle'], '🍜'],
  [['bánh phở','bánh cuốn'], '🍜'],
  [['bánh mì','bread','sourdough','baguette'], '🍞'],
  [['bánh quy','cracker','biscuit'], '🍘'],
  [['ngũ cốc','oatmeal','oat','yến mạch'], '🌾'],
  [['yến mạch','granola'], '🌾'],
  [['quinoa','hạt diêm mạch'], '🌾'],
  [['bột mì','flour'], '🌾'],
  [['bột năng','bột bắp','tinh bột corn starch','starch'], '🌾'],
  [['bột'], '🌾'],

  // ── DAIRY ───────────────────────────────────────────────────────────────────
  [['phô mai','cheese','parmesan','mozzarella'], '🧀'],
  [['sữa chua','yogurt','yoghurt'], '🥛'],
  [['whipping cream','heavy cream','kem tươi'], '🍦'],
  [['bơ lạt','bơ nhạt','butter'], '🧈'],
  [['bơ thực vật','margarine'], '🧈'],
  [['sữa bò','sữa tươi','whole milk'], '🥛'],
  [['sữa đặc','condensed milk'], '🥛'],
  [['sữa dừa','coconut milk','nước cốt dừa'], '🥥'],
  [['sữa hạnh nhân','almond milk'], '🥛'],
  [['sữa yến mạch','oat milk'], '🥛'],
  [['sữa','milk'], '🥛'],

  // ── NUTS & SEEDS ────────────────────────────────────────────────────────────
  [['đậu phộng rang','lạc rang','roasted peanut'], '🥜'],
  [['đậu phộng','lạc','peanut'], '🥜'],
  [['hạt điều','cashew'], '🌰'],
  [['hạnh nhân','almond'], '🌰'],
  [['óc chó','walnut'], '🌰'],
  [['hạt dẻ','chestnut','hazelnut'], '🌰'],
  [['hạt macadamia','macadamia'], '🌰'],
  [['hạt pistachio','pistachio'], '🌰'],
  [['hạt thông','pine nut'], '🌰'],
  [['mè đen','mè trắng','vừng','sesame'], '🌰'],
  [['hạt hướng dương','sunflower seed'], '🌻'],
  [['hạt bí','pumpkin seed'], '🌰'],
  [['hạt chia','chia seed'], '🌱'],
  [['hạt lanh','flaxseed','linseed'], '🌱'],
  [['hạt hemp','hemp seed'], '🌱'],

  // ── OILS & FATS ─────────────────────────────────────────────────────────────
  [['dầu oliu','olive oil'], '🫙'],
  [['dầu dừa','coconut oil'], '🥥'],
  [['dầu mè','sesame oil'], '🫙'],
  [['dầu cá','fish oil'], '🐟'],
  [['dầu hào','oyster sauce'], '🦪'],
  [['dầu ăn','cooking oil','vegetable oil'], '🫙'],
  [['dầu','oil'], '🫙'],

  // ── CONDIMENTS & SAUCES ─────────────────────────────────────────────────────
  [['nước mắm','fish sauce'], '🫙'],
  [['xì dầu','nước tương','soy sauce','tamari'], '🫙'],
  [['tương hoisin','hoisin sauce'], '🫙'],
  [['tương đen','oyster sauce'], '🫙'],
  [['tương cà','ketchup','tomato paste'], '🍅'],
  [['tương ớt','sriracha','hot sauce','chili sauce'], '🌶️'],
  [['miso','miso paste'], '🫙'],
  [['dấm gạo','dấm táo','rice vinegar','apple cider vinegar','vinegar','dấm'], '🫙'],
  [['mật ong','honey'], '🍯'],
  [['đường nâu','đường thốt nốt','brown sugar','palm sugar'], '🍯'],
  [['đường','sugar'], '🍯'],
  [['muối biển','muối hồng','salt'], '🧂'],
  [['gia vị','seasoning','spice mix','five spice'], '🧂'],

  // ── SPICES (DRY) ────────────────────────────────────────────────────────────
  [['quế','cinnamon'], '🌿'],
  [['hồi','star anise'], '🌿'],
  [['đinh hương','clove'], '🌿'],
  [['thảo quả','cardamom'], '🌿'],
  [['tiêu sọ','peppercorn'], '🌿'],
  [['ớt bột','paprika powder','cayenne'], '🌶️'],
  [['bột cà ri','curry powder'], '🌿'],
  [['cumin','thì là'], '🌿'],
  [['nghệ bột','turmeric powder','nghệ'], '🌿'],
  [['bột ớt','chili powder'], '🌶️'],

  // ── LIQUIDS & BROTHS ────────────────────────────────────────────────────────
  [['nước dùng gà','chicken broth','chicken stock'], '🫕'],
  [['nước dùng bò','beef broth','beef stock'], '🫕'],
  [['nước dùng','broth','stock','soup base'], '🫕'],
  [['rượu vang','wine'], '🍷'],
  [['rượu sake','sake','mirin'], '🍶'],
  [['bia','beer'], '🍺'],
  [['nước dừa','coconut water'], '🥥'],
  [['nước cam','orange juice'], '🍊'],
  [['nước chanh','lemon juice','lime juice'], '🍋'],
  [['nước ép','juice'], '🥤'],
  [['nước','water'], '💧'],

  // ── TEA & COFFEE ────────────────────────────────────────────────────────────
  [['trà xanh','green tea','matcha'], '🍵'],
  [['trà đen','black tea'], '🍵'],
  [['trà thảo mộc','herbal tea'], '🍵'],
  [['cà phê','coffee','espresso'], '☕'],
  [['trà'], '🍵'],

  // ── CHOCOLATE & SWEETS ──────────────────────────────────────────────────────
  [['chocolate đen','dark chocolate'], '🍫'],
  [['chocolate trắng','white chocolate'], '🍫'],
  [['chocolate','cacao','cocoa'], '🍫'],
  [['vani','vanilla'], '🌿'],
  [['caramel'], '🍯'],
  [['syrup','maple syrup'], '🍯'],

  // ── BAKING ──────────────────────────────────────────────────────────────────
  [['men nở','yeast'], '🫧'],
  [['bột nở','baking powder','baking soda'], '🌾'],
  [['gelatin','agar','thạch'], '🫙'],
  [['pectin'], '🫙'],

  // ── SKINCARE — VITAMINS ─────────────────────────────────────────────────────
  [['vitamin c','ascorbic acid','ascorbyl glucoside','sodium ascorbyl'], '🍊'],
  [['vitamin e','tocopherol','tocopheryl'], '🌿'],
  [['vitamin a','retinol','retinal','tretinoin','retinoid'], '✨'],
  [['vitamin b3','niacinamide','nicotinamide'], '🧬'],
  [['vitamin b5','panthenol','pantothenic'], '🧬'],
  [['vitamin b12','biotin','vitamin b'], '💊'],
  [['vitamin d','cholecalciferol'], '☀️'],
  [['vitamin k','phylloquinone'], '🌿'],
  [['vitamin'], '💊'],

  // ── SKINCARE — ACIDS ────────────────────────────────────────────────────────
  [['aha','alpha hydroxy','glycolic acid','lactic acid','mandelic acid'], '⚗️'],
  [['bha','beta hydroxy','salicylic acid'], '⚗️'],
  [['pha','polyhydroxy','gluconolactone'], '⚗️'],
  [['azelaic acid','axit azelaic'], '⚗️'],
  [['kojic acid','axit kojic'], '⚗️'],
  [['ferulic acid'], '⚗️'],
  [['tranexamic acid'], '⚗️'],
  [['malic acid','citric acid'], '⚗️'],

  // ── SKINCARE — HYDRATORS ────────────────────────────────────────────────────
  [['hyaluronic acid','sodium hyaluronate','axit hyaluronic'], '💧'],
  [['glycerin','glycerol'], '💧'],
  [['propanediol','butylene glycol'], '💧'],
  [['aloe vera','lô hội','nha đam'], '🌵'],
  [['panthenol'], '💧'],
  [['sorbitol','xylitol'], '💧'],

  // ── SKINCARE — PROTEINS & PEPTIDES ─────────────────────────────────────────
  [['collagen','elastin'], '✨'],
  [['peptide','matrixyl','argireline','leuphasyl'], '🧬'],
  [['protein'], '🧬'],
  [['amino acid','glutamine','glycine'], '🧬'],

  // ── SKINCARE — BARRIER & LIPIDS ────────────────────────────────────────────
  [['ceramide','phytosphingosine'], '🧴'],
  [['squalane','squalene'], '🌿'],
  [['jojoba oil','jojoba'], '🌿'],
  [['argan oil','argan'], '🌿'],
  [['rosehip oil','rosehip'], '🌹'],
  [['marula oil'], '🌿'],
  [['bakuchiol'], '🌿'],
  [['shea butter','shea'], '🧈'],
  [['cocoa butter'], '🍫'],

  // ── SKINCARE — BOTANICALS ───────────────────────────────────────────────────
  [['chiết xuất hoa hồng','rose extract'], '🌹'],
  [['hoa hồng','rose water','rosehip'], '🌹'],
  [['trà xanh','green tea extract','egcg'], '🍵'],
  [['tràm trà','tea tree'], '🌿'],
  [['hoa cúc','chamomile'], '🌼'],
  [['lavender','oải hương'], '💜'],
  [['hoa oải hương'], '💜'],
  [['chiết xuất lựu','pomegranate'], '🍎'],
  [['chiết xuất việt quất','blueberry extract'], '🫐'],
  [['chiết xuất cam','citrus extract'], '🍊'],
  [['chiết xuất','extract','plant extract'], '🌸'],

  // ── SKINCARE — ACTIVES & MISC ──────────────────────────────────────────────
  [['spf','sunscreen','zinc oxide','titanium dioxide'], '☀️'],
  [['centella','rau má','cica'], '🌿'],
  [['snail mucin','chiết xuất ốc'], '🐌'],
  [['propolis'], '🍯'],
  [['neem','chiết xuất neem'], '🌿'],
  [['resveratrol'], '🍇'],
  [['adenosine'], '✨'],
  [['allantoin'], '🌿'],
  [['madecassoside'], '🌿'],
  [['serum','essence serum'], '🧴'],
  [['toner','lotion dưỡng'], '🧴'],
  [['kem dưỡng','moisturizer','cream'], '🧴'],

  // ── SUPPLEMENTS ─────────────────────────────────────────────────────────────
  [['omega 3','omega-3','dha','epa','fish oil supplement'], '🐟'],
  [['collagen supplement','collagen peptide'], '✨'],
  [['probiotics','probiotic','prebiotic','lactobacillus','bifidobacterium'], '🦠'],
  [['kẽm','zinc'], '💊'],
  [['sắt','iron supplement'], '💊'],
  [['canxi','calcium'], '💊'],
  [['magie','magnesium'], '💊'],
  [['kali','potassium'], '💊'],
  [['biotin'], '💊'],
  [['whey protein','casein protein'], '💪'],
  [['protein shake','protein powder'], '💪'],
  [['enzyme','digestive enzyme'], '⚗️'],
  [['melatonin'], '😴'],
  [['thực phẩm chức năng','supplement','viên uống'], '💊'],
  [['thuốc'], '💊'],
];

function getIngredientEmoji(name: string): string {
  const n = (name || '').toLowerCase();
  for (const [keywords, emoji] of ING_EMOJI_MAP) {
    if (keywords.some(k => n.includes(k.toLowerCase()))) return emoji;
  }
  return '🌿';
}

// Real food photos from Unsplash (pre-curated for common Vietnamese ingredients)
const UNSPLASH_PHOTOS: Record<string, string> = {
  '🍄': 'https://images.unsplash.com/photo-1607269310177-e40f24a9c72c?w=120&h=120&fit=crop&auto=format',
  '🥩': 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=120&h=120&fit=crop&auto=format',
  '🥓': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=120&h=120&fit=crop&auto=format',
  '🍗': 'https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=120&h=120&fit=crop&auto=format',
  '🥚': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=120&h=120&fit=crop&auto=format',
  '🦐': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=120&h=120&fit=crop&auto=format',
  '🦀': 'https://images.unsplash.com/photo-1550735490-7e9b0cfd8e39?w=120&h=120&fit=crop&auto=format',
  '🦑': 'https://images.unsplash.com/photo-1608935405171-3a58de6acf72?w=120&h=120&fit=crop&auto=format',
  '🐟': 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=120&h=120&fit=crop&auto=format',
  '🫘': 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=120&h=120&fit=crop&auto=format',
  '🫙': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=120&h=120&fit=crop&auto=format',
  '🥬': 'https://images.unsplash.com/photo-1594282418426-a7fb5ce0bbc8?w=120&h=120&fit=crop&auto=format',
  '🌿': 'https://images.unsplash.com/photo-1564844536311-de546a28c87d?w=120&h=120&fit=crop&auto=format',
  '🍃': 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=120&h=120&fit=crop&auto=format',
  '🌱': 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=120&h=120&fit=crop&auto=format',
  '🧅': 'https://images.unsplash.com/photo-1508747703725-719777637510?w=120&h=120&fit=crop&auto=format',
  '🧄': 'https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?w=120&h=120&fit=crop&auto=format',
  '🫚': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=120&h=120&fit=crop&auto=format',
  '🌶️': 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=120&h=120&fit=crop&auto=format',
  '🥕': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=120&h=120&fit=crop&auto=format',
  '🍅': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=120&h=120&fit=crop&auto=format',
  '🍆': 'https://images.unsplash.com/photo-1531150756636-5a45e5432e1e?w=120&h=120&fit=crop&auto=format',
  '🫑': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=120&h=120&fit=crop&auto=format',
  '🥦': 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=120&h=120&fit=crop&auto=format',
  '🥒': 'https://images.unsplash.com/photo-1568584711271-6b1e68cda12e?w=120&h=120&fit=crop&auto=format',
  '🌽': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=120&h=120&fit=crop&auto=format',
  '🥔': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&h=120&fit=crop&auto=format',
  '🍠': 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=120&h=120&fit=crop&auto=format',
  '🥑': 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=120&h=120&fit=crop&auto=format',
  '🥥': 'https://images.unsplash.com/photo-1621248618620-e1f72c5d1e33?w=120&h=120&fit=crop&auto=format',
  '🥭': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=120&h=120&fit=crop&auto=format',
  '🍍': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=120&h=120&fit=crop&auto=format',
  '🍊': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=120&h=120&fit=crop&auto=format',
  '🍋': 'https://images.unsplash.com/photo-1582294237-729b8b1e4a80?w=120&h=120&fit=crop&auto=format',
  '🍎': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=120&h=120&fit=crop&auto=format',
  '🍇': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=120&h=120&fit=crop&auto=format',
  '🍓': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=120&h=120&fit=crop&auto=format',
  '🍌': 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=120&h=120&fit=crop&auto=format',
  '🥜': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=120&h=120&fit=crop&auto=format',
  '🌰': 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=120&h=120&fit=crop&auto=format',
  '🥛': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&h=120&fit=crop&auto=format',
  '🧀': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=120&h=120&fit=crop&auto=format',
  '🧈': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=120&h=120&fit=crop&auto=format',
  '🍚': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=120&h=120&fit=crop&auto=format',
  '🍜': 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=120&h=120&fit=crop&auto=format',
  '🍵': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=120&h=120&fit=crop&auto=format',
  '☕': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&h=120&fit=crop&auto=format',
  '🍫': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=120&h=120&fit=crop&auto=format',
  '🍯': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=120&h=120&fit=crop&auto=format',
  '🧂': 'https://images.unsplash.com/photo-1626196340162-3a45b76e3e9a?w=120&h=120&fit=crop&auto=format',
  '💧': 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=120&h=120&fit=crop&auto=format',
  '🫕': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=120&h=120&fit=crop&auto=format',
  '🌾': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&h=120&fit=crop&auto=format',
  '🧴': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&h=120&fit=crop&auto=format',
  '💊': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&h=120&fit=crop&auto=format',
  '🌵': 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=120&h=120&fit=crop&auto=format',
  '🌹': 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=120&h=120&fit=crop&auto=format',
  '🌼': 'https://images.unsplash.com/photo-1490750967868-88df5691cc8a?w=120&h=120&fit=crop&auto=format',
  '✨': 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=120&h=120&fit=crop&auto=format',
  '🧬': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=120&h=120&fit=crop&auto=format',
  '⚗️': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=120&h=120&fit=crop&auto=format',
  '☀️': 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=120&h=120&fit=crop&auto=format',
  '🌸': 'https://images.unsplash.com/photo-1490750967868-88df5691cc8a?w=120&h=120&fit=crop&auto=format',
  '💜': 'https://images.unsplash.com/photo-1499578124509-1611b77778b8?w=120&h=120&fit=crop&auto=format',
  '💪': 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=120&h=120&fit=crop&auto=format',
  '🦠': 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=120&h=120&fit=crop&auto=format',
};

function getIngredientImageUrl(name: string): { url: string; emoji: string } {
  const emoji = getIngredientEmoji(name);
  const url = UNSPLASH_PHOTOS[emoji] || UNSPLASH_PHOTOS['🌿'];
  return { url, emoji };
}

// ─── Sub-renderers ────────────────────────────────────────────────────────────

function Badges({ config, sv }: { config: InfographicConfig; sv: StyleVars }) {
  const filled = config.badges.filter(b => b.label || b.value);
  if (filled.length === 0) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 36, flexWrap: 'wrap' }}>
      {filled.map((badge, i) => {
        const bc = getBadgeColors(sv, badge.color);
        return (
          <div key={i} style={{
            background: bc.bg,
            border: `2px solid ${bc.border}`,
            borderRadius: 100,
            padding: '12px 22px',
            textAlign: 'center',
            minWidth: 100,
          }}>
            <div style={{ fontSize: 10, color: bc.text, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>
              {badge.label}
            </div>
            <div style={{ fontSize: 18, color: bc.text, fontWeight: 900, lineHeight: 1 }}>
              {badge.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Ingredients({ config, sv, ingredientImages }: {
  config: InfographicConfig;
  sv: StyleVars;
  ingredientImages?: (string | null)[];
}) {
  const filled = config.ingredients.filter(i => i.name);
  return (
    <div>
      <div style={{
        fontSize: 18, fontWeight: 800, color: sv.sectionTitleColor,
        marginBottom: 18, fontFamily: sv.titleFont, letterSpacing: '-0.3px',
        paddingBottom: 10, borderBottom: `2px solid ${sv.divider}`,
      }}>
        {config.leftSectionTitle || 'Nguyên Liệu'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {config.ingredients.map((ing, origIdx) => {
          if (!ing.name) return null;
          const { url: unsplashUrl, emoji } = getIngredientImageUrl(ing.name);
          const aiUrl = ingredientImages?.[origIdx] ?? null;
          const imgSrc = aiUrl || unsplashUrl;
          return (
          <div key={origIdx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Photo bubble: AI-generated first, Unsplash fallback, emoji last */}
            <div style={{
              width: 58, height: 58, borderRadius: '50%', flexShrink: 0,
              background: getIngColor(sv.ingPalette, origIdx),
              border: `2.5px solid ${sv.ingBorder}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, lineHeight: 1,
            }}>
              <img
                src={imgSrc}
                alt={ing.name}
                crossOrigin="anonymous"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  // If AI image failed, fall back to Unsplash
                  if (aiUrl && target.src !== unsplashUrl) {
                    target.src = unsplashUrl;
                    return;
                  }
                  // If Unsplash also failed, show emoji
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.textContent = emoji;
                  }
                }}
              />
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {ing.amount && (
                <div style={{ fontSize: 11, fontWeight: 700, color: sv.subtitleColor, lineHeight: 1, marginBottom: 2 }}>
                  {ing.amount}
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 700, color: sv.textColor, lineHeight: 1.3 }}>
                {ing.name}
              </div>
              {ing.note && (
                <div style={{ fontSize: 11, color: sv.subtitleColor, marginTop: 1, lineHeight: 1.3 }}>
                  ({ing.note})
                </div>
              )}
            </div>
          </div>
        ); })}
        {!config.ingredients.some(i => i.name) && (
          <p style={{ color: sv.subtitleColor, fontSize: 12, fontStyle: 'italic' }}>Chưa có thành phần</p>
        )}
      </div>
    </div>
  );
}

function Steps({ config, sv }: { config: InfographicConfig; sv: StyleVars }) {
  const filled = config.steps.filter(s => s.title);
  return (
    <div>
      <div style={{
        fontSize: 18, fontWeight: 800, color: sv.sectionTitleColor,
        marginBottom: 18, fontFamily: sv.titleFont, letterSpacing: '-0.3px',
        paddingBottom: 10, borderBottom: `2px solid ${sv.divider}`,
      }}>
        {config.rightSectionTitle || 'Quy Trình'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filled.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: sv.stepNumBg, color: sv.stepNumColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 14,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>
              {i + 1}
            </div>
            <div style={{ flex: 1, paddingTop: 3 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: sv.textColor, lineHeight: 1.3 }}>
                {step.title}
              </div>
              {step.description && (
                <div style={{ fontSize: 11, color: sv.subtitleColor, marginTop: 4, lineHeight: 1.55 }}>
                  {step.description}
                </div>
              )}
            </div>
          </div>
        ))}
        {filled.length === 0 && (
          <p style={{ color: sv.subtitleColor, fontSize: 12, fontStyle: 'italic' }}>Chưa có bước thực hiện</p>
        )}
      </div>
      {config.additionalNotes && (
        <div style={{
          marginTop: 18, padding: '10px 14px',
          background: sv.cardBg, border: `1px solid ${sv.cardBorder}`,
          borderRadius: 10, color: sv.subtitleColor, fontSize: 11, lineHeight: 1.5,
        }}>
          <span style={{ fontWeight: 700, color: sv.textColor }}>Ghi chú: </span>
          {config.additionalNotes}
        </div>
      )}
    </div>
  );
}

function HeroImage({ heroImageUrl, sv, label }: { heroImageUrl: string | null; sv: StyleVars; label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: '100%', borderRadius: 20, overflow: 'hidden',
        background: sv.cardBg, border: `2px solid ${sv.cardBorder}`,
        boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
      }}>
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt="Hero"
            crossOrigin="anonymous"
            style={{ width: '100%', height: 360, objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: 360,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 72, color: sv.subtitleColor,
          }}>🍲</div>
        )}
      </div>
      {label && (
        <div style={{ fontSize: 13, color: sv.subtitleColor, fontStyle: 'italic', textAlign: 'center' }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ─── Layout variants ──────────────────────────────────────────────────────────

interface LayoutProps {
  config: InfographicConfig;
  sv: StyleVars;
  heroImageUrl: string | null;
  ingredientImages?: (string | null)[];
}

function ClassicLayout({ config, sv, heroImageUrl, ingredientImages }: LayoutProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 240px', gap: 36, alignItems: 'start' }}>
      <Ingredients config={config} sv={sv} ingredientImages={ingredientImages} />
      <HeroImage heroImageUrl={heroImageUrl} sv={sv} />
      <Steps config={config} sv={sv} />
    </div>
  );
}

function HeroCenterLayout({ config, sv, heroImageUrl, ingredientImages }: LayoutProps) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}><HeroImage heroImageUrl={heroImageUrl} sv={sv} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <Ingredients config={config} sv={sv} ingredientImages={ingredientImages} />
        <Steps config={config} sv={sv} />
      </div>
    </div>
  );
}

function LeftHeroLayout({ config, sv, heroImageUrl, ingredientImages }: LayoutProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, alignItems: 'start' }}>
      <HeroImage heroImageUrl={heroImageUrl} sv={sv} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Ingredients config={config} sv={sv} ingredientImages={ingredientImages} />
        <Steps config={config} sv={sv} />
      </div>
    </div>
  );
}

function TopHeroLayout({ config, sv, heroImageUrl, ingredientImages }: LayoutProps) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}><HeroImage heroImageUrl={heroImageUrl} sv={sv} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <Ingredients config={config} sv={sv} ingredientImages={ingredientImages} />
        <Steps config={config} sv={sv} />
      </div>
    </div>
  );
}

function GridLayout({ config, sv, heroImageUrl, ingredientImages }: LayoutProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 36, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <HeroImage heroImageUrl={heroImageUrl} sv={sv} />
        <Steps config={config} sv={sv} />
      </div>
      <Ingredients config={config} sv={sv} ingredientImages={ingredientImages} />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface Props {
  config: InfographicConfig;
  heroImageUrl: string | null;
  ingredientImages?: (string | null)[];
}

export const InfographicRenderer = forwardRef<HTMLDivElement, Props>(
  ({ config, heroImageUrl, ingredientImages }, ref) => {
    const sv = STYLES[config.style] || STYLES.soft_pastel;

    const renderLayout = () => {
      const props = { config, sv, heroImageUrl, ingredientImages };
      switch (config.layout) {
        case 'hero_center':   return <HeroCenterLayout {...props} />;
        case 'left_hero':     return <LeftHeroLayout {...props} />;
        case 'top_hero':      return <TopHeroLayout {...props} />;
        case 'grid_showcase': return <GridLayout {...props} />;
        default:              return <ClassicLayout {...props} />;
      }
    };

    return (
      <div
        ref={ref}
        style={{
          width: 1200,
          background: sv.bg,
          borderRadius: 28,
          padding: '52px 60px',
          fontFamily: sv.titleFont,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Title */}
        <div style={{
          textAlign: 'center',
          fontSize: 62,
          fontWeight: 900,
          color: sv.titleColor,
          marginBottom: config.subtitle ? 6 : 28,
          lineHeight: 1.15,
          letterSpacing: '-1.5px',
          fontFamily: sv.titleFont,
        }}>
          {config.title || 'Tiêu đề'}
        </div>

        {/* Subtitle */}
        {config.subtitle && (
          <div style={{
            textAlign: 'center',
            fontSize: 18,
            color: sv.subtitleColor,
            marginBottom: 22,
            fontWeight: 500,
            letterSpacing: '0.2px',
          }}>
            {config.subtitle}
          </div>
        )}

        {/* Badges */}
        <Badges config={config} sv={sv} />

        {/* Layout */}
        {renderLayout()}
      </div>
    );
  }
);

InfographicRenderer.displayName = 'InfographicRenderer';
