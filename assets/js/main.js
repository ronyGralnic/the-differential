// THE DIFFERENTIAL — shared interactivity (vanilla JS, no dependencies)

// --- Tree node accordion ---
document.querySelectorAll('.tree:not(.cards) .node-head').forEach(head => {
  head.addEventListener('click', () => {
    const node = head.closest('.tree-node');
    const body = node.querySelector('.node-body');
    const isOpen = node.classList.contains('open');

    if (isOpen) {
      node.classList.remove('open');
      body.style.maxHeight = null;
    } else {
      node.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// --- Doc tabs inside an expanded node ---
document.querySelectorAll('.doc-tabs').forEach(tabGroup => {
  const tabs = tabGroup.querySelectorAll('.doc-tab');
  const container = tabGroup.closest('.node-body-inner');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = tab.dataset.doc;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      container.querySelectorAll('.doc-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.doc === target);
      });
      // recalc parent max-height since content size changed
      const node = tabGroup.closest('.tree-node');
      const body = node.querySelector('.node-body');
      if (node.classList.contains('open')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
});


// --- Stage 04: the "reel" (full-screen story per candidate) ---
(function(){
  const grid=document.getElementById('cand-cards'); if(!grid) return;
  const reel=document.getElementById('reel'), scenesEl=document.getElementById('reel-scenes');
  const titleEl=document.getElementById('reel-title'), trail=document.getElementById('reel-trail');
  const scroller=document.getElementById('reel-scroll'), closeBtn=document.getElementById('reel-close');
  const ST=['לוח','ייזום','POC','אפיון','ארכיטקטורה'];
  const D={
   'Automated Model Risk Auditor':{ st:['ok','ok','ok','ok','x'], meta:'4 מסמכים · נפל בארכיטקטורה',
     ch:[
      {k:'ייזום',t:'בודקים פעמיים',d:'ideation',b:'הוא בודק כל שאלה פעמיים: פעם כשהמודל יודע שבודקים אותו, ופעם כשהבדיקה מוסווית כשיחה רגילה. פער בין התשובות הוא סימן אזהרה. זה בדיוק מה שהחוק לא תופס: מודל שמתנהג יפה רק כשצופים בו.',q:'איך תופסים מי שיודע שצופים בו?'},
      {k:'מחקר ו-POC',t:'מי שופט את השופט?',d:'poc',b:'הרצנו אותן שאלות בשני מצבים כדי לראות אם יש פער מובהק. השופט היה בסיסי, מבוסס כללים. ובדרך נחשף הקושי: מי מבטיח שהשופט עצמו לא טועה?',q:'אפשר לסמוך על שופט שאף אחד לא בדק?'},
      {k:'אפיון',t:'תשעה פיצ\'רים',d:'spec',b:'ניהול מאגר הבדיקות, השוואה בין שני המצבים, כמה שופטים במקום אחד, ציון סיכון מצטבר ודוח תאימות. הכול נראה שלם. אבל כל זה מסתיים בדוח.',q:'מה קורה אחרי שהדוח אומר "מסוכן"?'},
      {k:'ארכיטקטורה',t:'אין מי שיפעיל',d:'arch',b:'שרטטנו את המערכת מקצה לקצה. הצינור מזהה סיכון, אבל כדי לפעול על זה הוא תלוי ברכיב חיצוני שאין לנו שליטה עליו.',q:'מה שווה זיהוי בלי יד שעוצרת?'}],
     cut:{h:'נפל בארכיטקטורה',p:'הצינור מזהה סיכון אבל תלוי ברכיב חיצוני כדי לפעול. נשארה גם השאלה הפתוחה: מי שופט את השופט?'}},
   'Cross-State Regulation Aggregator':{ st:['x','off','off','off','off'], meta:'רעיון בלבד · אין מסמכים',
     ch:[{k:'על הלוח',t:'מפה של פערים',b:'מפה חיה של כל חוקי ה-AI בכל מדינה, שמראה איפה הם סותרים ואיפה נשארו פערים, כמו זה ש-Hugging Face נפלה בו בין הכיסאות.',q:'מה שווה מפה מושלמת, אם היא מגיעה אחרי הנזק?'}],
     cut:{h:'נפל על הלוח',p:'הוא מראה פערים בחוק רק אחרי שהם כבר קיימים, ולא עוצר אותם. והוא פותר בעיה שפתרון אחר על הלוח פותר מזווית דומה. לא נצבר תיעוד מעבר לרעיון.'}},
   'Coordinated Pause Escrow System':{ st:['ok','ok','ok','x','off'], meta:'3 מסמכים · נפל באפיון',
     ch:[
      {k:'ייזום',t:'כספת למתחרים',d:'ideation',b:'ואנס קורא לחברות לעצור יחד. אבל חברות מתחרות לא יכולות לתאם ביניהן בלי להסתכן בתביעה. הרעיון: כספת קריפטוגרפית שבה כל חברה נועלת את ההחלטה שלה בסוד, והכספת נפתחת רק כשמספיק חברות התחייבו. אף אחת לא נחשפת לבד.',q:'מי יסכים להיות הראשונה לנעול?'},
      {k:'מחקר ו-POC',t:'האם זה בכלל עובד?',d:'poc',b:'בנינו שתי חברות מדומות, וכל אחת נעלה התחייבות. הכספת באמת לא נתנה לאף צד לראות את השנייה, ונפתחה רק כששתיהן נעלו. המתמטיקה עובדת. אבל עלו שתי שאלות שהמתמטיקה לא עונה עליהן: מי מפעיל את הכספת? ומה קורה אם אחת נעלה ונעלמה?',q:'מה עושים עם כספת שאף אחד לא שולט בה?'},
      {k:'אפיון',t:'שבעה פיצ\'רים ושאלה אחת',d:'spec',b:'פירטנו שבעה פיצ\'רים, בין היתר נעילת התחייבות וחשיפה מבוקרת. הכול עבד על הנייר. ואז חזרנו לשאלה מהמחקר: פרוטוקול שנועד לעקוף את איסור ה-antitrust יכול לשמש בדיוק למה שהאיסור בא למנוע, תיאום מחירים בין מתחרים. לא מצאנו דרך להבטיח שזה לא יקרה.',q:'מי מבטיח שהכלי לא יהפוך לקנוניה?'}],
     cut:{h:'נפל באפיון',p:'פרדוקס האנטי-טראסט: פרוטוקול שנועד לעקוף את האיסור יכול לשמש בדיוק את מה שהאיסור בא למנוע. נשארה גם השאלה: מה קורה אם צד אחד נועל ונעלם?'}},
   'Lobbying Transparency Tracker':{ st:['x','off','off','off','off'], meta:'רעיון בלבד · אין מסמכים',
     ch:[{k:'על הלוח',t:'מי מימן את מי',b:'כלי שמצליב מימון קמפיינים ציבורי עם עמדות מוצהרות ומסמן ניגוד עניינים, למשל משקיע שמממן גם את הלובי שמרכך חוקים וגם את היוזמה שמבטיחה פיקוח.',q:'מי יעמוד מאחורי כלי שמצביע באצבע על כולם?'}],
     cut:{h:'נפל על הלוח',p:'פרסום האשמות בשם מלא נגד אנשים אמיתיים הוא סיכון משפטי ותדמיתי גדול מדי, והכלי גם לא עוצר אף מודל. לא נצבר תיעוד מעבר לרעיון.'}},
   'AI Incident Ledger':{ st:['ok','x','off','off','off'], meta:'מסמך אחד · נפל בייזום',
     ch:[{k:'ייזום',t:'יומן אחד לכל התקריות',d:'ideation',b:'פלטפורמה שבה חברות מדווחות על תקריות בטיחות בזמן אמת, במקום חוקי דיווח שונים בכל מדינה. כמו מאגר הפרצות CVE: מקור אמת אחד. אבל CVE עובד כי לחברות יש מה להרוויח מלדווח. כאן אין.',q:'למה שחברה תדווח על עצמה?'}],
     cut:{h:'נפל בייזום',p:'בעיית התמריץ: אין שום סיבה שחברה תדווח על עצמה.'}},
   'Model Kill-Switch Protocol':{ st:['ok','ok','ok','ok','ok'], meta:'4 מסמכים · המסלול ממשיך',
     ch:[
      {k:'ייזום',t:'מי יכול ללחוץ?',d:'ideation',b:'שלוש הצעות החוק מדברות על "עצירה" ולא מפרטות איך. הרעיון: פרוטוקול עצירה שבו רק קבוצה של רשויות מוסמכות יחד (M מתוך N) יכולה לחסום מודל ברשת בזמן אמת, בלי גורם יחיד שאפשר לחטוף, ועם רישום פומבי של כל פעולה.',q:'איך מונעים שמישהו אחד יחזיק את כל הכוח?'},
      {k:'מחקר ו-POC',t:'אפשר לזייף עצירה?',d:'poc',b:'בנינו שער בקרה סביב מודל מדומה: פקודה חתומה עוברת, פקודה לא חתומה או ישנה נדחית, והכול נרשם. בדקנו גם שהאימות לא מאט מדי. נשארה שאלה אחת: מי שומר על מפתח הכיבוי?',q:'מי שומר על השומרים?'},
      {k:'אפיון',t:'אחד עשר פיצ\'רים',d:'spec',b:'מהאימות הקריפטוגרפי של כל פקודה ועד תוכנית חירום אוטונומית. כל פקודה נחתמת, השער בודק לפני שפועל, וניסיון חשוד נרשם. גם השאלה מהמחקר קיבלה תשובה: לא מפתח אחד אלא חתימה משותפת של כמה גורמים.',q:'מה קורה כשהתקשורת נפלה?'},
      {k:'ארכיטקטורה',t:'עד הקצה',d:'arch',b:'כל נתיב עצירה עובר באותה שרשרת: אימות, מדיניות, הפצה ואכיפה, והכול בתוך גבולות המערכת. אין רכיב חיצוני שהכול תלוי בו.',q:'מה נשאר לבדוק?'}],
     cut:null}
  };
  const names=[...grid.querySelectorAll('.node-head')].map(h=>h.dataset.name);
  let node=null, shown=0, origin=[], lastFocus=null;
  const el=(tag,cls,txt)=>{ const e=document.createElement(tag); if(cls) e.className=cls; if(txt!=null) e.textContent=txt; return e; };

  function returnDocs(){
    origin.forEach(o=>{ o.panel.classList.remove('active'); o.parent.appendChild(o.panel); });
    origin=[];
  }
  function scrollTo(e){ setTimeout(()=>e.scrollIntoView({behavior:'smooth',block:'start'}),60); }

  function addScene(data,i){
    const c=data.ch[i], scene=el('div','reel-scene');
    scene.append(el('span','reel-node',String(i+1)), el('span','reel-line'));
    scene.append(el('p','reel-kicker','פרק '+(i+1)+' · '+c.k), el('h4',null,c.t), ixLinesEl('div','reel-brief',c.b), el('p','reel-q',c.q));
    const act=el('div','reel-actions'); let docEl=null;
    if(c.d){
      const panel=node.querySelector('.doc-panel[data-doc="'+c.d+'"]');
      if(panel){
        const doc=el('div','reel-doc'); docEl=doc;
        const tabEl=node.querySelector('.doc-tab[data-doc="'+c.d+'"]'), dname=tabEl?tabEl.textContent:'מסמך';
        const inner=el('div','reel-doc-in'), sheet=el('div','reel-sheet'), bar=el('div','reel-doc-bar'), body=el('div','reel-doc-body');
        bar.innerHTML='<i></i><i></i><i></i><span></span>'; bar.querySelector('span').textContent='מסמך · '+dname;
        sheet.append(bar,body); inner.append(sheet); doc.append(inner);
        const tg=el('button','reel-btn','המסמך המלא ▾'); tg.type='button'; tg.setAttribute('aria-expanded','false');
        tg.addEventListener('click',()=>{
          if(!body.contains(panel)){ origin.push({panel,parent:panel.parentNode}); body.appendChild(panel); }
          panel.classList.add('active');
          const open=doc.classList.toggle('open'); tg.textContent=open?'סגירת המסמך ▴':'המסמך המלא ▾'; tg.setAttribute('aria-expanded',open);
          if(open) setTimeout(()=>{ try{ doc.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}); }catch(e){} },120);
        });
        act.append(tg);
      }
    }
    const last=i===data.ch.length-1;
    const go=el('button','reel-btn go', last?(data.cut?'ומה קרה אחר כך?':'להמשיך'):'לתחנה הבאה'); go.type='button';
    go.addEventListener('click',()=>{ go.remove(); if(last) finish(data); else addScene(data,i+1); });
    act.append(go); if(docEl) scene.append(docEl); scene.append(act);
    if(i===data.ch.length-1) scene.classList.add('last');
    scenesEl.append(scene); trail.append(document.createElement('i')); shown++;
    scrollTo(scene);
  }
  function finish(data){
    const cut=el('div','reel-cut'+(data.cut?'':' goon'));
    cut.append(el('span','x',data.cut?'✕':'⟶'), el('p','kick',data.cut?'קאט':'המשך'));
    cut.append(el('h4',null,data.cut?data.cut.h:'המסלול ממשיך'), el('p',null,data.cut?data.cut.p:'את המסקנה נשמור לשלב הבא.'));
    scenesEl.append(cut);
    const sum=el('div','reel-summary'); sum.append(el('h5',null,'המסלול'));
    const path=el('div','reel-path');
    data.st.forEach((s,i)=>{
      const st=el('div','reel-st '+s); st.append(el('b',null,s==='ok'?'✓':s==='x'?'✕':'·'), el('span',null,ST[i])); path.append(st);
      if(i<data.st.length-1) path.append(el('span','reel-seg'+(s==='ok'&&data.st[i+1]!=='off'?' ok':'')));
    });
    sum.append(path, el('p','reel-meta',data.meta));
    const act=el('div','reel-actions');
    if(!data.cut){
      const f=el('button','reel-btn go','לשלב הבא'); f.type='button';
      f.addEventListener('click',()=>{ closeReel(); setTimeout(()=>document.getElementById('flow').scrollIntoView({behavior:'smooth'}),350); });
      act.append(f);
    } else {
      const nx=names[(names.indexOf(titleEl.textContent)+1)%names.length];
      const n=el('button','reel-btn go','המועמד הבא'); n.type='button';
      n.addEventListener('click',()=>{ const nn=grid.querySelector('.node-head[data-name="'+nx+'"]'); closeReel(true); setTimeout(()=>nn.click(),480); });
      act.append(n);
    }
    const back=el('button','reel-btn','חזרה לכרטיסים'); back.type='button'; back.addEventListener('click',()=>closeReel());
    act.append(back); sum.append(act); scenesEl.append(sum);
    scrollTo(cut);
  }
  function openReel(head){
    node=head.closest('.tree-node'); const name=head.dataset.name, data=D[name]; if(!data) return;
    lastFocus=head; scenesEl.textContent=''; trail.textContent=''; shown=0;
    titleEl.textContent=name;
    reel.hidden=false; document.body.classList.add('reel-open'); scroller.scrollTop=0;
    requestAnimationFrame(()=>reel.classList.add('on'));
    addScene(data,0); closeBtn.focus({preventScroll:true});
  }
  function closeReel(quick){
    reel.classList.remove('on');
    setTimeout(()=>{ reel.hidden=true; document.body.classList.remove('reel-open'); returnDocs(); if(!quick&&lastFocus) lastFocus.focus({preventScroll:true}); },quick?420:450);
  }
  grid.querySelectorAll('.node-head').forEach(h=>h.addEventListener('click',()=>openReel(h)));
  closeBtn.addEventListener('click',()=>closeReel());
  const fabX=document.getElementById('reel-fab-x'), fab=document.getElementById('reel-fab'); if(fabX) fabX.addEventListener('click',()=>closeReel());
  let lastY=0; scroller.addEventListener('scroll',()=>{ const y=scroller.scrollTop; if(fab){ fab.classList.toggle('hide',y>lastY+6&&y>200); if(y<lastY-6) fab.classList.remove('hide'); } lastY=y; },{passive:true});
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!reel.hidden) closeReel(); });
})();

// --- Stage 05 flow chart: draw the branches when scrolled into view ---
(function(){
  const w=document.getElementById('flow-wrap'); if(!w) return;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){ w.classList.add('revealed'); return; }
  w.classList.add('armed');
  const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ w.classList.add('go'); setTimeout(()=>w.classList.add('revealed'),7500); io.disconnect(); } }); },{threshold:.35});
  io.observe(w);
})();

// ================= Scroll-triggered animations =================
(function(){
  if(!('IntersectionObserver' in window)) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) { drawStrings(true); return; }

  // Stage 01: paragraphs reveal one by one, with a count-up
  const nar=document.querySelector('.case-narrative');
  if(nar){
    nar.classList.add('armed');
    const pio=new IntersectionObserver(es=>es.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.classList.add('in'); pio.unobserve(e.target);
      e.target.querySelectorAll('[data-count]').forEach(el=>{
        const to=+el.dataset.count, t0=performance.now(), dur=1400;
        (function step(t){ const k=Math.min(1,(t-t0)/dur); el.textContent=Math.round(to*(1-Math.pow(1-k,3))); if(k<1) requestAnimationFrame(step); })(t0);
      });
    }),{threshold:.3});
    nar.querySelectorAll('p').forEach(p=>pio.observe(p));
  }

  // Sections with staged entrances
  const cfg={ issues:'.evidence-card', board:'.dx-item', tree:'.tree.cards .tree-node', winner:null };
  Object.keys(cfg).forEach(id=>{
    const sec=document.getElementById(id); if(!sec) return;
    if(cfg[id]) sec.querySelectorAll(cfg[id]).forEach((el,i)=>el.style.setProperty('--i',i));
    sec.classList.add('anim-armed');
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(!e.isIntersecting) return;
      sec.classList.add('anim-go'); io.disconnect();
      if(id==='issues') setTimeout(()=>drawStrings(false),2400);
      if(id==='tree') setTimeout(()=>sec.classList.add('settled'),1800);
    }),{threshold:id==='winner'?.4:.18});
    io.observe(sec);
  });
  window.addEventListener('resize',()=>{ const s=document.querySelector('.board-strings'); if(s&&s.classList.contains('drawn')) drawStrings(true); });
})();

// Red strings between pins on the cork board
function drawStrings(instant){
  const board=document.querySelector('.board-surface'); if(!board) return;
  board.querySelectorAll('.board-strings').forEach(n=>n.remove());
  if(window.innerWidth<=700) return;
  const br=board.getBoundingClientRect();
  const pins=[...board.querySelectorAll('.pin')];
  if(pins.length<2) return;
  const c=p=>{ const r=p.getBoundingClientRect(); return [r.left+r.width/2-br.left, r.top+r.height/2-br.top]; };
  const [x1,y1]=c(pins[0]);
  const ns='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(ns,'svg'); svg.setAttribute('class','board-strings'); svg.setAttribute('aria-hidden','true');
  pins.slice(1).forEach((p,n)=>{
    const [x2,y2]=c(p);
    const path=document.createElementNS(ns,'path');
    path.setAttribute('d',`M${x1} ${y1} Q${(x1+x2)/2} ${(y1+y2)/2+34} ${x2} ${y2}`);
    path.setAttribute('pathLength','1'); path.style.setProperty('--n',n);
    if(instant) path.style.transition='none';
    svg.appendChild(path);
  });
  board.insertBefore(svg,board.firstChild);
  if(instant) svg.classList.add('drawn'); else requestAnimationFrame(()=>requestAnimationFrame(()=>svg.classList.add('drawn')));
}

// ================= Ideation views (animated, accessible) =================
(function(){
  const DATA=window.IDEATION; if(!DATA) return;
  const NS='http://www.w3.org/2000/svg';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(tag,cls,html)=>{ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; };
  const S=(tag,attrs,parent)=>{ const e=document.createElementNS(NS,tag); for(const k in attrs) e.setAttribute(k,attrs[k]); if(parent) parent.appendChild(e); return e; };
  const sec=(root,kicker,title)=>{ const s=H('section','ix-sec'); s.append(H('p','ix-kicker',kicker)); if(title) s.append(H('h5','ix-h',title)); root.append(s); return s; };

  function edgePt(a,b){ // point on rect b's border facing a
    const dx=a.x-b.x, dy=a.y-b.y;
    const k=Math.min((b.w/2)/Math.max(Math.abs(dx),1e-6),(b.h/2)/Math.max(Math.abs(dy),1e-6));
    return {x:b.x+dx*k,y:b.y+dy*k};
  }

  function mechanism(root,d){
    const s=sec(root,'איך זה עובד','');
    const m=d.mech, box=H('div','ix-mech'); s.append(box);
    const svg=S('svg',{viewBox:'0 0 720 300',class:'ix-svg',role:'img','aria-label':'הדמיה מונפשת של המנגנון, שלב אחר שלב'},box);
    const defs=S('defs',{},svg);
    ['','on','bad'].forEach(c=>{ const mk=S('marker',{id:'ixa-'+d.name.replace(/\W/g,'')+c,viewBox:'0 0 10 10',refX:'9',refY:'5',markerWidth:'7',markerHeight:'7',orient:'auto-start-reverse'},defs); S('path',{d:'M0 0L10 5L0 10z',class:'ixm '+c},mk); });
    const id=d.name.replace(/\W/g,'');
    const N={}; m.nodes.forEach(([k,x,y,w,hh,t])=>N[k]={k,x,y,w,h:hh,t});
    const edgeEls=m.edges.map(([a,b])=>{
      const A=N[a],B=N[b],p1=edgePt(B,A),p2=edgePt(A,B);
      const g=S('g',{class:'ixe'},svg);
      S('line',{x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y,class:'ixl'},g);
      const bad=S('text',{x:(p1.x+p2.x)/2,y:(p1.y+p2.y)/2+6,class:'ixbad','text-anchor':'middle'},g); bad.textContent='✕';
      return g;
    });
    const nodeEls={};
    Object.values(N).forEach(n=>{
      const g=S('g',{class:'ixn'},svg); nodeEls[n.k]=g;
      S('rect',{x:n.x-n.w/2,y:n.y-n.h/2,width:n.w,height:n.h,rx:9,class:'ixr'},g);
      const lines=n.t.split('\n'), t=S('text',{x:n.x,y:n.y-(lines.length-1)*8+5,'text-anchor':'middle',class:'ixt'},g);
      lines.forEach((ln,i)=>{ const ts=S('tspan',{x:n.x,dy:i?16:0},t); ts.textContent=ln; });
    });
    const bar=H('div','ix-bar'); box.append(bar);
    const stepn=H('span','ix-stepn','1'), cap=H('p','ix-captext'); cap.setAttribute('aria-live','polite');
    const ctr=H('div','ix-ctrl'); const mk=(l,lab)=>{ const b=H('button','ix-cb',l); b.type='button'; b.setAttribute('aria-label',lab); return b; };
    const prev=mk('◀','שלב קודם'), play=mk(reduced?'▶':'❚❚','הפעלה / השהיה'), next=mk('▶','שלב הבא');
    const dots=H('span','ix-dots'); m.steps.forEach((_,i)=>{ const b=H('button','ix-dot'); b.type='button'; b.setAttribute('aria-label','שלב '+(i+1)); b.addEventListener('click',()=>{ go(i); stop(); }); dots.append(b); });
    ctr.append(prev,play,next); bar.append(stepn,cap,ctr,dots);
    box.append(ixLinesEl('div','ix-explain',m.explain));
    let cur=0, timer=null, playing=!reduced, vis=false;
    function go(i){
      cur=(i+m.steps.length)%m.steps.length; const st=m.steps[cur];
      Object.entries(nodeEls).forEach(([k,g])=>{ g.classList.toggle('on',st.on.includes(k)&&!(st.alert||[]).includes(k)); g.classList.toggle('bad',(st.alert||[]).includes(k)); });
      edgeEls.forEach((g,j)=>{ g.classList.toggle('on',st.e.includes(j)); g.classList.toggle('bad',(st.bad||[]).includes(j)); });
      svg.querySelectorAll('.ixl').forEach((l,j)=>{ const c=(st.bad||[]).includes(j)?'bad':st.e.includes(j)?'on':''; l.setAttribute('marker-end','url(#ixa-'+id+c+')'); });
      stepn.textContent=cur+1; stepn.classList.toggle('bad',!!st.alert); cap.textContent=st.cap;
      [...dots.children].forEach((b,j)=>b.classList.toggle('cur',j===cur));
    }
    function tick(){ clearInterval(timer); timer=null; if(playing&&vis) timer=setInterval(()=>go(cur+1),3600); }
    function stop(){ playing=false; play.textContent='▶'; tick(); }
    prev.addEventListener('click',()=>{ go(cur-1); stop(); });
    next.addEventListener('click',()=>{ go(cur+1); stop(); });
    play.addEventListener('click',()=>{ playing=!playing; play.textContent=playing?'❚❚':'▶'; tick(); });
    go(0);
    new IntersectionObserver(es=>es.forEach(e=>{ vis=e.isIntersecting; tick(); }),{threshold:.4}).observe(box);
  }

  function map(root,d){
    const s=sec(root,'איפה אנחנו על המפה',''), mp=d.map; 
    const how=H('ul','ix-how'); mp.how.forEach(x=>how.append(H('li',null,x))); s.append(how);
    const box=H('div','ix-map'); s.append(box);
    const wrap=H('div','ix-mapw'); box.append(wrap);
    const svg=S('svg',{viewBox:'0 0 560 330',class:'ix-svg ixmap',role:'group','aria-label':'מפת מיקום מול פתרונות קיימים. אפשר להתקרב לכל נקודה להסבר.'},wrap);
    const tip=H('div','ix-tip'); tip.hidden=true; tip.setAttribute('role','status'); wrap.append(tip);
    const X=v=>135+v/100*385, Y=v=>40+v/100*230;
    S('rect',{x:135,y:40,width:385,height:230,class:'ixframe'},svg);
    S('line',{x1:327,y1:40,x2:327,y2:270,class:'ixgrid'},svg); S('line',{x1:135,y1:155,x2:520,y2:155,class:'ixgrid'},svg);
    const T=(x,y,tx,c,a)=>{ const e=S('text',{x,y,class:c,'text-anchor':a||'middle'},svg); e.textContent=tx; return e; };
    T(135,296,'◀ '+mp.xl,'ixax','start'); T(520,296,mp.xr+' ▶','ixax','end');
    T(127,52,mp.yt,'ixax','end'); T(127,266,mp.yb,'ixax','end');
  const ORG={
   'Garak':['NVIDIA','M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z'],
   'NeMo Guardrails':['NVIDIA','M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z'],
   'HackerOne':['HackerOne','M7.207 0c-.4836 0-.8774.1018-1.1823.3002-.3044.2003-.4592.4627-.4592.7798v21.809c0 .2766.1581.5277.4752.7609.315.2335.7031.3501 1.1664.3501.4427 0 .8306-.1166 1.1678-.3501.3352-.231.5058-.4843.5058-.761V1.0815c0-.319-.1623-.5769-.4893-.7813C8.0644.1018 7.6702 0 7.207 0zm9.5234 8.662c-.4836 0-.8717.0981-1.1683.3007l-4.439 2.7822c-.1988.1861-.2841.4687-.2473.855.0342.3826.2108.747.5238 1.0907.3145.346.6662.5626 1.0684.6547.3963.0899.6973.041.8962-.143l1.7551-1.0951v9.7817c0 .2767.1522.5278.4607.761.3007.2335.6873.3501 1.1504.3501.463 0 .863-.1166 1.1983-.3501.3371-.2332.5058-.4843.5058-.761V9.7381c0-.3193-.165-.577-.4898-.7754-.3252-.2026-.7288-.3007-1.2143-.3007z'],
   'PyRIT':['Microsoft',null,'M'],
   'CVE':['MITRE',null,'M'],
   'NIST AI RMF':['NIST',null,'NIST'],
   'EU AI Act':['European Union',null,'EU'],
   'E-Stop (ISO 13850)':['ISO',null,'ISO'],
  };
    let pinned=null;
    function show(g,name,desc){
      tip.innerHTML='<strong></strong><span></span><i class="ix-tip-ar"></i>'; tip.querySelector('strong').textContent=name; tip.querySelector('span').textContent=desc; const og=ORG[name]; if(og){ const r=H('div','ix-org'); r.innerHTML=(og[1]?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+og[1]+'"/></svg>':'<b>'+og[2]+'</b>')+'<em></em>'; r.querySelector('em').textContent=og[0]; tip.insertBefore(r,tip.firstChild); } tip.hidden=false; tip.classList.remove('on'); void tip.offsetWidth;
      const wr=wrap.getBoundingClientRect(), cr=g.querySelector('circle:last-of-type').getBoundingClientRect();
      const cx=cr.left+cr.width/2-wr.left, cy=cr.top-wr.top;
      const w=tip.offsetWidth; let left=Math.max(6,Math.min(wr.width-w-6,cx-w/2));
      tip.style.left=left+'px'; tip.style.top=Math.max(4,cy-tip.offsetHeight-12)+'px'; tip.querySelector('.ix-tip-ar').style.left=Math.max(14,Math.min(w-14,cx-left))+'px'; requestAnimationFrame(()=>tip.classList.add('on'));
    }
    function hide(){ if(!pinned){ tip.classList.remove('on'); } }
    function dot(l,x,y,desc,cls,i){
      const g=S('g',{class:'ixdot'+(cls?' '+cls:''),style:'--i:'+i,tabindex:'0',role:'button','aria-label':l+': '+desc},svg);
      if(cls) S('circle',{cx:X(x),cy:Y(y),r:16,class:'ring'},g);
      S('circle',{cx:X(x),cy:Y(y),r:22,class:'hit'},g);
      S('circle',{cx:X(x),cy:Y(y),r:cls?10:7,class:'pt'},g);
      const left=x>55, off=cls?28:12, tx=S('text',{x:left?X(x)-off:X(x)+off,y:Y(y)+4,'text-anchor':left?'end':'start'},g); tx.textContent=l;
      g.addEventListener('pointerenter',()=>show(g,l,desc)); g.addEventListener('pointerleave',hide);
      g.addEventListener('focus',()=>show(g,l,desc)); g.addEventListener('blur',()=>{ pinned=null; tip.classList.remove('on'); });
      g.addEventListener('click',e=>{ e.stopPropagation(); pinned=(pinned===g)?null:g; if(pinned) show(g,l,desc); else tip.classList.remove('on'); });
    }
    mp.dots.forEach(([l,x,y,desc],i)=>dot(l,x,y,desc,'',i));
    dot('אנחנו',mp.ours[0],mp.ours[1],mp.ours_d,'ours',mp.dots.length);
    wrap.addEventListener('click',()=>{ pinned=null; tip.classList.remove('on'); });
    box.append(H('p','ix-hint','אפשר לעמוד על כל נקודה (או ללחוץ עליה) כדי לקרוא מה היא.'));
    box.append(ixLinesEl('div','ix-explain',mp.note));
  }

  const ICONS={
   scale:'<path d="M24 8v32M14 40h20M10 16h28"/><path d="M10 16L4 28h12zM38 16l-6 12h12z"/>',
   noise:'<path d="M4 28l6-8 6 12 6-16 6 14 6-8 6 4 4-2"/><path d="M4 38h40" stroke-dasharray="3 4"/>',
   coins:'<circle cx="16" cy="30" r="9"/><circle cx="30" cy="26" r="9"/><circle cx="22" cy="14" r="8"/>',
   flag:'<path d="M12 6v38M12 8h26l-6 8 6 8H12"/>',
   clock:'<circle cx="24" cy="24" r="17"/><path d="M24 13v11l8 5"/>',
   mask:'<path d="M8 18c0-4 32-4 32 0v8c0 10-8 16-16 16S8 36 8 26z"/><circle cx="17" cy="26" r="3"/><circle cx="31" cy="26" r="3"/>',
   coin:'<circle cx="24" cy="24" r="17"/><path d="M19 19c0-6 10-6 10 0 0 5-5 4-5 9"/><circle cx="24" cy="34" r="1"/>',
   ruler:'<rect x="4" y="16" width="40" height="16" rx="2"/><path d="M12 16v7M20 16v5M28 16v7M36 16v5"/>',
   magnifier:'<circle cx="21" cy="21" r="12"/><path d="M30 30l13 13"/>',
   gavel:'<path d="M18 22l14-14 8 8-14 14zM24 28L8 44M6 42h14"/>',
   slider:'<path d="M6 24h36M6 16v16M42 16v16"/><circle cx="30" cy="24" r="6"/>',
   signal:'<circle cx="24" cy="24" r="4"/><path d="M14 14a14 14 0 0 0 0 20M34 14a14 14 0 0 1 0 20M6 6l36 36"/>',
   key:'<circle cx="15" cy="24" r="8"/><path d="M23 24h21M36 24v8M42 24v6"/>'
  };
  function cards(root,d){
    const s=sec(root,'אתגרים: לחצו על כרטיס להפוך אותו',''), grid=H('div','ix-cards'); s.append(grid);
    d.cards.forEach(([q,a,ex,ic],i)=>{
      const b=H('div','ix-flip'); b.setAttribute('role','button'); b.tabIndex=0; b.style.setProperty('--i',i); b.setAttribute('aria-pressed','false');
      b.innerHTML='<span class="ix-face front"><svg class="ix-ic" viewBox="0 0 48 48" aria-hidden="true">'+(ICONS[ic]||'')+'</svg><strong></strong><small>לחצו להפוך</small></span><span class="ix-face back"><span class="ix-a"></span><em></em></span>';
      b.querySelector('.front strong').textContent=q;
      b.querySelector('.ix-a').append(ixLinesEl('span','',a)); b.querySelector('em').textContent=ex;
      const flip=()=>{ const f=b.classList.toggle('flipped'); b.setAttribute('aria-pressed',f); b.classList.add('touched'); };
      b.addEventListener('click',flip); b.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); flip(); } });
      grid.append(b);
    });
  }

  function audience(root,d){
    const s=sec(root,'מי צריך את זה',''), grid=H('div','ix-aud'); s.append(grid);
    d.audience.forEach(([who,scene],i)=>{ const c=H('div','ix-person'); c.style.setProperty('--i',i); c.innerHTML='<div><strong></strong><p></p><small>תרחיש להמחשה</small></div>'; c.querySelector('strong').textContent=who; c.querySelector('p').textContent=scene; grid.append(c); });
  }

  function downloads(root,slug){
    const s=sec(root,'הורדה',''), g=H('div','ix-dl'); s.append(g);
    const base='downloads/'+slug+'-ideation-';
    g.innerHTML='<div class="ix-dlc" dir="rtl"><strong>מסמך הייזום להורדה</strong><small>הרעיון, איך הוא עובד, למי הוא מיועד ומה האתגרים, בעברית.</small><span><a href="'+base+'he.pdf" download>PDF</a><a href="'+base+'he.docx" download>Word</a></span></div>'+
                '<div class="ix-dlc" dir="ltr"><strong>Ideation document, ready to download</strong><small>The idea, how it works, who needs it and the open challenges, in English.</small><span><a href="'+base+'en.pdf" download>PDF</a><a href="'+base+'en.docx" download>Word</a></span></div>';
  }

  document.querySelectorAll('.ix[data-ix]').forEach(root=>{
    const slug=root.dataset.ix, d=DATA[slug]; if(!d) return;
    const hero=H('div','ix-hero'); root.append(hero);
    hero.append(ixLinesEl('div','ix-lead',d.what));
    const why=H('div','ix-why'); why.innerHTML='<strong>למה זה נולד</strong>'; why.append(ixLinesEl('div','ix-whyt',d.why)); hero.append(why);
    mechanism(root,d); audience(root,d); map(root,d); cards(root,d); downloads(root,slug);
    root.querySelectorAll('.ix-sec, .ix-hero').forEach(el=>{ el.querySelectorAll('.ix-flip .ln').forEach(n=>n.classList.add('nostag')); let k=0; el.querySelectorAll('.ln:not(.nostag), .ix-dlc, .ix-hint, .ix-whyt').forEach(n=>{ n.style.setProperty('--l',Math.min(k++,14)); n.classList.add('rv'); }); new IntersectionObserver((es,o)=>es.forEach(e=>{ if(e.isIntersecting){ el.classList.add('in'); o.disconnect(); } }),{threshold:.2}).observe(el); });
  });
})();


// ---- shared: split text into short lines (wording unchanged) ----
function ixLinesEl(tag,cls,text){
  const e=document.createElement(tag); if(cls) e.className=cls;
  const sentences=text.split(/(?<=[.!?])\s+/);
  sentences.forEach(sn=>{
    const parts=(sn.length>62&&sn.includes(': '))?[sn.slice(0,sn.indexOf(': ')+1),sn.slice(sn.indexOf(': ')+2)]:[sn];
    parts.forEach(p=>{ const sp=document.createElement('span'); sp.className='ln'; sp.textContent=p; e.appendChild(sp); });
  });
  return e;
}

// ---- stage 04 journey animation ----
(function(){
  const j=document.getElementById('journey'); if(!j) return;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){ j.classList.add('go'); return; }
  j.classList.add('arm');
  new IntersectionObserver((es,o)=>es.forEach(e=>{ if(e.isIntersecting){ j.classList.add('go'); o.disconnect(); } }),{threshold:.35}).observe(j);
})();


// ---- intro card before every document ----
(function(){
  const DI={
   ideation:['ייזום: איפה הכול מתחיל','האם יש כאן רעיון שכדאי לבדוק?','את הרעיון בשפה פשוטה, מה כבר קיים היום ולמה זה לא מספיק, ומה יכול ללכת רע.','לבדוק אם יש בכלל מה לבנות. אם הרעיון חזק, עוברים לנסות אותו בפועל.'],
   poc:['POC: האם זה עובד באמת?','האם אפשר להפוך את הרעיון למשהו שרץ?','קוד שרץ ותרחישים שאפשר להפעיל, ולנסות לשבור.','להפוך "נשמע טוב" ל"עובד" או "נשבר". מה שנשבר כאן נחסך בהמשך, ומה שמחזיק הופך לבסיס לאפיון.'],
   spec:['אפיון: איך זה נראה כמוצר אמיתי?','מה בדיוק המוצר צריך לעשות?','מה המוצר עושה, פיצ\'ר אחרי פיצ\'ר, ולמי הוא עוזר.','להפוך הוכחה קטנה להבטחה ברורה. אחריו אפשר לשרטט איך לבנות.'],
   arch:['ארכיטקטורה: אפשר לבנות את זה עד הסוף?','האם המבנה מחזיק גם כשלוחצים עליו?','שרטוט של החלקים ואיך הם מדברים זה עם זה.','לבדוק שהמבנה מחזיק גם כשיש עומס ותקיפה. מי שעבר את כל המבחנים נבחר.']
  };
  const ORDER=['ideation','poc','spec','arch'];
  document.querySelectorAll('.doc-panel[data-doc]').forEach(p=>{
    const k=p.dataset.doc, d=DI[k]; if(!d||p.querySelector(':scope > .doc-intro')) return;
    const i=ORDER.indexOf(k), c=document.createElement('div'); c.className='doc-intro';
    const steps=ORDER.map((_,j)=>'<i class="'+(j<i?'done':j===i?'now':'')+'"></i>').join('');
    c.innerHTML='<div class="di-steps" aria-hidden="true">'+steps+'</div><p class="di-k"></p><h4 class="di-t"></h4><p class="di-q"></p><p class="di-r"><b>כאן תראו</b><span></span></p><p class="di-r"><b>התפקיד</b><span></span></p>';
    c.querySelector('.di-k').textContent='השלב: '+['ייזום','POC','אפיון','ארכיטקטורה'][i];
    c.querySelector('.di-t').textContent=d[0]; c.querySelector('.di-q').textContent=d[1];
    const sp=c.querySelectorAll('.di-r span'); sp[0].textContent=d[2]; sp[1].textContent=d[3];
    p.insertBefore(c,p.firstChild);
  });
})();
