(function(){
  const root=document.getElementById('docs'); if(!root||!window.DOCS) return;
  const D=window.DOCS, H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* prep */
  const prep=H('div','ab-grid dc-prep'); D.prep.forEach(p=>{ const c=H('div','ab-card'); c.append(H('h3','',p[0]),H('p','',p[1])); prep.append(c); }); root.append(prep);
  /* path rail */
  root.append(H('h2','dc-h','המסלול במבט אחד'),H('p','dc-sub','כך נראה מסלול של תיק, מהסיפור ועד ההכרעה. לחצו על שלב כדי לקפוץ אליו.'));
  const rail=H('ol','dc-rail'); D.docs.forEach(d=>{ const li=H('li'); const a=H('a','dc-rl'); a.href='#d-'+d.id; a.append(H('b','',d.no),H('span','',d.name)); li.append(a); rail.append(li); }); root.append(rail);
  /* modal */
  let modal=null,last=null;
  const esc=e=>{ if(e.key==='Escape'){ e.stopImmediatePropagation(); close(); } };
  function close(){ if(!modal) return; modal.remove(); modal=null; removeEventListener('keydown',esc,true); if(last&&last.focus) last.focus(); }
  function open(d){ if(window.gcEvent) gcEvent('docs-structure-'+d.id); last=document.activeElement; modal=H('div','qk-modal'); const bk=H('div','qk-back'); bk.addEventListener('click',close);
    const c=H('div','qk-card'); c.setAttribute('role','dialog'); c.setAttribute('aria-modal','true'); c.setAttribute('aria-label',d.name);
    const x=H('button','qk-x','✕'); x.type='button'; x.setAttribute('aria-label','סגירה'); x.addEventListener('click',close);
    c.append(x,H('p','qk-kick','מבנה טיפוסי · '+d.name),H('h3','qk-h','מה יש בתוך המסמך'));
    const ol=H('ol','dc-toc'); d.toc.forEach(t=>ol.append(H('li','',t))); c.append(ol,H('p','qk-end','כך נראה המבנה בדרך כלל. בכל תיק הפירוט מותאם לרעיון.'));
    modal.append(bk,c); document.body.append(modal); addEventListener('keydown',esc,true); x.focus(); }
  /* docs */
  D.docs.forEach((d,i)=>{
    const s=H('section','dc-sec'); s.id='d-'+d.id;
    const head=H('div','dc-head'); head.append(H('span','dc-no',d.no),H('h2','',d.name)); s.append(head);
    const q=H('p','dc-q'); q.append(H('em','','השאלה שהמסמך עונה עליה'),document.createTextNode(d.q)); s.append(q,H('p','dc-what',d.what));
    const cols=H('div','dc-cols');
    const a=H('div','dc-box'); a.append(H('h4','','מה יש בו')); const ul=H('ul'); d.inside.forEach(t=>ul.append(H('li','',t))); a.append(ul);
    const b=H('div','dc-box'); b.append(H('h4','','איך לקרוא אותו'),H('p','',d.read),H('h4','dc-h4b','מה הוא בוחן'),H('p','',d.drops));
    cols.append(a,b); s.append(cols);
    const foot=H('div','dc-foot'); foot.append(H('span','dc-out','פלט: '+d.out));
    const tb=H('button','dc-btn','ראו מבנה טיפוסי'); tb.type='button'; tb.addEventListener('click',()=>open(d));
    const lk=H('a','dc-btn ghost',d.see[0]+' ←'); lk.href=d.see[1];
    foot.append(tb,lk); s.append(foot);
    if(i<D.docs.length-1) s.append(H('div','dc-arrow','↓ המסמך הבא נולד מהתשובה לשאלה הזאת'));
    root.append(s);
  });
  root.append(H('p','dc-later',D.later));
  if(!reduce&&'IntersectionObserver' in window){ const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); } }),{threshold:.08}); root.querySelectorAll('.dc-sec').forEach(s=>{ s.classList.add('rv'); io.observe(s); }); }
})();
