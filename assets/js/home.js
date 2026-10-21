/* Home hero: a looping mini-elimination. Each loop is a different "case": the drops per stage are random
   (a stage may drop many, or none), but the ending is always a single survivor. No project names (no spoilers). */
(function(){
  const box=document.getElementById('hm-viz'); if(!box) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const N=6;
  const stages=[
    ['לוח','מניחים את כל הרעיונות זה לצד זה. מי שלא עומד בהיגיון הבסיסי יוצא.'],
    ['ייזום','מסבירים למי הרעיון מיועד ולמה הוא נחוץ.'],
    ['אפיון','מפרטים איך בדיוק הוא עובד, ומה שהניסוח הסתיר נחשף.'],
    ['ארכיטקטורה','מציירים את כל החלקים, וחלק חסר מתגלה.'],
    ['הכרעה','בסוף נשאר רעיון אחד.']];
  const row=H('div','hm-row'); const chips=Array.from({length:N},(_,i)=>{ const c=H('div','hm-chip',String(i+1)); row.append(c); return c; });
  const bar=H('div','hm-bar'); const dots=stages.map(s=>{ const d=H('span','hm-st',s[0]); bar.append(d); return d; });
  const cap=H('p','hm-cap'); cap.setAttribute('aria-live','polite');
  const res=H('p','hm-res');
  const note=H('p','hm-note','בכל תיק התמונה שונה: יש שלב שמפיל כמה רעיונות, ויש שלב שלא מפיל אף אחד. רק הסוף קבוע, ותמיד נשאר אחד.');
  box.append(H('p','hm-title','כך נראה תיק'),row,bar,cap,res,note);
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  function plan(){ // random order of the 5 losers, randomly spread over the first four stages
    const order=[...Array(N).keys()].sort(()=>Math.random()-.5), win=order.pop();
    const per=[0,0,0,0]; for(let i=0;i<N-1;i++) per[Math.floor(Math.random()*4)]++;
    const out=[],at={}; let k=0; per.forEach((n,s)=>{ out[s]=order.slice(k,k+n); out[s].forEach(i=>at[i]=s); k+=n; }); out[4]=[];
    return {win,at,out};
  }
  function show(p,k){
    chips.forEach((c,i)=>{ c.classList.toggle('out',k>=0&&i in p.at&&p.at[i]<=k); c.classList.toggle('win',k===4&&i===p.win); });
    dots.forEach((d,i)=>d.classList.toggle('on',i===k));
    cap.textContent=k<0?'רעיונות נכנסים לתיק':stages[k][1];
    res.textContent=k<0||k===4?'':(p.out[k].length?'הפעם יש מי שנופל כאן.':'הפעם כולם עוברים הלאה.');
  }
  if(reduce){ show(plan(),4); return; }
  (async function loop(){ for(;;){ const p=plan(); show(p,-1); await sleep(1400); for(let k=0;k<5;k++){ show(p,k); await sleep(1900); } await sleep(2200); } })();
})();
