/* Maturity Wall spec as three acts on one isometric island (same engine as Fire-Sale's and Registry's cities):
   Act 1 · a street of fixed-rate mortgages that renew one by one at the bank, at today's rate
   Act 2 · "swap the houses for bonds": the feature city (10 buildings, 4 districts, PLAY tour, a new file travelling the ring)
   Act 3 · a room per feature (one sentence, the ballot vs ours, a small live model, a comic strip, a cutaway, the full text)
   The original spec stays whole under "המסמך המלא". */
(function(){
  function boot(){
  const root=document.querySelector('.sp[data-sp="maturity-wall"]'); const D=window.SPEC&&window.SPEC['maturity-wall'];
  if(!root||!D||root.dataset.city) return; if(!root.classList.contains('sp-root')){ setTimeout(boot,60); return; } root.dataset.city='1'; root.classList.add('cy-rg','cy-mw');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const NS='http://www.w3.org/2000/svg'; const S=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.append(e); return e; };
  const F={}; D.features.forEach(f=>F[f.n]=f); (D.nodes||[]).forEach(([n,l])=>{ if(F[n]&&!F[n].layer) F[n].layer=l; }); const LAY={}; D.layers.forEach(([k,n])=>LAY[k]=n);
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;

  /* ---------- the original document, kept whole ---------- */
  const orig=[...root.children]; const full=H('details','cy-full'); const sm=H('summary','','המסמך המלא, כמו שהוא: כל החלקים, ההחלטות והמחוון'); full.append(sm);
  const dl=orig.find(e=>e.classList.contains('sp-dl'));
  orig.forEach(e=>{ if(e!==dl) full.append(e); });
  const top=H('div','cy'); root.textContent=''; root.append(top,full); if(dl) root.append(dl);

  /* ---------- intro ---------- */
  const intro=H('div','cy-intro');
  intro.innerHTML=`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, וקיר אחד שכולם יכולים לראות</h4>
   <p>אחרי שה-POC הראה שהחישוב המלא משנה את התשובה, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר, כאילו מחר מתחילים לבנות אותו. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "לקרוא את הקובץ של משרד החוב הצרפתי" או "לצבוע כל אג"ח לפי כמה יקר להחליף אותה".</p>
   <div class="cy-emma"><span class="cy-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="#d8a985"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="#1f1a17"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="#b1502e"/></svg></span>
   <div><span class="cy-k">בוקר של הצעת תקציב</span><p>נועה (בדויה), עיתונאית כלכלית, צריכה עד הצהריים מספר אחד: כמה מהתקציב החדש של צרפת ייבלע בגלל החלפת החוב הזול ביקר. ה-POC הראה שהחישוב עובד על מדינה מדומה. עכשיו צריך מוצר שלם: מי מביא את רשימת האג"ח האמיתית, איך יודעים שהיא נכונה, ואיך נועה יכולה לצטט תוצאה שכל קורא יוכל לבדוק.</p></div></div>
   <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>לכל מדינה, ${tm('bond','אג"ח')} אחר אג"ח: כמה חוב פוקע בכל שנה, כמה יעלה להחליף אותו בכל תרחיש של ריבית, ומתי החוב מתחיל לגדול מעצמו. כל תוצאה עם ההנחות שלה, וקישור שמשחזר אותה. ומה שהוא לא מבטיח כתוב במפורש: הוא לא מנבא את הריבית. הוא מראה מה יקרה אם היא תהיה כך או אחרת.</p></div>
   <p class="cy-acts">שלוש מערכות: <b>1</b> סיפור מקביל שכולם מכירים · <b>2</b> עיר הפיצ'רים · <b>3</b> חדר לכל פיצ'ר. מוכנים?</p>`;
  top.append(intro);

  /* ---------- the island scene ---------- */
  const stage=H('div','cy-stage'); top.append(stage);
  const svg=S('svg',{viewBox:'0 0 1000 620',class:'cy-svg',role:'img','aria-label':'אי איזומטרי עם כביש טבעתי'}); stage.append(svg);
  const cam=S('g',{id:'cy-cam'},svg);
  const CX=500, CY=300, SC=50; const iso=(x,y)=>[CX+(x-y)*0.866*SC, CY+(x+y)*0.5*SC-5*SC*0.5*2];
  const P=(x,y)=>{ const [a,b]=iso(x,y); return a.toFixed(1)+','+b.toFixed(1); };
  // water & island
  S('rect',{x:-500,y:-400,width:2000,height:1400,class:'cy-water'},cam);
  for(let i=0;i<14;i++) S('path',{d:`M${-100+i*90} ${560+ (i%3)*14} q20 -8 40 0 q20 8 40 0`,class:'cy-wave',style:`--i:${i}`},cam);
  S('polygon',{points:[P(-0.6,-0.6),P(10.6,-0.6),P(10.6,10.6),P(-0.6,10.6)].join(' '),class:'cy-cliff'},cam);
  S('polygon',{points:[P(-0.6,-0.6),P(10.6,-0.6),P(10.6,10.6),P(-0.6,10.6)].join(' '),class:'cy-land',transform:'translate(0,-14)'},cam);
  // districts (sectors) by layer
  const DIST={collect:[-165,-75],compute:[-60,30],show:[40,100],trust:[110,195]};
  const sector=(a0,a1,r0,r1)=>{ const pts=[]; for(let a=a0;a<=a1;a+=5){ const t=a*Math.PI/180; pts.push(P(5+r1*Math.cos(t),5+r1*Math.sin(t))); } for(let a=a1;a>=a0;a-=5){ const t=a*Math.PI/180; pts.push(P(5+r0*Math.cos(t),5+r0*Math.sin(t))); } return pts.join(' '); };
  const distG=S('g',{class:'cy-dists',transform:'translate(0,-14)'},cam);
  Object.entries(DIST).forEach(([k,[a0,a1]])=>{ S('polygon',{points:sector(a0,a1,3.65,5.35),class:'cy-dist '+k},distG); const am=(a0+a1)/2*Math.PI/180; const [lx,ly]=iso(5+5.75*Math.cos(am),5+5.75*Math.sin(am)); const t=S('text',{x:lx,y:ly-8,class:'cy-dlab','text-anchor':'middle'},distG); t.textContent='שכונת '+LAY[k]; });
  // ring road
  const R=3.1; const ring=[]; for(let a=0;a<=360;a+=4){ const t=a*Math.PI/180; ring.push(P(5+R*Math.cos(t),5+R*Math.sin(t))); }
  const roadG=S('g',{transform:'translate(0,-14)'},cam);
  S('polyline',{points:ring.join(' '),class:'cy-road'},roadG); S('polyline',{points:ring.join(' '),class:'cy-lane'},roadG);
  const ringPath=S('path',{d:'M'+ring.join(' L'),id:'cy-ringpath',fill:'none',stroke:'none'},roadG);
  // trees & center
  [[1,1.3],[8.9,1.2],[1.2,8.8],[8.8,8.9],[5,5],[4.2,5.6],[5.8,4.3]].forEach(([x,y],i)=>{ const [a,b]=iso(x,y); const g=S('g',{class:'cy-tree',transform:`translate(${a} ${b-14})`},cam); S('ellipse',{cx:0,cy:2,rx:9,ry:4,class:'cy-sh'},g); S('rect',{x:-2,y:-10,width:4,height:12,class:'cy-trunk'},g); S('circle',{cx:0,cy:-16,r:10,class:'cy-leaf'},g); });
  // landmarks: decisions signpost (center), observation tower, bridge under construction
  const LM=[['dc',5,5.9,'צומת ההחלטות','הכיוונים שבחרנו, ומה שוויתרנו עליו'],['kn',6.6,6.9,'מגדל התצפית','המחוון החי: הקיר בפעולה'],['cl',10.4,7.6,'הגשר','מה האפיון סגר, ומה נשאר פתוח']];
  const lmG=S('g',{class:'cy-lms'},cam);
  LM.forEach(([k,x,y,t,d])=>{ const [a,b]=iso(x,y); const g=S('g',{class:'cy-lm '+k,transform:`translate(${a} ${b-14})`,tabindex:'0',role:'button','aria-label':t+': '+d},lmG);
    if(k==='dc'){ S('rect',{x:-2,y:-46,width:4,height:46,class:'cy-pole'},g); S('path',{d:'M2 -42 h26 l6 5 l-6 5 h-26z',class:'cy-sign a'},g); S('path',{d:'M-2 -28 h-26 l-6 5 l6 5 h26z',class:'cy-sign b'},g); }
    else if(k==='kn'){ S('path',{d:'M-10 0 L-5 -62 L5 -62 L10 0z',class:'cy-tower'},g); S('rect',{x:-12,y:-74,width:24,height:12,rx:3,class:'cy-tower-top'},g); S('path',{d:'M-8 -68 q8 -10 16 0',class:'cy-spiral'},g); }
    else { S('path',{d:'M-40 0 L0 -18 L14 -12',class:'cy-bridge'},g); S('path',{d:'M14 -12 L24 -8',class:'cy-bridge gap'},g); S('rect',{x:-4,y:-48,width:4,height:44,class:'cy-pole'},g); S('path',{d:'M0 -46 L22 -46 L22 -38',class:'cy-crane'},g); }
    const lb=S('text',{x:0,y:16,class:'cy-lml','text-anchor':'middle'},g); lb.textContent=t;
    g.addEventListener('click',()=>openSection(k,t)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openSection(k,t); } }); });
  // buildings
  const ANG={1:-150,2:-120,3:-90,4:-45,5:-15,6:15,7:55,8:85,9:130,10:165};
  const ICON0={1:'<path d="M-9 4 v-9 l5 -4 v4 l5 -4 v4 l5 -4 v13z"/><rect x="4" y="-12" width="3" height="7"/>',2:'<path d="M0 -10 v16 M-8 6 h16 M-10 -6 h20 M-10 -6 l-3 6 h6z M10 -6 l-3 6 h6z"/>',3:'<path d="M-4 8 L-2 -6 h4 L4 8z M-7 -10 h14 v4 h-14z"/>',4:'<path d="M-11 2 L11 -4 M0 -1 v8 M-4 7 h8"/>',5:'<rect x="-9" y="-8" width="4" height="14"/><rect x="-2" y="-8" width="4" height="14" transform="rotate(-20 0 6)"/><rect x="5" y="-6" width="4" height="14" transform="rotate(-50 7 8)"/>',6:'<circle cx="0" cy="0" r="9"/><path d="M-9 0 h18 M0 -9 v18 M-6 -6 l12 12 M6 -6 l-12 12"/>',7:'<path d="M-9 8 v-12 h4 M-5 -4 L8 -10 v6"/><path d="M8 -4 v4"/>',8:'<circle cx="-5" cy="2" r="5"/><circle cx="5" cy="2" r="5"/><circle cx="0" cy="-6" r="5"/>',9:'<path d="M-10 -6 L0 -11 L10 -6z M-8 -6 v12 M-3 -6 v12 M3 -6 v12 M8 -6 v12 M-10 7 h20"/>',10:'<path d="M0 8 v-14 M-5 -10 q5 -6 10 0 M-8 -13 q8 -9 16 0"/>'};
  const ICON_RG={1:'<rect x="-11" y="-8" width="22" height="16" rx="2"/><circle cx="-4" cy="-1" r="3"/><path d="M2 -3 h6 M2 2 h6"/>',2:'<path d="M-10 -10 h20 v20 h-20z M-10 -3 h20 M-10 4 h20 M-3 -10 v20 M4 -10 v20"/>',3:'<rect x="-8" y="-2" width="16" height="12" rx="2"/><path d="M-5 -2 v-4 a5 5 0 0 1 10 0 v4"/>',4:'<path d="M0 -10 v6 M0 -4 L-9 8 M0 -4 L0 9 M0 -4 L9 8"/><circle cx="0" cy="-10" r="2"/>',5:'<rect x="-11" y="-9" width="6" height="18" rx="1"/><rect x="-3" y="-9" width="6" height="18" rx="1"/><rect x="5" y="-9" width="6" height="18" rx="1"/>',6:'<circle cx="0" cy="0" r="10"/><path d="M-5 0 l4 4 l7 -8"/>',7:'<path d="M-10 10 v-14 a10 10 0 0 1 20 0 v14 M-10 10 h20 M0 10 v-10"/>',8:'<path d="M-11 -7 h22 v14 h-22z M-11 -7 l11 8 l11 -8"/>',9:'<path d="M-9 -10 h14 l4 4 v16 h-18z M-5 -3 h10 M-5 2 h10 M-5 7 h6"/>',10:'<path d="M-10 9 h20 M-7 9 v-6 M-1 9 v-12 M5 9 v-8"/>'};
  const ICON={1:'<path d="M-10 -8 h14 l6 6 v14 h-20z M4 -8 v6 h6"/><path d="M-6 2 h10 M-6 6 h8"/>',2:'<path d="M0 -10 v18 M-10 -6 h20 M-10 -6 l-3 7 h6z M10 -6 l-3 7 h6z M-5 9 h10"/>',3:'<path d="M-10 -8 h20 v6 h-20z M-10 -2 h20 v6 h-20z M-10 4 h20 v6 h-20z"/>',4:'<path d="M-11 8 Q-4 -6 11 -8"/><path d="M-11 10 h22 M-11 10 v-20"/>',5:'<path d="M-8 -2 a8 8 0 1 1 3 7 M-10 2 l2 -4 l4 2"/>',6:'<circle cx="-5" cy="5" r="5"/><circle cx="7" cy="5" r="5"/><path d="M-5 5 l5 -10 h5 M2 5 l-2 -10"/>',7:'<path d="M-10 -6 h8 M2 -6 h8 M-6 -6 l-4 8 h8z M6 -6 l-4 8 h8z M0 -10 v18"/>',8:'<rect x="-10" y="2" width="9" height="6"/><rect x="1" y="2" width="9" height="6"/><rect x="-5" y="-5" width="9" height="6"/><rect x="-10" y="-12" width="9" height="6"/>',9:'<path d="M-8 -10 h16 v20 l-4 -3 l-4 3 l-4 -3 l-4 3z M-4 -4 h8 M-4 1 h6"/>',10:'<circle cx="0" cy="0" r="10"/><path d="M0 -6 v6 l4 3"/>'};
  const bG=S('g',{class:'cy-blds'},cam); const BLD={};
  for(let n=1;n<=10;n++){ const f=F[n]; const t=ANG[n]*Math.PI/180; const x=5+4.45*Math.cos(t), y=5+4.45*Math.sin(t); const [a,b]=iso(x,y); const h=34+(n%3)*14;
    const g=S('g',{class:'cy-b l-'+f.layer,transform:`translate(${a} ${b-14})`,tabindex:'0',role:'button','aria-label':'פיצ\'ר '+n+': '+f.title+'. '+f.line,style:`--n:${n}`},bG);
    const w=22; const top=[[0,-h-w*0.5],[w*0.87,-h],[0,-h+w*0.5],[-w*0.87,-h]];
    S('ellipse',{cx:0,cy:4,rx:26,ry:11,class:'cy-sh'},g);
    const body=S('g',{class:'cy-bb'},g);
    S('polygon',{points:`${-w*0.87},${-h} 0,${-h+w*0.5} 0,${w*0.5} ${-w*0.87},0`,class:'cy-f l'},body);
    S('polygon',{points:`${w*0.87},${-h} 0,${-h+w*0.5} 0,${w*0.5} ${w*0.87},0`,class:'cy-f r'},body);
    S('polygon',{points:top.map(p=>p.join(',')).join(' '),class:'cy-f t'},body);
    for(let k=0;k<Math.floor(h/14);k++){ S('rect',{x:-w*0.6,y:-h+10+k*14,width:5,height:6,class:'cy-win',transform:`skewY(30)`},body); S('rect',{x:w*0.25,y:-h+16+k*14,width:5,height:6,class:'cy-win',transform:`skewY(-30)`},body); }
    const badge=S('g',{class:'cy-badge',transform:`translate(0 ${-h-34})`},g); S('circle',{r:17,class:'cy-bc'},badge); const ic=S('g',{class:'cy-ic'},badge); ic.innerHTML=ICON[n];
    const num=S('text',{x:16,y:-10,class:'cy-num','text-anchor':'middle'},badge); num.textContent=n;
    const lab=S('text',{x:0,y:24,class:'cy-bl','text-anchor':'middle'},g); lab.textContent=f.title;
    const lw=S('text',{x:0,y:38,class:'cy-bl waze','text-anchor':'middle'},g); lw.textContent='';
    g.addEventListener('click',()=>openRoom(n)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openRoom(n); } });
    BLD[n]={g,x:a,y:b-14-h/2,ang:ANG[n],lw}; }
  // households on the ring, and the bank where mortgages renew
  const W0=window.LAB_MW||{bonds:[]};
  const carG=S('g',{class:'cy-cars mw-homes',transform:'translate(0,-14)'},cam);
  const STN=[[90,'הבנק','bank']];
  const stG=S('g',{class:'rg-stns',transform:'translate(0,-14)'},cam);
  STN.forEach(([ang,lab])=>{ const t=ang*Math.PI/180; const [a,b]=iso(5+(R-0.9)*Math.cos(t),5+(R-0.9)*Math.sin(t)); const g=S('g',{class:'rg-stn mw-bank',transform:`translate(${a} ${b})`},stG);
    S('rect',{x:-16,y:-24,width:32,height:24,rx:2},g); S('path',{d:'M-20 -24 h40 l-20 -12z'},g); const tx=S('text',{x:0,y:14,'text-anchor':'middle'},g); tx.textContent=lab; });
  let cars=[];

  /* ---------- side panel ---------- */
  const side=H('div','cy-side'); stage.append(side);
  const modeBar=H('div','cy-modes'); modeBar.setAttribute('role','tablist');
  const MODES=[['waze','הרחוב'],['market','המוצר'],['both','שניהם']];
  MODES.forEach(([k,l])=>{ const b=H('button','cy-mode',l); b.type='button'; b.dataset.m=k; b.addEventListener('click',()=>setMode(k)); modeBar.append(b); });
  stage.prepend(modeBar);
  const pW=H('div','cy-panel waze'), pM=H('div','cy-panel market'); side.append(pW,pM);
  // act 1 text + controls
  pW.innerHTML=`<p class="cy-k">מערכה 1 · רחוב של משכנתאות</p>
   <p>דמיינו רחוב שבו לכל בית יש משכנתא בריבית קבועה. כל משפחה לקחה אותה בשנה אחרת, ולכן כל אחת נגמרת בשנה אחרת. כשהמשכנתא נגמרת והכסף עדיין חסר, המשפחה עוברת בבנק ולוקחת חדשה, בריבית של אותו יום. מה קורה להחזר של כל הרחוב, כשהריבית היום גבוהה מזו שהייתה פעם?</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="vote">▶ להריץ את השנים</button><button type="button" class="cy-btn" data-a="peek">מה אומר קיצור הדרך?</button></div>
   <label class="cy-dens">הריבית שהבנק מציע היום: <b>3.5%</b><input type="range" min="1" max="6" step="0.5" value="3.5" aria-label="ריבית היום"></label>
   <div class="cy-meters"><span><b class="m-v">2026</b>השנה</span><span><b class="m-s">0</b>משכנתאות חודשו</span><span class="cy-eta"><b class="m-r">?</b>הריבית הממוצעת ברחוב</span></div>
   <p class="rg-out" aria-live="polite">כל בית צבוע לפי הריבית שהוא משלם: כחול זול, אדום יקר. לחצו "להריץ את השנים".</p>
   <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><rect x="10" y="40" width="22" height="22" class="ng-track"/><path d="M6 40 l15 -12 l15 12z" class="ng-track"/><rect x="49" y="40" width="22" height="22" class="ng-track"/><path d="M45 40 l15 -12 l15 12z" class="ng-track"/><rect x="88" y="40" width="22" height="22" class="ng-track"/><path d="M84 40 l15 -12 l15 12z" class="ng-track"/><circle cx="60" cy="16" r="8" class="ng-car j"/></svg>
   <figcaption><b>זה קורה באמת.</b> בבריטניה רוב המשכנתאות קבועות לשנתיים או לחמש שנים. כשהריבית קפצה ב-2022, ההחזר לא קפץ אצל כולם באותו יום: הוא עלה בכל חודש אצל עוד משפחות, בדיוק כשהתקופה הקבועה שלהן נגמרה. נסו בעצמכם: הורידו את הריבית של היום ל-2%, ותראו אם הרחוב באמת מתקרר.</figcaption></figure>
   <details class="cy-map"><summary>מה ברחוב מקביל למה אצלנו</summary><table><tbody>
   <tr><td>בית עם משכנתא</td><td>אג"ח אחת של המדינה</td></tr><tr><td>הריבית הקבועה שנחתמה</td><td>הקופון של האג"ח</td></tr><tr><td>השנה שבה המשכנתא נגמרת</td><td>תאריך הפקיעה</td></tr><tr><td>הבנק שמציע ריבית חדשה</td><td>השוק, והתשואה של אותה שנה</td></tr><tr><td>ההחזר של כל הרחוב</td><td>הריבית על החוב, באחוזים מהתמ"ג</td></tr><tr><td>"הרחוב משלם בממוצע 1.5%"</td><td>קיצור הדרך של הריבית הקפואה</td></tr><tr><td>המשכורות של הרחוב</td><td>הצמיחה של המדינה</td></tr></tbody></table></details>
   <p class="cy-bridge">ברחוב יש 24 בתים, ואפשר לספור אותם בראש. למדינה יש מאות אג"ח, וכל אחת מתחדשת בתאריך אחר. כדי לחשב את זה בשביל מדינה אמיתית צריך מוצר: מי מביא את הרשימה, איך יודעים שהיא נכונה, ומה מראים לנועה.</p>
   <button type="button" class="cy-morph">עכשיו נחליף את הבתים באג"ח ←</button>`;
  pM.innerHTML=`<p class="cy-k">מערכה 2 · עיר הפיצ'רים</p>
   <p>אותו נוף, שתי משמעויות. הדרך היא המסלול של טעינה אחת של נתונים, מהקובץ של משרד החוב ועד הגרף של נועה, ובכל תחנה לאורכה עומד בניין: פיצ'ר אחד של המוצר. ארבע שכונות, ארבע שכבות: האיסוף, החישוב, התצוגה והאמון.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">לשלוח קובץ חדש</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">לחצו על בניין כדי להיכנס לחדר שלו. גם הצומת, המגדל והגשר נפתחים.</p>`;
  const list=pM.querySelector('.cy-list');
  for(let n=1;n<=10;n++){ const li=H('li'); const b=H('button','cy-li'); b.type='button'; b.append(H('b','',String(n)),H('span','',F[n].title),H('small','',LAY[F[n].layer])); b.addEventListener('click',()=>openRoom(n)); b.addEventListener('mouseenter',()=>BLD[n].g.classList.add('hl')); b.addEventListener('mouseleave',()=>BLD[n].g.classList.remove('hl')); li.append(b); list.append(li); }
  const card=H('div','cy-card'); card.hidden=true; stage.append(card);

  /* ---------- the street model ---------- */
  const pathLen=ringPath.getTotalLength(); const AT=STN.map(x=>x[0]/360);
  const pick=W0.bonds.filter(b=>b[1]>=2027&&b[1]<=2040); const HOMES=Array.from({length:24},(_,i)=>{ const b=pick[Math.floor(i*pick.length/24)]||[2000,2027+(i%14),1,1]; return {mat:b[1],cpn:Math.max(0,b[2])}; });
  const col=r=>{ const k=Math.max(0,Math.min(1,r/5)); const A=[36,64,142],B=[177,80,46]; return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join(',')+')'; };
  let TODAY=3.5, year=2026, renewed=0, run=false, last=0, clock=0;
  const avg0=HOMES.reduce((a,h)=>a+h.cpn,0)/HOMES.length;
  function setHomes(){ carG.textContent=''; cars=[]; year=2026; renewed=0; clock=0; HOMES.forEach((h,i)=>{ const g=S('g',{class:'mw-h'},carG); const body=S('rect',{x:-5,y:-7,width:10,height:8},g); const roof=S('path',{d:'M-7 -7 l7 -6 l7 6z'},g);
      cars.push({f:(i/HOMES.length+AT[0]+0.002)%1,rate:h.cpn,mat:h.mat,g,body,roof}); }); paint(); place(); upd(); }
  function paint(){ cars.forEach(c=>{ c.body.setAttribute('fill',col(c.rate)); c.roof.setAttribute('fill',col(c.rate)); }); }
  function place(){ cars.forEach(c=>{ const p=ringPath.getPointAtLength(c.f*pathLen); c.g.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(1.7)`); }); }
  const mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'), out=pW.querySelector('.rg-out');
  const avg=()=>cars.reduce((a,c)=>a+c.rate,0)/cars.length;
  function upd(){ mv.textContent=year; ms.textContent=renewed+' / '+cars.length; mr.textContent=avg().toFixed(2)+'%'; }
  const SP=0.3;
  function step(dt){ clock+=SP*dt; const ny=2026+Math.min(10,Math.floor(clock)); if(ny!==year){ year=ny; }
    cars.forEach(c=>{ const before=c.f; c.f=(c.f+SP*dt)%1; const pass=before<AT[0]&&(c.f>=AT[0]||c.f<before)||(c.f<before&&AT[0]>before);
      if(pass&&c.mat<=year&&!c.done){ c.done=true; c.rate=TODAY; c.mat=year+10; renewed++; c.body.setAttribute('fill',col(c.rate)); c.roof.setAttribute('fill',col(c.rate)); c.g.classList.add('pop'); setTimeout(()=>c.g.classList.remove('pop'),600); } }); upd(); }
  function loop(t){ if(!run) return; const dt=Math.min(.05,(t-last)/1000||.016); last=t; step(dt); place(); if(clock>=10){ run=false; done(); return; } requestAnimationFrame(loop); }
  function done(){ year=2036; upd(); const a=avg(); out.textContent='עשר שנים עברו. '+renewed+' מתוך 24 משכנתאות חודשו, והריבית הממוצעת ברחוב עלתה מ-'+avg0.toFixed(2)+'% ל-'+a.toFixed(2)+'%.'+(TODAY<3?' גם כשהבנק מציע רק '+TODAY+'%, הרחוב משלם יותר, כי המשכנתאות הישנות היו זולות עוד יותר.':''); }
  function startLoop(){ if(run) return; if(reduce){ cars.forEach(c=>{ if(c.mat<=2036){ c.rate=TODAY; renewed++; } }); paint(); clock=10; done(); return; } run=true; last=performance.now(); requestAnimationFrame(loop); }
  function stopLoop(){ run=false; }
  let vis=false, mode='waze';
  new IntersectionObserver(es=>es.forEach(e=>{ vis=e.isIntersecting; if(!vis) stopLoop(); }),{threshold:.1}).observe(stage);
  setHomes();
  pW.querySelector('[data-a="vote"]').addEventListener('click',()=>{ if(clock>=10||run===false&&renewed>0) setHomes(); out.textContent='המשפחות נוסעות סביב הרחוב. כל פעם שמשפחה עוברת בבנק בשנה שבה המשכנתא שלה נגמרה, היא מחדשת אותה ב-'+TODAY+'%.'; startLoop(); });
  pW.querySelector('[data-a="peek"]').addEventListener('click',()=>{ out.textContent='קיצור הדרך אומר: "הרחוב משלם בממוצע '+avg0.toFixed(2)+'%, וימשיך לשלם את זה." הוא לא רואה שכל משכנתא מתחדשת בשנה שלה. בפועל, ב-'+year+' הממוצע הוא '+avg().toFixed(2)+'%.'; });
  const dens=pW.querySelector('.cy-dens input'); dens.addEventListener('input',()=>{ TODAY=+dens.value; pW.querySelector('.cy-dens b').textContent=TODAY+'%'; stopLoop(); setHomes(); out.textContent='הריבית של היום: '+TODAY+'%. לחצו "להריץ את השנים".'; });
  pW.querySelector('.cy-morph').addEventListener('click',()=>setMode('market'));

  /* ---------- modes ---------- */
  const WAZE={1:'דף חשבון מכל בנק, כל אחד בפורמט אחר',2:'סך המשכנתאות חייב להתאים לרישום בטאבו',3:'תיקייה שבה כל דף חשבון נשמר כמו שהוא',4:'מה הבנק מציע היום, לכל אורך הלוואה',5:'משכנתא שנגמרת מתחדשת בריבית של היום',6:'האם המשכורת עולה מהר יותר מההחזר',7:'לשאול כמה יועצים, ולהשוות את התשובות',8:'לוח שנה עם כל מועדי החידוש של הרחוב',9:'קבלה חתומה על כל חישוב',10:'דף חשבון חדש שמגיע כל חודש לבד'};
  function setMode(m){ mode=m; stage.dataset.mode=m; modeBar.querySelectorAll('.cy-mode').forEach(b=>{ b.classList.toggle('on',b.dataset.m===m); b.setAttribute('aria-selected',b.dataset.m===m); });
    for(let n=1;n<=10;n++) BLD[n].lw.textContent=m==='both'?'ברחוב: '+WAZE[n]:'';
    if(m==='market'){ stopLoop(); }
    if(m!=='waze' && !stage.dataset.risen){ stage.dataset.risen='1'; } }
  setMode('waze');

  /* ---------- camera ---------- */
  const MOB=innerWidth<700; const HOME=MOB?[170,20,660,560]:[0,0,1000,620]; let vb=HOME.slice(), anim=null; svg.setAttribute('viewBox',HOME.join(' '));
  function camTo(t,dur){ const from=vb.slice(); const t0=performance.now(); dur=reduce?1:(dur||900); cancelAnimationFrame(anim);
    const st=(now)=>{ const k=Math.min(1,(now-t0)/dur), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; vb=from.map((v,i)=>v+(t[i]-v)*e); svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' ')); if(k<1) anim=requestAnimationFrame(st); }; anim=requestAnimationFrame(st); }
  const home=()=>camTo(HOME); const zoomB=n=>{ const b=BLD[n]; camTo([b.x-210,b.y-140,420,260]); };

  /* ---------- tour ---------- */
  const EX={1:'הקובץ החודשי של משרד החוב הצרפתי נקרא לפי שמות הכותרות, ולא לפי מספר העמודה. אם מחר יזיזו עמודה, שום דבר לא יישבר.',2:'סכום כל האג"ח חייב לצאת בדיוק החוב שצרפת עצמה מצהירה. אילו עמודה אחת נקראה במיליארדים במקום במיליונים, הפער היה עוצר את הטעינה.',3:'הטעינה של אוקטובר מקבלת טביעת אצבע. גם בעוד שנה אפשר לחזור בדיוק אליה, ולראות מאיזה קובץ היא באה.',4:'העקום של היום: 3% לעשר שנים. תרחיש "עלייה": 4%. תרחיש "ירידה": 2%. ההנחות כתובות ליד כל אחד.',5:'ב-2027 פוקעות אג"ח בשווי 11.3% מהתמ"ג, ומוחלפות בחדשות בתשואה של אותה שנה.',6:'ב-3%, הריבית על החוב מגיעה ל-4.90% מהתמ"ג ב-2036, והחוב ל-157%. מכאן הוא גדל מעצמו.',7:'ב-2031: אג"ח אחר אג"ח 3.82%, ריבית קפואה 3.07%. פער של 0.74 נקודות תמ"ג בשנה.',8:'הלבנה של 2016, בחצי אחוז, היא האדומה ביותר: התשואה של היום גבוהה ממנה בשלוש נקודות.',9:'נועה מצטטת את הקישור בסיפור שלה. כל קורא שלוחץ עליו מקבל בדיוק אותו גרף, עם אותן הנחות.',10:'משרד החוב מפרסם קובץ חדש. הכלי טוען, בודק, ומתריע: שלוש אג"ח חדשות, ואחת נעלמה לפני זמנה.'};
  let tour=null;
  function tourShow(i){ const n=i+1, f=F[n]; zoomB(n); Object.values(BLD).forEach(b=>b.g.classList.remove('hl')); BLD[n].g.classList.add('hl');
    card.hidden=false; card.innerHTML=''; const hd=H('div','cy-ch'); hd.append(H('span','cy-cn',n+' / 10'),H('strong','',f.title),H('small','','שכונת '+LAY[f.layer])); card.append(hd);
    const r1=H('p'); r1.innerHTML='<b>מה זה:</b> '; r1.append(f.line); card.append(r1);
    const r2=H('p'); r2.innerHTML='<b>למה צריך:</b> '; r2.append(f.hook.split(/(?<=[.!?])\s/)[0]); card.append(r2);
    const r3=H('p','cy-wz'); r3.innerHTML='<b>ברחוב:</b> '; r3.append(WAZE[n]); card.append(r3);
    const r4=H('p','cy-ex'); r4.append(EX[n]); card.append(r4);
    const ctl=H('div','cy-cc'); const pv=H('button','cy-btn','‹'), pp=H('button','cy-btn',tour&&tour.t?'❚❚':'▶'), nx=H('button','cy-btn go','›'), rm=H('button','cy-btn','לחדר ←'), ex=H('button','cy-btn','✕'); [pv,pp,nx,rm,ex].forEach(b=>b.type='button'); pv.setAttribute('aria-label','הקודם'); nx.setAttribute('aria-label','הבא'); ex.setAttribute('aria-label','יציאה מהסיור');
    pv.addEventListener('click',()=>{ tourGo(Math.max(0,tour.i-1),true); }); nx.addEventListener('click',()=>{ tourGo(Math.min(9,tour.i+1),true); }); pp.addEventListener('click',()=>{ if(tour.t){ clearInterval(tour.t); tour.t=null; pp.textContent='▶'; } else { tour.t=setInterval(()=>tourGo(tour.i+1),6500); pp.textContent='❚❚'; } }); rm.addEventListener('click',()=>openRoom(n)); ex.addEventListener('click',tourEnd);
    const dots=H('span','cy-dots'); for(let k=0;k<10;k++){ const d=H('i',k===i?'on':''); dots.append(d); } ctl.append(pv,pp,nx,dots,rm,ex); card.append(ctl); }
  function tourGo(i,manual){ if(i>9){ tourEnd(); return; } tour.i=i; if(manual&&tour.t){ clearInterval(tour.t); tour.t=null; } tourShow(i); }
  function tourEnd(){ if(tour&&tour.t) clearInterval(tour.t); tour=null; card.hidden=true; Object.values(BLD).forEach(b=>b.g.classList.remove('hl')); home(); }
  pM.querySelector('[data-a="play"]').addEventListener('click',()=>{ if(mode!=='market') setMode('market'); tour={i:0,t:null}; stage.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}); camTo(MOB?HOME:[60,40,880,545],700); setTimeout(()=>{ tourShow(0); tour.t=reduce?null:setInterval(()=>tourGo(tour.i+1),6500); tourShow(0); },reduce?0:800); });
  pM.querySelector('[data-a="home"]').addEventListener('click',()=>{ tourEnd(); });
  // shock pulse around the ring
  pM.querySelector('[data-a="shock"]').addEventListener('click',()=>{ const dot=S('circle',{r:12,class:'cy-pulse'},roadG); const t0=performance.now(), dur=reduce?10:5200;
    const lit=new Set(); const go=(now)=>{ const k=Math.min(1,(now-t0)/dur); const L=k*pathLen; const p=ringPath.getPointAtLength(L); dot.setAttribute('cx',p.x); dot.setAttribute('cy',p.y);
      const deg=(k*360); for(let n=1;n<=10;n++){ let a=(BLD[n].ang+360)%360; if(deg>=a&&!lit.has(n)){ lit.add(n); BLD[n].g.classList.add('zap'); setTimeout(()=>BLD[n].g.classList.remove('zap'),1600); } }
      if(k<1) requestAnimationFrame(go); else dot.remove(); }; requestAnimationFrame(go); });

  /* ---------- rooms ---------- */
  const KIND={shelf:'טכנולוגיה קיימת',compose:'חיבור שבנינו',ours:'החלטה שלנו'};
  let ov=null, cur=0;
  function shell(title,tag){ if(!ov){ ov=H('div','cy-ov'); ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); document.body.append(ov); document.addEventListener('keydown',key); }
    ov.innerHTML=''; const hd=H('div','cy-ovh'); const back=H('button','cy-back','→ חזרה לעיר'); back.type='button'; back.addEventListener('click',closeOv);
    const tt=H('div','cy-ovt'); tt.append(H('span','cy-tag',tag),H('h3','',title)); hd.append(back,tt); ov.append(hd); const body=H('div','cy-ovb'); ov.append(body); ov.setAttribute('aria-label',title);
    requestAnimationFrame(()=>ov.classList.add('on')); back.focus({preventScroll:true}); return {hd,body}; }
  function key(e){ if(e.key==='Escape') closeOv(); }
  let moved=null;
  function closeOv(){ if(!ov) return; if(moved){ moved.home.insertBefore(moved.el,moved.next); moved=null; } ov.classList.remove('on'); const o=ov; ov=null; document.removeEventListener('keydown',key); setTimeout(()=>o.remove(),250); }
  function openSection(k,t){ const map={dc:'sp-dc',kn:'sp-kn',cl:'sp-cl'}; const el=full.querySelector('.'+map[k]); if(!el) return;
    const {body}=shell(t,k==='dc'?'צומת':k==='kn'?'מגדל':'גשר'); moved={el,home:el.parentNode,next:el.nextSibling}; el.classList.add('in'); body.append(el); }
  function openRoom(n){ cur=n; const f=F[n]; if(tour&&tour.t){ clearInterval(tour.t); tour.t=null; }
    const {hd,body}=shell(f.title,'פיצ\'ר '+n+' · שכונת '+LAY[f.layer]);
    const nav=H('div','cy-nav'); const pv=H('button','cy-btn','‹ הקודם'), nx=H('button','cy-btn go','הבא ›'); pv.type=nx.type='button'; pv.disabled=n===1; nx.disabled=n===10; pv.addEventListener('click',()=>openRoom(n-1)); nx.addEventListener('click',()=>openRoom(n+1));
    const mini=H('div','cy-mini'); for(let k=1;k<=10;k++){ const d=H('button',k===n?'on':''); d.type='button'; d.textContent=k; d.setAttribute('aria-label','פיצ\'ר '+k+': '+F[k].title); d.addEventListener('click',()=>openRoom(k)); mini.append(d); }
    nav.append(pv,mini,nx); hd.append(nav);
    const g=H('div','cy-room');
    const a=H('section','cy-r1'); a.append(H('p','cy-one',f.line)); const pair=H('div','cy-pair'); const w=H('div','cy-pw'); w.append(H('span','cy-k','ברחוב'),H('p','',WAZE[n])); const o=H('div','cy-po'); o.append(H('span','cy-k','אצלנו'),H('p','',f.hook)); pair.append(w,o); a.append(pair,H('p','cy-ex',EX[n])); g.append(a);
    const m=H('section','cy-r2'); m.append(H('span','cy-k','מודל קטן לשחק בו')); const mb=H('div','cy-model'); m.append(mb); MODEL[n](mb); g.append(m);
    const c=H('section','cy-r3'); c.append(H('span','cy-k','איך זה עובד, בתמונות')); const strip=H('div','cy-comic'); (f.how||[]).slice(0,4).forEach((t,i)=>{ const p=H('div','cy-cp'); p.style.setProperty('--i',i); p.append(H('b','',String(i+1)),H('p','',t)); strip.append(p); }); c.append(strip); g.append(c);
    const cut=H('section','cy-r4'); cut.append(H('span','cy-k','חתך של הבניין: הקומות הן הטכנולוגיות'));
    const bld=H('div','cy-cut'); (f.built||[]).slice().reverse().forEach(b=>{ const fl=H('div','cy-floor '+b.kind); fl.append(H('b','',b.name),H('small','',KIND[b.kind]||'')); bld.append(fl); }); bld.append(H('div','cy-ground'));
    const lg=H('div','cy-lg'); Object.entries(KIND).forEach(([k,l])=>lg.append(H('span','cy-floor-k '+k,l))); cut.append(bld,lg); g.append(cut);
    const deep=H('details','cy-deep'); deep.append(H('summary','','לרדת לעומק: כל הטקסט של הפיצ\'ר'));
    deep.append(H('p','',f.hook)); if(f.explain&&f.explain.length===2){ const ex=H('p'); ex.innerHTML='<b></b> '; ex.querySelector('b').textContent=f.explain[0]; ex.append(f.explain[1]); deep.append(ex); }
    const ol=H('ol'); (f.how||[]).forEach(t=>ol.append(H('li','',t))); deep.append(ol);
    if(f.threat){ const th=H('p','cy-threat'); th.innerHTML='<b>מה יכול להשתבש:</b> '; th.append(f.threat); deep.append(th); const an=H('p'); an.innerHTML='<b>התשובה שלנו:</b> '; an.append(f.answer||''); deep.append(an); }
    if(f.io){ const io=H('p'); io.innerHTML='<b>נכנס:</b> '; io.append(f.io[0]); io.append(H('br')); const b2=H('b','','יוצא:'); io.append(b2,' '+f.io[1]); deep.append(io); }
    if(f.data){ const tb=H('table','cy-data'); const cap=H('caption','',f.data.rec); tb.append(cap); f.data.fields.forEach(([k,v])=>{ const tr=H('tr'); const td=H('td'); const cd=H('code','',k); cd.setAttribute('dir','ltr'); td.append(cd); tr.append(td,H('td','',v)); tb.append(tr); }); deep.append(tb); }
    g.append(deep); body.append(g); body.scrollTop=0;
    if(window.TermWin) window.TermWin.wire(body); }

  /* ---------- small models, one per room (all live in the browser) ---------- */
  const hex=async t=>{ try{ const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)); return [...new Uint8Array(b)].slice(0,8).map(x=>x.toString(16).padStart(2,'0')).join(''); }catch(e){ let h=0; for(const c of t) h=(h*31+c.charCodeAt(0))>>>0; return h.toString(16); } };
  const RUN=(W0.runs&&W0.runs['3'])||{bond:[],frozen:[],jump:[]};
  const MODEL={
   1(b){ b.innerHTML='<div class="md-rows mw-files"><span dir="ltr">US · {"maturity":"2031-05-15","amt":42.1,"cpn":1.25}</span><span dir="ltr">FR · Echéance | Encours | Coupon</span><span dir="ltr">IT · Scadenza ; Cedola ; Importo</span></div><button type="button" class="cy-btn go">לתרגם לשפה אחת ›</button><div class="md-cells"></div><p class="md-cap">שלושה משרדי חוב, שלוש שפות. המתאמים מחפשים כותרות לפי מילים.</p>';
     const bt=b.querySelector('button'), cells=b.querySelector('.md-cells'), cap=b.querySelector('.md-cap');
     bt.addEventListener('click',()=>{ cells.innerHTML=['ארה"ב','צרפת','איטליה'].map(c=>`<span><small>${c}</small><b dir="ltr">פקיעה · סכום · קופון</b></span>`).join(''); cap.textContent='אותה רשימה בדיוק, משלושה מקורות שונים. מכאן והלאה, המנוע לא יודע ולא צריך לדעת מאיזו מדינה הנתונים באו.'; }); },
   2(b){ b.innerHTML='<div class="md-ver"><span><small>החוב שצרפת מצהירה</small><b>115.5%</b></span><span class="sv"><small>סכום הרשימה שנטענה</small><b>115.5%</b></span></div><label class="md-tog"><input type="checkbox"> עמודה אחת נקראה במיליארדים במקום במיליונים</label><p class="md-cap">שווים. הטעינה מאושרת.</p>';
     const c=b.querySelector('input'), sv=b.querySelector('.sv b'), cap=b.querySelector('.md-cap'); c.addEventListener('change',()=>{ sv.textContent=c.checked?'115,470%':'115.5%'; b.querySelector('.md-ver').classList.toggle('bad',c.checked); cap.textContent=c.checked?'פער של פי אלף. הטעינה נעצרת לפני שמישהו רואה מספר, ומתאם הקובץ נבדק. כמו רואה חשבון שלא חותם כשהבנק לא מתאים לספרים.':'שווים. הטעינה מאושרת.'; }); },
   3(b){ b.innerHTML='<label>הטעינה של החודש (קופון של אג"ח אחת): <input type="number" value="0.50" step="0.01"></label><div class="md-com"><span>טביעת האצבע של הטעינה:</span><code dir="ltr"></code></div><button type="button" class="cy-btn hot">לתקן מספר אחד</button><div class="md-hist"></div><p class="md-cap"></p>';
     const inp=b.querySelector('input'), code=b.querySelector('code'), bt=b.querySelector('button'), hist=b.querySelector('.md-hist'), cap=b.querySelector('.md-cap');
     const draw=async()=>{ const h=await hex('FR|2026-10|'+inp.value); code.textContent=h; return h; }; draw().then(h=>{ hist.innerHTML='<span>'+h+'</span>'; cap.textContent='כל טעינה היא מהדורה בארכיון.'; });
     bt.addEventListener('click',async()=>{ inp.value=(+inp.value+0.01).toFixed(2); const h=await draw(); hist.innerHTML+='<span class="new">'+h+'</span>'; cap.textContent='תיקון לא דורס את הישן: נוצרה מהדורה חדשה עם טביעת אצבע חדשה, והישנה עדיין שם. גרף שצוטט אתמול עדיין ניתן לשחזור.'; }); },
   4(b){ b.innerHTML='<label>התרחיש: <b>כמו היום</b><input type="range" min="-1" max="2" step="1" value="0"></label><svg viewBox="0 0 300 120" class="md-curve"><polyline class="c0" points=""/><polyline class="c1" points=""/></svg><p class="md-cap">הקו המקווקו הוא העקום של היום. הקו המלא הוא התרחיש.</p>';
     const r=b.querySelector('input'), c0=b.querySelector('.c0'), c1=b.querySelector('.c1'); const M=[1,2,3,5,7,10,15,20,30]; const y0=m=>2.2+1.6*(1-Math.exp(-m/6)); const pts=s=>M.map(m=>(290-m*9.4).toFixed(0)+','+(110-(y0(m)+s)*18).toFixed(0)).join(' ');
     c0.setAttribute('points',pts(0)); const draw=()=>{ const s=+r.value; b.querySelector('label b').textContent=['ירידה של נקודה','כמו היום','עלייה של נקודה','עלייה של שתי נקודות'][s+1]; c1.setAttribute('points',pts(s)); }; r.addEventListener('input',draw); draw(); },
   5(b){ const B0=[[2027,0.5],[2028,0],[2029,1.2],[2030,2.5],[2031,0.8]]; b.innerHTML='<label>התשואה בשוק: <b>3%</b><input type="range" min="1" max="6" step="0.5" value="3"></label><div class="md-fund mw-roll"></div><button type="button" class="cy-btn go">שנה קדימה ›</button><p class="md-cap">חמש אג"ח בתיק. כל שנה, זו שפוקעת מוחלפת בחדשה, בתשואה של השוק.</p>';
     const r=b.querySelector('input'), box=b.querySelector('.mw-roll'), bt=b.querySelector('button'), cap=b.querySelector('.md-cap'); let bs=B0.map(x=>x.slice()), y=2026;
     const draw=()=>{ box.innerHTML=bs.map(([m,c])=>`<span class="${m>2031?'new':''}">${m}<b>${c.toFixed(1)}%</b></span>`).join(''); };
     r.addEventListener('input',()=>{ b.querySelector('label b').textContent=r.value+'%'; bs=B0.map(x=>x.slice()); y=2026; draw(); cap.textContent='מתחילים מחדש.'; });
     bt.addEventListener('click',()=>{ y++; const i=bs.findIndex(x=>x[0]===y); if(i>=0){ bs[i]=[y+10,+r.value]; } if(y>2031){ bs=B0.map(x=>x.slice()); y=2026; } draw(); const a=bs.reduce((s,x)=>s+x[1],0)/bs.length; cap.textContent=y===2026?'מתחילים מחדש.':'ב-'+y+' הריבית הממוצעת בתיק: '+a.toFixed(2)+'%.'; }); draw(); },
   6(b){ b.innerHTML='<label>הריבית על החוב: <b>4%</b><input class="r" type="range" min="1" max="7" step="0.5" value="4"></label><label>הצמיחה: <b>2%</b><input class="g" type="range" min="0" max="5" step="0.5" value="2"></label><div class="md-rep"><span><small>החוב בעוד עשר שנים, בלי עודף</small><b class="d"></b></span><span><small>העודף שמייצב אותו</small><b class="s"></b></span></div><p class="md-cap"></p>';
     const r=b.querySelector('.r'), g=b.querySelector('.g'), cap=b.querySelector('.md-cap'); const draw=()=>{ const R=+r.value, G=+g.value; b.querySelectorAll('label b')[0].textContent=R+'%'; b.querySelectorAll('label b')[1].textContent=G+'%'; let d=115.5; for(let i=0;i<10;i++) d=d*(1+R/100)/(1+G/100); b.querySelector('.d').textContent=d.toFixed(0)+'%'; b.querySelector('.s').textContent=((R-G)/(100+G)*115.5).toFixed(1)+'%'; cap.textContent=R>G?'הריבית עוקפת את הצמיחה: החוב גדל מעצמו, כמו אופניים בעלייה כשהרוח נגדך.':'הצמיחה עוקפת את הריבית: החוב מתכווץ לבד, גם בלי עודף.'; }; r.addEventListener('input',draw); g.addEventListener('input',draw); draw(); },
   7(b){ const v=[['אג"ח אחר אג"ח',(RUN.bond[4]||[0,3.82])[1]],['ריבית קפואה',(RUN.frozen[4]||[0,3.07])[1]],['קפיצה מיידית',(RUN.jump[4]||[0,4.26])[1]]]; b.innerHTML='<p>אותו תרחיש, 3% לעשר שנים, שלוש מאזניים. הריבית על החוב ב-2031, באחוזים מהתמ"ג:</p><div class="md-bars">'+v.map(([n,x],i)=>`<span class="${i?'':'ref'}"><small>${n}</small><i style="--w:${(x/5*100).toFixed(0)}%"></i><b>${x.toFixed(2)}%</b></span>`).join('')+'</div><p class="md-cap">המאזניים לא מסכימים. כל פער מוצג גלוי, גם אם יתברר שהוא קטן.</p>'; },
   8(b){ const bs=(W0.bonds||[]).filter(x=>x[1]<=2036).slice(0,30); b.innerHTML='<label>התשואה שבה יוחלפו: <b>3%</b><input type="range" min="1" max="6" step="0.5" value="3"></label><div class="md-wall"></div><p class="md-cap">כל לבנה היא אג"ח. ככל שהיא אדומה יותר, הקפיצה בין הקופון שלה לתשואה של היום גדולה יותר.</p>';
     const r=b.querySelector('input'), wall=b.querySelector('.md-wall'); const draw=()=>{ const y=+r.value; b.querySelector('label b').textContent=y+'%'; wall.innerHTML=bs.map(x=>{ const j=y-x[2]; const k=Math.max(0,Math.min(1,j/4)); return `<i title="${x[1]} · ${x[2].toFixed(2)}% → ${y}%" style="background:rgb(${Math.round(228-51*k)},${Math.round(236-156*k)},${Math.round(246-200*k)})"></i>`; }).join(''); }; r.addEventListener('input',draw); draw(); },
   9(b){ b.innerHTML='<label>התרחיש: <select><option>3% לעשר שנים</option><option>4% לעשר שנים</option><option>2% לעשר שנים</option></select></label><div class="md-com"><span>מזהה ההרצה:</span><code dir="ltr"></code></div><p class="md-cap">אותה טעינה, אותו תרחיש ואותה גרסה תמיד נותנים אותו מזהה. מזהה אחר, תוצאה אחרת.</p>';
     const s=b.querySelector('select'), code=b.querySelector('code'); const draw=async()=>{ code.textContent='differential.app/run/'+(await hex('FR|2026-10|engine-1.4|'+s.value)).slice(0,12); }; s.addEventListener('change',draw); draw(); },
   10(b){ b.innerHTML='<button type="button" class="cy-btn go">פרסום חדש של משרד החוב ›</button><div class="md-diff"></div><p class="md-cap">כל פרסום חדש נטען לבד, ומושווה לקודם.</p>';
     const bt=b.querySelector('button'), df=b.querySelector('.md-diff'), cap=b.querySelector('.md-cap'); let k=0;
     bt.addEventListener('click',()=>{ k++; const odd=k%2===0; df.innerHTML='<span class="ok">+3 אג"ח חדשות</span><span class="ok">−2 אג"ח פקעו בזמן</span>'+(odd?'<span class="bad">−1 אג"ח נעלמה לפני זמנה</span>':''); cap.textContent=odd?'התראה: אג"ח נעלמה לפני תאריך הפקיעה שלה. אולי פדיון מוקדם, אולי שגיאה בקובץ. מישהו בודק לפני שהיא נכנסת לחישוב.':'הכול צפוי. אין התראה.'; }); }
  };
  if(window.TermWin) window.TermWin.wire(top);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
