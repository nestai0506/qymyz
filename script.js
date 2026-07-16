/* ============================================================
   ҚЫМЫЗ ӘЛЕМІ — лендинг логикасы (vanilla JS)
   ============================================================ */

// ⚙️ ӨЗ WhatsApp НӨМІРІҢІЗДІ ОСЫ ЖЕРГЕ ҚОЙЫҢЫЗ (+ жоқ, 7-ден басталады)
const WHATSAPP_PHONE = "77000707729";

/* ---------- Қымыз бөтелкелері (айқын түрлі-түсті SVG) ---------- */
const VESSELS = {
  // Классикалық — стандарт 1л бөтелке
  kese: `<svg viewBox="0 0 120 232">
    <rect x="49" y="14" width="22" height="20" rx="4" fill="#a06f22"/>
    <rect x="47" y="32" width="26" height="7" rx="2" fill="#c9962f"/>
    <path d="M54 39 L54 58 C54 63 42 70 42 92 L42 204 C42 216 50 221 60 221 C70 221 78 216 78 204 L78 92 C78 70 66 63 66 58 L66 39 Z" fill="#e7dfcd"/>
    <path d="M44 98 L44 203 C44 214 51 218 60 218 C69 218 76 214 76 203 L76 98 Z" fill="#fcfbf6"/>
    <ellipse cx="60" cy="98" rx="16" ry="4" fill="#f1ebdc"/>
    <rect x="40.5" y="126" width="39" height="58" rx="5" fill="#fbf4e6" stroke="#cf9a3a" stroke-width="1.6"/>
    <line x1="47" y1="139" x2="73" y2="139" stroke="#cf9a3a" stroke-width="1.4"/>
    <line x1="47" y1="171" x2="73" y2="171" stroke="#cf9a3a" stroke-width="1.4"/>
    <path d="M60 166 L60 155 C54 155 50 152 50 148 C50 145 53 144 54.5 146 C56 148 53 150 51 149 M60 155 C66 155 70 152 70 148 C70 145 67 144 65.5 146 C64 148 67 150 69 149" fill="none" stroke="#b07c26" stroke-width="1.4" stroke-linecap="round"/>
    <rect x="48" y="72" width="5" height="120" rx="2.5" fill="#ffffff" opacity=".4"/>
  </svg>`,

  // Ащылау — қоюлау реңкі, күрең жапсырма
  saba: `<svg viewBox="0 0 120 232">
    <rect x="49" y="12" width="22" height="20" rx="4" fill="#7a4f1c"/>
    <rect x="47" y="30" width="26" height="7" rx="2" fill="#a06f22"/>
    <path d="M54 37 L54 56 C54 61 42 68 42 90 L42 204 C42 216 50 221 60 221 C70 221 78 216 78 204 L78 90 C78 68 66 61 66 56 L66 37 Z" fill="#e7dfcd"/>
    <path d="M44 96 L44 203 C44 214 51 218 60 218 C69 218 76 214 76 203 L76 96 Z" fill="#f7f2e6"/>
    <ellipse cx="60" cy="96" rx="16" ry="4" fill="#ece3cf"/>
    <rect x="40.5" y="124" width="39" height="60" rx="5" fill="#7a5636" stroke="#cf9a3a" stroke-width="1.6"/>
    <line x1="47" y1="138" x2="73" y2="138" stroke="#e3c072" stroke-width="1.4"/>
    <line x1="47" y1="170" x2="73" y2="170" stroke="#e3c072" stroke-width="1.4"/>
    <path d="M60 165 L60 154 C54 154 50 151 50 147 C50 144 53 143 54.5 145 C56 147 53 149 51 148 M60 154 C66 154 70 151 70 147 C70 144 67 143 65.5 145 C64 147 67 149 69 148" fill="none" stroke="#e3c072" stroke-width="1.4" stroke-linecap="round"/>
    <rect x="48" y="70" width="5" height="122" rx="2.5" fill="#ffffff" opacity=".35"/>
  </svg>`,

  // Балалы — кішкентай 0.5л бөтелке
  smallkese: `<svg viewBox="0 0 120 232">
    <rect x="52" y="52" width="16" height="16" rx="3" fill="#a06f22"/>
    <rect x="50" y="66" width="20" height="6" rx="2" fill="#c9962f"/>
    <path d="M55 71 L55 84 C55 88 46 94 46 110 L46 198 C46 209 53 213 60 213 C67 213 74 209 74 198 L74 110 C74 94 65 88 65 84 L65 71 Z" fill="#e7dfcd"/>
    <path d="M48 116 L48 197 C48 207 54 211 60 211 C66 211 72 207 72 197 L72 116 Z" fill="#fcfbf6"/>
    <ellipse cx="60" cy="116" rx="12" ry="3.2" fill="#f1ebdc"/>
    <rect x="44.5" y="138" width="31" height="48" rx="5" fill="#fbf4e6" stroke="#cf9a3a" stroke-width="1.6"/>
    <line x1="50" y1="150" x2="70" y2="150" stroke="#cf9a3a" stroke-width="1.3"/>
    <line x1="50" y1="176" x2="70" y2="176" stroke="#cf9a3a" stroke-width="1.3"/>
    <path d="M60 172 L60 162 C55 162 52 160 52 156.5 C52 154 54.5 153 55.5 155 M60 162 C65 162 68 160 68 156.5 C68 154 65.5 153 64.5 155" fill="none" stroke="#b07c26" stroke-width="1.3" stroke-linecap="round"/>
    <rect x="51" y="94" width="4.5" height="100" rx="2" fill="#ffffff" opacity=".4"/>
  </svg>`,

  // Отбасылық — үлкен 3л банка (тұтқасы бар)
  kubi: `<svg viewBox="0 0 120 232">
    <rect x="50" y="14" width="20" height="16" rx="3" fill="#a06f22"/>
    <rect x="46" y="28" width="28" height="8" rx="2" fill="#c9962f"/>
    <path d="M86 74 C106 78 106 122 86 126" fill="none" stroke="#ddd3bd" stroke-width="9" stroke-linecap="round"/>
    <path d="M52 36 L52 52 C52 58 34 66 34 92 L34 202 C34 216 44 222 60 222 C76 222 86 216 86 202 L86 92 C86 66 68 58 68 52 L68 36 Z" fill="#e7dfcd"/>
    <path d="M36 100 L36 201 C36 214 46 219 60 219 C74 219 84 214 84 201 L84 100 Z" fill="#fcfbf6"/>
    <ellipse cx="60" cy="100" rx="24" ry="5" fill="#f1ebdc"/>
    <rect x="38" y="132" width="44" height="62" rx="6" fill="#fbf4e6" stroke="#cf9a3a" stroke-width="1.8"/>
    <line x1="46" y1="147" x2="74" y2="147" stroke="#cf9a3a" stroke-width="1.5"/>
    <line x1="46" y1="181" x2="74" y2="181" stroke="#cf9a3a" stroke-width="1.5"/>
    <path d="M60 176 L60 164 C53 164 48 161 48 156 C48 153 51 152 53 154 C55 156 52 159 50 157 M60 164 C67 164 72 161 72 156 C72 153 69 152 67 154 C65 156 68 159 70 157" fill="none" stroke="#b07c26" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="41" y="74" width="6" height="130" rx="3" fill="#ffffff" opacity=".4"/>
  </svg>`,

  // Саумал — иығы дөңгелек бөтелке
  torsyk: `<svg viewBox="0 0 120 232">
    <rect x="50" y="16" width="20" height="18" rx="4" fill="#a06f22"/>
    <rect x="48" y="32" width="24" height="7" rx="2" fill="#c9962f"/>
    <path d="M53 39 L53 54 C53 60 38 66 38 96 L38 202 C38 215 47 221 60 221 C73 221 82 215 82 202 L82 96 C82 66 67 60 67 54 L67 39 Z" fill="#e7dfcd"/>
    <path d="M40 104 L40 201 C40 213 48 217 60 217 C72 217 80 213 80 201 L80 104 Z" fill="#fcfbf6"/>
    <ellipse cx="60" cy="104" rx="20" ry="4.5" fill="#f1ebdc"/>
    <rect x="39" y="130" width="42" height="58" rx="5" fill="#fbf4e6" stroke="#cf9a3a" stroke-width="1.6"/>
    <line x1="46" y1="143" x2="74" y2="143" stroke="#cf9a3a" stroke-width="1.4"/>
    <line x1="46" y1="175" x2="74" y2="175" stroke="#cf9a3a" stroke-width="1.4"/>
    <path d="M60 170 L60 159 C54 159 50 156 50 152 C50 149 53 148 54.5 150 C56 152 53 154 51 153 M60 159 C66 159 70 156 70 152 C70 149 67 148 65.5 150 C64 152 67 154 69 153" fill="none" stroke="#b07c26" stroke-width="1.4" stroke-linecap="round"/>
    <rect x="45" y="78" width="5" height="122" rx="2.5" fill="#ffffff" opacity=".4"/>
  </svg>`,

  // Премиум — алтын фольгалы мойын, ою-өрнекті жапсырма
  ornate: `<svg viewBox="0 0 120 232">
    <rect x="50" y="10" width="20" height="16" rx="3" fill="#b8862b"/>
    <path d="M46 24 L74 24 L72 48 L48 48 Z" fill="#cf9a3a"/>
    <path d="M48 34 L72 34 M48 41 L72 41" stroke="#f0d68a" stroke-width="1" opacity=".8"/>
    <path d="M54 48 L54 58 C54 63 42 70 42 92 L42 204 C42 216 50 221 60 221 C70 221 78 216 78 204 L78 92 C78 70 66 63 66 58 L66 48 Z" fill="#e7dfcd"/>
    <path d="M44 100 L44 203 C44 214 51 218 60 218 C69 218 76 214 76 203 L76 100 Z" fill="#fcfbf6"/>
    <ellipse cx="60" cy="100" rx="16" ry="4" fill="#f1ebdc"/>
    <rect x="40" y="122" width="40" height="66" rx="5" fill="#4a3018" stroke="#e3c072" stroke-width="1.8"/>
    <rect x="43" y="125" width="34" height="60" rx="3" fill="none" stroke="#cf9a3a" stroke-width="0.8" opacity=".7"/>
    <line x1="47" y1="138" x2="73" y2="138" stroke="#e3c072" stroke-width="1.3"/>
    <line x1="47" y1="172" x2="73" y2="172" stroke="#e3c072" stroke-width="1.3"/>
    <path d="M60 167 L60 155 C53 155 48 152 48 147 C48 144 51 143 53 145 C55 147 52 150 50 148 M60 155 C67 155 72 152 72 147 C72 144 69 143 67 145 C65 147 68 150 70 148" fill="none" stroke="#e3c072" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="60" cy="178" r="1.8" fill="#e3c072"/>
    <rect x="48" y="72" width="5" height="122" rx="2.5" fill="#ffffff" opacity=".38"/>
  </svg>`,
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
  c_phone_t:       { kz:"Телефон", ru:"Телефон", en:"Phone" },
  c_hours_t:       { kz:"Жұмыс уақыты", ru:"Часы работы", en:"Working hours" },
  c_hours_v:       { kz:"Күн сайын<br>08:00 — 20:00", ru:"Ежедневно<br>08:00 — 20:00", en:"Daily<br>08:00 — 20:00" },
  c_wa_v:          { kz:"Жедел тапсырыс пен кеңес", ru:"Быстрый заказ и консультация", en:"Quick order and advice" },
  c_wa_btn:        { kz:"WhatsApp жазу", ru:"Написать в WhatsApp", en:"Message on WhatsApp" },
  c_ig_v:          { kz:"Жаңалықтар мен сурет-видеолар", ru:"Новости, фото и видео", en:"News, photos and videos" },

  footer_tagline:  { kz:"Қазақтың дәстүрлі сусынын үйіңізге жеткіземіз.", ru:"Доставляем традиционный напиток казахов к вам домой.", en:"We deliver the traditional Kazakh drink to your home." },
  footer_copy:     { kz:"© 2026 Қымыз Әлемі. Барлық құқық қорғалған.", ru:"© 2026 Қымыз Әлемі. Все права защищены.", en:"© 2026 Qymyz Alemi. All rights reserved." },

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
initLang();       // сақталған тілді орнатып, статикалық мәтінді аударады
renderProducts(); // дұрыс тілде (initCardTilt осы жерде шақырылады)
initScene3D();
renderCart();
