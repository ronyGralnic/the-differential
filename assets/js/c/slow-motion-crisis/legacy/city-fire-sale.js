/* Fire-Sale spec as three acts on one isometric island:
   Act 1 · Waze and the phantom jam (a real car-following model on a ring road, like Nagoya 2008)
   Act 2 · "swap the cars for funds": the ring road becomes the feature city (10 buildings, 4 districts, PLAY tour, shock pulse)
   Act 3 · a room per feature (one sentence, Waze vs ours, a small model to play with, a comic strip, a cutaway, the full text)
   The original spec stays whole under "המסמך המלא". */
(function(){
  function boot(){
  const root=document.querySelector('.sp[data-sp="fire-sale"]'); const D=window.SPEC&&window.SPEC['fire-sale'];
  if(!root||!D||root.dataset.city) return; if(!root.classList.contains('sp-root')){ setTimeout(boot,60); return; } root.dataset.city='1';
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
  intro.innerHTML=`<p class="cy-k">פרק 3 · אפיון</p><h4 class="cy-h">עשרה פיצ'רים וטווח אחד</h4>
   <p>אחרי שה-POC הראה שהליבה עובדת, כותבים <b>אפיון</b>: מסמך שמתאר את המוצר המלא, פיצ'ר אחרי פיצ'ר, כאילו מחר מתחילים לבנות אותו. <b>פיצ'ר</b> הוא יכולת אחת של המוצר, למשל "לבנות שוק מדומה" או "להראות טווח של תוצאות".</p>
   <div class="cy-emma"><span class="cy-av" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="#e9c6a8"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="#4a2f22"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="#2f5d8a"/></svg></span>
   <div><span class="cy-k">בוקר של דוח יציבות</span><p>אמה (בדויה), אנליסטית ברשות פיקוח פיננסי, קוראת שחדלות הפירעון באשראי הפרטי עולות, ושהריבית לא יורדת. השאלה שלה: אם התשואות יקפצו שוב, מי ייאלץ למכור ראשון, ומי אחריו? השוק כבר ראה את זה ב-2022 ובמרץ 2023, אבל אין כלי שאפשר להריץ ולשאול "מה אם". בואו נבנה לה אחד.</p></div></div>
   <div class="cy-prom"><span>מה המוצר מבטיח:</span><p>סימולציה שמראה, סבב אחרי סבב, איך ${tm('firesale','מכירה כפויה')} אחת מפילה את הבאה. סימולציה שאף פעם לא נותנת מספר אחד, אלא טווח, יחד עם הפרמטר שאחראי לאי-הוודאות. וסימולציה שרצה כולה במחשב של המשתמש, כך ששום ${tm('balance','מאזן')} לא יוצא ממנו.</p></div>
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
  const DIST={world:[-165,-75],cascade:[-60,30],ask:[40,100],trust:[110,195]};
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
  const LM=[['dc',5,5.9,'צומת ההחלטות','הכיוונים שבחרנו, ומה שוויתרנו עליו'],['kn',6.6,6.9,'מגדל התצפית','המחוון החי: המפל בפעולה'],['cl',10.4,7.6,'הגשר שעוד בבנייה','מה האפיון סגר, ומה נשאר פתוח']];
  const lmG=S('g',{class:'cy-lms'},cam);
  LM.forEach(([k,x,y,t,d])=>{ const [a,b]=iso(x,y); const g=S('g',{class:'cy-lm '+k,transform:`translate(${a} ${b-14})`,tabindex:'0',role:'button','aria-label':t+': '+d},lmG);
    if(k==='dc'){ S('rect',{x:-2,y:-46,width:4,height:46,class:'cy-pole'},g); S('path',{d:'M2 -42 h26 l6 5 l-6 5 h-26z',class:'cy-sign a'},g); S('path',{d:'M-2 -28 h-26 l-6 5 l6 5 h26z',class:'cy-sign b'},g); }
    else if(k==='kn'){ S('path',{d:'M-10 0 L-5 -62 L5 -62 L10 0z',class:'cy-tower'},g); S('rect',{x:-12,y:-74,width:24,height:12,rx:3,class:'cy-tower-top'},g); S('path',{d:'M-8 -68 q8 -10 16 0',class:'cy-spiral'},g); }
    else { S('path',{d:'M-40 0 L0 -18 L14 -12',class:'cy-bridge'},g); S('path',{d:'M14 -12 L24 -8',class:'cy-bridge gap'},g); S('rect',{x:-4,y:-48,width:4,height:44,class:'cy-pole'},g); S('path',{d:'M0 -46 L22 -46 L22 -38',class:'cy-crane'},g); }
    const lb=S('text',{x:0,y:16,class:'cy-lml','text-anchor':'middle'},g); lb.textContent=t;
    g.addEventListener('click',()=>openSection(k,t)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openSection(k,t); } }); });
  // buildings
  const ANG={1:-150,2:-120,3:-90,4:-45,5:-15,6:15,7:55,8:85,9:130,10:165};
  const ICON={1:'<path d="M-9 4 v-9 l5 -4 v4 l5 -4 v4 l5 -4 v13z"/><rect x="4" y="-12" width="3" height="7"/>',2:'<path d="M0 -10 v16 M-8 6 h16 M-10 -6 h20 M-10 -6 l-3 6 h6z M10 -6 l-3 6 h6z"/>',3:'<path d="M-4 8 L-2 -6 h4 L4 8z M-7 -10 h14 v4 h-14z"/>',4:'<path d="M-11 2 L11 -4 M0 -1 v8 M-4 7 h8"/>',5:'<rect x="-9" y="-8" width="4" height="14"/><rect x="-2" y="-8" width="4" height="14" transform="rotate(-20 0 6)"/><rect x="5" y="-6" width="4" height="14" transform="rotate(-50 7 8)"/>',6:'<circle cx="0" cy="0" r="9"/><path d="M-9 0 h18 M0 -9 v18 M-6 -6 l12 12 M6 -6 l-12 12"/>',7:'<path d="M-9 8 v-12 h4 M-5 -4 L8 -10 v6"/><path d="M8 -4 v4"/>',8:'<circle cx="-5" cy="2" r="5"/><circle cx="5" cy="2" r="5"/><circle cx="0" cy="-6" r="5"/>',9:'<path d="M-10 -6 L0 -11 L10 -6z M-8 -6 v12 M-3 -6 v12 M3 -6 v12 M8 -6 v12 M-10 7 h20"/>',10:'<path d="M0 8 v-14 M-5 -10 q5 -6 10 0 M-8 -13 q8 -9 16 0"/>'};
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
  // cars & funds on the ring
  const carG=S('g',{class:'cy-cars',transform:'translate(0,-14)'},cam);
  const TYPES=[['פרטי','#3f7fd1'],['משאית','#d18a2c'],['אוטובוס','#2f9b6e'],['אופנוע','#a046b8'],['מונית','#e0c12a']];
  const FUNDS=['קרן פנסיה','בנק','מבטח','קרן כספית','קרן אשראי'];
  let cars=[];

  /* ---------- side panel ---------- */
  const side=H('div','cy-side'); stage.append(side);
  const modeBar=H('div','cy-modes'); modeBar.setAttribute('role','tablist');
  const MODES=[['waze','וייז'],['market','שוק'],['both','שניהם']];
  MODES.forEach(([k,l])=>{ const b=H('button','cy-mode',l); b.type='button'; b.dataset.m=k; b.addEventListener('click',()=>setMode(k)); modeBar.append(b); });
  stage.prepend(modeBar);
  const pW=H('div','cy-panel waze'), pM=H('div','cy-panel market'); side.append(pW,pM);
  // act 1 text + controls
  pW.innerHTML=`<p class="cy-k">מערכה 1 · וייז ופקק הרפאים</p>
   <p>פקק תנועה הוא מפל, בדיוק כמו מכירות כפויות. נהג אחד בולם קצת, הנהג שמאחוריו בולם קצת יותר, ושלוש מכוניות אחריו כולם עומדים. אף אחד לא עשה תאונה. השרשרת עשתה את זה.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn hot" data-a="brake">לבלום ברכב אחד</button><button type="button" class="cy-btn" data-a="police">שוטר תנועה</button></div>
   <label class="cy-dens">כמה מכוניות על המסלול: <b>22</b><input type="range" min="12" max="30" step="1" value="22" aria-label="צפיפות"></label>
   <div class="cy-meters"><span><b class="m-v">30</b>קמ"ש בממוצע</span><span><b class="m-s">0</b>עומדות</span><span class="cy-eta"><b>25 עד 40 דק'</b>"תגיעו בעוד"</span></div>
   <figure class="cy-nagoya"><svg viewBox="0 0 120 80" aria-hidden="true"><ellipse cx="60" cy="40" rx="50" ry="28" class="ng-track"/>${Array.from({length:22},(_,i)=>{ const t=i/22*Math.PI*2; return `<rect x="${(60+50*Math.cos(t)-2.5).toFixed(1)}" y="${(40+28*Math.sin(t)-1.5).toFixed(1)}" width="5" height="3" rx="1" class="ng-car${i>=9&&i<=13?' j':''}"/>`; }).join('')}</svg>
   <figcaption><b>זה קרה באמת.</b> ב-2008 בנגויה שביפן הושיבו חוקרים 22 נהגים על מסלול מעגלי של 230 מטר, וביקשו מכולם לנסוע במהירות קבועה של 30 קמ"ש. אחרי זמן קצר מישהו שינה קצת את המהירות, והגל התפשט לאורך המעגל עד שמכוניות נעצרו. מעל צפיפות מסוימת, התנועה החלקה לא מחזיקה. נסו בעצמכם: מתחת ל-20 מכוניות הגל נבלע, מעל זה הוא נשאר.</figcaption></figure>
   <details class="cy-map"><summary>מה בכביש מקביל למה אצלנו</summary><table><tbody>
   <tr><td>חמישה סוגי רכבים</td><td>חמישה סוגי גופים</td></tr><tr><td>מרחק הביטחון של כל נהג</td><td>המנוף והסף</td></tr><tr><td>נהג שבולם</td><td>הזעזוע</td></tr><tr><td>גל הבלימה, ונהג שנדחק לנתיב השכן</td><td>שני ערוצי ההדבקה</td></tr><tr><td>שוטר, רמזור בכניסה, שוליים, תמרור</td><td>ארבע ההתערבויות</td></tr><tr><td>"תגיעו בעוד 25 עד 40 דקות"</td><td>טווח, ולא מספר אחד</td></tr><tr><td>שחזור הפקק של אתמול</td><td>כיול מול 2022</td></tr><tr><td>שיתוף מסלול בלינק</td><td>קישור משחזר</td></tr></tbody></table></details>
   <p class="cy-bridge">וייז יודע איפה כל מכונית, כי כל נהג משתף את המיקום שלו. ואצלנו? מי יודע מי מחזיק מה?</p>
   <button type="button" class="cy-morph">עכשיו נחליף את המכוניות בקרנות ←</button>`;
  pM.innerHTML=`<p class="cy-k">מערכה 2 · עיר הפיצ'רים</p>
   <p>אותו נוף, שתי משמעויות. הכביש הוא השוק, המכוניות הן קרנות, ובכל תחנה לאורך הדרך עומד בניין: פיצ'ר אחד של המוצר. ארבע שכונות, ארבע שכבות: העולם, המפל, השאלות והאמון.</p>
   <div class="cy-ctl"><button type="button" class="cy-btn go" data-a="play">▶ סיור מודרך</button><button type="button" class="cy-btn hot" data-a="shock">להזריק זעזוע</button><button type="button" class="cy-btn" data-a="home">למבט על</button></div>
   <ol class="cy-list"></ol><p class="cy-hint">לחצו על בניין כדי להיכנס לחדר שלו. גם הצומת, המגדל והגשר נפתחים.</p>`;
  const list=pM.querySelector('.cy-list');
  for(let n=1;n<=10;n++){ const li=H('li'); const b=H('button','cy-li'); b.type='button'; b.append(H('b','',String(n)),H('span','',F[n].title),H('small','',LAY[F[n].layer])); b.addEventListener('click',()=>openRoom(n)); b.addEventListener('mouseenter',()=>BLD[n].g.classList.add('hl')); b.addEventListener('mouseleave',()=>BLD[n].g.classList.remove('hl')); li.append(b); list.append(li); }
  const card=H('div','cy-card'); card.hidden=true; stage.append(card);

  /* ---------- the traffic model (optimal velocity, ring of 230 m) ---------- */
  const Lr=230, A=1.6, VMAX=8.4, HC=10, Wd=2.5; const V=h=>VMAX/2*(Math.tanh((h-HC)/Wd)+Math.tanh(HC/Wd));
  function setCars(N){ carG.textContent=''; cars=[]; for(let i=0;i<N;i++){ const ty=i%5; const g=S('g',{class:'cy-car t'+ty},carG); const [w,h]=ty===1||ty===2?[16,8]:ty===3?[8,5]:[12,7];
      S('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:2,fill:TYPES[ty][1],class:'cy-carb'},g); S('circle',{r:3.2,class:'cy-fund'},g); cars.push({x:i*Lr/N,v:V(Lr/N),g}); } }
  let N=22; setCars(N);
  const pathLen=ringPath.getTotalLength();
  function place(){ cars.forEach(c=>{ const p=ringPath.getPointAtLength((c.x/Lr)*pathLen); const p2=ringPath.getPointAtLength(((c.x+1)/Lr)*pathLen%pathLen); const ang=Math.atan2(p2.y-p.y,p2.x-p.x)*180/Math.PI; c.g.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${ang.toFixed(0)})`); c.g.classList.toggle('stop',c.v<1.2); }); }
  function step(dt){ const n=cars.length; const nv=cars.map((c,i)=>{ let h=cars[(i+1)%n].x-c.x; if(h<0) h+=Lr; return Math.max(0,c.v+dt*A*(V(h)-c.v)); }); cars.forEach((c,i)=>{ c.v=nv[i]; c.x=(c.x+c.v*dt)%Lr; }); }
  let run=false, vis=false, last=0, mode='waze';
  const mv=pW.querySelector('.m-v'), ms=pW.querySelector('.m-s');
  function loop(t){ if(!run) return; const dt=Math.min(.05,(t-last)/1000||.016); last=t; for(let k=0;k<6;k++) step(dt); place();
    const avg=cars.reduce((a,c)=>a+c.v,0)/cars.length; mv.textContent=Math.round(avg*3.6); ms.textContent=cars.filter(c=>c.v<1.2).length; requestAnimationFrame(loop); }
  function startLoop(){ if(run||reduce) return; run=true; last=performance.now(); requestAnimationFrame(loop); }
  function stopLoop(){ run=false; }
  new IntersectionObserver(es=>es.forEach(e=>{ vis=e.isIntersecting; if(vis&&mode!=='market') startLoop(); else if(!vis) stopLoop(); }),{threshold:.1}).observe(stage);
  place();
  pW.querySelector('[data-a="brake"]').addEventListener('click',()=>{ const c=cars[0]; c.v=0; c.g.classList.add('brk'); setTimeout(()=>c.g.classList.remove('brk'),1200); startLoop(); });
  pW.querySelector('[data-a="police"]').addEventListener('click',()=>{ const n=cars.length; cars.forEach((c,i)=>{ c.x=i*Lr/n; c.v=V(Lr/n); }); place(); });
  const dens=pW.querySelector('.cy-dens input'); dens.addEventListener('input',()=>{ N=+dens.value; pW.querySelector('.cy-dens b').textContent=N; setCars(N); place(); });
  pW.querySelector('.cy-morph').addEventListener('click',()=>setMode('market'));

  /* ---------- modes ---------- */
  const WAZE={1:'המכוניות: כמה, מאיזה סוג, ומה מרחק הביטחון',2:'הלוח של כל רכב: מהירות ומרחק',3:'מה כל נהג עושה כשמאטים לפניו',4:'כמה כל בלימה מאטה את מי שמאחור',5:'גל הבלימה שעובר אחורה',6:'מי שנדחק לנתיב השכן',7:'שוטר, רמזור, שוליים, תמרור',8:'"25 עד 40 דקות"',9:'שחזור הפקק של אתמול',10:'שיתוף מסלול בלינק'};
  function setMode(m){ mode=m; stage.dataset.mode=m; modeBar.querySelectorAll('.cy-mode').forEach(b=>{ b.classList.toggle('on',b.dataset.m===m); b.setAttribute('aria-selected',b.dataset.m===m); });
    for(let n=1;n<=10;n++) BLD[n].lw.textContent=m==='both'?'וייז: '+WAZE[n]:'';
    if(m==='market'){ stopLoop(); } else if(vis) startLoop();
    if(m!=='waze' && !stage.dataset.risen){ stage.dataset.risen='1'; } }
  setMode('waze');

  /* ---------- camera ---------- */
  const MOB=innerWidth<700; const HOME=MOB?[170,20,660,560]:[0,0,1000,620]; let vb=HOME.slice(), anim=null; svg.setAttribute('viewBox',HOME.join(' '));
  function camTo(t,dur){ const from=vb.slice(); const t0=performance.now(); dur=reduce?1:(dur||900); cancelAnimationFrame(anim);
    const st=(now)=>{ const k=Math.min(1,(now-t0)/dur), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; vb=from.map((v,i)=>v+(t[i]-v)*e); svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' ')); if(k<1) anim=requestAnimationFrame(st); }; anim=requestAnimationFrame(st); }
  const home=()=>camTo(HOME); const zoomB=n=>{ const b=BLD[n]; camTo([b.x-210,b.y-140,420,260]); };

  /* ---------- tour ---------- */
  const EX={1:'אמה בונה עולם של 60 קרנות פנסיה ו-20 בנקים, עם מנוף בין 3 ל-6.',2:'הקרן של שרה: 100 משלה ו-400 מושאל. כשהמחיר יורד ב-5%, המאזן מראה שרבע מההון נמחק.',3:'כלל של קרן: אם המנוף עובר את הסף, מוכרים עד שחוזרים אליו.',4:'200 יחידות שנמכרות מזיזות את התשואה בנקודת אחוז שלמה.',5:'סבב 1: 42 קרנות מוכרות. סבב 2: עוד 18. וכך הלאה, עד שהשוק נרגע.',6:'קרן אשראי שלא מחזירה לבנק, והבנק נפגע גם בלי למכור כלום.',7:'28 בספטמבר 2022: הבנק המרכזי קונה, והמפל נעצר.',8:'300 עולמות לכל ניחוש של מנוף: במנוף 4 אין ספירלה, במנוף 5 היא כמעט ודאית.',9:'המודל מול ספטמבר 2022 ומול מרץ 2023: האם הוא היה צופה אותם?',10:'אמה שולחת לעמית קישור, והוא רואה בדיוק את אותה הרצה, עם אותו seed.'};
  let tour=null;
  function tourShow(i){ const n=i+1, f=F[n]; zoomB(n); Object.values(BLD).forEach(b=>b.g.classList.remove('hl')); BLD[n].g.classList.add('hl');
    card.hidden=false; card.innerHTML=''; const hd=H('div','cy-ch'); hd.append(H('span','cy-cn',n+' / 10'),H('strong','',f.title),H('small','','שכונת '+LAY[f.layer])); card.append(hd);
    const r1=H('p'); r1.innerHTML='<b>מה זה:</b> '; r1.append(f.line); card.append(r1);
    const r2=H('p'); r2.innerHTML='<b>למה צריך:</b> '; r2.append(f.hook.split(/(?<=[.!?])\s/)[0]); card.append(r2);
    const r3=H('p','cy-wz'); r3.innerHTML='<b>בכביש של וייז:</b> '; r3.append(WAZE[n]); card.append(r3);
    const r4=H('p','cy-ex'); r4.append(EX[n]); card.append(r4);
    const ctl=H('div','cy-cc'); const pv=H('button','cy-btn','‹'), pp=H('button','cy-btn',tour&&tour.t?'❚❚':'▶'), nx=H('button','cy-btn go','›'), rm=H('button','cy-btn','לחדר ←'), ex=H('button','cy-btn','✕'); [pv,pp,nx,rm,ex].forEach(b=>b.type='button'); pv.setAttribute('aria-label','הקודם'); nx.setAttribute('aria-label','הבא'); ex.setAttribute('aria-label','יציאה מהסיור');
    pv.addEventListener('click',()=>{ tourGo(Math.max(0,tour.i-1),true); }); nx.addEventListener('click',()=>{ tourGo(Math.min(9,tour.i+1),true); }); pp.addEventListener('click',()=>{ if(tour.t){ clearInterval(tour.t); tour.t=null; pp.textContent='▶'; } else { tour.t=setInterval(()=>tourGo(tour.i+1),6500); pp.textContent='❚❚'; } }); rm.addEventListener('click',()=>openRoom(n)); ex.addEventListener('click',tourEnd);
    const dots=H('span','cy-dots'); for(let k=0;k<10;k++){ const d=H('i',k===i?'on':''); dots.append(d); } ctl.append(pv,pp,nx,dots,rm,ex); card.append(ctl); }
  function tourGo(i,manual){ if(i>9){ tourEnd(); return; } tour.i=i; if(manual&&tour.t){ clearInterval(tour.t); tour.t=null; } tourShow(i); }
  function tourEnd(){ if(tour&&tour.t) clearInterval(tour.t); tour=null; card.hidden=true; Object.values(BLD).forEach(b=>b.g.classList.remove('hl')); home(); }
  pM.querySelector('[data-a="play"]').addEventListener('click',()=>{ if(mode==='waze') setMode('market'); tour={i:0,t:null}; stage.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}); camTo(MOB?HOME:[60,40,880,545],700); setTimeout(()=>{ tourShow(0); tour.t=reduce?null:setInterval(()=>tourGo(tour.i+1),6500); tourShow(0); },reduce?0:800); });
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
    const a=H('section','cy-r1'); a.append(H('p','cy-one',f.line)); const pair=H('div','cy-pair'); const w=H('div','cy-pw'); w.append(H('span','cy-k','בכביש של וייז'),H('p','',WAZE[n])); const o=H('div','cy-po'); o.append(H('span','cy-k','אצלנו'),H('p','',f.hook)); pair.append(w,o); a.append(pair,H('p','cy-ex',EX[n])); g.append(a);
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

  /* ---------- small models, one per room ---------- */
  const LFS=window.LAB_FS;
  function casc(cb,shock){ const w=LFS.worlds.uk; const n=60; let A=w.A.slice(),E=w.E.slice(); const B=A.map((a,i)=>a-E[i]),tg=w.lev0.slice(),al=Array(n).fill(true); let y=shock,used=0; const rounds=[]; A=A.map(a=>a*Math.exp(-18*shock/100)); E=A.map((a,i)=>a-B[i]);
    for(let it=0;it<60;it++){ const lev=E.map((e,i)=>e>0?A[i]/Math.max(e,1e-12):Infinity); const dead=al.map((x,i)=>x&&E[i]<=0), need=al.map((x,i)=>x&&!dead[i]&&lev[i]>w.lmax[i]); const sell=A.map((a,i)=>need[i]?a-tg[i]*E[i]:dead[i]?a:0);
      dead.forEach((d,i)=>{ if(d) al[i]=false; }); const tot=sell.reduce((a,b)=>a+b,0); if(tot<1e-6) break; A=A.map((a,i)=>a-sell[i]); for(let i=0;i<n;i++) B[i]-=Math.min(sell[i],B[i]);
      const ab=Math.min(tot,Math.max(0,cb-used)); used+=ab; const dy=(tot-ab)/200; y+=dy; rounds.push({s:need.filter(Boolean).length+dead.filter(Boolean).length,y}); A=A.map(a=>a*Math.exp(-18*dy/100)); E=A.map((a,i)=>a-B[i]); if(dy<1e-4) break; }
    return {y,rounds}; }
  const rng=s=>()=>{ s=(s*16807)%2147483647; return s/2147483647; };
  const MODEL={
   1(b){ b.innerHTML='<label>כמה קרנות: <b>40</b><input type="range" min="10" max="80" value="40"></label><label>מנוף ממוצע: <b>4.0</b><input type="range" min="1" max="7" step=".5" value="4"></label><div class="md-pop"></div><p class="md-cap">כל עמודה היא קרן. הגובה הוא המנוף שלה, והקו הוא הסף הממוצע.</p>';
     const [n,l]=b.querySelectorAll('input'), pop=b.querySelector('.md-pop');
     const draw=()=>{ b.querySelectorAll('label b')[0].textContent=n.value; b.querySelectorAll('label b')[1].textContent=(+l.value).toFixed(1); const r=rng(7); pop.innerHTML=''; for(let i=0;i<+n.value;i++){ const lv=Math.max(1.05,+l.value+(r()+r()+r()-1.5)*1.2); const s=H('i'); s.style.height=Math.min(100,lv/9*100)+'%'; s.classList.toggle('hi',lv>6); pop.append(s); } };
     n.addEventListener('input',draw); l.addEventListener('input',draw); draw(); },
   2(b){ b.innerHTML='<label>ירידה במחיר האג"ח: <b>0%</b><input type="range" min="0" max="25" value="0"></label><div class="md-bs"><div class="md-col"><span>נכסים</span><i class="as"></i></div><div class="md-col"><span>חוב + הון</span><i class="eq"></i><i class="db"></i></div></div><p class="md-cap"></p>';
     const r=b.querySelector('input'), as=b.querySelector('.as'), eq=b.querySelector('.eq'), cap=b.querySelector('.md-cap');
     const draw=()=>{ const d=+r.value; b.querySelector('label b').textContent=d+'%'; const A=500*(1-d/100), E=Math.max(0,A-400); as.style.height=(A/500*100)+'%'; eq.style.height=(E/500*100)+'%'; eq.classList.toggle('gone',E<=0);
       cap.textContent=E<=0?'ההון נמחק: הקרן חייבת יותר ממה שיש לה.':'הקרן של שרה: 100 משלה, 400 מושאל. ההון עכשיו '+E.toFixed(0)+', כלומר '+Math.round(E)+'% ממה שהיה.'; };
     r.addEventListener('input',draw); draw(); },
   3(b){ b.innerHTML='<div class="md-rule"><p><b>אם</b> המנוף עובר את הסף (6.0)</p><p><b>אז</b> מוכרים עד שחוזרים למנוף המקורי (4.0)</p></div><label>המנוף של הקרן עכשיו: <b>4.0</b><input type="range" min="3" max="8" step=".1" value="4"></label><p class="md-cap"></p>';
     const r=b.querySelector('input'), rule=b.querySelector('.md-rule'), cap=b.querySelector('.md-cap');
     const draw=()=>{ const v=+r.value; b.querySelector('label b').textContent=v.toFixed(1); const fire=v>6; rule.classList.toggle('fire',fire); cap.textContent=fire?'הכלל נדלק: הקרן מוכרת '+Math.round((1-4/v)*100)+'% מהאג"ח שלה.':'מתחת לסף. הקרן לא עושה כלום.'; };
     r.addEventListener('input',draw); draw(); },
   4(b){ b.innerHTML='<label>יחידות שנמכרו: <b>0</b><input type="range" min="0" max="200" step="10" value="0"></label><svg viewBox="0 0 260 120" class="md-svg"><polygon points="130,96 120,114 140,114" class="md-piv"/><g class="md-beam"><line x1="30" y1="96" x2="230" y2="96"/><rect x="34" y="70" width="56" height="24" rx="4" class="md-sold"/><text x="62" y="87" text-anchor="middle">נמכר</text><rect x="170" y="70" width="56" height="24" rx="4" class="md-yld"/><text x="198" y="87" text-anchor="middle">תשואה</text></g></svg><p class="md-cap"></p>';
     const r=b.querySelector('input'), beam=b.querySelector('.md-beam'), cap=b.querySelector('.md-cap');
     const draw=()=>{ const u=+r.value; b.querySelector('label b').textContent=u; beam.style.transform=`rotate(${-u/200*12}deg)`; cap.textContent='התשואה זזה ב-'+(u/200).toFixed(2)+' נקודות אחוז. 200 יחידות = נקודה שלמה.'; };
     r.addEventListener('input',draw); draw(); },
   5(b){ const R=casc(0,.6); b.innerHTML='<div class="md-doms"></div><button type="button" class="cy-btn go">הסבב הבא ›</button><p class="md-cap">לחצו כדי להריץ סבב אחרי סבב. אותם מספרים כמו במעבדה.</p>';
     const doms=b.querySelector('.md-doms'), bt=b.querySelector('button'), cap=b.querySelector('.md-cap'); for(let i=0;i<R.rounds.length;i++){ const d=H('i'); d.textContent=i+1; doms.append(d); } let k=0;
     bt.addEventListener('click',()=>{ if(k>=R.rounds.length){ k=0; doms.querySelectorAll('i').forEach(d=>d.classList.remove('f')); cap.textContent='מתחילים מחדש.'; return; } const rd=R.rounds[k]; doms.children[k].classList.add('f'); cap.textContent='סבב '+(k+1)+': '+rd.s+' קרנות מוכרות · התשואה +'+rd.y.toFixed(2); k++; if(k>=R.rounds.length){ bt.textContent='מההתחלה ↻'; cap.textContent+=' · השוק נרגע.'; } }); },
   6(b){ const Nn=[[60,30,'קרן אשראי'],[150,24,'בנק א'],[230,44,'בנק ב'],[100,96,'מבטח'],[190,104,'קרן פנסיה'],[40,100,'חברה']]; const E=[[0,1],[0,3],[1,2],[1,4],[3,4],[5,0],[2,4]];
     b.innerHTML='<svg viewBox="0 0 270 130" class="md-svg md-net">'+E.map(([a,c])=>`<line x1="${Nn[a][0]}" y1="${Nn[a][1]}" x2="${Nn[c][0]}" y2="${Nn[c][1]}" data-e="${a}-${c}"/>`).join('')+Nn.map(([x,y,l],i)=>`<g data-i="${i}" tabindex="0" role="button" aria-label="${l}"><circle cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y+26}" text-anchor="middle">${l}</text></g>`).join('')+'</svg><p class="md-cap">לחצו על גוף כדי שלא יחזיר את החוב שלו, וראו מי נפגע אחריו.</p>';
     const cap=b.querySelector('.md-cap');
     b.querySelectorAll('g[data-i]').forEach(g=>g.addEventListener('click',()=>{ b.querySelectorAll('.hit,.src').forEach(x=>x.classList.remove('hit','src')); const s=+g.dataset.i; g.classList.add('src'); const seen=new Set([s]); let fr=[s], lvl=0;
       const tick=()=>{ const nx=[]; fr.forEach(a=>E.forEach(([p,q])=>{ if(p===a&&!seen.has(q)){ seen.add(q); nx.push(q); b.querySelector(`g[data-i="${q}"]`).classList.add('hit'); b.querySelector(`line[data-e="${p}-${q}"]`).classList.add('hit'); } })); fr=nx; lvl++; if(nx.length) setTimeout(tick,500); else cap.textContent=(seen.size-1)+' גופים נפגעו, בלי שאף אחד מכר אג"ח. זה ערוץ ההדבקה השני.'; }; setTimeout(tick,300); })); },
   7(b){ b.innerHTML='<label>כמה הבנק המרכזי קונה (יחידות): <b>0</b><input type="range" min="0" max="80" step="5" value="0"></label><div class="md-bar"><i></i><span></span></div><p class="md-cap"></p>';
     const r=b.querySelector('input'), bar=b.querySelector('.md-bar i'), lab=b.querySelector('.md-bar span'), cap=b.querySelector('.md-cap');
     const draw=()=>{ const cb=+r.value; b.querySelector('label b').textContent=cb; const R=casc(cb,.6); bar.style.width=(R.y/1.2*100)+'%'; bar.classList.toggle('hot',R.y>1); lab.textContent='+'+R.y.toFixed(2); cap.textContent=cb===0?'בלי התערבות: הזעזוע של 0.6 נגמר ב-'+R.y.toFixed(2)+'.':'עם קנייה של '+cb+' יחידות, הזעזוע נעצר ב-'+R.y.toFixed(2)+'.'; };
     r.addEventListener('input',draw); draw(); },
   8(b){ const lv=Object.keys(LFS.sweep); b.innerHTML='<div class="md-globes">'+lv.map(l=>{ const v=LFS.sweep[l]; const p=v.filter(x=>x>1.5).length/v.length; return `<div class="md-g"><span class="gl" style="--p:${p}"><i></i></span><b>${Math.round(p*100)}%</b><small>מנוף ${l}</small></div>`; }).join('')+'</div><p class="md-cap">בכל כדור 300 עולמות. כמה מהם נכנסו לספירלה? (נתונים ממעבדה 4)</p>'; },
   9(b){ const real=[[0,.6],[1,.7],[2,.85],[3,1.3],[4,1.5],[5,2.0],[6,1.0],[7,.9],[8,.95]], R=casc(0,.6); const mod=[[0,0],[1,.6]].concat(R.rounds.map((r,i)=>[i+2,r.y]));
     const X=i=>20+i*28, Y=v=>110-v*45; b.innerHTML=`<svg viewBox="0 0 270 125" class="md-svg md-cal"><polyline class="real" points="${real.map(([i,v])=>X(i)+','+Y(v)).join(' ')}"/><polyline class="model" points="${mod.map(([i,v])=>X(i)+','+Y(v)).join(' ')}"/><text x="250" y="16" text-anchor="start" class="real">2022 (בקירוב, מוזז לאפס)</text><text x="250" y="30" text-anchor="start" class="model">המודל (POC)</text></svg><p class="md-cap">הכיוון וסדר הגודל דומים. אבל זו התאמה בעין, לא כיול. הכיול האמיתי הוא העבודה של הפיצ'ר הזה.</p>`; },
   10(b){ const url='…/simulator#seed=7&shock=0.6&lev=4.0&cb=0'; b.innerHTML=`<div class="md-share"><code dir="ltr">${url}</code><button type="button" class="cy-btn go">להעתיק</button></div><p class="md-cap">מי שפותח את הקישור רואה בדיוק את אותה הרצה: אותו עולם, אותו זעזוע, אותה תוצאה. זה כמו שיתוף מסלול בוויז.</p>`;
     const bt=b.querySelector('button'); bt.addEventListener('click',()=>{ try{ navigator.clipboard.writeText(url); }catch(e){} bt.textContent='הועתק ✓'; }); }
  };
  if(window.TermWin) window.TermWin.wire(top);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0)); else setTimeout(boot,0);
})();
