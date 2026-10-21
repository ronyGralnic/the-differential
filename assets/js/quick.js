/* "One minute?" summary: a bar under the case hero that opens a floating window (HE/EN). Data-driven per case. */
(function(){
  const root=document.getElementById('quick'); if(!root) return;
  const D=window.QUICK&&window.QUICK[root.dataset.case]; if(!D) return;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  let modal=null,last=null,lang='he';
  const bar=H('div','qk-bar'); const txt=H('div','qk-txt');
  txt.append(H('strong','','יש לך רק דקה?'),H('span','',' סיכום קצר של כל התיק, כולל מי הזוכה. שימו לב: זה חושף את הסוף.'));
  const btn=H('button','qk-btn','לסיכום הקצר'); btn.type='button'; btn.addEventListener('click',()=>open());
  bar.append(txt,btn); root.append(bar);
  const esc=e=>{ if(e.key==='Escape'){ e.stopImmediatePropagation(); e.preventDefault(); close(); } };
  function close(){ if(!modal) return; modal.remove(); modal=null; removeEventListener('keydown',esc,true); if(last&&last.focus) last.focus(); }
  function fill(card){
    const d=D[lang]; card.textContent='';
    card.setAttribute('dir',lang==='he'?'rtl':'ltr'); card.setAttribute('lang',lang);
    const x=H('button','qk-x','✕'); x.type='button'; x.setAttribute('aria-label',lang==='he'?'סגירה':'Close'); x.addEventListener('click',close);
    const tabs=H('div','qk-tabs'); [['he','עברית'],['en','English']].forEach(([k,n])=>{ const t=H('button','qk-tab'+(k===lang?' on':''),n); t.type='button'; t.addEventListener('click',()=>{ lang=k; fill(card); }); tabs.append(t); });
    card.append(x,tabs,H('p','qk-kick',d.kicker),H('h3','qk-h',d.title));
    d.rows.forEach(r=>{ const row=H('div','qk-row'); row.append(H('b','',r[0]),H('p','',r[1])); card.append(row); });
    card.append(H('p','qk-lk0',d.linksLabel)); const ls=H('div','qk-links');
    d.links.forEach(l=>{ const a=H('a','qk-link'); a.href=l[1]; a.target='_blank'; a.rel='noopener'; a.append(H('b','',l[0]),H('span','',l[2])); ls.append(a); }); card.append(ls);
    card.append(H('p','qk-end',d.end));
  }
  function open(){
    if(window.gcEvent) gcEvent('quick-open');
    last=document.activeElement; if(modal) modal.remove();
    modal=H('div','qk-modal'); const back=H('div','qk-back'); back.addEventListener('click',close);
    const card=H('div','qk-card'); card.setAttribute('role','dialog'); card.setAttribute('aria-modal','true'); fill(card);
    modal.append(back,card); document.body.append(modal); addEventListener('keydown',esc,true); card.querySelector('.qk-x').focus();
  }
})();
