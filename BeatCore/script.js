/* ---------------- THEME ---------------- */
function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  document.querySelectorAll('.theme-btn').forEach(b=>{ b.textContent = t==='dark' ? '☀️ claro' : '🌙 escuro'; });
  try{ localStorage.setItem('beatcore_theme', t); }catch(e){}
}
function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(cur==='dark' ? 'light' : 'dark');
}
function initTheme(){
  let t; try{ t = localStorage.getItem('beatcore_theme'); }catch(e){ t = null; }
  if(!t){ t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'; }
  applyTheme(t);
}

/* ---------------- PRODUCT ART (realistic shaded SVG renders) ---------------- */
let iconSeq = 0;
function nextUid(){ return 'ic' + (iconSeq++); }

function sharedDefs(uid){
  return `
    <linearGradient id="${uid}-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3d3b34"/>
      <stop offset="100%" stop-color="#0b0b09"/>
    </linearGradient>
    <linearGradient id="${uid}-metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8c897f"/>
      <stop offset="50%" stop-color="#dcd9cb"/>
      <stop offset="100%" stop-color="#8c897f"/>
    </linearGradient>
    <radialGradient id="${uid}-gloss" cx="32%" cy="26%" r="75%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity=".5"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="${uid}-shadow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.2"/>
    </filter>`;
}
function accDefs(uid, c){
  return `<radialGradient id="${uid}-acc" cx="35%" cy="28%" r="80%">
      <stop offset="0%" stop-color="${c.l}"/>
      <stop offset="55%" stop-color="${c.m}"/>
      <stop offset="100%" stop-color="${c.d}"/>
    </radialGradient>`;
}
function wrap(uid, c, body){
  return `<defs>${sharedDefs(uid)}${accDefs(uid,c)}</defs>${body}`;
}

const ART = {
  boombox: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="88" rx="34" ry="6" fill="#000" opacity=".22" filter="url(#${uid}-shadow)"/>
    <rect x="8" y="30" width="84" height="50" rx="6" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.5"/>
    <rect x="8" y="30" width="84" height="50" rx="6" fill="url(#${uid}-gloss)"/>
    <circle cx="30" cy="56" r="16" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.5"/>
    <circle cx="30" cy="56" r="16" fill="url(#${uid}-gloss)"/>
    <circle cx="70" cy="56" r="16" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.5"/>
    <circle cx="70" cy="56" r="16" fill="url(#${uid}-gloss)"/>
    <g stroke="#000" stroke-width="1" opacity=".5" fill="none">
      <circle cx="30" cy="56" r="10"/><circle cx="30" cy="56" r="5"/>
      <circle cx="70" cy="56" r="10"/><circle cx="70" cy="56" r="5"/>
    </g>
    <path d="M20 30 Q50 6 80 30" fill="none" stroke="url(#${uid}-metal)" stroke-width="4" stroke-linecap="round"/>
    <rect x="44" y="14" width="12" height="7" rx="1.5" fill="#f4e400" stroke="#000" stroke-width="1"/>`),

  orb: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="90" rx="26" ry="5" fill="#000" opacity=".2" filter="url(#${uid}-shadow)"/>
    <circle cx="50" cy="56" r="34" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.5"/>
    <circle cx="50" cy="56" r="34" fill="url(#${uid}-gloss)"/>
    <circle cx="50" cy="56" r="20" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.2"/>
    <g stroke="#000" stroke-width="1" opacity=".45" fill="none">
      <circle cx="50" cy="56" r="14"/><circle cx="50" cy="56" r="7"/>
    </g>
    <path d="M40 20 Q50 12 60 20" fill="none" stroke="url(#${uid}-metal)" stroke-width="3" stroke-linecap="round"/>`),

  overear: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="92" rx="30" ry="5" fill="#000" opacity=".18" filter="url(#${uid}-shadow)"/>
    <path d="M16 58 A34 34 0 0 1 84 58" fill="none" stroke="url(#${uid}-metal)" stroke-width="5" stroke-linecap="round"/>
    <path d="M16 58 A34 34 0 0 1 84 58" fill="none" stroke="#000" stroke-width="1" opacity=".3"/>
    <rect x="4" y="54" width="20" height="30" rx="9" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.5"/>
    <rect x="4" y="54" width="20" height="30" rx="9" fill="url(#${uid}-gloss)"/>
    <rect x="76" y="54" width="20" height="30" rx="9" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.5"/>
    <rect x="76" y="54" width="20" height="30" rx="9" fill="url(#${uid}-gloss)"/>
    <ellipse cx="14" cy="69" rx="6" ry="10" fill="url(#${uid}-acc)"/>
    <ellipse cx="86" cy="69" rx="6" ry="10" fill="url(#${uid}-acc)"/>`),

  inear: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="92" rx="24" ry="4" fill="#000" opacity=".16" filter="url(#${uid}-shadow)"/>
    <ellipse cx="32" cy="42" rx="16" ry="20" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.4"/>
    <ellipse cx="32" cy="42" rx="16" ry="20" fill="url(#${uid}-gloss)"/>
    <ellipse cx="72" cy="62" rx="16" ry="20" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.4"/>
    <ellipse cx="72" cy="62" rx="16" ry="20" fill="url(#${uid}-gloss)"/>
    <circle cx="32" cy="36" r="5" fill="url(#${uid}-acc)"/>
    <circle cx="72" cy="56" r="5" fill="url(#${uid}-acc)"/>
    <path d="M32 60 Q45 85 72 80" fill="none" stroke="url(#${uid}-metal)" stroke-width="3"/>`),

  turntable: (uid,c)=>wrap(uid,c,`
    <ellipse cx="46" cy="92" rx="36" ry="5" fill="#000" opacity=".2" filter="url(#${uid}-shadow)"/>
    <rect x="6" y="70" width="80" height="12" rx="2" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.2"/>
    <circle cx="44" cy="56" r="36" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.5"/>
    <circle cx="44" cy="56" r="36" fill="url(#${uid}-gloss)"/>
    <g stroke="#000" stroke-width=".6" opacity=".35" fill="none">
      <circle cx="44" cy="56" r="30"/><circle cx="44" cy="56" r="24"/><circle cx="44" cy="56" r="18"/>
    </g>
    <circle cx="44" cy="56" r="10" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1"/>
    <circle cx="44" cy="56" r="2.5" fill="#000"/>
    <path d="M64 30 L90 16" stroke="url(#${uid}-metal)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="90" cy="16" r="4" fill="url(#${uid}-metal)" stroke="#000" stroke-width="1"/>`),

  wristband: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="90" rx="30" ry="5" fill="#000" opacity=".16" filter="url(#${uid}-shadow)"/>
    <path d="M10 54 Q50 16 90 54 Q50 88 10 54 Z" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.5"/>
    <path d="M10 54 Q50 16 90 54 Q50 88 10 54 Z" fill="url(#${uid}-gloss)"/>
    <rect x="34" y="42" width="32" height="24" rx="5" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.2"/>
    <path d="M38 54 Q44 46 50 54 T62 54" fill="none" stroke="#0b0b09" stroke-width="2" opacity=".6"/>`),

  cushion: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="92" rx="34" ry="5" fill="#000" opacity=".14" filter="url(#${uid}-shadow)"/>
    <rect x="10" y="14" width="80" height="68" rx="12" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.5"/>
    <rect x="10" y="14" width="80" height="68" rx="12" fill="url(#${uid}-gloss)"/>
    <rect x="16" y="20" width="68" height="56" rx="8" fill="none" stroke="#f7f4e9" stroke-width="1.5" stroke-dasharray="3 3" opacity=".55"/>
    <path d="M22 48 Q34 26 46 48 T78 48" fill="none" stroke="url(#${uid}-acc)" stroke-width="4"/>
    <path d="M22 64 Q34 46 46 64 T78 64" fill="none" stroke="url(#${uid}-acc)" stroke-width="2.4" opacity=".65"/>`),

  bonecond: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="92" rx="28" ry="5" fill="#000" opacity=".16" filter="url(#${uid}-shadow)"/>
    <path d="M14 44 A36 36 0 0 1 86 44" fill="none" stroke="url(#${uid}-metal)" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="14" cy="48" r="13" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.3"/>
    <circle cx="86" cy="48" r="13" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.3"/>
    <path d="M14 60 Q8 76 22 84" fill="none" stroke="url(#${uid}-metal)" stroke-width="3" stroke-linecap="round"/>`),

  strobe: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="92" rx="20" ry="4" fill="#000" opacity=".16" filter="url(#${uid}-shadow)"/>
    <circle cx="50" cy="52" r="24" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.5"/>
    <circle cx="50" cy="52" r="24" fill="url(#${uid}-gloss)"/>
    <g stroke="#0b0b09" stroke-width="3" stroke-linecap="round" opacity=".85">
      <path d="M50 16 L50 4"/><path d="M50 88 L50 98"/><path d="M14 52 L4 52"/><path d="M86 52 L96 52"/>
      <path d="M24 26 L15 17"/><path d="M76 26 L85 17"/><path d="M24 78 L15 87"/><path d="M76 78 L85 87"/>
    </g>
    <rect x="42" y="82" width="16" height="10" rx="2" fill="url(#${uid}-body)" stroke="#000" stroke-width="1"/>`),

  cable: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="92" rx="30" ry="4" fill="#000" opacity=".14" filter="url(#${uid}-shadow)"/>
    <path d="M8 76 Q30 40 50 60 T94 22" fill="none" stroke="url(#${uid}-acc)" stroke-width="5"/>
    <path d="M8 76 Q30 40 50 60 T94 22" fill="none" stroke="#000" stroke-width="1" opacity=".25"/>
    <rect x="0" y="68" width="18" height="16" rx="3" fill="url(#${uid}-metal)" stroke="#000" stroke-width="1.3"/>
    <rect x="82" y="12" width="18" height="16" rx="3" fill="url(#${uid}-metal)" stroke="#000" stroke-width="1.3"/>`),

  amp: (uid,c)=>wrap(uid,c,`
    <ellipse cx="50" cy="92" rx="34" ry="5" fill="#000" opacity=".18" filter="url(#${uid}-shadow)"/>
    <rect x="10" y="26" width="80" height="52" rx="6" fill="url(#${uid}-body)" stroke="#000" stroke-width="1.5"/>
    <rect x="10" y="26" width="80" height="52" rx="6" fill="url(#${uid}-gloss)"/>
    <circle cx="34" cy="52" r="12" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.3"/>
    <circle cx="66" cy="52" r="12" fill="url(#${uid}-acc)" stroke="#000" stroke-width="1.3"/>
    <line x1="34" y1="52" x2="34" y2="42" stroke="#0b0b09" stroke-width="2"/>
    <line x1="66" y1="52" x2="66" y2="42" stroke="#0b0b09" stroke-width="2"/>
    <rect x="10" y="14" width="80" height="10" fill="#f4e400" stroke="#000" stroke-width="1.2"/>`),
};

const CAT_COLORS = {
  caixas:    {l:'#fff685', m:'#f4e400', d:'#c9ba00'},
  fones:     {l:'#ff8d85', m:'#e8342a', d:'#a8241d'},
  vinil:     {l:'#7fc4ff', m:'#1e8fd5', d:'#14659a'},
  acessivel: {l:'#ff8d85', m:'#e8342a', d:'#a8241d'},
  acessorios:{l:'#fff685', m:'#f4e400', d:'#c9ba00'},
};

function productArt(p){
  return `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
}

/* ---------------- DATA ---------------- */
const CAT_LAYER = { caixas:'layer', fones:'layer-red', vinil:'layer-blue', acessivel:'layer-red', acessorios:'layer' };

const PRODUCTS = [
  {id:'cx01', name:'CAIXA RACHADURA 40W', cat:'caixas', price:349, art:'boombox', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_playstation_1_90s_low_poly_boombox_speaker_modify_and_add/screen.png', tag:'BLUETOOTH', featured:true,
    desc:'caixa portátil de rua, aguenta chão, aguenta chuva de leve, não aguenta vizinho reclamando.'},
  {id:'cx02', name:'BLOCO SÍSMICO MINI', cat:'caixas', price:189, art:'orb', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_mini_seismic_subwoofer_bloco_s_smico_mini_add/screen.png', tag:'À PROVA DE QUEDA', featured:false,
    desc:'caixinha pequena, grave grande. cabe na mochila, não cabe no silêncio.'},
  {id:'fn01', name:'FONE ISOLA-TUDO', cat:'fones', price:429, art:'overear', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_over_ear_headphones_fone_isola_tudo_update_the/screen.png', tag:'ANTI-RUÍDO', featured:true,
    desc:'over-ear com cancelamento de ruído pra sumir do mundo por um tempo.'},
  {id:'fn02', name:'IN-EAR SEM MEDO', cat:'fones', price:159, art:'inear', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_sporty_in_ear_earbuds_in_ear_sem_medo_refresh_the/screen.png', tag:'À PROVA D\u2019ÁGUA', featured:false,
    desc:'intra-auricular resistente a suor, chuva e queda de skate.'},
  {id:'vn01', name:'PICK-UP GARAGEM', cat:'vinil', price:599, art:'turntable', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_portable_dj_vinyl_deck_pick_up_garagem_add_vibrant/screen.png', tag:'RETRÔ', featured:true,
    desc:'toca-discos portátil pra quem ainda acredita em vinil riscado.'},
  {id:'ac01', name:'PULSEIRA VIBRA-BEAT', cat:'acessivel', price:219, art:'wristband', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_haptic_bass_wristband_pulseira_vibra_beat_add/screen.png', tag:'LINHA ACESSÍVEL', featured:true,
    desc:'traduz o grave da música em vibração no pulso. feita pra comunidade surda sentir o show inteiro.'},
  {id:'ac02', name:'ALMOFADA SUBWOOFER TÁTIL', cat:'acessivel', price:279, art:'cushion', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_tactile_subwoofer_cushion_almofada_subwoofer_t_til/screen.png', tag:'LINHA ACESSÍVEL', featured:false,
    desc:'almofada que pulsa no ritmo da batida. senta, encosta e sente o beat no corpo inteiro.'},
  {id:'ac03', name:'FONE DE CONDUÇÃO ÓSSEA URBANO', cat:'acessivel', price:389, art:'bonecond', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_bone_conduction_headphones_fone_de_condu_o_ssea/screen.png', tag:'LINHA ACESSÍVEL', featured:false,
    desc:'transmite som pelo osso da bochecha, deixa o ouvido livre pra quem tem perda parcial de audição.'},
  {id:'ac04', name:'LUZ ESTROBO DE GRAVE', cat:'acessivel', price:129, art:'strobe', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_sound_reactive_strobe_light_luz_estrobo_de_grave/screen.png', tag:'ALERTA VISUAL', featured:false,
    desc:'pisca em sincronia com a batida. transforma o grave em luz pra quem não ouve o som.'},
  {id:'ap01', name:'CABO BLINDADO ANTIVANDALISMO', cat:'acessorios', price:39, art:'cable', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_audio_cable_cabo_blindado_antivandalismo_add_green/screen.png', tag:'P2/P10', featured:false,
    desc:'cabo reforçado que não arrebenta na primeira semana de uso.'},
  {id:'ap02', name:'AMPLIFICADOR DE BOLSO 20W', cat:'acessorios', price:149, art:'amp', image:'img/stitch_low_poly_product_assets/edit_this_retro_psx_low_poly_pocket_guitar_amplifier_amplificador_de_bolso_20w/screen.png', tag:'PORTÁTIL', featured:false,
    desc:'mini amplificador pra transformar qualquer caixinha velha em problema do prédio inteiro.'},
];

const CATEGORIES = [
  {id:'todos', label:'todos'},
  {id:'caixas', label:'caixas de som'},
  {id:'fones', label:'fones'},
  {id:'vinil', label:'vinil'},
  {id:'acessivel', label:'linha acessível'},
  {id:'acessorios', label:'acessórios'},
];

const NEWS = [
  {tag:'drop novo', color:'', title:'PULSEIRA VIBRA-BEAT CHEGOU', text:'o acessório que transforma grave em vibração real acabou de entrar no estoque.'},
  {tag:'guia da cena', color:'blue', title:'SENTIR O SOM SEM OUVIR', text:'como parte da galera vive o underground através de vibração e luz — e o que isso muda no equipamento.'},
  {tag:'agenda', color:'red', title:'BEATCORE NO SARAU DO VIADUTO', text:'sábado que vem, a loja monta banca no encontro de rua. testa os fones antes de levar.'},
  {tag:'restock', color:'', title:'PICK-UPS DE GARAGEM DE VOLTA', text:'toca-discos retrô voltou pro estoque depois de três semanas esgotado.'},
  {tag:'manifesto', color:'alt', title:'POR QUE A GENTE VENDE ISSO', text:'som não é luxo, é linguagem. a loja existe pra quem faz a própria regra — com ou sem ouvido.'},
];

let currentCategory = 'todos';

/* ---------------- STORAGE HELPERS ---------------- */
const LS = { users:'beatcore_users', session:'beatcore_session', cartPrefix:'beatcore_cart_' };
function safeGet(key, fallback){ try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }catch(e){ return fallback; } }
function safeSet(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} }
function getUsers(){ return safeGet(LS.users, {}); }
function getSession(){ try{ return localStorage.getItem(LS.session); }catch(e){ return null; } }
function setSession(u){ try{ if(u) localStorage.setItem(LS.session, u); else localStorage.removeItem(LS.session); }catch(e){} }
function getCart(user){ return safeGet(LS.cartPrefix+user, []); }
function setCart(user, cart){ safeSet(LS.cartPrefix+user, cart); }

/* ---------------- ROUTING ---------------- */
function go(view){
  const pages = {home:'index.html', loja:'loja.html', carrinho:'carrinho.html', login:'login.html'};
  if(pages[view]) window.location.href = pages[view];
}
function toggleMobileNav(){ document.getElementById('mobile-nav')?.classList.toggle('hidden'); }

/* ---------------- TOASTS ---------------- */
function toast(msg){
  const wrap = document.getElementById('toast-wrap');
  const t = document.createElement('div');
  t.className='toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(()=>t.remove(),300); }, 2600);
}

/* ---------------- RENDER: HOME ---------------- */
function renderNews(){
  const grid = document.getElementById('news-grid');
  if(!grid) return;
  grid.innerHTML = NEWS.map((n,i)=>`
    <article class="card card-tilt torn hard-border layer${n.color==='red'?'-red':n.color==='blue'?'-blue':''} tint-b p-5 ${i===0?'sm:col-span-2 lg:col-span-1':''}">
      <span class="peel"></span>
      <span class="sticker ${n.color==='alt'?'alt':n.color==='red'?'red':n.color==='blue'?'blue':''}">${n.tag}</span>
      <h3 class="display text-xl mt-3">${n.title}</h3>
      <p class="text-sm mt-2 leading-relaxed" style="color:var(--ink-soft)">${n.text}</p>
    </article>
  `).join('');
}

function renderFeatured(){
  const grid = document.getElementById('featured-grid');
  if(grid) grid.innerHTML = PRODUCTS.filter(p=>p.featured).map(productCard).join('');
}

/* ---------------- RENDER: CATALOG ---------------- */
function renderChips(){
  const row = document.getElementById('chip-row');
  if(!row) return;
  row.innerHTML = CATEGORIES.map(c=>`
    <button class="chip ${c.id===currentCategory?'active':''}" onclick="filterCategory('${c.id}')">${c.label}</button>
  `).join('');
}
function filterCategory(cat){ currentCategory = cat; renderChips(); renderCatalog(); }

function productCard(p){
  const layerClass = CAT_LAYER[p.cat];
  const tagClass = p.cat==='acessivel'||p.cat==='fones' ? 'red' : (p.cat==='vinil' ? 'blue' : '');
  return `
  <article class="card card-tilt torn hard-border ${layerClass} tint-b p-5 flex flex-col">
    <span class="peel"></span>
    <div class="photo-tile hard-border" style="aspect-ratio:1/1;">
      ${productArt(p)}
    </div>
    <div class="flex items-start justify-between gap-2 mt-4">
      <span class="sticker ${tagClass}">${p.tag}</span>
    </div>
    <h3 class="display text-xl mt-3">${p.name}</h3>
    <p class="text-xs mt-2 leading-relaxed flex-1" style="color:var(--ink-soft)">${p.desc}</p>
    <div class="flex items-center justify-between mt-5">
      <span class="font-bold" style="color:var(--red)">R$ ${p.price}</span>
      <button onclick="addToCart('${p.id}')" class="btn-punk !py-2 !px-3 !text-xs">+ carrinho</button>
    </div>
  </article>`;
}

function renderCatalog(){
  const grid = document.getElementById('catalog-grid');
  if(!grid) return;
  const q = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  let list = PRODUCTS.filter(p=>{
    const matchCat = currentCategory==='todos' || p.cat===currentCategory;
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
  grid.innerHTML = list.map(productCard).join('');
  document.getElementById('catalog-empty')?.classList.toggle('hidden', list.length>0);
}

/* ---------------- CART ---------------- */
function updateCartBadge(){
  const user = getSession();
  const cart = user ? getCart(user) : [];
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const badge = document.getElementById('cart-count');
  const badgeM = document.getElementById('cart-count-m');
  if(badge) badge.textContent = count;
  if(badgeM) badgeM.textContent = count;
  if(badge){ badge.style.animation='none'; void badge.offsetWidth; badge.style.animation='pop .25s ease'; }
}

function addToCart(id){
  const user = getSession();
  if(!user){ toast('entra na conta pra adicionar ⚡'); go('login'); return; }
  const cart = getCart(user);
  const existing = cart.find(i=>i.id===id);
  if(existing) existing.qty += 1; else cart.push({id, qty:1});
  setCart(user, cart);
  updateCartBadge();
  const p = PRODUCTS.find(p=>p.id===id);
  toast((p?p.name:'item') + ' foi pro carrinho');
}

function changeQty(id, delta){
  const user = getSession(); if(!user) return;
  let cart = getCart(user);
  const item = cart.find(i=>i.id===id); if(!item) return;
  item.qty += delta;
  if(item.qty<=0) cart = cart.filter(i=>i.id!==id);
  setCart(user, cart); renderCart(); updateCartBadge();
}
function removeItem(id){
  const user = getSession(); if(!user) return;
  setCart(user, getCart(user).filter(i=>i.id!==id));
  renderCart(); updateCartBadge();
}

function renderCart(){
  const user = getSession();
  const loggedOut = document.getElementById('cart-logged-out');
  const body = document.getElementById('cart-body');
  if(!loggedOut || !body) return;
  if(!user){ loggedOut.classList.remove('hidden'); body.classList.add('hidden'); return; }
  loggedOut.classList.add('hidden'); body.classList.remove('hidden');

  const cart = getCart(user);
  const itemsEl = document.getElementById('cart-items');
  const emptyMsg = document.getElementById('cart-empty-msg');
  if(cart.length===0){
    itemsEl.innerHTML=''; emptyMsg.classList.remove('hidden');
    document.getElementById('cart-total').textContent = 'R$ 0';
    return;
  }
  emptyMsg.classList.add('hidden');
  let total = 0;
  itemsEl.innerHTML = cart.map(item=>{
    const p = PRODUCTS.find(pr=>pr.id===item.id); if(!p) return '';
    const sub = p.price*item.qty; total += sub;
    return `
    <div class="hard-border layer tint-b p-4 flex items-center gap-4 flex-wrap">
      <div class="hard-border photo-tile" style="width:56px;height:56px;flex:none;">${productArt(p)}</div>
      <div class="flex-1 min-w-[140px]">
        <p class="font-bold">${p.name}</p>
        <p class="text-xs" style="color:var(--ink-soft)">R$ ${p.price} un.</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="changeQty('${p.id}',-1)" class="chip !px-2">-</button>
        <span class="font-bold w-6 text-center">${item.qty}</span>
        <button onclick="changeQty('${p.id}',1)" class="chip !px-2">+</button>
      </div>
      <span class="font-bold w-20 text-right" style="color:var(--red)">R$ ${sub}</span>
      <button onclick="removeItem('${p.id}')" class="text-xs hover:text-[var(--red)]" style="color:var(--ink-soft)">remover</button>
    </div>`;
  }).join('');
  document.getElementById('cart-total').textContent = 'R$ ' + total;
}

function checkout(){
  const user = getSession(); if(!user) return;
  const cart = getCart(user);
  if(cart.length===0){ toast('carrinho vazio, vai catar algo na loja primeiro'); return; }
  setCart(user, []); renderCart(); updateCartBadge();
  toast('pedido na fila 🔊 alguém te chama em breve');
}

/* ---------------- AUTH ---------------- */
function setAuthTab(tab){
  if(!document.getElementById('tab-entrar')) return;
  document.getElementById('tab-entrar').classList.toggle('active', tab==='entrar');
  document.getElementById('tab-criar').classList.toggle('active', tab==='criar');
  document.getElementById('form-entrar').classList.toggle('hidden', tab!=='entrar');
  document.getElementById('form-entrar').classList.toggle('flex', tab==='entrar');
  document.getElementById('form-criar').classList.toggle('hidden', tab!=='criar');
  document.getElementById('form-criar').classList.toggle('flex', tab==='criar');
}

function doLogin(e){
  e.preventDefault();
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  const users = getUsers();
  const err = document.getElementById('login-error');
  if(!users[user] || users[user] !== pass){ err.textContent='usuário ou senha errados.'; err.classList.remove('hidden'); return false; }
  err.classList.add('hidden');
  setSession(user); toast('valeu, ' + user); refreshAuthUI(); go('loja');
  return false;
}

function doRegister(e){
  e.preventDefault();
  const user = document.getElementById('reg-user').value.trim();
  const pass = document.getElementById('reg-pass').value;
  const err = document.getElementById('reg-error');
  const users = getUsers();
  if(!user || pass.length<3){ err.textContent='usuário e senha (mín. 3 caracteres) obrigatórios.'; err.classList.remove('hidden'); return false; }
  if(users[user]){ err.textContent='esse usuário já existe. tenta outro ou faz login.'; err.classList.remove('hidden'); return false; }
  err.classList.add('hidden');
  users[user] = pass; safeSet(LS.users, users);
  setSession(user); toast('conta criada. bem-vindo(a), ' + user); refreshAuthUI(); go('loja');
  return false;
}

function doLogout(){ setSession(null); toast('até mais'); refreshAuthUI(); updateCartBadge(); go('home'); }

function refreshAuthUI(){
  const user = getSession();
  const slot = document.getElementById('auth-slot');
  const slotM = document.getElementById('auth-slot-m');
  if(!slot || !slotM) return;
  if(user){
    slot.innerHTML = `<button onclick="go('login')" class="chip active" style="background:var(--yellow);color:#0b0b09;border-color:var(--yellow)">${user}</button>`;
    slotM.innerHTML = `<button onclick="go('login')" class="text-left">conta: ${user}</button>`;
    document.getElementById('form-entrar')?.classList.add('hidden');
    document.getElementById('form-criar')?.classList.add('hidden');
    document.getElementById('logged-panel')?.classList.remove('hidden');
    const name = document.getElementById('logged-name');
    if(name) name.textContent = user;
  } else {
    slot.innerHTML = `<button onclick="go('login')" class="btn-ghost !py-2 !px-3 !text-xs" style="border-color:var(--white);color:var(--white)">entrar</button>`;
    slotM.innerHTML = `<button onclick="go('login')" class="text-left">entrar</button>`;
    document.getElementById('logged-panel')?.classList.add('hidden');
    setAuthTab('entrar');
  }
  updateCartBadge();
}

/* ---------------- INIT ---------------- */
function init(){
  initTheme();
  if(location.pathname.endsWith('loja.html') && CATEGORIES.some(c=>c.id===location.hash.slice(1))){
    currentCategory = location.hash.slice(1);
  }
  renderNews(); renderFeatured(); renderChips(); renderCatalog(); renderCart(); refreshAuthUI(); updateCartBadge();
}
init();