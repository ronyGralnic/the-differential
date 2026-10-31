/* Registry spec as three acts on one isometric island (same engine as Fire-Sale's city):
   Act 1 · election day: ID at the door, a secret ballot, three party observers count together, small boxes get mixed
   Act 2 · "swap the voters for funds": the feature city (10 buildings, 4 districts, PLAY tour, a report travelling the ring)
   Act 3 · a room per feature (one sentence, the ballot vs ours, a small live model, a comic strip, a cutaway, the full text)
   The original spec stays whole under "המסמך המלא". */
(function(){
  function boot(){
  const root=document.querySelector('.sp[data-sp="registry"]'); const D=window.SPEC&&window.SPEC['registry'];
  if(!root||!D||root.dataset.city) return; if(!root.classList.contains('sp-root')){ setTimeout(boot,60); return; } root.dataset.city='1'; root.classList.add('cy-rg');
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
  intro.innerHTML=`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים, ואף אחד לא מציץ</h4>
   <p>אחרי שה-POC הראה שהליבה עובדת, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר, כאילו מחר מתחילים לבנות אותו. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "לזהות קרן בלי לדעת מי היא" או "לחסום שאלה מסוכנת".</p>
   <div class="cy-emma"><span class="cy-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="#e9c6a8"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="#4a2f22"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="#2f5d8a"/></svg></span>
   <div><span class="cy-k">בוקר של סוף רבעון</span><p>אמה (בדויה), אנליסטית ברשות פיקוח פיננסי, יודעת שקרנות האשראי בשלוש מדינות חשופות לאותם ענפים. היא רוצה לדעת כמה, בלי לבקש מאף קרן לחשוף את עצמה, ובלי שאף רשות תעביר נתונים לאחרת. ה-POC הראה שהמתמטיקה עובדת. עכשיו צריך מוצר שלם: מי רשאי לדווח, איך יודעים שאף שרת לא רימה, ומה עושים כשאחד נופל.</p></div></div>
   <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>תמונה של ה${tm('exposure','חשיפות')} בכל השוק, משלוש רשויות יחד, שבה אף אחד לא רואה קרן בודדת: לא השרתים, לא הרשויות, ולא אמה. כל סכום נבדק לפני שמישהו רואה אותו, וכל פעולה נרשמת ביומן שאי אפשר למחוק ממנו. ומה שהוא לא מבטיח כתוב במפורש: הוא מראה את התמונה של היום, לא את מה שיקרה לה מחר.</p></div>
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
  const DIST={party:[-165,-75],servers:[-60,30],gate:[40,100],trust:[110,195]};
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
  const LM=[['dc',5,5.9,'צומת ההחלטות','הכיוונים שבחרנו, ומה שוויתרנו עליו'],['kn',6.6,6.9,'מגדל התצפית','המחוון החי: הסוד בפעולה'],['cl',10.4,7.6,'הגשר','מה האפיון סגר, ומה נשאר פתוח']];
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
  const ICON={1:'<rect x="-11" y="-8" width="22" height="16" rx="2"/><circle cx="-4" cy="-1" r="3"/><path d="M2 -3 h6 M2 2 h6"/>',2:'<path d="M-10 -10 h20 v20 h-20z M-10 -3 h20 M-10 4 h20 M-3 -10 v20 M4 -10 v20"/>',3:'<rect x="-8" y="-2" width="16" height="12" rx="2"/><path d="M-5 -2 v-4 a5 5 0 0 1 10 0 v4"/>',4:'<path d="M0 -10 v6 M0 -4 L-9 8 M0 -4 L0 9 M0 -4 L9 8"/><circle cx="0" cy="-10" r="2"/>',5:'<rect x="-11" y="-9" width="6" height="18" rx="1"/><rect x="-3" y="-9" width="6" height="18" rx="1"/><rect x="5" y="-9" width="6" height="18" rx="1"/>',6:'<circle cx="0" cy="0" r="10"/><path d="M-5 0 l4 4 l7 -8"/>',7:'<path d="M-10 10 v-14 a10 10 0 0 1 20 0 v14 M-10 10 h20 M0 10 v-10"/>',8:'<path d="M-11 -7 h22 v14 h-22z M-11 -7 l11 8 l11 -8"/>',9:'<path d="M-9 -10 h14 l4 4 v16 h-18z M-5 -3 h10 M-5 2 h10 M-5 7 h6"/>',10:'<path d="M-10 9 h20 M-7 9 v-6 M-1 9 v-12 M5 9 v-8"/>'};
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
  // voters on the ring, and three stations along it
  const carG=S('g',{class:'cy-cars rg-voters',transform:'translate(0,-14)'},cam);
  const STN=[[60,'תעודת זהות','id'],[120,'מאחורי הפרגוד','env'],[180,'הקלפי','box']];
  const stG=S('g',{class:'rg-stns',transform:'translate(0,-14)'},cam);
  STN.forEach(([ang,lab])=>{ const t=ang*Math.PI/180; const [a,b]=iso(5+(R-0.9)*Math.cos(t),5+(R-0.9)*Math.sin(t)); const g=S('g',{class:'rg-stn',transform:`translate(${a} ${b})`},stG);
    S('rect',{x:-14,y:-22,width:28,height:22,rx:3},g); S('path',{d:'M-17 -22 h34 l-4 -8 h-26z'},g); const tx=S('text',{x:0,y:14,'text-anchor':'middle'},g); tx.textContent=lab; });
  const obsG=S('g',{class:'rg-obs',transform:'translate(0,-14)'},cam);
  { const t=180*Math.PI/180; const [a,b]=iso(5+(R-1.9)*Math.cos(t),5+(R-1.9)*Math.sin(t)); obsG.setAttribute('transform',`translate(${a} ${b-14})`); ['#3f7fd1','#2f9b6e','#d18a2c'].forEach((c,i)=>{ const g=S('g',{transform:`translate(${(i-1)*18} 0)`},obsG); S('circle',{cy:-14,r:5,fill:c},g); S('path',{d:'M-6 0 q6 -10 12 0z',fill:c},g); }); }
  let cars=[];

  /* ---------- side panel ---------- */
  const side=H('div','cy-side'); stage.append(side);
  const modeBar=H('div','cy-modes'); modeBar.setAttribute('role','tablist');
  const MODES=[['waze','הקלפי'],['market','השוק'],['both','שניהם']];
  MODES.forEach(([k,l])=>{ const b=H('button','cy-mode',l); b.type='button'; b.dataset.m=k; b.addEventListener('click',()=>setMode(k)); modeBar.append(b); });
  stage.prepend(modeBar);
  const pW=H('div','cy-panel waze'), pM=H('div','cy-panel market'); side.append(pW,pM);
  // act 1 text + controls
  pW.innerHTML=`<p class="cy-k">מערכה 1 · יום בחירות</p>
   <p>כמעט כולנו כבר השתתפנו בחישוב סודי משותף: בחירות. כל אחד מצביע בסוד, אף אחד לא יודע מה הצביע השכן, ובסוף הערב יוצאת תוצאה אחת שכולם סומכים עליה. איך זה עובד, כשאף אחד לא סומך על אף אחד?</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="vote">▶ לפתוח את הקלפי</button><button type="button" class="cy-btn" data-a="peek">להציץ בקלפי</button><button type="button" class="cy-btn hot" data-a="count">לספור</button></div>
   <label class="cy-dens">כמה מצביעים בקלפי: <b>24</b><input type="range" min="3" max="40" step="1" value="24" aria-label="מספר מצביעים"></label>
   <div class="cy-meters"><span><b class="m-v">0</b>הצביעו</span><span><b class="m-s">0</b>שמות על פתקים</span><span class="cy-eta"><b class="m-r">?</b>התוצאה</span></div>
   <p class="rg-out" aria-live="polite">לחצו "לפתוח את הקלפי", ותראו את המצביעים עוברים בשלוש תחנות.</p>
   <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><rect x="8" y="34" width="26" height="30" rx="3" class="ng-track"/><rect x="47" y="34" width="26" height="30" rx="3" class="ng-track"/><rect x="86" y="34" width="26" height="30" rx="3" class="ng-track"/><path d="M21 30 q20 -26 39 -4 M99 30 q-20 -26 -39 -4" class="ng-track"/><circle cx="60" cy="18" r="9" class="ng-car j"/></svg>
   <figcaption><b>זה קורה באמת.</b> בבריטניה, בליל הבחירות, מערבבים את הפתקים מכמה קלפיות לפני שסופרים אותם, כדי שאי אפשר יהיה לדעת איך הצביע רחוב אחד קטן. ובישראל, בוועדת הקלפי יושבים נציגים של מפלגות שונות, וכל אחד שומר על האחרים. נסו בעצמכם: קלפי עם פחות מחמישה מצביעים לא נספרת לבד.</figcaption></figure>
   <details class="cy-map"><summary>מה בקלפי מקביל למה אצלנו</summary><table><tbody>
   <tr><td>תעודת זהות בכניסה</td><td>רישום וזהות: רק גוף מפוקח אמיתי</td></tr><tr><td>פתק בלי שם</td><td>אסימון עיוור: השרתים לא יודעים מי</td></tr><tr><td>מאחורי הפרגוד</td><td>קידוד מקומי, במחשב של הקרן</td></tr><tr><td>מעטפה חתומה</td><td>התחייבות שאי אפשר להחליף</td></tr><tr><td>נציגים משלוש מפלגות</td><td>שלושה שרתים בשלוש רשויות</td></tr><tr><td>פרוטוקול שכולם חותמים עליו</td><td>אימות הסכום מול ההתחייבויות</td></tr><tr><td>ערבוב קלפיות קטנות</td><td>סף של חמש קרנות לתא</td></tr><tr><td>פנקס הבוחרים</td><td>יומן שאי אפשר למחוק ממנו</td></tr><tr><td>סקר עם מרווח טעות</td><td>דוח ציבורי עם רעש</td></tr></tbody></table></details>
   <p class="cy-bridge">בקלפי, מי שסופר רואה את הפתקים, רק לא יודע של מי הם. אצלנו הולכים צעד אחד רחוק יותר: גם מי שסופר לא רואה אף מספר. איך?</p>
   <button type="button" class="cy-morph">עכשיו נחליף את המצביעים בקרנות ←</button>`;
  pM.innerHTML=`<p class="cy-k">מערכה 2 · עיר הפיצ'רים</p>
   <p>אותו נוף, שתי משמעויות. הדרך היא המסלול של דיווח אחד, המצביעים הם קרנות, ובכל תחנה לאורך הדרך עומד בניין: פיצ'ר אחד של המוצר. ארבע שכונות, ארבע שכבות: אצל המשתתף, בין השרתים, השער והשקיפות.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">לשלוח דיווח</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">לחצו על בניין כדי להיכנס לחדר שלו. גם הצומת, המגדל והגשר נפתחים.</p>`;
  const list=pM.querySelector('.cy-list');
  for(let n=1;n<=10;n++){ const li=H('li'); const b=H('button','cy-li'); b.type='button'; b.append(H('b','',String(n)),H('span','',F[n].title),H('small','',LAY[F[n].layer])); b.addEventListener('click',()=>openRoom(n)); b.addEventListener('mouseenter',()=>BLD[n].g.classList.add('hl')); b.addEventListener('mouseleave',()=>BLD[n].g.classList.remove('hl')); li.append(b); list.append(li); }
  const card=H('div','cy-card'); card.hidden=true; stage.append(card);

  /* ---------- the ballot model ---------- */
  const PARTY=['#3f7fd1','#2f9b6e','#d18a2c'], PNAME=['כחולה','ירוקה','כתומה'], W=[.42,.34,.24];
  const pathLen=ringPath.getTotalLength(); const AT=STN.map(x=>x[0]/360);
  let N=24, voted=0, tally=[0,0,0], run=false, last=0, opened=false;
  function setVoters(n){ carG.textContent=''; cars=[]; voted=0; tally=[0,0,0]; opened=false; for(let i=0;i<n;i++){ const r=Math.random(); const v=r<W[0]?0:r<W[0]+W[1]?1:2; const g=S('g',{class:'rg-v'},carG);
      S('circle',{cy:-6,r:3.4,fill:PARTY[v],class:'rg-h'},g); S('path',{d:'M-4 2 q4 -8 8 0z',fill:PARTY[v],class:'rg-b'},g); S('rect',{x:-5,y:-6,width:10,height:7,rx:1,class:'rg-env'},g);
      cars.push({f:((AT[0]-0.015-i*0.0115)%1+1)%1,v,st:0,g,done:false}); } upd(); place(); }
  function place(){ cars.forEach(c=>{ if(c.done) return; const p=ringPath.getPointAtLength(c.f*pathLen); c.g.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`); c.g.setAttribute('class','rg-v s'+c.st); }); }
  const mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s'), mr=pW.querySelector('.m-r'), out=pW.querySelector('.rg-out');
  function upd(){ mv.textContent=voted+' / '+cars.length; ms.textContent='0'; }
  function step(dt){ cars.forEach(c=>{ if(c.done) return; const before=c.f; c.f=(c.f+0.085*dt)%1; const pass=a=>before<a&&(c.f>=a||c.f<before);
      if(pass(AT[0])) c.st=1; if(pass(AT[1])) c.st=2; if(pass(AT[2])){ c.done=true; c.g.setAttribute('class','rg-v gone'); voted++; tally[c.v]++; upd(); } }); }
  function loop(t){ if(!run) return; const dt=Math.min(.05,(t-last)/1000||.016); last=t; step(dt); place(); if(cars.every(c=>c.done)){ run=false; out.textContent='כולם הצביעו. בקלפי '+voted+' מעטפות. עכשיו אפשר להציץ, או לספור.'; return; } requestAnimationFrame(loop); }
  function startLoop(){ if(run) return; if(reduce){ cars.forEach(c=>{ if(!c.done){ c.done=true; voted++; tally[c.v]++; c.g.setAttribute('class','rg-v gone'); } }); upd(); return; } run=true; last=performance.now(); requestAnimationFrame(loop); }
  function stopLoop(){ run=false; }
  let vis=false, mode='waze';
  new IntersectionObserver(es=>es.forEach(e=>{ vis=e.isIntersecting; if(!vis) stopLoop(); }),{threshold:.1}).observe(stage);
  setVoters(N);
  pW.querySelector('[data-a="vote"]').addEventListener('click',()=>{ if(cars.every(c=>c.done)) setVoters(N); obsG.classList.remove('on'); mr.textContent='?'; out.textContent='המצביעים מראים תעודה, נכנסים מאחורי הפרגוד, ויוצאים עם מעטפה סגורה.'; startLoop(); });
  pW.querySelector('[data-a="peek"]').addEventListener('click',()=>{ out.textContent=voted?('בקלפי '+voted+' מעטפות זהות לגמרי. על אף אחת אין שם. גם מי ששומר על הקלפי לא יודע מי הצביע מה.'):'הקלפי עוד ריקה. פתחו אותה קודם.'; });
  pW.querySelector('[data-a="count"]').addEventListener('click',()=>{ if(!voted){ out.textContent='אין עדיין מה לספור.'; return; } if(!cars.every(c=>c.done)){ out.textContent='מחכים שכולם יצביעו. סופרים רק אחרי שהקלפי נסגרת.'; return; }
    if(voted<5){ mr.textContent='מתערבב'; out.textContent='רק '+voted+' מצביעים. אם נספור את הקלפי הזו לבד, כל אחד יוכל לנחש מה הצביעו השכנים. לכן הפתקים מתערבבים עם קלפי שכנה, ונספרים יחד. זה בדיוק הסף של חמש אצלנו.'; return; }
    obsG.classList.add('on'); const pc=tally.map(x=>Math.round(x/voted*100)); mr.textContent=pc.map((p,i)=>PNAME[i]+' '+p+'%').join(' · ');
    out.textContent='שלושה נציגים, כל אחד ממפלגה אחרת, סופרים יחד וחותמים על הפרוטוקול. אף אחד מהם לא יכול לשנות את התוצאה לבד. התוצאה: '+pc.map((p,i)=>'ה'+PNAME[i]+' '+p+'%').join(', ')+'. ושמות על פתקים: עדיין אפס.'; });
  const dens=pW.querySelector('.cy-dens input'); dens.addEventListener('input',()=>{ N=+dens.value; pW.querySelector('.cy-dens b').textContent=N; stopLoop(); setVoters(N); obsG.classList.remove('on'); mr.textContent='?'; });
  pW.querySelector('.cy-morph').addEventListener('click',()=>setMode('market'));

  /* ---------- modes ---------- */
  const WAZE={1:'תעודת זהות בכניסה, ופתק בלי שם',2:'מאחורי הפרגוד: ממלאים לבד',3:'מעטפה חתומה, שאי אפשר להחליף',4:'כמו לקרוע פתק לשלושה, כל חלק לקלפי אחרת',5:'שלושה נציגים, כל אחד סופר את שלו',6:'הפרוטוקול: כולם חותמים שהספירה נכונה',7:'קלפי קטנה מתערבבת עם אחרות',8:'הדוור שומר את המעטפה סגורה',9:'פנקס הבוחרים, וספירה חוזרת אקראית',10:'סקר עם מרווח טעות'};
  function setMode(m){ mode=m; stage.dataset.mode=m; modeBar.querySelectorAll('.cy-mode').forEach(b=>{ b.classList.toggle('on',b.dataset.m===m); b.setAttribute('aria-selected',b.dataset.m===m); });
    for(let n=1;n<=10;n++) BLD[n].lw.textContent=m==='both'?'בקלפי: '+WAZE[n]:'';
    if(m==='market'){ stopLoop(); }
    if(m!=='waze' && !stage.dataset.risen){ stage.dataset.risen='1'; } }
  setMode('waze');

  /* ---------- camera ---------- */
  const MOB=innerWidth<700; const HOME=MOB?[170,20,660,560]:[0,0,1000,620]; let vb=HOME.slice(), anim=null; svg.setAttribute('viewBox',HOME.join(' '));
  function camTo(t,dur){ const from=vb.slice(); const t0=performance.now(); dur=reduce?1:(dur||900); cancelAnimationFrame(anim);
    const st=(now)=>{ const k=Math.min(1,(now-t0)/dur), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; vb=from.map((v,i)=>v+(t[i]-v)*e); svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' ')); if(k<1) anim=requestAnimationFrame(st); }; anim=requestAnimationFrame(st); }
  const home=()=>camTo(HOME); const zoomB=n=>{ const b=BLD[n]; camTo([b.x-210,b.y-140,420,260]); };

  /* ---------- tour ---------- */
  const EX={1:'קרן הפנסיה של שרה מקבלת כרטיס כניסה לרבעון. השרתים יודעים שהוא אמיתי, ולא יודעים של מי הוא.',2:'ספר ההלוואות של הקרן, 400 שורות, הופך לטבלה קבועה של 33 תאים: ריבית כפול ענף, ומדרגת מנוף.',3:'הקרן נועלת כל תא בהתחייבות ורושמת אותה ביומן. אם שרת ישנה משהו אחר כך, ההתחייבות תגלה.',4:'100 מיליון בחברות תוכנה הופכים לשלושה מספרים בני 18 ספרות, וסכומם 100.',5:'בסוף הרבעון כל שרת מחזיק סכום של 500 חלקים. שלושתם יחד: 16.8% מהחשיפה בריבית מעל 5%.',6:'סכום ההתחייבויות מהיומן מול הסכום מהשרתים: שווים. אפשר לפתוח.',7:'ענף הספנות, עם שתי קרנות: חסום. השאלה "הכול חוץ מאנרגיה": נדחתה מראש.',8:'השרת בפריז נופל ביום האחרון של הרבעון. המעטפות שלו מחכות סגורות, והדוח של אמה מתעכב ביום.',9:'המספר הציבורי של drand בוחר שלוש קרנות לביקורת. אף אחד לא בחר אותן.',10:'אמה רואה 16.8%, מדויק. הציבור רואה 17%, פלוס מינוס 1.'};
  let tour=null;
  function tourShow(i){ const n=i+1, f=F[n]; zoomB(n); Object.values(BLD).forEach(b=>b.g.classList.remove('hl')); BLD[n].g.classList.add('hl');
    card.hidden=false; card.innerHTML=''; const hd=H('div','cy-ch'); hd.append(H('span','cy-cn',n+' / 10'),H('strong','',f.title),H('small','','שכונת '+LAY[f.layer])); card.append(hd);
    const r1=H('p'); r1.innerHTML='<b>מה זה:</b> '; r1.append(f.line); card.append(r1);
    const r2=H('p'); r2.innerHTML='<b>למה צריך:</b> '; r2.append(f.hook.split(/(?<=[.!?])\s/)[0]); card.append(r2);
    const r3=H('p','cy-wz'); r3.innerHTML='<b>בקלפי:</b> '; r3.append(WAZE[n]); card.append(r3);
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
    const a=H('section','cy-r1'); a.append(H('p','cy-one',f.line)); const pair=H('div','cy-pair'); const w=H('div','cy-pw'); w.append(H('span','cy-k','בקלפי'),H('p','',WAZE[n])); const o=H('div','cy-po'); o.append(H('span','cy-k','אצלנו'),H('p','',f.hook)); pair.append(w,o); a.append(pair,H('p','cy-ex',EX[n])); g.append(a);
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
  const PR=(1n<<61n)-1n; const rnd=()=>{ const a=new Uint32Array(2); crypto.getRandomValues(a); return ((BigInt(a[0])<<32n)|BigInt(a[1]))%PR; };
  const share=v=>{ const x=rnd(), y=rnd(); return [x,y,(((BigInt(v)-x-y)%PR)+PR)%PR]; }; const rec=sh=>{ const v=sh.reduce((a,b)=>a+b,0n)%PR; return v<PR/2n?v:v-PR; };
  const fm=v=>BigInt(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  const hex=async t=>{ try{ const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)); return [...new Uint8Array(b)].slice(0,8).map(x=>x.toString(16).padStart(2,'0')).join(''); }catch(e){ let h=0; for(const c of t) h=(h*31+c.charCodeAt(0))>>>0; return h.toString(16); } };
  const MODEL={
   1(b){ b.innerHTML='<div class="md-env"><div class="md-step"><span class="env-i"></span><small>הקרן שמה אסימון במעטפה עם נייר פחם</small></div><div class="md-step"><span class="env-i st"></span><small>שירות הזהות חותם על המעטפה, בלי לפתוח</small></div><div class="md-step"><span class="tok"></span><small>הקרן פותחת: על האסימון יש חתימה, והחותם מעולם לא ראה אותו</small></div></div><button type="button" class="cy-btn go">לחתום ›</button><p class="md-cap">אחר כך השרתים בודקים את החתימה, ולא יודעים של מי האסימון.</p>';
     const st=b.querySelectorAll('.md-step'), bt=b.querySelector('button'); let k=0; st[0].classList.add('on'); bt.addEventListener('click',()=>{ k=(k+1)%3; st.forEach((x,i)=>x.classList.toggle('on',i<=k)); bt.textContent=k===2?'מההתחלה ↻':'לחתום ›'; }); },
   2(b){ const LO=[['תוכנה',4.6,120],['תוכנה',5.4,90],['בריאות',3.2,60],['תוכנה',5.8,340],['נדל"ן',4.1,75],['תוכנה',5.1,150]];
     b.innerHTML='<div class="md-rows">'+LO.map(([s,r,a])=>`<span>${s} · ${r}% · ${a}</span>`).join('')+'</div><button type="button" class="cy-btn go">לקבץ לתאים ›</button><div class="md-cells"></div><p class="md-cap">שש שורות הלוואה, אצל הקרן. השרתים יקבלו רק טבלה, ולא שורות.</p>';
     const bt=b.querySelector('button'), cells=b.querySelector('.md-cells'), cap=b.querySelector('.md-cap');
     bt.addEventListener('click',()=>{ const m={}; LO.forEach(([s,r,a])=>{ const k=s+' · '+(r>5?'מעל 5%':r>4?'4 עד 5%':'מתחת ל-4%'); m[k]=(m[k]||0)+a; }); cells.innerHTML=Object.entries(m).map(([k,v])=>`<span class="${v>400?'clip':''}"><small>${k}</small><b>${Math.min(v,400)}</b>${v>400?`<em>נחתך מ-${v}</em>`:''}</span>`).join(''); cap.textContent='כל תא נחתך לתקרה של 400. כך אף קרן אחת לא יכולה להזיז לבד את התשובה של כל השוק.'; }); },
   3(b){ b.innerHTML='<label>החשיפה שהקרן מדווחת: <input type="number" value="100" min="0" max="999"></label><div class="md-com"><span>ההתחייבות ביומן:</span><code dir="ltr"></code></div><button type="button" class="cy-btn hot">לשנות את המספר אחרי הנעילה</button><p class="md-cap"></p>';
     const inp=b.querySelector('input'), code=b.querySelector('code'), bt=b.querySelector('button'), cap=b.querySelector('.md-cap'); let locked='', salt=Math.random().toString(36).slice(2);
     (async()=>{ locked=await hex(inp.value+'|'+salt); code.textContent=locked; cap.textContent='המספר עצמו לא מופיע ביומן, רק טביעת אצבע שלו.'; })();
     bt.addEventListener('click',async()=>{ inp.value=String((+inp.value||0)+7); const h=await hex(inp.value+'|'+salt); cap.textContent=h===locked?'זהה.':'טביעת האצבע של המספר החדש ('+h+') לא תואמת את מה שנרשם ביומן. השינוי נתפס.'; cap.classList.add('bad'); }); },
   4(b){ b.innerHTML='<label>המספר של הקרן: <b>100</b><input type="range" min="0" max="1000" step="10" value="100"></label><div class="md-shares"></div><p class="md-cap">שלושה חלקים, כל אחד לשרת אחר. הם משתנים בכל פעם, והסכום שלהם תמיד המספר.</p>';
     const r=b.querySelector('input'), sh=b.querySelector('.md-shares'); const draw=()=>{ b.querySelector('label b').textContent=r.value; const s=share(+r.value); sh.innerHTML=s.map((x,i)=>`<span><small>שרת ${'אבג'[i]}</small><code dir="ltr">${fm(x)}</code></span>`).join('')+`<span class="t"><small>ביחד</small><code dir="ltr">${rec(s)}</code></span>`; }; r.addEventListener('input',draw); draw(); },
   5(b){ const V=[100,40,250,75,180]; b.innerHTML='<div class="md-fund">'+V.map((v,i)=>`<span>קרן ${i+1}</span>`).join('')+'</div><button type="button" class="cy-btn go">לצבור ›</button><div class="md-shares"></div><p class="md-cap">חמש קרנות, וכל אחת שולחת חלק לכל שרת.</p>';
     const bt=b.querySelector('button'), sh=b.querySelector('.md-shares'), cap=b.querySelector('.md-cap');
     bt.addEventListener('click',()=>{ const acc=[0n,0n,0n]; V.forEach(v=>share(v).forEach((x,i)=>acc[i]=(acc[i]+x)%PR)); sh.innerHTML=acc.map((x,i)=>`<span><small>הסכום של שרת ${'אבג'[i]}</small><code dir="ltr">${fm(x)}</code></span>`).join('')+`<span class="t"><small>שלושתם יחד</small><code dir="ltr">${rec(acc)}</code></span>`; cap.textContent='כל שרת מחזיק סכום שנראה כמו רעש. רק החיבור של שלושתם נותן '+V.reduce((a,c)=>a+c,0)+', ואף שרת לא ראה אף קרן.'; }); },
   6(b){ b.innerHTML='<div class="md-ver"><span><small>סכום ההתחייבויות (מהיומן)</small><b>645</b></span><span class="sv"><small>סכום השרתים</small><b>645</b></span></div><label class="md-tog"><input type="checkbox"> שרת ב משבש את הסכום שלו</label><p class="md-cap">שווים. הסכום נפתח.</p>';
     const c=b.querySelector('input'), sv=b.querySelector('.sv b'), cap=b.querySelector('.md-cap'); c.addEventListener('change',()=>{ sv.textContent=c.checked?'712':'645'; b.querySelector('.md-ver').classList.toggle('bad',c.checked); cap.textContent=c.checked?'לא שווים. הסכום לא נפתח, וחיפוש על חצאי האצווה מצביע על שרת ב. כמו קופאית שהקופה שלה לא מתאימה לקבלות.':'שווים. הסכום נפתח.'; }); },
   7(b){ b.innerHTML='<label>כמה קרנות בתא: <b>2</b><input type="range" min="1" max="12" value="2"></label><div class="md-cell"></div><p class="md-cap"></p>';
     const r=b.querySelector('input'), cell=b.querySelector('.md-cell'), cap=b.querySelector('.md-cap'); const draw=()=>{ const n=+r.value; b.querySelector('label b').textContent=n; cell.innerHTML=Array.from({length:n},()=>'<i></i>').join(''); cell.classList.toggle('blk',n<5); cap.textContent=n<5?'פחות מחמש: התא חסום. אף אחת מהקרנות לא יכולה להחסיר את עצמה ולגלות את האחרות.':'חמש ומעלה: התא נפתח, עם רעש קטן שמגן על כל קרן בודדת.'; }; r.addEventListener('input',draw); draw(); },
   8(b){ b.innerHTML='<div class="md-q"><span class="srv">השרת בפריז</span><span class="queue"></span></div><label class="md-tog"><input type="checkbox"> השרת בפריז נופל</label><button type="button" class="cy-btn go">דיווח חדש מגיע ›</button><p class="md-cap">כל דיווח שולח מעטפה סגורה לכל שרת.</p>';
     const c=b.querySelector('input'), q=b.querySelector('.queue'), bt=b.querySelector('button'), cap=b.querySelector('.md-cap'); let n=0;
     bt.addEventListener('click',()=>{ if(c.checked){ n++; q.innerHTML='<i></i>'.repeat(n); cap.textContent=n+' מעטפות מחכות אצל השרת המוביל, סגורות. הוא לא יכול לפתוח אותן.'; } else cap.textContent='המעטפה הגיעה לפריז מיד.'; });
     c.addEventListener('change',()=>{ b.querySelector('.srv').classList.toggle('down',c.checked); if(!c.checked&&n){ cap.textContent='השרת חזר. '+n+' מעטפות נמסרו לו, והאצווה נסגרת. שום דיווח לא אבד.'; n=0; q.innerHTML=''; } }); },
   9(b){ b.innerHTML='<div class="md-beacon"><span>המספר הציבורי של התקופה:</span><code dir="ltr">?</code><button type="button" class="cy-btn go">למשוך מספר ›</button></div><div class="md-pick"></div><p class="md-cap">20 קרנות. המספר בוחר שלוש לביקורת, ואף אחד לא יכול להשפיע על הבחירה.</p>';
     const code=b.querySelector('code'), pick=b.querySelector('.md-pick'), bt=b.querySelector('button'); pick.innerHTML=Array.from({length:20},(_,i)=>`<i>${i+1}</i>`).join('');
     bt.addEventListener('click',()=>{ const v=rnd(); code.textContent=v.toString(16).slice(0,12); const sel=new Set(); let x=v; while(sel.size<3){ sel.add(Number(x%20n)); x=x/7n+13n; } pick.querySelectorAll('i').forEach((e,i)=>e.classList.toggle('on',sel.has(i))); }); },
   10(b){ b.innerHTML='<label>רמת הרעש בפרסום הציבורי: <b>בינונית</b><input type="range" min="0" max="2" value="1"></label><div class="md-rep"><span><small>לרגולטור</small><b>16.8%</b></span><span class="pub"><small>לציבור</small><b></b><i class="ci"><em></em></i></span></div><p class="md-cap">שני הדוחות מפנים לאותה רשומה ביומן.</p>';
     const r=b.querySelector('input'), pb=b.querySelector('.pub b'), ci=b.querySelector('.ci em'); const L=[['חלשה',.3],['בינונית',1],['חזקה',2.5]];
     const draw=()=>{ const [n,w]=L[+r.value]; b.querySelector('label b').textContent=n; pb.textContent=(16.8+(Math.random()-.5)*w).toFixed(1)+'% ± '+w.toFixed(1); ci.style.width=(w/3*100)+'%'; }; r.addEventListener('input',draw); draw(); }
  };
  if(window.TermWin) window.TermWin.wire(top);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
