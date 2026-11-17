/* ===== Yordamchilar ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const mem={};
const LS={get(k,d){try{const v=localStorage.getItem(k);return v===null?(mem[k]??d):JSON.parse(v)}catch(e){return mem[k]??d}},set(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let cur=LS.get("cur","USD");const RATE=12700;/* taxminiy kurs, oʻzgartirishingiz mumkin */
const fmt=n=>cur==="UZS"?Math.round(n*RATE).toLocaleString("ru-RU")+" soʻm":"$"+n.toLocaleString("en-US");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function toast(t){const e=$("#toast");e.textContent=t;e.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display="none",2300)}
function mix(h,a){const n=parseInt(h.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=a<0?0:255,p=Math.abs(a);r=Math.round(r+(t-r)*p);g=Math.round(g+(t-g)*p);b=Math.round(b+(t-b)*p);return"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}

/* ===== Mahsulot rasmlari (SVG, realistik chizma) =====
   Haqiqiy foto qoʻymoqchi boʻlsangiz: images/<id>.png (masalan images/iphone-pro.png)
   Fayl topilsa foto, topilmasa SVG koʻrinadi. */
const USE_IMAGES=true;
let gn=0;
function art(t,c){
 let D="";const G=(col,v)=>{const id="g"+(++gn);D+=`<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="1"><stop offset="0" stop-color="${mix(col,.38)}"/><stop offset=".5" stop-color="${col}"/><stop offset="1" stop-color="${mix(col,-.38)}"/></linearGradient>`;return`url(#${id})`};
 const d=mix(c,-.45),l=mix(c,.25),dk="#0b0b0d",F='font-family="Helvetica,Arial,sans-serif"';
 const wp=(x,y,w,h,r)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#sg)"/><ellipse cx="${x+w*.3}" cy="${y+h*.3}" rx="${w*.42}" ry="${h*.3}" fill="url(#wb)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#sh)" opacity=".4"/>`;
 const lens=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r+1.5}" fill="${mix(c,-.2)}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${dk}" stroke="${mix(c,-.55)}" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="${r*.6}" fill="#16243a"/><circle cx="${x}" cy="${y}" r="${r*.3}" fill="#05080d"/><circle cx="${x-r*.28}" cy="${y-r*.28}" r="${r*.16}" fill="#fff" opacity=".9"/>`;
 const body=(x,y,w,h,r)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${G(c)}" stroke="${l}" stroke-width="1.2"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#sh)" opacity=".35"/>`;
 const back=n=>body(58,12,84,176,19)+`<rect x="64" y="18" width="${n==3?46:40}" height="${n==3?46:40}" rx="12" fill="${G(l)}" stroke="${d}"/>`+(n==3?lens(77,32,9)+lens(77,52,9)+lens(97,42,9)+`<circle cx="99" cy="26" r="3" fill="#ffe9a8"/>`:lens(76,30,8)+lens(76,48,8)+`<circle cx="94" cy="26" r="3" fill="#ffe9a8"/>`)+`<circle cx="100" cy="112" r="9" fill="${l}" opacity=".55"/>`;
 const front=body(58,12,84,176,19)+`<rect x="61.5" y="15.5" width="77" height="169" rx="15.5" fill="#050506"/>`+wp(63,17,74,166,14)+`<rect x="88" y="21" width="24" height="7.5" rx="3.75" fill="#000"/><text x="100" y="42" text-anchor="middle" fill="#fff" font-size="6.5" opacity=".9" ${F}>Seshanba, 17-noyabr</text><text x="100" y="66" text-anchor="middle" fill="#fff" font-size="25" font-weight="300" ${F}>9:41</text><rect x="86" y="176" width="28" height="2.5" rx="1.2" fill="#fff" opacity=".8"/>`;
 const duo=n=>`<g transform="translate(-30 8) scale(.9)">${back(n)}</g><g transform="translate(22 0)">${front}</g>`;
 const stand=`<path d="M88 138h24l6 28H82z" fill="${G(c,1)}"/><rect x="62" y="166" width="76" height="6" rx="3" fill="${G(c,1)}"/>`;
 const T={
  pro:()=>duo(3),phone:()=>duo(2),
  thin:()=>`<g transform="translate(-30 8) scale(.9)">${body(66,10,68,180,14)}<rect x="66" y="24" width="68" height="24" rx="12" fill="${G(d)}"/>${lens(84,36,8)}<circle cx="112" cy="36" r="3" fill="#ffe9a8"/></g><g transform="translate(26 4) scale(.96)">${front}</g>`,
  laptop:()=>{let k="";for(let r=0;r<3;r++)for(let i=0;i<14;i++)k+=`<rect x="${42+i*8.6}" y="${131+r*3.6}" width="7.4" height="2.8" rx=".8" fill="${d}" opacity=".55"/>`;return`<rect x="38" y="38" width="124" height="88" rx="7" fill="${G(c)}"/><rect x="41.500" y="41.500" width="117" height="81" rx="3.5" fill="${dk}"/>${wp(43,43,114,78,2.5)}<rect x="91" y="42" width="18" height="4" rx="2" fill="${dk}"/><text x="100" y="88" text-anchor="middle" fill="#fff" font-size="17" font-weight="300" ${F}>10:09</text><path d="M14 126H186L180 150Q100 158 20 150Z" fill="${G(c,1)}" stroke="${l}" stroke-width=".6"/>${k}<rect x="84" y="126" width="32" height="3" rx="1.5" fill="${d}" opacity=".6"/><rect x="82" y="143" width="36" height="5" rx="2" fill="${d}" opacity=".2"/>`},
  tablet:()=>`${body(24,42,152,116,13)}<rect x="29" y="47" width="142" height="106" rx="8" fill="${dk}"/>${wp(31,49,138,102,6.5)}<circle cx="100" cy="44.500" r="1.400" fill="${dk}"/><text x="100" y="108" text-anchor="middle" fill="#fff" font-size="20" font-weight="300" ${F}>9:41</text>`,
  watch:()=>`<rect x="76" y="4" width="48" height="58" rx="10" fill="${G(mix(c,.35),1)}"/><rect x="76" y="138" width="48" height="58" rx="10" fill="${G(mix(c,.35),1)}"/><path d="M82 14H118M82 22H118M82 30H118M82 160H118M82 168H118M82 176H118" stroke="${mix(c,-.2)}" opacity=".35"/>${body(62,54,76,92,24)}<rect x="68" y="60" width="64" height="80" rx="19" fill="#000"/><g transform="rotate(-90 100 106)" fill="none" stroke-width="5" stroke-linecap="round"><circle cx="100" cy="106" r="24" stroke="#ff2d55" stroke-dasharray="120 151"/><circle cx="100" cy="106" r="17" stroke="#a4ff00" stroke-dasharray="80 107"/><circle cx="100" cy="106" r="10" stroke="#00d4ff" stroke-dasharray="40 63"/></g><text x="100" y="76" text-anchor="middle" fill="#fff" font-size="10" ${F}>10:09</text><rect x="138" y="82" width="5" height="16" rx="2" fill="${l}"/><rect x="138" y="108" width="4" height="22" rx="2" fill="${d}"/>`,
  buds:()=>`${body(48,104,104,76,32)}<path d="M50 130H150" stroke="${d}" opacity=".5"/><circle cx="100" cy="144" r="2.500" fill="#5be37a"/><ellipse cx="76" cy="56" rx="16" ry="18" fill="${G(c)}" stroke="${mix(c,-.15)}"/><rect x="70" y="64" width="11" height="40" rx="5.5" fill="${G(c)}"/><ellipse cx="124" cy="56" rx="16" ry="18" fill="${G(c)}" stroke="${mix(c,-.15)}"/><rect x="119" y="64" width="11" height="40" rx="5.5" fill="${G(c)}"/><circle cx="72" cy="52" r="3" fill="${dk}" opacity=".5"/><circle cx="128" cy="52" r="3" fill="${dk}" opacity=".5"/>`,
  max:()=>`<path d="M48 118V96a52 52 0 0 1 104 0v22" fill="none" stroke="${G(mix(c,-.2))}" stroke-width="9" stroke-linecap="round"/><ellipse cx="46" cy="132" rx="22" ry="34" fill="${G(c)}"/><ellipse cx="154" cy="132" rx="22" ry="34" fill="${G(c)}"/><ellipse cx="46" cy="132" rx="13" ry="24" fill="${d}" opacity=".4"/><ellipse cx="154" cy="132" rx="13" ry="24" fill="${d}" opacity=".4"/><ellipse cx="40" cy="120" rx="6" ry="14" fill="#fff" opacity=".18"/>`,
  tv:()=>`<rect x="46" y="94" width="108" height="40" rx="12" fill="${G(c,1)}"/><path d="M50 99Q100 108 150 99" stroke="${l}" fill="none" opacity=".45"/><circle cx="100" cy="124" r="2" fill="#5be37a"/>`,
  speaker:()=>`<rect x="60" y="38" width="80" height="126" rx="36" fill="${G(c,1)}"/><ellipse cx="100" cy="58" rx="26" ry="7" fill="url(#sg)"/><path d="M64 82Q100 92 136 82M62 106Q100 116 138 106M64 130Q100 140 136 130M66 150Q100 158 134 150" stroke="${l}" stroke-width="1" fill="none" opacity=".3"/>`,
  pod:()=>`<rect x="66" y="86" width="68" height="84" rx="34" fill="${G(c,1)}"/><ellipse cx="100" cy="104" rx="20" ry="6" fill="url(#sg)"/>`,
  imac:()=>`<rect x="24" y="26" width="152" height="112" rx="10" fill="${G(c)}"/>${wp(30,32,140,86,3)}<circle cx="100" cy="128" r="3" fill="${l}" opacity=".7"/><text x="100" y="82" text-anchor="middle" fill="#fff" font-size="18" font-weight="300" ${F}>9:41</text>${stand}`,
  disp:()=>`<rect x="24" y="26" width="152" height="112" rx="10" fill="${G(c)}"/><rect x="28" y="30" width="144" height="104" rx="6" fill="${dk}"/>${wp(30,32,140,100,5)}${stand}`,
  mini:()=>`<rect x="38" y="96" width="124" height="40" rx="11" fill="${G(c,1)}"/><path d="M44 100H156" stroke="${l}" opacity=".7"/><circle cx="52" cy="124" r="2" fill="${d}"/><circle cx="62" cy="124" r="2" fill="${d}"/><rect x="38" y="96" width="124" height="40" rx="11" fill="url(#sh)" opacity=".3"/>`,
  studio:()=>`<rect x="52" y="76" width="96" height="66" rx="13" fill="${G(c,1)}"/><path d="M58 80H142" stroke="${l}" opacity=".7"/><circle cx="66" cy="130" r="2" fill="${d}"/><circle cx="76" cy="130" r="2" fill="${d}"/><rect x="52" y="76" width="96" height="66" rx="13" fill="url(#sh)" opacity=".3"/>`,
  vision:()=>`<path d="M28 96Q6 100 6 112M172 96Q194 100 194 112" stroke="#8d8d92" stroke-width="9" fill="none" stroke-linecap="round"/><rect x="22" y="64" width="156" height="74" rx="37" fill="${G(c)}" stroke="${mix(c,.3)}" stroke-width="3"/><rect x="30" y="72" width="140" height="58" rx="29" fill="#141418"/><rect x="30" y="72" width="140" height="58" rx="29" fill="url(#sg)" opacity=".28"/><path d="M52 84Q100 70 148 84" stroke="#fff" opacity=".3" stroke-width="3" fill="none"/><rect x="30" y="72" width="140" height="58" rx="29" fill="url(#sh)" opacity=".35"/>`,
  pencil:()=>`<rect x="91" y="14" width="18" height="140" rx="9" fill="${G(c)}" stroke="${mix(c,-.15)}"/><path d="M91 154H109L100 182Z" fill="${G("#d0d0d4")}"/><rect x="95" y="20" width="3" height="120" rx="1.5" fill="#fff" opacity=".45"/>`,
  kb:()=>{let k="";for(let r=0;r<3;r++)for(let i=0;i<11;i++)k+=`<rect x="${31+i*12.3}" y="${104+r*13}" width="10.5" height="10.5" rx="2.2" fill="${d}" opacity=".5"/>`;return`<rect x="20" y="94" width="160" height="54" rx="9" fill="${G(c)}"/>`+k},
  tag:()=>`<circle cx="100" cy="100" r="48" fill="${G("#d9dadc")}"/><circle cx="100" cy="100" r="36" fill="${G("#f4f4f6")}"/><circle cx="100" cy="100" r="9" fill="#bbb"/><circle cx="100" cy="100" r="48" fill="url(#sh)" opacity=".4"/>`,
  chg:()=>`<path d="M100 150Q100 190 150 186" stroke="#bbb" stroke-width="6" fill="none"/><circle cx="100" cy="100" r="46" fill="${G(c)}"/><circle cx="100" cy="100" r="30" fill="none" stroke="${d}" stroke-width="3" opacity=".4"/><circle cx="100" cy="100" r="10" fill="${l}"/><circle cx="100" cy="100" r="46" fill="url(#sh)" opacity=".4"/>`
 };
 const b=T[t]();
 return`<svg viewBox="0 0 200 200" role="img"><defs>${D}</defs><ellipse cx="100" cy="191" rx="62" ry="5" fill="#000" opacity=".28" filter="url(#bl)"/>${b}</svg>`;
}
function fb(img){const p=P[img.dataset.i];img.parentNode.innerHTML=art(p.t,img.dataset.col||p.col)}
const pic=(i,col)=>{const p=P[i];col=col||p.col;return`<span class="pic">${USE_IMAGES?`<img src="images/${p.id}.png" alt="${esc(p.n)}" loading="lazy" data-i="${i}" data-col="${col}" onerror="fb(this)">`:art(p.t,col)}</span>`};

/* ===== Maʼlumotlar ===== */
const CATS=[["mac","Mac"],["ipad","iPad"],["iphone","iPhone"],["watch","Watch"],["vision","Vision"],["airpods","AirPods"],["tv","TV va Uy"],["acc","Aksessuarlar"]];
const catName=k=>(CATS.find(c=>c[0]===k)||[0,k])[1];
const RAW=[
["iphone-pro","iPhone Pro","iphone","pro","#8d9097",1099,"Eng kuchli iPhone: professional kamera tizimi.",["6.3″ OLED ekran, ProMotion","Uch kamerali Pro tizim","USB‑C, MagSafe, 5G"]],
["iphone","iPhone","iphone","phone","#5b8def",799,"Kundalik foydalanish uchun tez va ishonchli.",["6.1″ OLED ekran","Qoʻsh kamerali tizim","USB‑C, MagSafe, 5G"]],
["iphone-air","iPhone Air","iphone","thin","#d9dadc",999,"Eng yupqa va yengil dizayndagi iPhone.",["Ultra yupqa titan korpus","6.5″ ekran","Bitta ilgʻor kamera"]],
["macbook-air","MacBook Air","mac","laptop","#d9dadc",999,"Yengil noutbuk, kun boʻyi batareya.",["13″ yoki 15″ Liquid Retina ekran","Jim ishlaydi (sovutgichsiz)","Kun boʻyi batareya"]],
["macbook-pro","MacBook Pro","mac","laptop","#2b2b2e",1599,"Professionallar uchun kuchli noutbuk.",["14″ yoki 16″ mini‑LED ekran","HDMI, SD karta, Thunderbolt","Uzoq batareya"]],
["imac","iMac","mac","imac","#5b8def",1299,"Yagona korpusdagi rangli kompyuter.",["24″ 4.5K Retina displey","Olti dinamikli tovush","Rangli korpus"]],
["mac-mini","Mac mini","mac","mini","#c9cacd",599,"Kichik, ammo kuchli stol kompyuteri.",["Ixcham korpus","Koʻp portli","Istalgan monitor bilan"]],
["mac-studio","Mac Studio","mac","studio","#c9cacd",1999,"Studiya ishlari uchun yuqori unumdorlik.",["Yuqori unumdorlik","Koʻp ulanish portlari","Ixcham korpus"]],
["studio-display","Studio Display","mac","disp","#c9cacd",1599,"Katta va aniq rangli tashqi monitor.",["27″ 5K Retina","12 MP keng burchakli kamera","Olti dinamikli tovush"]],
["ipad-pro","iPad Pro","ipad","tablet","#2b2b2e",999,"Eng ilgʻor planshet, ingichka va kuchli.",["OLED ekran","Juda ingichka korpus","Apple Pencil Pro bilan mos"]],
["ipad-air","iPad Air","ipad","tablet","#5b8def",599,"Yengil va koʻp qirrali planshet.",["11″ yoki 13″ Liquid Retina","Magic Keyboard bilan mos","Yengil korpus"]],
["ipad","iPad","ipad","tablet","#e9a7c0",349,"Kundalik ish va oʻqish uchun planshet.",["10.9″ Liquid Retina","USB‑C","Rangli korpuslar"]],
["ipad-mini","iPad mini","ipad","tablet","#d8b98a",499,"Choʻntakka sigʻadigan ixcham iPad.",["8.3″ ekran","Juda ixcham","Apple Pencil bilan mos"]],
["watch-series","Apple Watch Series","watch","watch","#2b2b2e",399,"Salomatlik va faollikni kuzatuvchi soat.",["Doim yoniq ekran","EKG va qon kislorodi","Uyqu va faollik kuzatuvi"]],
["watch-ultra","Apple Watch Ultra","watch","watch","#c9cacd",799,"Sport va sarguzashtlar uchun mustahkam soat.",["Titan korpus","Uzoq batareya","Sholʻngʻish va sarguzasht"]],
["watch-se","Apple Watch SE","watch","watch","#e9a7c0",249,"Asosiy funksiyalar bilan hamyonbop soat.",["Yurak urishi kuzatuvi","Faollik halqalari","Hamyonbop narx"]],
["vision-pro","Apple Vision Pro","vision","vision","#9a9aa0",3499,"Fazoviy hisoblash: ilovalar atrofingizda.",["Ikki mikro‑OLED displey","Koʻz va qoʻl bilan boshqarish","Fazoviy video va audio"]],
["airpods-pro","AirPods Pro","airpods","buds","#f1f1f3",249,"Shovqinni bostirish va yuqori tovush sifati.",["Faol shovqin bostirish","Fazoviy audio","MagSafe zaryad g‘ilofi"]],
["airpods","AirPods","airpods","buds","#f1f1f3",129,"Qulay va oson ulanadigan quloqchinlar.",["Qulay oʻrnashadi","Tez ulanish","Uzoq ishlash"]],
["airpods-max","AirPods Max","airpods","max","#9bb5d6",549,"Quloq usti premium quloqchinlari.",["Faol shovqin bostirish","Premium materiallar","Fazoviy audio"]],
["apple-tv","Apple TV 4K","tv","tv","#2b2b2e",129,"Kino va seriallar uchun 4K strimer.",["4K HDR","Dolby Atmos","Siri Remote"]],
["homepod","HomePod","tv","speaker","#2b2b2e",299,"Boy tovushli aqlli dinamik.",["Boy tovush","Aqlli uy markazi","Fazoviy audio"]],
["homepod-mini","HomePod mini","tv","pod","#5b8def",99,"Kichik aqlli dinamik, katta tovush.",["360° tovush","Siri","Ixcham"]],
["apple-pencil","Apple Pencil","acc","pencil","#f1f1f3",129,"iPad uchun aniq yozish va chizish qalami.",["Aniq chizish","Magnit bilan yopishadi","Past kechikish"]],
["magic-keyboard","Magic Keyboard","acc","kb","#d9dadc",299,"Qulay va simsiz klaviatura.",["Qulay tugmalar","Trackpad","Qayta zaryadlanadi"]],
["airtag","AirTag","acc","tag","#c9cacd",29,"Buyumlaringizni topishga yordam beradi.",["Find My bilan ishlaydi","Almashtiriladigan batareya","Ixcham"]],
["magsafe","MagSafe zaryadlovchi","acc","chg","#f1f1f3",39,"Magnitli simsiz zaryadlash.",["Magnitli simsiz zaryad","Qulay oʻrnatish","Oson ishlatish"]]
];
const P=RAW.map(([id,n,c,t,col,pr,d,s])=>({id,n,c,t,col,pr,d,s})),byId=Object.fromEntries(P.map(p=>[p.id,p]));
const idx=id=>P.findIndex(p=>p.id===id);
const SW={iphone:["#8d9097","#2b2b2e","#d8c7b0","#5b8def","#cf8a52"],def:["#2b2b2e","#d9dadc","#5b8def","#d8b98a","#e9a7c0"]};
const OPT={iphone:[["256 GB",0],["512 GB",200],["1 TB",400]],mac:[["16 GB / 512 GB",0],["24 GB / 1 TB",400],["32 GB / 2 TB",800]],ipad:[["256 GB",0],["512 GB",200],["1 TB",400]],watch:[["41 mm",0],["45 mm",30]],vision:[["256 GB",0],["512 GB",200]]};
const opts=p=>["disp","mini"].includes(p.t)&&p.c==="mac"?null:OPT[p.c]||null;
const swatches=p=>p.c==="airpods"||p.c==="acc"?null:[p.col,...(SW[p.c]||SW.def).filter(c=>c!==p.col)].slice(0,5);

/* ===== Holat ===== */
let cart=LS.get("cart",[]),wl=LS.get("wl",[]),cmp=LS.get("cmp",[]),user=LS.get("user",null),orders=LS.get("orders",[]),tm=null;
function sv(){LS.set("cart",cart);LS.set("wl",wl);LS.set("cmp",cmp);
 const q=cart.reduce((s,x)=>s+x.q,0);$("#bc").textContent=q||"";$("#wc").textContent=wl.length||"";$("#un").textContent=user?user.name.split(" ")[0]:"";
 const b=$("#cmpbar");if(cmp.length){b.style.display="flex";b.innerHTML=`<span>Solishtirish: ${cmp.map(i=>esc(byId[i].n)).join(", ")}</span><a href="#/compare">Koʻrish</a><button data-cc>✕</button>`}else b.style.display="none"}
const line=x=>{const p=byId[x.id],o=opts(p)?opts(p)[x.o]:null;return{p,o,price:p.pr+(o?o[1]:0)}};
function addCart(id,o=0,c=0){const k=cart.find(x=>x.id===id&&x.o===o&&x.c===c);k?k.q++:cart.push({id,o,c,q:1});sv();toast(byId[id].n+" savatga qoʻshildi")}
function togWl(id){wl=wl.includes(id)?wl.filter(x=>x!==id):[...wl,id];sv();toast(wl.includes(id)?"Saralanganlarga qoʻshildi":"Saralanganlardan olib tashlandi");$$(`[data-wl="${id}"]`).forEach(b=>b.classList.toggle("on",wl.includes(id)))}
function togCmp(id){if(cmp.includes(id))cmp=cmp.filter(x=>x!==id);else if(cmp.length>=3){toast("Eng koʻpi bilan 3 ta mahsulot");return false}else cmp.push(id);sv();return true}

/* ===== Navbar ===== */
const NAV=[["Store","#/store"],["Mac","mac"],["iPad","ipad"],["iPhone","iphone"],["Watch","watch"],["Vision","vision"],["AirPods","airpods"],["TV va Uy","tv"],["Xizmatlar","#/services"],["Support","#/support"],["Koʻproq","#/more"]];
$("#menu").innerHTML=NAV.map((n,i)=>`<li><button data-n="${i}">${n[0]}</button></li>`).join("");
const mq=matchMedia("(min-width:901px)");let open=-1;
const card=i=>{const p=P[i];return`<div class="card rv" data-go="#/p/${p.id}"><button class="h ${wl.includes(p.id)?"on":""}" data-wl="${p.id}" aria-label="Saralash">♥</button>${pic(i)}<h3>${esc(p.n)}</h3><small>${esc(p.d)}</small><b>${fmt(p.pr)} dan</b><label><input type="checkbox" data-cmp="${p.id}" ${cmp.includes(p.id)?"checked":""}> Solishtirish</label></div>`};
function mega(i){
 closePop();const k=NAV[i][1];if(k[0]==="#")return hide();
 open=i;$$("#menu button").forEach(b=>b.classList.toggle("on",+b.dataset.n===i));
 $("#mi").innerHTML=`<h6>${NAV[i][0]} — mahsulotlar</h6><div class="mg">${P.map((p,j)=>p.c===k?`<a href="#/p/${p.id}">${pic(j)}${esc(p.n)}<small>${fmt(p.pr)} dan</small></a>`:"").join("")}<a href="#/store/${k}" style="color:var(--ac);align-self:center">Hammasini koʻrish ›</a></div>`;
 $("#mega").classList.add("on");$("#scr").classList.add("on");
}
function hide(){open=-1;$("#mega").classList.remove("on");$("#scr").classList.remove("on");$$("#menu button").forEach(b=>b.classList.remove("on"))}
function closePop(){$("#sr").classList.remove("on")}
function closeAll(){hide();closePop();$("#menu").classList.remove("on");$("#ov").classList.remove("on")}
$("#menu").addEventListener("mouseover",e=>{const b=e.target.closest("button");if(b&&mq.matches)mega(+b.dataset.n)});
$("#nav").addEventListener("mouseleave",()=>{if(mq.matches)hide()});
$("#menu").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const n=NAV[+b.dataset.n];
 if(n[1][0]==="#"){location.hash=n[1];closeAll()}
 else if(mq.matches){location.hash="#/store/"+n[1];closeAll()}else{location.hash="#/store/"+n[1];closeAll()}});
$("#scr").onclick=closeAll;
$("#burger").onclick=()=>{closePop();$("#menu").classList.toggle("on")};
$("#th").onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};
$("#bg").onclick=()=>location.hash="#/cart";
$("#wb").onclick=()=>location.hash="#/account";
$("#us").onclick=()=>user?location.hash="#/account":authModal("login");

/* Qidiruv */
$("#sb").onclick=()=>{const o=!$("#sr").classList.contains("on");closeAll();if(o){$("#sr").classList.add("on");$("#scr").classList.add("on");$("#si").value="";list("");$("#si").focus()}};
function list(q){q=q.toLowerCase().trim();const r=P.map((p,i)=>[p,i]).filter(([p])=>!q||(p.n+" "+catName(p.c)+" "+p.d).toLowerCase().includes(q)).slice(0,q?10:6);
 $("#sl").innerHTML=(q?"":`<small style="color:var(--mu)">Mashhur mahsulotlar</small>`)+(r.map(([p,i])=>`<a class="sr" href="#/p/${p.id}">${pic(i)}<span>${esc(p.n)}<small>${catName(p.c)} · ${fmt(p.pr)} dan</small></span></a>`).join("")||`<p style="color:var(--mu)">Hech narsa topilmadi.</p>`)}
$("#si").oninput=e=>list(e.target.value);

/* ===== Sahifalar ===== */
function route(){
 closeAll();clearInterval(tm);
 const h=location.hash.replace(/^#\/?/,"").split("/"),v=h[0]||"home",a=$("#app");
 ({home:vHome,store:vStore,p:vProduct,compare:vCompare,services:vServices,support:vSupport,cart:vCart,account:vAccount,login:a=>vAuth(a,"login"),register:a=>vAuth(a,"register"),forgot:a=>vAuth(a,"forgot"),tradein:vTrade,edu:vEdu,stores:vStores,news:vNews,track:vTrack,more:vMore}[v]||vHome)(a,h[1]);
 document.title="Apple – demo"+(v!=="home"?" · "+v:"");
 scrollTo(0,0);reveal();
}
function reveal(){const els=$$(".rv:not(.in)");if(!("IntersectionObserver"in window))return els.forEach(e=>e.classList.add("in"));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.08});els.forEach(e=>io.observe(e))}

function vHome(a){
 const S=[["iphone-pro","iPhone Pro","Yangi avlod. Yangi imkoniyatlar."],["macbook-pro","MacBook Pro","Professionallar uchun ajoyib kuch."],["vision-pro","Apple Vision Pro","Kompyuter endi sizning atrofingizda."]];
 const T=[["ipad-pro","iPad Pro","Haqiqiy kuch. Ingichka dizayn."],["watch-ultra","Apple Watch Ultra","Sarguzashtlar uchun yaratilgan.",1],["airpods-pro","AirPods Pro","Shovqinsiz sof tovush.",1],["imac","iMac","Rang. Quvvat. Soddalik."]];
 a.innerHTML=`<div class="sub"><a href="#/tradein">Trade-In</a><a href="#/edu">Talabalar uchun</a><a href="#/stores">Doʻkonlar</a><a href="#/news">Yangiliklar</a><a href="#/track">Buyurtmani kuzatish</a></div><div class="hs">${S.map((s,k)=>`<div class="slide ${k?"":"on"}"><div><h1>${s[1]}</h1><p>${s[2]}</p><p><b>${fmt(byId[s[0]].pr)}</b> dan</p><a class="btn" href="#/p/${s[0]}">Batafsil</a><button class="btn o" data-buy="${s[0]}">Savatga</button></div><div class="a">${pic(idx(s[0]))}</div></div>`).join("")}<div class="dots">${S.map((_,k)=>`<i class="${k?"":"on"}" data-d="${k}"></i>`).join("")}</div></div>
 <div class="tiles">${T.map(t=>`<div class="tile rv ${t[3]?"dk":""}" data-go="#/p/${t[0]}"><div><h3>${t[1]}</h3><p>${t[2]}</p><span style="color:var(--ac)">Batafsil › &nbsp; ${fmt(byId[t[0]].pr)} dan</span></div>${pic(idx(t[0]))}</div>`).join("")}</div>
 <div class="wrap"><h2 class="t rv">Mashhur mahsulotlar</h2><div class="hscroll">${["iphone","macbook-air","ipad-air","watch-series","airpods","homepod-mini"].map(id=>card(idx(id))).join("")}</div></div>
 <div class="wrap"><h2 class="t rv">Nega Apple?</h2><div class="feat">${[["🔒","Maxfiylik","Maʼlumotlaringiz sizniki."],["♻️","Atrof-muhit","Qayta ishlangan materiallar."],["🚚","Bepul yetkazish","Barcha buyurtmalar uchun (demo)."],["🔧","Servis","Rasmiy yordam va ta’mirlash."]].map(f=>`<div class="rv"><i>${f[0]}</i><b>${f[1]}</b><span>${f[2]}</span></div>`).join("")}</div></div>`;
 a.insertAdjacentHTML("beforeend",homeExtra());reveal();let cur=0;const sl=$$(".slide",a),dt=$$(".dots i",a);const go=k=>{cur=(k+sl.length)%sl.length;sl.forEach((s,j)=>s.classList.toggle("on",j===cur));dt.forEach((s,j)=>s.classList.toggle("on",j===cur))};
 tm=setInterval(()=>go(cur+1),5000);$(".dots",a).onclick=e=>{const i=e.target.closest("[data-d]");if(i)go(+i.dataset.d)};
}

function vStore(a,k){
 k=k||"all";const q=vStore.q||"",so=vStore.s||"def";
 let l=P.map((p,i)=>[p,i]).filter(([p])=>(k==="all"||p.c===k)&&(p.n+p.d).toLowerCase().includes(q.toLowerCase()));
 if(so==="up")l.sort((x,y)=>x[0].pr-y[0].pr);if(so==="down")l.sort((x,y)=>y[0].pr-x[0].pr);if(so==="az")l.sort((x,y)=>x[0].n.localeCompare(y[0].n));
 a.innerHTML=`<div class="wrap"><h2 class="t">Store${k!=="all"?" — "+catName(k):""}</h2><div class="tools">${[["all","Hammasi"],...CATS].map(c=>`<a class="chip ${k===c[0]?"on":""}" href="#/store/${c[0]}">${c[1]}</a>`).join("")}<span class="sp"></span><input id="fq" placeholder="Qidirish…" value="${esc(q)}"><select id="fs"><option value="def">Saralash</option><option value="up" ${so==="up"?"selected":""}>Narx ↑</option><option value="down" ${so==="down"?"selected":""}>Narx ↓</option><option value="az" ${so==="az"?"selected":""}>Nomi A–Z</option></select></div><div class="grid">${l.map(([,i])=>card(i)).join("")||"<p>Hech narsa topilmadi.</p>"}</div></div>`;
 $("#fq").oninput=e=>{vStore.q=e.target.value;const p=e.target.selectionStart;vStore(a,k);const f=$("#fq");f.focus();f.setSelectionRange(p,p)};
 $("#fs").onchange=e=>{vStore.s=e.target.value;vStore(a,k)};
 reveal();
}

function vProduct(a,id){
 const p=byId[id];if(!p){a.innerHTML=`<div class="wrap"><h2 class="t">Mahsulot topilmadi</h2><a class="btn" href="#/store">Store</a></div>`;return}
 const i=idx(id),O=opts(p),W=swatches(p);let so=0,sc=0;{const r=LS.get("rv",[]).filter(x=>x!==id);r.unshift(id);LS.set("rv",r.slice(0,6))}
 a.innerHTML=`<div class="wrap"><div class="crumb"><a href="#/">Bosh sahifa</a> › <a href="#/store/${p.c}">${catName(p.c)}</a> › ${esc(p.n)}</div>
 <div class="pd"><div class="im" id="pim">${pic(i)}</div><div><h1>${esc(p.n)}</h1><div id="pst" style="color:#f5a623;margin-bottom:6px"></div><p style="color:var(--mu);font-size:18px">${esc(p.d)}</p><div class="price" id="pp">${fmt(p.pr)}</div>
 ${W?`<b>Rang</b><div class="sw" id="psw">${W.map((c,k)=>`<button style="background:${c}" class="${k?"":"on"}" data-sc="${k}" aria-label="Rang ${k+1}"></button>`).join("")}</div>`:""}
 ${O?`<b>Xotira / oʻlcham</b><div class="opts" id="pop">${O.map((o,k)=>`<button class="chip ${k?"":"on"}" data-so="${k}">${o[0]}${o[1]?` <small>+${fmt(o[1])}</small>`:""}</button>`).join("")}</div>`:""}
 <button class="btn full" id="pbuy">Savatga qoʻshish</button><button class="btn o full" id="pwl">${wl.includes(id)?"♥ Saralangan":"♡ Saralash"}</button><button class="btn o full" id="pcm">${cmp.includes(id)?"Solishtirishdan olish":"⇄ Solishtirish"}</button>
 <ul class="specs">${p.s.map(s=>`<li>✓ ${esc(s)}</li>`).join("")}</ul><div class="sv" style="padding:16px"><b>Boʻlib toʻlash (demo)</b><br><select class="f" id="fmo" style="margin:8px 0"><option value="6">6 oy</option><option value="12" selected>12 oy</option><option value="24">24 oy</option></select><span id="fm"></span></div><small style="color:var(--mu)">Narx taxminiy, AQSh dollarida.</small></div></div><div class="wrap" style="padding:30px 0 0"><h2 class="t">Sharhlar <small style="font-size:14px;color:var(--mu)">(namunaviy)</small></h2><div class="two"><div id="rl"></div><div class="sv"><b>Sharh qoldirish</b><select class="f" id="rr" style="margin-top:10px"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select><textarea class="f" id="rt" rows="3" placeholder="Fikringiz…"></textarea><button class="btn sm" id="rs">Yuborish</button></div></div></div>
 <h2 class="t" style="margin-top:50px">Shu toifadagi boshqa mahsulotlar</h2><div class="grid">${P.map((q,j)=>q.c===p.c&&q.id!==id?card(j):"").join("")}</div></div>`;
 const upd=()=>{const pr=p.pr+(O?O[so][1]:0);$("#pp").textContent=fmt(pr);$("#fm").textContent="Oyiga: "+fmt(Math.round(pr/$("#fmo").value))+" × "+$("#fmo").value+" oy (0%)"};
 $("#fmo").onchange=upd;upd();
 const drawRev=()=>{const R=reviews(id),av=R.reduce((s,x)=>s+x.r,0)/R.length;$("#pst").textContent=stars(av)+"  "+av.toFixed(1)+" ("+R.length+")";$("#rl").innerHTML=R.map(x=>`<div class="rev"><b>${esc(x.n)}</b> <span style="color:#f5a623">${stars(x.r)}</span><p style="margin:4px 0;color:var(--mu)">${esc(x.t)}</p></div>`).join("")};drawRev();
 $("#rs").onclick=()=>{if(!user){toast("Avval hisobga kiring");return}const t=$("#rt").value.trim();if(t.length<5)return toast("Sharh juda qisqa");const all=LS.get("rev",{});(all[id]=all[id]||[]).unshift({n:user.name,r:+$("#rr").value,t});LS.set("rev",all);$("#rt").value="";drawRev();toast("Sharh qoʻshildi")};
 $("#psw")&&($("#psw").onclick=e=>{const b=e.target.closest("[data-sc]");if(!b)return;sc=+b.dataset.sc;$$("#psw button").forEach(x=>x.classList.toggle("on",x===b));$("#pim").innerHTML=pic(i,W[sc])});
 $("#pop")&&($("#pop").onclick=e=>{const b=e.target.closest("[data-so]");if(!b)return;so=+b.dataset.so;$$("#pop button").forEach(x=>x.classList.toggle("on",x===b));upd()});
 $("#pbuy").onclick=()=>addCart(id,so,sc);
 $("#pwl").onclick=()=>{togWl(id);$("#pwl").textContent=wl.includes(id)?"♥ Saralangan":"♡ Saralash"};
 $("#pcm").onclick=()=>{togCmp(id);$("#pcm").textContent=cmp.includes(id)?"Solishtirishdan olish":"⇄ Solishtirish"};
 reveal();
}

function vCompare(a){
 const L=cmp.map(id=>byId[id]);
 a.innerHTML=`<div class="wrap"><h2 class="t">Mahsulotlarni solishtirish</h2>${L.length<2?`<p>Solishtirish uchun kamida 2 ta mahsulot tanlang (kartochkadagi “Solishtirish”).</p><a class="btn" href="#/store">Store</a>`:`<div style="overflow-x:auto"><table class="tbl"><tr><th></th>${L.map(p=>`<th>${pic(idx(p.id))}<br>${esc(p.n)}</th>`).join("")}</tr><tr><td>Narx</td>${L.map(p=>`<td><b>${fmt(p.pr)} dan</b></td>`).join("")}</tr><tr><td>Toifa</td>${L.map(p=>`<td>${catName(p.c)}</td>`).join("")}</tr>${[0,1,2].map(k=>`<tr><td>Xususiyat ${k+1}</td>${L.map(p=>`<td>${esc(p.s[k])}</td>`).join("")}</tr>`).join("")}<tr><td></td>${L.map(p=>`<td><a class="btn sm" href="#/p/${p.id}">Batafsil</a></td>`).join("")}</tr></table></div>`}</div>`;
}

function vServices(a){
 const S=[["☁️","iCloud+","Fayllar, rasmlar va zaxira nusxalari bir joyda."],["🎵","Apple Music","Millionlab qoʻshiqlar, reklamasiz."],["📺","Apple TV+","Original seriallar va filmlar."],["🎮","Apple Arcade","Reklamasiz oʻyinlar toʻplami."],["🏃","Fitness+","Uyda mashq qilish uchun mashgʻulotlar."],["📦","Apple One","Barcha xizmatlar bitta obunada."]];
 a.innerHTML=`<div class="wrap"><h2 class="t">Xizmatlar</h2><div class="grid">${S.map(s=>`<div class="sv rv"><i>${s[0]}</i><h3>${s[1]}</h3><p>${s[2]}</p><button class="btn sm" style="margin-top:14px" data-sub="${s[1]}">Obuna boʻlish</button></div>`).join("")}</div></div>`;
}

function vSupport(a){
 const F=[["Buyurtmam holatini qanday bilaman?","“Mening hisobim” boʻlimida buyurtmalaringiz roʻyxati koʻrinadi."],["Kafolat qancha davom etadi?","Odatda bir yil cheklangan kafolat beriladi; batafsil mahsulot sahifasida."],["Mahsulotni qaytarish mumkinmi?","Ha, xarid qilingan mahsulotni belgilangan muddat ichida qaytarish mumkin (demo)."],["Apple ID parolini unutdim.","Kirish oynasidagi “Parolni tiklash” orqali tiklang (demo)."],["Qanday toʻlov usullari bor?","Bank kartalari va boshqa usullar (demo)."],["Mahsulotni taʼmirlatish.","Rasmiy servis markaziga murojaat qiling."]];
 a.innerHTML=`<div class="wrap"><h2 class="t">Support</h2><div class="two"><div><input class="f" id="fqa" placeholder="Savollar boʻyicha qidirish…"><div id="fl">${F.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}</div></div>
 <div class="sv"><h3>Biz bilan bogʻlaning</h3><input class="f" id="cn" placeholder="Ismingiz"><input class="f" id="ce" type="email" placeholder="Email"><select class="f"><option>Mahsulot haqida</option><option>Buyurtma</option><option>Texnik yordam</option></select><textarea class="f" id="cm" rows="4" placeholder="Xabaringiz"></textarea><button class="btn full" id="cs">Yuborish</button></div></div></div>`;
 $("#fqa").oninput=e=>{const q=e.target.value.toLowerCase();$$("#fl details").forEach(d=>d.style.display=d.textContent.toLowerCase().includes(q)?"":"none")};
 $("#cs").onclick=()=>{if(!$("#cn").value.trim()||!/^\S+@\S+\.\S+$/.test($("#ce").value)||$("#cm").value.trim().length<5)return toast("Maydonlarni toʻgʻri toʻldiring");toast("Xabaringiz yuborildi (demo)");$("#cm").value=""}
}

function calc(){const L=cart.map(line);let sub=0,edu=0;L.forEach((x,k)=>{const t=x.price*cart[k].q;sub+=t;if(LS.get("edu",false)&&["mac","ipad"].includes(x.p.c))edu+=t*.1});edu=Math.round(edu);const cr=Math.min(LS.get("credit",0),sub-edu);return{L,sub,edu,cr,total:Math.round(sub-edu-cr)}}
function vCart(a){
 const c=calc(),L=c.L;
 a.innerHTML=`<div class="wrap"><h2 class="t">Savat</h2>${L.length?L.map((x,k)=>`<div class="ci">${pic(idx(x.p.id),swatches(x.p)?swatches(x.p)[cart[k].c]:x.p.col)}<div><b>${esc(x.p.n)}</b><br><small style="color:var(--mu)">${x.o?x.o[0]:catName(x.p.c)}</small><br><span class="qty"><button data-q="${k}:-1">−</button>${cart[k].q}<button data-q="${k}:1">+</button></span></div><div style="text-align:right"><b>${fmt(x.price*cart[k].q)}</b><br><button data-rm="${k}" style="color:var(--ac);font-size:13px">Olib tashlash</button></div></div>`).join("")+`<div class="sum"><div><span>Jami</span><span>${fmt(c.sub)}</span></div>${c.edu?`<div><span>Talaba chegirmasi (10%)</span><span>−${fmt(c.edu)}</span></div>`:""}${c.cr?`<div><span>Trade-In krediti</span><span>−${fmt(c.cr)}</span></div>`:""}<div><span>Yetkazish</span><span>Bepul</span></div><div class="tot"><span>Umumiy</span><span>${fmt(c.total)}</span></div><button class="btn full" id="co">Buyurtma berish</button></div>`:`<p>Savatingiz boʻsh.</p><a class="btn" href="#/store">Xarid qilishni boshlash</a>`}</div>`;
 $("#co")&&($("#co").onclick=()=>user?checkout(c.total):(toast("Avval hisobga kiring"),location.hash="#/login"));
}
function vAccount(a){
 if(!user){a.innerHTML=`<div class="wrap"><h2 class="t">Mening hisobim</h2><p>Hisobingizga kiring yoki roʻyxatdan oʻting.</p><button class="btn" id="al">Kirish / Roʻyxatdan oʻtish</button></div>`;$("#al").onclick=()=>authModal("login");return}
 const mo=orders.filter(o=>o.email===user.email);
 a.innerHTML=`<div class="wrap"><h2 class="t">Salom, ${esc(user.name)}!</h2><p style="color:var(--mu)">${esc(user.email)}</p><button class="btn o sm" id="lo">Chiqish</button>
 <h2 class="t" style="margin-top:40px">Buyurtmalarim</h2>${mo.length?`<table class="tbl"><tr><th>№</th><th>Sana</th><th>Mahsulotlar</th><th>Summa</th></tr>${mo.map(o=>`<tr><td>${o.no}</td><td>${o.date}</td><td>${o.items.map(esc).join(", ")}</td><td>${fmt(o.total)}</td></tr>`).join("")}</table>`:"<p>Hozircha buyurtma yoʻq.</p>"}
 <h2 class="t" style="margin-top:40px">Saralanganlar</h2><div class="grid">${wl.map(id=>card(idx(id))).join("")||"<p>Saralangan mahsulot yoʻq.</p>"}</div></div>`;
 $("#lo").onclick=()=>{user=null;LS.set("user",null);sv();toast("Hisobdan chiqildi");location.hash="#/"};reveal();
}

/* ===== Modal, auth, checkout ===== */
function modal(h){$("#mc").innerHTML=h;$("#ov").classList.add("on")}
function authModal(m){location.hash="#/"+(m==="reg"||m==="register"?"register":"login")}
const enc=p=>btoa(unescape(encodeURIComponent(p)));
function checkout(total){
 modal(`<h3>Buyurtmani rasmiylashtirish</h3><p style="color:var(--mu)">Jami: <b>${fmt(total)}</b> (demo — haqiqiy toʻlov olinmaydi)</p><form id="cf" novalidate><input class="f" id="kn" placeholder="Ism familiya" value="${esc(user.name)}"><input class="f" id="kp" placeholder="Telefon (+998…)"><input class="f" id="ka" placeholder="Yetkazish manzili"><input class="f" id="kc" placeholder="Karta raqami (demo: 4242 4242 4242 4242)" inputmode="numeric"><div class="err" id="er"></div><button class="btn full">Buyurtma berish</button></form>`);
}
function strength(p){let n=0;if(p.length>=8)n++;if(/[A-Z]/.test(p)&&/[a-z]/.test(p))n++;if(/\d/.test(p))n++;if(/[^A-Za-z0-9]/.test(p))n++;return n}
document.addEventListener("submit",e=>{
 e.preventDefault();const f=e.target,er=$("#er",f),E=m=>{er&&(er.textContent=m)};
 if(f.id==="af"){
  const m=f.dataset.m,v=i=>(($(i,f)||{}).value||"").trim(),em=v("#ae").toLowerCase(),p=($("#ap",f)||{}).value||"",us=LS.get("users",{});
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return E("Email notoʻgʻri.");
  if(p.length<6)return E("Parol kamida 6 belgi boʻlsin.");
  if(m==="register"){
   const n=v("#an"),ph=v("#aph");
   if(n.length<2)return E("Ismni kiriting.");
   if(ph&&ph.replace(/\D/g,"").length<9)return E("Telefon raqami notoʻgʻri.");
   if(strength(p)<2)return E("Parol juda oddiy: harf va raqam aralashtiring.");
   if(p!==$("#ap2").value)return E("Parollar mos kelmadi.");
   if(!$("#at").checked)return E("Foydalanish shartlariga rozilik bering.");
   if(us[em])return E("Bu email allaqachon roʻyxatdan oʻtgan.");
   us[em]={name:n,phone:ph,p:enc(p)};LS.set("users",us);
  }else if(m==="forgot"){if(!us[em])return E("Bunday email topilmadi.");us[em].p=enc(p);LS.set("users",us);toast("Parol yangilandi, endi kiring");location.hash="#/login";return}
  else{const u=us[em];if(!u||u.p!==enc(p))return E("Email yoki parol xato.")}
  user={name:us[em].name,email:em};LS.set("user",user);sv();toast("Xush kelibsiz, "+user.name+"!");location.hash="#/account";
 }else if(f.id==="cf"){
  if($("#kn").value.trim().length<2||$("#kp").value.replace(/\D/g,"").length<9||$("#ka").value.trim().length<5||$("#kc").value.replace(/\D/g,"").length<12)return E("Barcha maydonlarni toʻgʻri toʻldiring.");
  const c=calc(),no="A"+Date.now().toString().slice(-8);
  orders.push({no,email:user.email,ts:Date.now(),date:new Date().toLocaleDateString("uz-UZ"),items:c.L.map((x,k)=>`${x.p.n}${x.o?" ("+x.o[0]+")":""} ×${cart[k].q}`),total:c.total});LS.set("orders",orders);LS.set("credit",0);cart=[];/* ===== Yangi boʻlimlar ===== */
const stars=n=>"★".repeat(Math.round(n))+"☆".repeat(5-Math.round(n));
const NM=["Aziz","Madina","Jasur","Dilnoza","Sardor","Nodira"],TX=["Juda yoqdi, sifati zoʻr.","Narxiga arziydi, tavsiya qilaman.","Dizayni va tezligi ajoyib.","Kutganimdan yaxshiroq chiqdi.","Kundalik ishlarim uchun aynan kerak edi."];
const hsh=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
function reviews(id){const h=hsh(id),own=LS.get("rev",{})[id]||[];return[...own,...[0,1,2].map(k=>({n:NM[(h+k*2)%6],r:4+((h+k)%2),t:TX[(h+k*3)%5]}))]}
const NEWS=[["Yangi dasturiy taʼminot imkoniyatlari","Qurilmalaringiz uchun yangilanish: yangi funksiyalar va xavfsizlik."],["Atrof-muhit uchun yangi qadamlar","Qayta ishlangan materiallar ulushi oshirilmoqda."],["Ilovalar dunyosidagi yangiliklar","Dasturchilar uchun yangi vositalar va imkoniyatlar."],["Salomatlik funksiyalari","Soat va quloqchinlardagi yangi salomatlik vositalari."],["Taʼlimda texnologiya","Talabalar va oʻqituvchilar uchun maxsus takliflar."],["Kreativ ishlar uchun yechimlar","Foto, video va musiqa uchun kuchli vositalar."]];
function homeExtra(){
 const rv=LS.get("rv",[]).filter(id=>byId[id]);
 return `<div class="tiles"><div class="tile rv" data-go="#/tradein" style="min-height:240px"><div><h3>Trade-In</h3><p>Eski qurilmangizni topshiring — yangisiga kredit oling.</p><span style="color:var(--ac)">Hisoblash ›</span></div></div><div class="tile rv dk" data-go="#/edu" style="min-height:240px"><div><h3>Talabalar uchun</h3><p>Mac va iPad’larga 10% chegirma (demo).</p><span style="color:var(--ac)">Tasdiqlash ›</span></div></div></div>`+
 (rv.length?`<div class="wrap"><h2 class="t rv">Yaqinda koʻrilgan</h2><div class="hscroll">${rv.map(id=>card(idx(id))).join("")}</div></div>`:"")+
 `<div class="wrap"><h2 class="t rv">Yangiliklar</h2><div class="grid">${NEWS.slice(0,3).map(n=>`<a class="sv rv" href="#/news"><h3>${n[0]}</h3><p>${n[1]}</p></a>`).join("")}</div></div>`;
}
function vAuth(a,m){
 if(user&&m!=="forgot"){location.hash="#/account";return}
 const T={login:["Kirish","Apple Hisobingiz bilan kiring"],register:["Hisob yaratish","Bitta hisob — barcha xizmatlar"],forgot:["Parolni tiklash","Email va yangi parolni kiriting"]}[m];
 a.innerHTML=`<div class="wrap"><div class="au"><div class="ai"><h1>${T[0]}</h1><p>${T[1]}</p><ul><li>🛍 Buyurtmalar tarixi</li><li>♥ Saralanganlar</li><li>🎓 Talabalar chegirmasi</li><li>📦 Buyurtmani kuzatish</li><li>⭐ Sharh qoldirish</li></ul></div>
 <form id="af" data-m="${m}" novalidate>${m==="register"?`<input class="f" id="an" placeholder="Ism familiya" autocomplete="name"><input class="f" id="aph" placeholder="Telefon (+998 …) — ixtiyoriy" inputmode="tel" autocomplete="tel">`:""}
 <input class="f" id="ae" type="email" placeholder="Email" autocomplete="email">
 <div class="pw"><input class="f" id="ap" type="password" placeholder="${m==="forgot"?"Yangi parol":"Parol"}" autocomplete="${m==="login"?"current-password":"new-password"}"><button type="button" class="eye" data-eye aria-label="Parolni koʻrsatish">👁</button></div>
 ${m==="register"?`<div class="sb"><i id="sbar"></i></div><small id="stx" style="color:var(--mu)">Parol kuchi</small><input class="f" id="ap2" type="password" placeholder="Parolni takrorlang" style="margin-top:10px"><label class="ck"><input type="checkbox" id="at"> Foydalanish shartlariga roziman</label>`:""}
 <div class="err" id="er"></div><button class="btn full">${T[0]}</button>
 <p class="sm">${m==="login"?`Hisobingiz yoʻqmi? <a href="#/register">Roʻyxatdan oʻtish</a> · <a href="#/forgot">Parolni unutdingizmi?</a>`:`Hisobingiz bormi? <a href="#/login">Kirish</a>`}</p></form></div></div>`;
 if(m==="register"){const pw=$("#ap");pw.oninput=()=>{const k=strength(pw.value);$("#sbar").style.width=k*25+"%";$("#sbar").style.background=["#e5484d","#e5484d","#f5a623","#2e9e5b","#2e9e5b"][k];$("#stx").textContent=["Juda oddiy","Oddiy","Oʻrtacha","Yaxshi","Juda kuchli"][k]}}
}
function vTrade(a){
 const B={iPhone:400,iPad:250,Mac:500,"Apple Watch":120},AG=[["1 yilgacha",1],["2 yil",.75],["3 yil",.55],["4 yil va undan koʻp",.35]],CD=[["Aʼlo",1],["Yaxshi",.85],["Oʻrtacha",.65],["Shikastlangan",.3]];
 a.innerHTML=`<div class="wrap"><h2 class="t">Trade-In</h2><div class="two"><div class="sv"><b>Qurilma</b><select class="f" id="tt">${Object.keys(B).map(k=>`<option>${k}</option>`).join("")}</select><b>Yoshi</b><select class="f" id="ta">${AG.map((x,i)=>`<option value="${i}">${x[0]}</option>`).join("")}</select><b>Holati</b><select class="f" id="tc">${CD.map((x,i)=>`<option value="${i}">${x[0]}</option>`).join("")}</select><h2 id="tv" style="margin:10px 0"></h2><button class="btn full" id="tb">Kreditni savatga qoʻllash</button></div><div><h3>Qanday ishlaydi?</h3><p style="color:var(--mu)">Qurilma turi, yoshi va holatini tanlang — taxminiy qiymat darhol chiqadi. Kredit keyingi buyurtmangizdan ayriladi. Bu faqat demo hisob-kitob.</p><p style="color:var(--mu)">Joriy kredit: <b>${fmt(LS.get("credit",0))}</b></p></div></div></div>`;
 const f=()=>{const v=Math.round(B[$("#tt").value]*AG[$("#ta").value][1]*CD[$("#tc").value][1]/5)*5;$("#tv").textContent="Taxminiy qiymat: "+fmt(v);return v};
 ["#tt","#ta","#tc"].forEach(i=>$(i).onchange=f);f();
 $("#tb").onclick=()=>{LS.set("credit",f());toast("Trade-In krediti qoʻllandi");vTrade(a)};
}
function vEdu(a){
 const on=LS.get("edu",false);
 a.innerHTML=`<div class="wrap"><h2 class="t">Talabalar va oʻqituvchilar uchun</h2><div class="two"><div class="sv"><h3>Mac va iPad’larga 10% chegirma (demo)</h3><p>${on?"✓ Chegirma faol. Savatda avtomatik hisoblanadi.":"Taʼlim email manzilingiz bilan tasdiqlang."}</p>${on?`<button class="btn o" id="eo">Chegirmani oʻchirish</button>`:`<input class="f" id="ee" type="email" placeholder="talaba@universitet.edu.uz"><label class="ck"><input type="checkbox" id="ec"> Talaba yoki oʻqituvchiman</label><button class="btn full" id="ev">Tasdiqlash</button>`}</div><div><h3>Chegirma qaysi mahsulotlarga?</h3><div class="grid">${P.map((p,i)=>["mac","ipad"].includes(p.c)&&!["mac-mini","studio-display"].includes(p.id)?card(i):"").slice(0,4).join("")}</div></div></div></div>`;
 $("#ev")&&($("#ev").onclick=()=>{if(!/^\S+@\S+\.\S+$/.test($("#ee").value)||!$("#ec").checked)return toast("Email va tasdiqni toʻldiring");LS.set("edu",true);toast("Tasdiqlandi!");vEdu(a)});
 $("#eo")&&($("#eo").onclick=()=>{LS.set("edu",false);vEdu(a)});reveal();
}
function vStores(a){
 const S=[["Toshkent","Demo Premium Reseller — Chilonzor","09:00–20:00"],["Toshkent","Demo Premium Reseller — Yunusobod","10:00–21:00"],["Samarqand","Demo Reseller — Registon","09:00–19:00"],["Buxoro","Demo Reseller — Markaz","09:00–19:00"],["Andijon","Demo Reseller — Shahar","09:00–19:00"],["Namangan","Demo Reseller — Markaz","09:00–19:00"]];
 a.innerHTML=`<div class="wrap"><h2 class="t">Doʻkonlar</h2><p style="color:var(--mu)">Namunaviy roʻyxat — haqiqiy doʻkonlar emas.</p><div class="tools"><select id="sc"><option value="">Barcha shaharlar</option>${[...new Set(S.map(x=>x[0]))].map(c=>`<option>${c}</option>`).join("")}</select></div><div class="grid" id="sl2"></div></div>`;
 const d=()=>{const c=$("#sc").value;$("#sl2").innerHTML=S.filter(x=>!c||x[0]===c).map(x=>`<div class="sv"><h3>${x[1]}</h3><p>📍 ${x[0]}</p><p>🕘 ${x[2]}</p></div>`).join("")};$("#sc").onchange=d;d();
}
function vNews(a){
 const EV=[["Fotografiya asoslari","Shanba · 11:00"],["Musiqa yaratish","Yakshanba · 15:00"],["Kodlashni boshlang","Seshanba · 18:00"]],ev=LS.get("ev",[]);
 a.innerHTML=`<div class="wrap"><h2 class="t">Yangiliklar</h2><p style="color:var(--mu)">Namunaviy yangiliklar.</p><div class="grid">${NEWS.map(n=>`<div class="sv rv"><h3>${n[0]}</h3><p>${n[1]}</p></div>`).join("")}</div><h2 class="t" style="margin-top:50px">Today at Apple — mashgʻulotlar</h2><div class="grid">${EV.map(e=>`<div class="sv rv"><h3>${e[0]}</h3><p>${e[1]}</p><button class="btn sm" style="margin-top:12px" data-ev="${e[0]}">${ev.includes(e[0])?"Yozildingiz ✓":"Yozilish"}</button></div>`).join("")}</div></div>`;reveal();
}
function vTrack(a){
 a.innerHTML=`<div class="wrap"><h2 class="t">Buyurtmani kuzatish</h2><div class="tools"><input id="tn" class="f" style="max-width:320px;margin:0" placeholder="Buyurtma raqami (A12345678)" value="${esc((orders.filter(o=>user&&o.email===user.email).slice(-1)[0]||{}).no||"")}"><button class="btn" id="tg">Kuzatish</button></div><div id="tr"></div></div>`;
 const go=()=>{const o=orders.find(x=>x.no===$("#tn").value.trim().toUpperCase());if(!o){$("#tr").innerHTML="<p>Buyurtma topilmadi.</p>";return}
  const m=(Date.now()-(o.ts||0))/6e4,k=m<1?0:m<3?1:m<6?2:3,S=["Qabul qilindi","Yigʻilmoqda","Yoʻlda","Yetkazildi"];
  $("#tr").innerHTML=`<div class="sv"><b>${o.no}</b> · ${o.date} · ${fmt(o.total)}<div class="stp">${S.map((x,i)=>`<div class="${i<=k?"on":""}"><i></i>${x}</div>`).join("")}</div><small style="color:var(--mu)">${o.items.map(esc).join(", ")} — holat demo tarzda vaqt oʻtishi bilan oʻzgaradi.</small></div>`};
 $("#tg").onclick=go;if($("#tn").value)go();
}
function vMore(a){
 const L=[["🔄","Trade-In","#/tradein"],["🎓","Talabalar uchun","#/edu"],["📍","Doʻkonlar","#/stores"],["📰","Yangiliklar","#/news"],["📦","Buyurtmani kuzatish","#/track"],["⇄","Solishtirish","#/compare"],["☁️","Xizmatlar","#/services"],["💬","Support","#/support"],["👤","Mening hisobim","#/account"]];
 a.innerHTML=`<div class="wrap"><h2 class="t">Koʻproq</h2><div class="grid">${L.map(x=>`<a class="sv rv" href="${x[2]}"><i>${x[0]}</i><h3>${x[1]}</h3></a>`).join("")}</div></div>`;reveal();
}
/* valyuta */
$("#cu").textContent=cur==="UZS"?"soʻm":"$";
$("#cu").onclick=()=>{cur=cur==="USD"?"UZS":"USD";LS.set("cur",cur);$("#cu").textContent=cur==="UZS"?"soʻm":"$";toast(cur==="UZS"?`Valyuta: soʻm (kurs ≈ ${RATE})`:"Valyuta: AQSh dollari");const y=scrollY;route();scrollTo(0,y)};

sv();route();
  modal(`<h3>Rahmat! ✓</h3><p>Buyurtmangiz qabul qilindi (demo).</p><p><b>Buyurtma raqami: ${no}</b></p><a class="btn full" href="#/track" data-x>Buyurtmani kuzatish</a>`);
 }else if(f.id==="nf"){const v=$("#ne").value.trim();if(!/^\S+@\S+\.\S+$/.test(v))return toast("Email notoʻgʻri");toast("Obuna boʻldingiz!");f.reset()}
});

/* ===== Umumiy click ===== */
document.addEventListener("click",e=>{
 const t=e.target;
 let x;
 if((x=t.closest("[data-wl]"))){e.stopPropagation();togWl(x.dataset.wl);return}
 if((x=t.closest("[data-cmp]"))){e.stopPropagation();if(!togCmp(x.dataset.cmp))e.preventDefault();return}
 if(t.closest("label")&&t.closest(".card"))return;
 if((x=t.closest("[data-buy]"))){addCart(x.dataset.buy);return}
 if((x=t.closest("[data-sub]"))){toast(x.dataset.sub+" obunasi (demo)");return}
 if((x=t.closest("[data-am]"))){authModal(x.dataset.am);return}
 if((x=t.closest("[data-q]"))){const[k,d]=x.dataset.q.split(":");cart[+k].q+=+d;if(cart[+k].q<1)cart.splice(+k,1);sv();vCart($("#app"));return}
 if((x=t.closest("[data-rm]"))){cart.splice(+x.dataset.rm,1);sv();vCart($("#app"));return}
 if(t.closest("[data-cc]")){cmp=[];sv();$$("[data-cmp]").forEach(b=>b.checked=false);if(location.hash==="#/compare")vCompare($("#app"));return}
 if(t.closest("[data-eye]")){const i=$("#ap"),k=i.type==="password"?"text":"password";i.type=k;const j=$("#ap2");if(j)j.type=k;return}
 if((x=t.closest("[data-ev]"))){if(!user){toast("Avval hisobga kiring");location.hash="#/login";return}const ev=LS.get("ev",[]);if(!ev.includes(x.dataset.ev)){ev.push(x.dataset.ev);LS.set("ev",ev)}toast("Tadbirga yozildingiz (demo)");x.textContent="Yozildingiz ✓";return}
 if(t.closest("[data-x]")||t.id==="ov")closeAll();
 if((x=t.closest("[data-go]")))location.hash=x.dataset.go;
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});
addEventListener("hashchange",route);

/* ===== Yangi boʻlimlar ===== */
const stars=n=>"★".repeat(Math.round(n))+"☆".repeat(5-Math.round(n));
const NM=["Aziz","Madina","Jasur","Dilnoza","Sardor","Nodira"],TX=["Juda yoqdi, sifati zoʻr.","Narxiga arziydi, tavsiya qilaman.","Dizayni va tezligi ajoyib.","Kutganimdan yaxshiroq chiqdi.","Kundalik ishlarim uchun aynan kerak edi."];
const hsh=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
function reviews(id){const h=hsh(id),own=LS.get("rev",{})[id]||[];return[...own,...[0,1,2].map(k=>({n:NM[(h+k*2)%6],r:4+((h+k)%2),t:TX[(h+k*3)%5]}))]}
const NEWS=[["Yangi dasturiy taʼminot imkoniyatlari","Qurilmalaringiz uchun yangilanish: yangi funksiyalar va xavfsizlik."],["Atrof-muhit uchun yangi qadamlar","Qayta ishlangan materiallar ulushi oshirilmoqda."],["Ilovalar dunyosidagi yangiliklar","Dasturchilar uchun yangi vositalar va imkoniyatlar."],["Salomatlik funksiyalari","Soat va quloqchinlardagi yangi salomatlik vositalari."],["Taʼlimda texnologiya","Talabalar va oʻqituvchilar uchun maxsus takliflar."],["Kreativ ishlar uchun yechimlar","Foto, video va musiqa uchun kuchli vositalar."]];
function homeExtra(){
 const rv=LS.get("rv",[]).filter(id=>byId[id]);
 return `<div class="tiles"><div class="tile rv" data-go="#/tradein" style="min-height:240px"><div><h3>Trade-In</h3><p>Eski qurilmangizni topshiring — yangisiga kredit oling.</p><span style="color:var(--ac)">Hisoblash ›</span></div></div><div class="tile rv dk" data-go="#/edu" style="min-height:240px"><div><h3>Talabalar uchun</h3><p>Mac va iPad’larga 10% chegirma (demo).</p><span style="color:var(--ac)">Tasdiqlash ›</span></div></div></div>`+
 (rv.length?`<div class="wrap"><h2 class="t rv">Yaqinda koʻrilgan</h2><div class="hscroll">${rv.map(id=>card(idx(id))).join("")}</div></div>`:"")+
 `<div class="wrap"><h2 class="t rv">Yangiliklar</h2><div class="grid">${NEWS.slice(0,3).map(n=>`<a class="sv rv" href="#/news"><h3>${n[0]}</h3><p>${n[1]}</p></a>`).join("")}</div></div>`;
}
function vAuth(a,m){
 if(user&&m!=="forgot"){location.hash="#/account";return}
 const T={login:["Kirish","Apple Hisobingiz bilan kiring"],register:["Hisob yaratish","Bitta hisob — barcha xizmatlar"],forgot:["Parolni tiklash","Email va yangi parolni kiriting"]}[m];
 a.innerHTML=`<div class="wrap"><div class="au"><div class="ai"><h1>${T[0]}</h1><p>${T[1]}</p><ul><li>🛍 Buyurtmalar tarixi</li><li>♥ Saralanganlar</li><li>🎓 Talabalar chegirmasi</li><li>📦 Buyurtmani kuzatish</li><li>⭐ Sharh qoldirish</li></ul></div>
 <form id="af" data-m="${m}" novalidate>${m==="register"?`<input class="f" id="an" placeholder="Ism familiya" autocomplete="name"><input class="f" id="aph" placeholder="Telefon (+998 …) — ixtiyoriy" inputmode="tel" autocomplete="tel">`:""}
 <input class="f" id="ae" type="email" placeholder="Email" autocomplete="email">
 <div class="pw"><input class="f" id="ap" type="password" placeholder="${m==="forgot"?"Yangi parol":"Parol"}" autocomplete="${m==="login"?"current-password":"new-password"}"><button type="button" class="eye" data-eye aria-label="Parolni koʻrsatish">👁</button></div>
 ${m==="register"?`<div class="sb"><i id="sbar"></i></div><small id="stx" style="color:var(--mu)">Parol kuchi</small><input class="f" id="ap2" type="password" placeholder="Parolni takrorlang" style="margin-top:10px"><label class="ck"><input type="checkbox" id="at"> Foydalanish shartlariga roziman</label>`:""}
 <div class="err" id="er"></div><button class="btn full">${T[0]}</button>
 <p class="sm">${m==="login"?`Hisobingiz yoʻqmi? <a href="#/register">Roʻyxatdan oʻtish</a> · <a href="#/forgot">Parolni unutdingizmi?</a>`:`Hisobingiz bormi? <a href="#/login">Kirish</a>`}</p></form></div></div>`;
 if(m==="register"){const pw=$("#ap");pw.oninput=()=>{const k=strength(pw.value);$("#sbar").style.width=k*25+"%";$("#sbar").style.background=["#e5484d","#e5484d","#f5a623","#2e9e5b","#2e9e5b"][k];$("#stx").textContent=["Juda oddiy","Oddiy","Oʻrtacha","Yaxshi","Juda kuchli"][k]}}
}
function vTrade(a){
 const B={iPhone:400,iPad:250,Mac:500,"Apple Watch":120},AG=[["1 yilgacha",1],["2 yil",.75],["3 yil",.55],["4 yil va undan koʻp",.35]],CD=[["Aʼlo",1],["Yaxshi",.85],["Oʻrtacha",.65],["Shikastlangan",.3]];
 a.innerHTML=`<div class="wrap"><h2 class="t">Trade-In</h2><div class="two"><div class="sv"><b>Qurilma</b><select class="f" id="tt">${Object.keys(B).map(k=>`<option>${k}</option>`).join("")}</select><b>Yoshi</b><select class="f" id="ta">${AG.map((x,i)=>`<option value="${i}">${x[0]}</option>`).join("")}</select><b>Holati</b><select class="f" id="tc">${CD.map((x,i)=>`<option value="${i}">${x[0]}</option>`).join("")}</select><h2 id="tv" style="margin:10px 0"></h2><button class="btn full" id="tb">Kreditni savatga qoʻllash</button></div><div><h3>Qanday ishlaydi?</h3><p style="color:var(--mu)">Qurilma turi, yoshi va holatini tanlang — taxminiy qiymat darhol chiqadi. Kredit keyingi buyurtmangizdan ayriladi. Bu faqat demo hisob-kitob.</p><p style="color:var(--mu)">Joriy kredit: <b>${fmt(LS.get("credit",0))}</b></p></div></div></div>`;
 const f=()=>{const v=Math.round(B[$("#tt").value]*AG[$("#ta").value][1]*CD[$("#tc").value][1]/5)*5;$("#tv").textContent="Taxminiy qiymat: "+fmt(v);return v};
 ["#tt","#ta","#tc"].forEach(i=>$(i).onchange=f);f();
 $("#tb").onclick=()=>{LS.set("credit",f());toast("Trade-In krediti qoʻllandi");vTrade(a)};
}
function vEdu(a){
 const on=LS.get("edu",false);
 a.innerHTML=`<div class="wrap"><h2 class="t">Talabalar va oʻqituvchilar uchun</h2><div class="two"><div class="sv"><h3>Mac va iPad’larga 10% chegirma (demo)</h3><p>${on?"✓ Chegirma faol. Savatda avtomatik hisoblanadi.":"Taʼlim email manzilingiz bilan tasdiqlang."}</p>${on?`<button class="btn o" id="eo">Chegirmani oʻchirish</button>`:`<input class="f" id="ee" type="email" placeholder="talaba@universitet.edu.uz"><label class="ck"><input type="checkbox" id="ec"> Talaba yoki oʻqituvchiman</label><button class="btn full" id="ev">Tasdiqlash</button>`}</div><div><h3>Chegirma qaysi mahsulotlarga?</h3><div class="grid">${P.map((p,i)=>["mac","ipad"].includes(p.c)&&!["mac-mini","studio-display"].includes(p.id)?card(i):"").slice(0,4).join("")}</div></div></div></div>`;
 $("#ev")&&($("#ev").onclick=()=>{if(!/^\S+@\S+\.\S+$/.test($("#ee").value)||!$("#ec").checked)return toast("Email va tasdiqni toʻldiring");LS.set("edu",true);toast("Tasdiqlandi!");vEdu(a)});
 $("#eo")&&($("#eo").onclick=()=>{LS.set("edu",false);vEdu(a)});reveal();
}
function vStores(a){
 const S=[["Toshkent","Demo Premium Reseller — Chilonzor","09:00–20:00"],["Toshkent","Demo Premium Reseller — Yunusobod","10:00–21:00"],["Samarqand","Demo Reseller — Registon","09:00–19:00"],["Buxoro","Demo Reseller — Markaz","09:00–19:00"],["Andijon","Demo Reseller — Shahar","09:00–19:00"],["Namangan","Demo Reseller — Markaz","09:00–19:00"]];
 a.innerHTML=`<div class="wrap"><h2 class="t">Doʻkonlar</h2><p style="color:var(--mu)">Namunaviy roʻyxat — haqiqiy doʻkonlar emas.</p><div class="tools"><select id="sc"><option value="">Barcha shaharlar</option>${[...new Set(S.map(x=>x[0]))].map(c=>`<option>${c}</option>`).join("")}</select></div><div class="grid" id="sl2"></div></div>`;
 const d=()=>{const c=$("#sc").value;$("#sl2").innerHTML=S.filter(x=>!c||x[0]===c).map(x=>`<div class="sv"><h3>${x[1]}</h3><p>📍 ${x[0]}</p><p>🕘 ${x[2]}</p></div>`).join("")};$("#sc").onchange=d;d();
}
function vNews(a){
 const EV=[["Fotografiya asoslari","Shanba · 11:00"],["Musiqa yaratish","Yakshanba · 15:00"],["Kodlashni boshlang","Seshanba · 18:00"]],ev=LS.get("ev",[]);
 a.innerHTML=`<div class="wrap"><h2 class="t">Yangiliklar</h2><p style="color:var(--mu)">Namunaviy yangiliklar.</p><div class="grid">${NEWS.map(n=>`<div class="sv rv"><h3>${n[0]}</h3><p>${n[1]}</p></div>`).join("")}</div><h2 class="t" style="margin-top:50px">Today at Apple — mashgʻulotlar</h2><div class="grid">${EV.map(e=>`<div class="sv rv"><h3>${e[0]}</h3><p>${e[1]}</p><button class="btn sm" style="margin-top:12px" data-ev="${e[0]}">${ev.includes(e[0])?"Yozildingiz ✓":"Yozilish"}</button></div>`).join("")}</div></div>`;reveal();
}
function vTrack(a){
 a.innerHTML=`<div class="wrap"><h2 class="t">Buyurtmani kuzatish</h2><div class="tools"><input id="tn" class="f" style="max-width:320px;margin:0" placeholder="Buyurtma raqami (A12345678)" value="${esc((orders.filter(o=>user&&o.email===user.email).slice(-1)[0]||{}).no||"")}"><button class="btn" id="tg">Kuzatish</button></div><div id="tr"></div></div>`;
 const go=()=>{const o=orders.find(x=>x.no===$("#tn").value.trim().toUpperCase());if(!o){$("#tr").innerHTML="<p>Buyurtma topilmadi.</p>";return}
  const m=(Date.now()-(o.ts||0))/6e4,k=m<1?0:m<3?1:m<6?2:3,S=["Qabul qilindi","Yigʻilmoqda","Yoʻlda","Yetkazildi"];
  $("#tr").innerHTML=`<div class="sv"><b>${o.no}</b> · ${o.date} · ${fmt(o.total)}<div class="stp">${S.map((x,i)=>`<div class="${i<=k?"on":""}"><i></i>${x}</div>`).join("")}</div><small style="color:var(--mu)">${o.items.map(esc).join(", ")} — holat demo tarzda vaqt oʻtishi bilan oʻzgaradi.</small></div>`};
 $("#tg").onclick=go;if($("#tn").value)go();
}
function vMore(a){
 const L=[["🔄","Trade-In","#/tradein"],["🎓","Talabalar uchun","#/edu"],["📍","Doʻkonlar","#/stores"],["📰","Yangiliklar","#/news"],["📦","Buyurtmani kuzatish","#/track"],["⇄","Solishtirish","#/compare"],["☁️","Xizmatlar","#/services"],["💬","Support","#/support"],["👤","Mening hisobim","#/account"]];
 a.innerHTML=`<div class="wrap"><h2 class="t">Koʻproq</h2><div class="grid">${L.map(x=>`<a class="sv rv" href="${x[2]}"><i>${x[0]}</i><h3>${x[1]}</h3></a>`).join("")}</div></div>`;reveal();
}
/* valyuta */
$("#cu").textContent=cur==="UZS"?"soʻm":"$";
$("#cu").onclick=()=>{cur=cur==="USD"?"UZS":"USD";LS.set("cur",cur);$("#cu").textContent=cur==="UZS"?"soʻm":"$";toast(cur==="UZS"?`Valyuta: soʻm (kurs ≈ ${RATE})`:"Valyuta: AQSh dollari");const y=scrollY;route();scrollTo(0,y)};

sv();route();
