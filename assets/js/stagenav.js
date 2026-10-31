/* Stage pages: remember visited stages (per viewer), mark them in the stage bar and the lobby map. */
(function(){
  const b=document.body, slug=b.dataset.case, cur=+b.dataset.stage||0; if(!slug) return;
  const KEY='td-seen-'+slug;
  let seen=[]; try{ seen=JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(e){ seen=[]; }
  if(cur>0 && !seen.includes(cur)){ seen.push(cur); try{ localStorage.setItem(KEY,JSON.stringify(seen)); localStorage.setItem(KEY+'-last',String(cur)); }catch(e){} }
  else if(cur>0){ try{ localStorage.setItem(KEY+'-last',String(cur)); }catch(e){} }
  document.querySelectorAll('.stagebar .sb-st').forEach(li=>{ if(seen.includes(+li.dataset.k)) li.classList.add('seen'); });
  document.querySelectorAll('.lb-map .lb-st').forEach(li=>{ if(seen.includes(+li.dataset.k)) li.classList.add('seen'); });
  const cr=document.querySelector('.stagebar .sb-st.cur'); if(cr){ const ol=cr.parentElement; ol.scrollLeft=cr.offsetLeft-ol.clientWidth/2+cr.clientWidth/2; }
  const res=document.querySelector('.lb-resume'); let last=0; try{ last=+localStorage.getItem(KEY+'-last')||0; }catch(e){}
  if(res && last>0){ const a=document.querySelectorAll('.lb-map .lb-st a')[last-1]; if(a){ res.href=a.getAttribute('href'); res.textContent='להמשיך מאיפה שעצרתי · שלב '+String(last).padStart(2,'0')+' ←'; res.hidden=false; } }
  const lb=document.querySelector('.lb-map'); if(lb && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){ lb.classList.add('arm'); new IntersectionObserver((es,o)=>es.forEach(e=>{ if(e.isIntersecting){ lb.classList.add('go'); o.disconnect(); } }),{threshold:.15}).observe(lb); }
})();
