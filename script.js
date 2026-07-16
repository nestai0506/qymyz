/* ============================================================
   ҚЫМЫЗ ӘЛЕМІ — лендинг логикасы (vanilla JS)
   ============================================================ */

// ⚙️ ӨЗ WhatsApp НӨМІРІҢІЗДІ ОСЫ ЖЕРГЕ ҚОЙЫҢЫЗ (+ жоқ, 7-ден басталады)
const WHATSAPP_PHONE = "77000707729";

/* ============================================================
   РЕАЛИСТІК БӨТЕЛКЕЛЕР
   Цилиндрлік көлеңкелеу + шыны шағылысуы + көлеңке арқылы
   фотоға жақын көрініс жасалады. Әр бөтелкенің id-і бөлек
   (бір беттегі градиенттер шатаспауы үшін).
   ============================================================ */
const SHAPES = {
  std: {
    body:   "M56 40 L56 60 C56 68 30 80 30 104 L30 262 C30 272 38 278 70 278 C102 278 110 272 110 262 L110 104 C110 80 84 68 84 60 L84 40 Z",
    liquid: "M33 114 L33 261 C33 270 40 275 70 275 C100 275 107 270 107 261 L107 114 Z",
    topY: 114, topRx: 37,
    cap: [54, 10, 32, 26], ring: [52, 34, 36, 7],
    label: [28, 150, 84, 80],
    spec1: [40, 106, 7, 140], spec2: [99, 116, 4, 120],
    shadow: [70, 286, 46, 7],
  },
  small: {
    body:   "M59 66 L59 84 C59 92 38 100 38 122 L38 254 C38 264 45 270 70 270 C95 270 102 264 102 254 L102 122 C102 100 81 92 81 84 L81 66 Z",
    liquid: "M41 132 L41 253 C41 262 47 267 70 267 C93 267 99 262 99 253 L99 132 Z",
    topY: 132, topRx: 29,
    cap: [57, 40, 26, 22], ring: [55, 60, 30, 6],
    label: [36, 160, 68, 64],
    spec1: [47, 126, 6, 118], spec2: [92, 136, 3.5, 100],
    shadow: [70, 278, 38, 6],
  },
  jug: {
    body:   "M54 38 L54 58 C54 66 22 80 22 108 L22 264 C22 276 34 282 70 282 C106 282 118 276 118 264 L118 108 C118 80 86 66 86 58 L86 38 Z",
    liquid: "M25 118 L25 263 C25 274 36 279 70 279 C104 279 115 274 115 263 L115 118 Z",
    topY: 118, topRx: 45,
    cap: [52, 8, 36, 26], ring: [50, 32, 40, 7],
    label: [20, 150, 100, 86],
    spec1: [34, 112, 8, 145], spec2: [107, 124, 4, 124],
    shadow: [70, 290, 54, 8],
  },
};

function realBottle(uid, cfg) {
  const s = SHAPES[cfg.shape || "std"];
  const cap = cfg.cap || ["#e6ba63", "#b8862b", "#7a4f1c"];      // жарық, орта, қою
  const milk = cfg.milk || ["#cdbfa2", "#ffffff", "#efe7d6"];    // жиек, орта, оң жиек
  const lb = cfg.label || { bg: "#fdf7ea", edge: "#ddcdad", text: "#6b4526", accent: "#b07c26" };
  const [cx, cy, cw, ch] = s.cap, [rx0, ry0, rw, rh] = s.ring;
  const [lx, ly, lw, lh] = s.label;
  const [s1x, s1y, s1w, s1h] = s.spec1, [s2x, s2y, s2w, s2h] = s.spec2;
  const [shx, shy, shrx, shry] = s.shadow;

  const handle = cfg.handle ? `
    <path d="M116 126 C144 134 144 184 116 192" fill="none" stroke="#e9e1cd" stroke-width="12" stroke-linecap="round" opacity=".9"/>
    <path d="M116 126 C144 134 144 184 116 192" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity=".45"/>` : "";

  // қақпақтағы тік қырлар
  let ridges = "";
  for (let i = 1; i < 8; i++) {
    const x = cx + (cw / 8) * i;
    ridges += `<line x1="${x}" y1="${cy + 3}" x2="${x}" y2="${cy + ch - 3}" stroke="#000" stroke-opacity=".18" stroke-width="1"/>`;
  }

  return `<svg viewBox="0 0 140 300">
  <defs>
    <linearGradient id="mk${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${milk[0]}"/><stop offset=".17" stop-color="${milk[1]}"/>
      <stop offset=".45" stop-color="${milk[1]}"/><stop offset=".82" stop-color="${milk[2]}"/>
      <stop offset="1" stop-color="${milk[0]}"/>
    </linearGradient>
    <linearGradient id="gl${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4a3a22" stop-opacity=".42"/>
      <stop offset=".10" stop-color="#ffffff" stop-opacity=".45"/>
      <stop offset=".30" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset=".68" stop-color="#4a3a22" stop-opacity=".10"/>
      <stop offset=".88" stop-color="#ffffff" stop-opacity=".26"/>
      <stop offset="1" stop-color="#3f3018" stop-opacity=".40"/>
    </linearGradient>
    <linearGradient id="cp${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${cap[2]}"/><stop offset=".24" stop-color="${cap[0]}"/>
      <stop offset=".55" stop-color="${cap[1]}"/><stop offset="1" stop-color="${cap[2]}"/>
    </linearGradient>
    <linearGradient id="lb${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${lb.edge}"/><stop offset=".18" stop-color="${lb.bg}"/>
      <stop offset=".62" stop-color="${lb.bg}"/><stop offset="1" stop-color="${lb.edge}"/>
    </linearGradient>
    <filter id="sh${uid}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4.5"/></filter>
    <filter id="sp${uid}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.6"/></filter>
    <clipPath id="cl${uid}"><path d="${s.body}"/></clipPath>
  </defs>

  <ellipse cx="${shx}" cy="${shy}" rx="${shrx}" ry="${shry}" fill="#2e1f0e" opacity=".4" filter="url(#sh${uid})"/>
  ${handle}
  <path d="${s.body}" fill="#f2ede1" opacity=".55"/>
  <path d="${s.liquid}" fill="url(#mk${uid})"/>
  <ellipse cx="70" cy="${s.topY}" rx="${s.topRx}" ry="5.5" fill="#e7dcc4"/>
  <ellipse cx="70" cy="${s.topY - 1}" rx="${s.topRx - 4}" ry="3.6" fill="#ffffff" opacity=".75"/>
  <path d="${s.body}" fill="url(#gl${uid})"/>
  <g clip-path="url(#cl${uid})">
    <rect x="${s1x}" y="${s1y}" width="${s1w}" height="${s1h}" rx="${s1w / 2}" fill="#ffffff" opacity=".62" filter="url(#sp${uid})"/>
    <rect x="${s2x}" y="${s2y}" width="${s2w}" height="${s2h}" rx="${s2w / 2}" fill="#ffffff" opacity=".34" filter="url(#sp${uid})"/>
  </g>
  <path d="${s.body}" fill="none" stroke="#8a6a3e" stroke-opacity=".4" stroke-width="1.2"/>

  <rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="2.5" fill="url(#cp${uid})"/>
  ${ridges}
  <rect x="${rx0}" y="${ry0}" width="${rw}" height="${rh}" rx="2" fill="url(#cp${uid})"/>
  <rect x="${cx}" y="${cy}" width="${cw}" height="4" rx="2" fill="#ffffff" opacity=".28"/>

  <rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="4" fill="url(#lb${uid})" stroke="${lb.accent}" stroke-opacity=".45" stroke-width="1"/>
  <text x="70" y="${ly + 26}" text-anchor="middle" font-family="'Playfair Display',Georgia,serif" font-weight="700" font-size="15" fill="${lb.text}">Бал</text>
  <text x="70" y="${ly + 43}" text-anchor="middle" font-family="'Playfair Display',Georgia,serif" font-weight="700" font-style="italic" font-size="15" fill="${lb.accent}">қымыз</text>
  <path d="M70 ${ly + 60} L70 ${ly + 53} C66 ${ly + 53} 64 ${ly + 51} 64 ${ly + 48.5} C64 ${ly + 47} 65.6 ${ly + 46.6} 66.4 ${ly + 47.8} M70 ${ly + 53} C74 ${ly + 53} 76 ${ly + 51} 76 ${ly + 48.5} C76 ${ly + 47} 74.4 ${ly + 46.6} 73.6 ${ly + 47.8}" fill="none" stroke="${lb.accent}" stroke-width="1.1" stroke-linecap="round" opacity=".85"/>
  <text x="70" y="${ly + lh - 9}" text-anchor="middle" font-family="'Manrope',sans-serif" font-weight="700" font-size="9" fill="${lb.text}" opacity=".75">${cfg.vol}</text>
</svg>`;
}

const VESSELS = {
  // Классикалық — стандарт 1л, алтын қақпақ
  kese: realBottle('a', { shape:'std', vol:'1 л' }),

  // Ащылау — қоюлау реңк, күрең жапсырма, қола қақпақ
  saba: realBottle('b', { shape:'std', vol:'1 л',
    cap:['#c99a55','#8a5a2e','#5c3a18'],
    milk:['#c3b394','#faf5e8','#e6dbc2'],
    label:{ bg:'#7a5636', edge:'#5a3d24', text:'#f6ecd6', accent:'#e3c072' } }),

  // Балалы — кішкентай 0.5л
  smallkese: realBottle('c', { shape:'small', vol:'0.5 л',
    cap:['#f0cf86','#cf9a3a','#96682a'] }),

  // Отбасылық — үлкен 3л, тұтқасы бар
  kubi: realBottle('d', { shape:'jug', vol:'3 л', handle:true }),

  // Саумал — жаңа, ашық реңк
  torsyk: realBottle('e', { shape:'std', vol:'1 л',
    cap:['#e9d29a','#c2a463','#8a7038'],
    milk:['#d2c7ae','#ffffff','#f5f0e4'] }),

  // Премиум — алтын қақпақ, қара-алтын жапсырма
  ornate: realBottle('f', { shape:'std', vol:'1 л',
    cap:['#f5dc9c','#cf9a3a','#8a5f1c'],
    label:{ bg:'#4a3018', edge:'#2e1c0c', text:'#f6ecd6', accent:'#e3c072' } }),
};

/* ---------- Өнімдер каталогы (атауы/сипаты 3 тілде) ---------- */
const PRODUCTS = [
  { id:1, vessel:"kese", price:2800,
    name:{ kz:"Классикалық қымыз", ru:"Классический кумыс", en:"Classic kumis" },
    desc:{ kz:"Дәстүрлі әдіспен ашытылған, тепе-тең дәмі бар нағыз қымыз.", ru:"Настоящий кумыс традиционной закваски со сбалансированным вкусом.", en:"Authentic kumis fermented the traditional way, with a balanced taste." },
    tag:{ kz:"Хит", ru:"Хит", en:"Bestseller" }, vol:{ kz:"1 л", ru:"1 л", en:"1 L" } },
  { id:2, vessel:"saba", price:3000,
    name:{ kz:"Ащылау қымыз", ru:"Кислый кумыс", en:"Sour kumis" },
    desc:{ kz:"Ұзақ ашытылған, қышқылдау әрі қуатты дәмімен ерекшеленеді.", ru:"Долгой закваски, с кисловатым и насыщенным вкусом.", en:"Long-fermented, with a distinctly tart and robust flavour." },
    tag:{ kz:"Күшті", ru:"Крепкий", en:"Strong" }, vol:{ kz:"1 л", ru:"1 л", en:"1 L" } },
  { id:3, vessel:"smallkese", price:1500,
    name:{ kz:"Балалы қымыз", ru:"Мягкий кумыс", en:"Mild kumis" },
    desc:{ kz:"Жеңіл, тәтілеу дәм. Жаңадан бастаушыларға да ыңғайлы.", ru:"Лёгкий, чуть сладковатый вкус. Подойдёт и новичкам.", en:"Light, slightly sweet taste. Great for beginners too." },
    tag:{ kz:"Жұмсақ", ru:"Мягкий", en:"Mild" }, vol:{ kz:"0.5 л", ru:"0.5 л", en:"0.5 L" } },
  { id:4, vessel:"kubi", price:7500,
    name:{ kz:"Отбасылық қымыз", ru:"Семейный кумыс", en:"Family kumis" },
    desc:{ kz:"Үлкен отбасына арналған үнемді көлем. Дастарханның берекесі.", ru:"Экономичный объём для большой семьи. Изобилие дастархана.", en:"An economical volume for a big family — abundance for the table." },
    tag:{ kz:"Тиімді", ru:"Выгодно", en:"Value" }, vol:{ kz:"3 л", ru:"3 л", en:"3 L" } },
  { id:5, vessel:"torsyk", price:3200,
    name:{ kz:"Саумал қымыз", ru:"Кумыс саумал", en:"Saumal kumis" },
    desc:{ kz:"Жаңа сауылған бие сүтінен, нәзік әрі майда ашытылған дәм.", ru:"Из свежего кобыльего молока, нежный вкус лёгкой закваски.", en:"From freshly milked mare's milk, delicate and lightly fermented." },
    tag:{ kz:"Жаңа", ru:"Новинка", en:"New" }, vol:{ kz:"1 л", ru:"1 л", en:"1 L" } },
  { id:6, vessel:"ornate", price:4000,
    name:{ kz:"Премиум қымыз", ru:"Премиум кумыс", en:"Premium kumis" },
    desc:{ kz:"Іріктелген биелерден, сабада ашытылған ерекше сапалы қымыз.", ru:"От отборных кобылиц, особый кумыс, заквашенный в сабе.", en:"From selected mares, a special-quality kumis fermented in a saba." },
    tag:{ kz:"Люкс", ru:"Люкс", en:"Luxury" }, vol:{ kz:"1 л", ru:"1 л", en:"1 L" } },
];
const getP = (id) => PRODUCTS.find((p) => p.id === id);

/* ---------- Себет (сессия ішінде: {id, qty}) ---------- */
let cart = [];

/* ---------- DOM ---------- */
const $ = (sel) => document.querySelector(sel);
const productsGrid = $("#productsGrid");
const cartEl       = $("#cart");
const cartOverlay  = $("#cartOverlay");
const cartBody     = $("#cartBody");
const cartFooter   = $("#cartFooter");
const cartCount    = $("#cartCount");
const cartTotal    = $("#cartTotal");
const cartBtn      = $("#cartBtn");
const toastEl      = $("#toast");

/* ============================================================
   3 ТІЛ (KZ / RU / EN)
   ============================================================ */
let LANG = "kz";
const HTML_LANG = { kz: "kk", ru: "ru", en: "en" };

const I18N = {
  nav_home:        { kz:"Басты бет", ru:"Главная", en:"Home" },
  nav_products:    { kz:"Өнімдер", ru:"Продукция", en:"Products" },
  nav_about:       { kz:"Біз туралы", ru:"О нас", en:"About" },
  nav_contact:     { kz:"Байланыс", ru:"Контакты", en:"Contact" },

  hero_badge:      { kz:"Дала дәстүрі • 1994 жылдан бері", ru:"Степная традиция • с 1994 года", en:"Steppe tradition • since 1994" },
  hero_title:      { kz:"Таза, табиғи қымыз —<br><span>үйіңізге жеткіземіз</span>", ru:"Чистый, натуральный кумыс —<br><span>доставим к вам домой</span>", en:"Pure, natural kumis —<br><span>delivered to your home</span>" },
  hero_text:       { kz:"Кең байтақ даланың таза жайылымында өскен биелердің сүтінен, ата-баба дәстүрімен сабада ашытылған нағыз қазақы қымыз. Денсаулыққа шипа, дастарханға береке.", ru:"Настоящий казахский кумыс из молока кобылиц, выросших на чистых пастбищах бескрайней степи, заквашенный в сабе по традициям предков. Польза для здоровья и изобилие для дастархана.", en:"Authentic Kazakh kumis from the milk of mares raised on the clean pastures of the boundless steppe, fermented in a saba by our ancestors' traditions. Good for health, a blessing for the table." },
  hero_order:      { kz:"Тапсырыс беру", ru:"Заказать", en:"Order now" },
  hero_about:      { kz:"Біз туралы", ru:"О нас", en:"About us" },
  stat_years:      { kz:"жыл дәстүр", ru:"лет традиции", en:"years of tradition" },
  stat_clients:    { kz:"риза клиент", ru:"довольных клиентов", en:"happy clients" },
  stat_24:         { kz:"24 сағ", ru:"24 ч", en:"24 h" },
  stat_delivery:   { kz:"жеткізу", ru:"доставка", en:"delivery" },

  prod_eyebrow:    { kz:"Біздің өнімдер", ru:"Наша продукция", en:"Our products" },
  prod_title:      { kz:"Қымыз түрлері", ru:"Виды кумыса", en:"Types of kumis" },
  prod_subtitle:   { kz:"Әр талғамға сай, дәстүрлі әдіспен дайындалған қымыз", ru:"Кумыс на любой вкус, приготовленный традиционным способом", en:"Kumis for every taste, made the traditional way" },
  add_to_cart:     { kz:"Себетке қосу", ru:"В корзину", en:"Add to cart" },

  about_badge:     { kz:"табиғи бие сүті", ru:"натуральное кобылье молоко", en:"natural mare's milk" },
  about_eyebrow:   { kz:"Біз туралы", ru:"О нас", en:"About us" },
  about_title:     { kz:"Дала шаруашылығынан <em>дастарханыңызға</em>", ru:"От степного хозяйства <em>к вашему столу</em>", en:"From the steppe farm <em>to your table</em>" },
  about_lead:      { kz:"Біздің шаруашылық Алматы облысының тау бөктерінде орналасқан. Биелерімізді таза жайылымда, дәрі-дәрмексіз өсіреміз әрі қымызды ата-бабадан келе жатқан дәстүрлі әдіспен, сабада ашытамыз.", ru:"Наше хозяйство расположено в предгорьях Алматинской области. Кобылиц мы растим на чистых пастбищах, без лекарств, а кумыс заквашиваем в сабе по традициям предков.", en:"Our farm sits in the foothills of the Almaty region. We raise our mares on clean pastures, without medicines, and ferment the kumis in a saba by our ancestors' traditions." },
  feat1_t:         { kz:"Пробиотиктерге бай", ru:"Богат пробиотиками", en:"Rich in probiotics" },
  feat1_d:         { kz:"Ас қорытуды жақсартып, ішек микрофлорасын қалпына келтіреді.", ru:"Улучшает пищеварение и восстанавливает микрофлору кишечника.", en:"Improves digestion and restores gut microflora." },
  feat2_t:         { kz:"Иммунитетті нығайтады", ru:"Укрепляет иммунитет", en:"Boosts immunity" },
  feat2_d:         { kz:"Витаминдер мен пайдалы бактерияларға толы табиғи сусын.", ru:"Натуральный напиток, богатый витаминами и полезными бактериями.", en:"A natural drink full of vitamins and beneficial bacteria." },
  feat3_t:         { kz:"Ешқандай химия жоқ", ru:"Никакой химии", en:"No chemicals" },
  feat3_d:         { kz:"Тек таза бие сүті — консервант пен бояғышсыз.", ru:"Только чистое кобылье молоко — без консервантов и красителей.", en:"Just pure mare's milk — no preservatives or dyes." },
  about_view:      { kz:"Өнімдерді көру", ru:"Смотреть продукцию", en:"View products" },

  quote_text:      { kz:"«Қымыз — қазақтың қаны, дала дастарханының берекесі»", ru:"«Кумыс — кровь казаха, изобилие степного дастархана»", en:"\"Kumis is the blood of the Kazakh, the bounty of the steppe table\"" },
  quote_author:    { kz:"— халық даналығы", ru:"— народная мудрость", en:"— folk wisdom" },

  contact_eyebrow: { kz:"Байланыс", ru:"Контакты", en:"Contact" },
  contact_title:   { kz:"Бізбен хабарласыңыз", ru:"Свяжитесь с нами", en:"Get in touch" },
  contact_subtitle:{ kz:"Сұрақтарыңыз болса — қоңырау шалыңыз немесе WhatsApp жазыңыз", ru:"Есть вопросы — позвоните или напишите в WhatsApp", en:"Questions? Call us or message us on WhatsApp" },
  c_addr_t:        { kz:"Мекенжай", ru:"Адрес", en:"Address" },
  c_addr_v:        { kz:"Талдықорған қаласы,<br>дача Ащыбұлақ", ru:"г. Талдыкорган,<br>дача Ащыбулак", en:"Taldykorgan city,<br>Ashybulak dacha" },
  c_addr_map:      { kz:"2GIS-те ашу", ru:"Открыть в 2GIS", en:"Open in 2GIS" },
  c_phone_t:       { kz:"Телефон", ru:"Телефон", en:"Phone" },
  c_hours_t:       { kz:"Жұмыс уақыты", ru:"Часы работы", en:"Working hours" },
  c_hours_v:       { kz:"Күн сайын<br>08:00 — 20:00", ru:"Ежедневно<br>08:00 — 20:00", en:"Daily<br>08:00 — 20:00" },
  c_wa_v:          { kz:"Жедел тапсырыс пен кеңес", ru:"Быстрый заказ и консультация", en:"Quick order and advice" },
  c_wa_btn:        { kz:"WhatsApp жазу", ru:"Написать в WhatsApp", en:"Message on WhatsApp" },
  c_ig_v:          { kz:"Жаңалықтар мен сурет-видеолар", ru:"Новости, фото и видео", en:"News, photos and videos" },

  footer_tagline:  { kz:"Қазақтың дәстүрлі сусынын үйіңізге жеткіземіз.", ru:"Доставляем традиционный напиток казахов к вам домой.", en:"We deliver the traditional Kazakh drink to your home." },
  footer_copy:     { kz:"© 2026 Бал қымыз. Барлық құқық қорғалған.", ru:"© 2026 Бал қымыз. Все права защищены.", en:"© 2026 Bal Qymyz. All rights reserved." },

  cart_title:      { kz:"Себет", ru:"Корзина", en:"Cart" },
  cart_total:      { kz:"Жалпы сома:", ru:"Итого:", en:"Total:" },
  cart_checkout:   { kz:"Тапсырысты растау", ru:"Оформить заказ", en:"Confirm order" },
  cart_note:       { kz:"Растасаңыз, тапсырыс WhatsApp-қа жіберіледі", ru:"После подтверждения заказ отправится в WhatsApp", en:"On confirmation, your order is sent to WhatsApp" },
  cart_empty:      { kz:"Себет әзірге бос.<br>Қымыз таңдап, тапсырыс беріңіз!", ru:"Корзина пока пуста.<br>Выберите кумыс и оформите заказ!", en:"Your cart is empty.<br>Pick a kumis and place an order!" },
  cart_vol:        { kz:"Көлемі:", ru:"Объём:", en:"Volume:" },

  toast_added:     { kz:" себетке қосылды", ru:" добавлен в корзину", en:" added to cart" },
  toast_empty:     { kz:"Себет бос — алдымен тауар қосыңыз", ru:"Корзина пуста — сначала добавьте товар", en:"Cart is empty — add an item first" },
  wa_intro:        { kz:"Сәлеметсіз бе! Мен мына тауарларды тапсырыс бергім келеді:", ru:"Здравствуйте! Я хочу заказать следующие товары:", en:"Hello! I would like to order the following:" },
  wa_pcs:          { kz:"дана", ru:"шт", en:"pcs" },
  wa_total:        { kz:"Жалпы сома:", ru:"Итого:", en:"Total:" },
};

function t(key) {
  const o = I18N[key];
  return o ? (o[LANG] || o.kz) : key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  document.documentElement.lang = HTML_LANG[LANG] || "kk";
  document.querySelectorAll(".lang__btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.lang === LANG));
}

function setLang(lang) {
  if (!HTML_LANG[lang]) return;
  LANG = lang;
  try { localStorage.setItem("qymyz_lang", lang); } catch (e) {}
  applyI18n();
  renderProducts();
  renderCart();
}

function initLang() {
  let saved = "kz";
  try { saved = localStorage.getItem("qymyz_lang") || "kz"; } catch (e) {}
  LANG = HTML_LANG[saved] ? saved : "kz";
  document.querySelectorAll(".lang__btn").forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang)));
  applyI18n();
}

/* ============================================================
   ӨНІМДЕРДІ РЕНДЕРЛЕУ
   ============================================================ */
function renderProducts() {
  productsGrid.innerHTML = PRODUCTS.map((p) => `
    <article class="card">
      <div class="card__vessel">
        <span class="card__tag">${p.tag[LANG]}</span>
        ${VESSELS[p.vessel]}
      </div>
      <div class="card__body">
        <h3 class="card__name">${p.name[LANG]}</h3>
        <p class="card__desc">${p.desc[LANG]}</p>
        <div class="card__meta">
          <span class="card__vol">${p.vol[LANG]}</span>
          <span class="card__price">${formatPrice(p.price)}<small> ₸</small></span>
        </div>
        <button class="btn btn--gold card__btn" data-add="${p.id}">${t("add_to_cart")}</button>
      </div>
    </article>
  `).join("");
  initCardTilt(); // жаңа карточкаларға 3D еңкею
}

/* ============================================================
   СЕБЕТ ЛОГИКАСЫ
   ============================================================ */
function addToCart(id) {
  const product = getP(id);
  if (!product) return;

  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });

  renderCart();
  bumpCartIcon();
  showToast(`«${product.name[LANG]}»${t("toast_added")}`);
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

function getTotal() { return cart.reduce((s, i) => s + getP(i.id).price * i.qty, 0); }
function getCount() { return cart.reduce((s, i) => s + i.qty, 0); }

function renderCart() {
  const count = getCount();
  cartCount.textContent = count;
  cartCount.classList.toggle("show", count > 0);

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart__empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>${t("cart_empty")}</p>
      </div>`;
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";
  cartBody.innerHTML = cart.map((i) => {
    const p = getP(i.id);
    return `
    <div class="cart-item">
      <div class="cart-item__thumb">${VESSELS[p.vessel]}</div>
      <div class="cart-item__info">
        <div class="cart-item__top">
          <div>
            <div class="cart-item__name">${p.name[LANG]}</div>
            <div class="cart-item__vol">${t("cart_vol")} ${p.vol[LANG]}</div>
          </div>
          <button class="cart-item__remove" data-remove="${i.id}" aria-label="×">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
        <div class="cart-item__row">
          <div class="cart-item__qty">
            <button class="qty-btn" data-minus="${i.id}" aria-label="−">−</button>
            <span class="qty-num">${i.qty}</span>
            <button class="qty-btn" data-plus="${i.id}" aria-label="+">+</button>
          </div>
          <div class="cart-item__price">${formatPrice(p.price * i.qty)} ₸</div>
        </div>
      </div>
    </div>`;
  }).join("");

  cartTotal.textContent = `${formatPrice(getTotal())} ₸`;
}

/* ============================================================
   СЕБЕТ АШУ / ЖАБУ
   ============================================================ */
function openCart() {
  cartEl.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartEl.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

/* ============================================================
   WHATSAPP ИНТЕГРАЦИЯСЫ
   ============================================================ */
function sendToWhatsApp(cartItems, total) {
  if (cartItems.length === 0) {
    showToast(t("toast_empty"));
    return;
  }
  const phone = WHATSAPP_PHONE; // + жоқ, 7-ден басталады
  let message = t("wa_intro") + "%0A%0A";

  cartItems.forEach((item) => {
    const p = getP(item.id);
    message += `• ${p.name[LANG]} (${p.vol[LANG]}) — ${item.qty} ${t("wa_pcs")} — ${p.price * item.qty} ₸%0A`;
  });

  message += `%0A${t("wa_total")} ${total} ₸`;

  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");
}

/* ============================================================
   КӨМЕКШІ ФУНКЦИЯЛАР
   ============================================================ */
function formatPrice(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function bumpCartIcon() {
  cartBtn.classList.remove("bump");
  void cartBtn.offsetWidth; // reflow — анимацияны қайта қосу
  cartBtn.classList.add("bump");
}

let toastTimer;
function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

/* ============================================================
   ОҚИҒА ТЫҢДАУШЫЛАРЫ (event delegation)
   ============================================================ */
document.addEventListener("click", (e) => {
  const add    = e.target.closest("[data-add]");
  const plus   = e.target.closest("[data-plus]");
  const minus  = e.target.closest("[data-minus]");
  const remove = e.target.closest("[data-remove]");

  if (add)    addToCart(Number(add.dataset.add));
  if (plus)   changeQty(Number(plus.dataset.plus), +1);
  if (minus)  changeQty(Number(minus.dataset.minus), -1);
  if (remove) removeFromCart(Number(remove.dataset.remove));
});

cartBtn.addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });
$("#checkoutBtn").addEventListener("click", () => sendToWhatsApp(cart, getTotal()));

/* ---------- Мобильді мәзір ---------- */
const burger = $("#burger");
const nav = $("#nav");
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("open");
});
nav.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("open");
  });
});

/* ---------- Header скролл эффектісі ---------- */
const header = $("#header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

/* ============================================================
   КАРТОЧКАЛАРДЫҢ 3D ЕҢКЕЮІ (тінтуірмен, тек десктопта)
   ============================================================ */
function initCardTilt() {
  if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  const MAX = 8; // максимум еңкею бұрышы (градус)
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.classList.add("tilt");
      card.style.transform =
        `translateY(-9px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("tilt");
      card.style.transform = "";
    });
  });
}

/* ============================================================
   ТҮНГІ / КҮНДІЗГІ РЕЖИМ
   ============================================================ */
function applyTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  // мобильді браузердің жоғарғы жолағының түсі
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#1b1209" : "#6b4526");
}

function initTheme() {
  const btn = document.getElementById("themeBtn");
  let saved = null;
  try { saved = localStorage.getItem("qymyz_theme"); } catch (e) {}
  // сақталмаған болса — құрылғының өз баптауын алады
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  if (!btn) return;
  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("qymyz_theme", next); } catch (e) {}
  });
}

/* ============================================================
   ULTRA 3D САХНА — тінтуір + гироскоп + баяу қалқу
   ============================================================ */
function initScene3D() {
  const scene = document.getElementById("scene3d");
  const hero = document.getElementById("hero");
  if (!scene || !hero) return;

  scene.style.animation = "none"; // CSS float-ты өшіріп, JS басқарамыз
  let curX = 4, curY = 0, tgtX = 4, tgtY = 0, t = 0, active = false, idleTimer;

  const markActive = () => {
    active = true;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { active = false; }, 2500); // қозғалыс тоқтаса — қалқуға оралу
  };

  // Тінтуір (десктоп)
  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const r = hero.getBoundingClientRect();
    tgtY = ((e.clientX - r.left) / r.width - 0.5) * 30;   // солға-оңға бұрылу
    tgtX = -((e.clientY - r.top) / r.height - 0.5) * 22 + 3; // жоғары-төмен
    markActive();
  });

  // Гироскоп (телефон)
  const onOrient = (e) => {
    if (e.gamma == null || e.beta == null) return;
    tgtY = Math.max(-26, Math.min(26, e.gamma * 0.65));
    tgtX = Math.max(-18, Math.min(20, (e.beta - 45) * 0.4 + 3));
    markActive();
  };
  window.addEventListener("deviceorientation", onOrient);

  // iOS-та рұқсат сұрау (алғашқы тиюде)
  if (typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function") {
    const ask = () => {
      DeviceOrientationEvent.requestPermission().catch(() => {});
      window.removeEventListener("touchend", ask);
    };
    window.addEventListener("touchend", ask, { once: true });
  }

  function loop() {
    t += 0.016;
    if (!active) { // ешкім қозғалтпаса — баяу қалқу
      tgtY = Math.sin(t * 0.6) * 13;
      tgtX = Math.sin(t * 0.45) * 4 + 4;
    }
    curX += (tgtX - curX) * 0.07;
    curY += (tgtY - curY) * 0.07;
    scene.style.transform = `rotateX(${curX.toFixed(2)}deg) rotateY(${curY.toFixed(2)}deg)`;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ============================================================
   ІСКЕ ҚОСУ
   ============================================================ */
initTheme();      // сақталған тақырып (күндізгі/түнгі)
initLang();       // сақталған тілді орнатып, статикалық мәтінді аударады
renderProducts(); // дұрыс тілде (initCardTilt осы жерде шақырылады)
initScene3D();
renderCart();
