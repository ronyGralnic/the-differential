/* Private Exposure Registry: ideation and POC, upgraded with the same principles as Fire-Sale.
   Ideation: from the field, Emma opens, a two-layer mechanism with a "what each one sees" panel and a second ending,
   persona profiles, a guess on the map, a pre-mortem, rich downloads.
   POC: four named labs with live secret sharing in the browser (BigInt over the same prime as the Python),
   recorded aggregate results (window.LAB_RG), a machine, a fence, a split screen, an ethics choice, envelopes, annotated code. */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const H=(t,c,x)=>{ const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,20):ms));
  const tm=(id,w)=>`<button class="tm" data-t="${id}">${w}</button>`;
  const L=x=>'⁦'+x+'⁩';
  /* live additive secret sharing over the Python prime (2^61 - 1) */
  const P=(1n<<61n)-1n;
  const rnd=()=>{ const a=new Uint32Array(2); crypto.getRandomValues(a); return ((BigInt(a[0])<<32n)|BigInt(a[1]))%P; };
  const share=v=>{ const x=rnd(), y=rnd(); return [x,y,(((BigInt(v)-x-y)%P)+P)%P]; };
  const rec=sh=>{ const v=sh.reduce((a,b)=>a+b,0n)%P; return v<P/2n?v:v-P; };
  const fmt=v=>BigInt(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  const EMMA='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#e4efec"/><circle cx="30" cy="28" r="12" fill="#e9c6a8"/><path d="M16 27 q1 -16 14 -16 q14 0 14 16 q-2 -8 -9 -9 q-6 4 -19 9z" fill="#4a2f22"/><path d="M16 27 q-2 12 2 18 M44 27 q2 12 -2 18" stroke="#4a2f22" stroke-width="4" fill="none"/><circle cx="26" cy="28" r="1.6" fill="#1e2422"/><circle cx="34" cy="28" r="1.6" fill="#1e2422"/><path d="M26 34 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.6" fill="none"/><path d="M12 58 q4 -14 18 -14 q14 0 18 14z" fill="#2f5d8a"/></svg>';
  const face=(hair,skin,shirt,acc)=>`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#f3ecd8"/><circle cx="30" cy="27" r="12" fill="${skin}"/><path d="M17 25 q1 -15 13 -15 q13 0 13 15 q-4 -6 -13 -6 q-9 0 -13 6z" fill="${hair}"/><circle cx="26" cy="27" r="1.5" fill="#1e2422"/><circle cx="34" cy="27" r="1.5" fill="#1e2422"/><path d="M26 33 q4 2.5 8 0" stroke="#1e2422" stroke-width="1.5" fill="none"/><path d="M12 58 q4 -16 18 -16 q14 0 18 16z" fill="${shirt}"/>${acc||''}</svg>`;

  /* ======================= IDEATION ======================= */
  (function(){
    const root=document.querySelector('.ix[data-ix="registry"]'); if(!root) return;
    const secBy=k=>[...root.querySelectorAll('.ix-sec')].find(s=>{ const p=s.querySelector('.ix-kicker'); return p&&p.textContent.startsWith(k); });
    const T=(x,y,s,c,a)=>`<text x="${x}" y="${y}" class="${c||'fx-t'}" text-anchor="${a||'middle'}">${s}</text>`;

    /* 1 · from the field + Emma opens */
    const hero=root.querySelector('.ix-hero');
    const field=H('section','fx-field'); field.append(H('p','ix-kicker','מהשטח'));
    const clip=H('div','fx-clips');
    const banks=[['בנק 1',268],['בנק 2',206],['בנק 3',144],['בנק 4',82]];
    clip.innerHTML=`<figure class="fx-clip"><svg viewBox="0 0 320 180" role="img" aria-label="Archegos, מרץ 2021: כמה בנקים נתנו מינוף לאותה קרן על אותן מניות, וכל אחד ראה רק את החלק שלו">
       ${T(160,18,'Archegos, מרץ 2021','fx-th')}
       <rect x="110" y="128" width="100" height="32" rx="4" class="fx-dot"/>${T(160,149,'Archegos','fx-t hot')}
       ${banks.map(([b,x])=>`<rect x="${x-26}" y="34" width="52" height="28" rx="3" class="rg-bank"/>${T(x,53,b,'fx-t')}<path d="M${x} 62 L${160+(x-175)*.25} 126" class="fx-line"/>`).join('')}${T(160,100,'כל בנק רואה רק את החלק שלו','fx-t dim')}
       </svg><figcaption>הגזיר: קרן משפחתית אחת קיבלה מינוף מכמה בנקים גדולים על אותן מניות. כל בנק ראה רק את החלק שלו. כשהיא קרסה, ההפסדים של הבנקים הגיעו ליותר מ-10 מיליארד דולר.</figcaption></figure>
     <figure class="fx-clip"><svg viewBox="0 0 320 180" role="img" aria-label="שוק האשראי הפרטי: כ-1.7 טריליון דולר, רובו מחוץ לבנקים ולבורסה">
       ${T(160,18,'שוק האשראי הפרטי','fx-th')}
       ${T(160,92,L('$1.7T'),'fx-big')}${T(160,122,'גודל השוק, הערכה ל-2024 (בקירוב)','fx-t')}
       ${T(160,156,'הלוואות של קרנות ישירות לחברות, בלי בנק ובלי בורסה','fx-t dim')}</svg><figcaption>הגזיר השני: שוק שגדל מהר, ושבו כל קרן יודעת רק מה היא עצמה הלוותה.</figcaption></figure>`;
    field.append(clip);
    const em=H('div','fx-sarah'); em.innerHTML='<span class="fx-av" aria-hidden="true">'+EMMA+'</span>';
    const st=H('div'); st.append(H('span','fx-k','אמה פותחת (דמות בדויה)'),H('p','','קוראים לי אמה, ואני אנליסטית ברשות פיקוח פיננסי. במרץ 2021 קרן אחת קרסה, וכמה מהבנקים הגדולים בעולם גילו באותו שבוע שכולם הימרו עליה, על אותן מניות. כל בנק ראה רק את עצמו. היום אני מסתכלת על שוק האשראי הפרטי ושואלת: כמה מקרים כאלה מסתתרים שם, ולמה אני לא יכולה לראות אותם?'));
    em.append(st); field.append(em);
    if(hero) root.insertBefore(field,hero); else root.prepend(field);

    /* 2 · mechanism: split, servers, answer; second ending: a small cell */
    const oldM=secBy('איך זה עובד');
    if(oldM){
      const s=H('section','ix-sec fx-mech'); s.append(H('p','ix-kicker','איך זה עובד'));
      const box=H('div','fx-mbox');
      const MOB=innerWidth<700;
      const N=MOB?{F:[290,50,'קרן: 100'],X:[290,160,'פיצול לשלושה'],A:[70,280,'שרת א · לונדון'],B:[180,280,'שרת ב · פריז'],C:[290,280,'שרת ג · וושינגטון'],O:[70,410,'התשובה של כל השוק']}
                 :{F:[620,145,'קרן: 100'],X:[480,145,'פיצול לשלושה'],A:[320,50,'שרת א · לונדון'],B:[320,145,'שרת ב · פריז'],C:[320,240,'שרת ג · וושינגטון'],O:[120,145,'התשובה של כל השוק']};
      const E=[['F','X'],['X','A'],['X','B'],['X','C'],['A','O'],['B','O'],['C','O']];
      const ICO={F:'<path d="M-18 -4 L0 -18 L18 -4 Z" class="fx-ic"/><rect x="-15" y="-4" width="30" height="20" class="fx-ic"/><circle cx="0" cy="6" r="4" class="fx-ic-f"/>',
                 X:'<path d="M0 -16 v10 M0 -6 L-12 12 M0 -6 L0 14 M0 -6 L12 12" class="fx-ic hot"/>',
                 A:'<rect x="-12" y="-15" width="24" height="30" rx="3" class="fx-ic"/><path d="M-7 -7 h14 M-7 0 h14 M-7 7 h14" class="fx-ic"/>',
                 O:'<path d="M-15 12 h30 M-10 12 v-8 M-2 12 v-16 M6 12 v-11" class="fx-ic ok"/>'};
      ICO.B=ICO.A; ICO.C=ICO.A;
      let svg=`<svg viewBox="${MOB?'0 0 360 470':'0 0 700 290'}" class="fx-msvg${MOB?' mob':''}" role="img" aria-label="פיצול סודות, שלב אחר שלב"><defs><marker id="rga" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="fx-mk"/></marker></defs>`;
      E.forEach(([a,b],i)=>{ const [x1,y1]=N[a],[x2,y2]=N[b]; const dx=x2-x1,dy=y2-y1,Lh=Math.hypot(dx,dy),ux=dx/Lh,uy=dy/Lh; svg+=`<path d="M${x1+ux*36} ${y1+uy*30} L ${x2-ux*40} ${y2-uy*32}" class="fx-e" data-e="${i}" marker-end="url(#rga)"/>`;
        if(i>=1&&i<=3){ const mx=(x1+x2)/2, my=(y1+y2)/2; svg+=`<text x="${mx}" y="${my-8}" class="fx-nl rg-shv" data-s="${i-1}" text-anchor="middle"></text>`; } });
      Object.entries(N).forEach(([k,[x,y,l]])=>{ svg+=`<g class="fx-n" data-n="${k}" transform="translate(${x} ${y})"><circle r="30" class="fx-nb"/>${ICO[k]}<text y="50" text-anchor="middle" class="fx-nl">${l}</text></g>`; });
      svg+='</svg>'; box.innerHTML=svg;
      const see=H('div','rg-see'); see.append(H('span','fx-k','מה כל אחד רואה עכשיו')); const seeL=H('ul'); see.append(seeL); box.append(see);
      const bar=H('div','fx-mbar'); const n=H('span','fx-mstep','1'); const cap=H('div','fx-mcap'); cap.setAttribute('aria-live','polite'); const c1=H('p','fx-c1'), c2=H('p','fx-c2'); cap.append(c1,c2);
      const ctr=H('div','fx-mctl'); const pv=H('button','fx-b','‹'), nx=H('button','fx-b go','הצעד הבא ›'); pv.type=nx.type='button'; pv.setAttribute('aria-label','צעד קודם'); ctr.append(pv,nx);
      const alt=H('button','fx-alt','ומה אם בענף יש רק שתי קרנות?'); alt.type='button'; alt.hidden=true;
      bar.append(n,cap,ctr); box.append(bar,alt); s.append(box);
      s.append(H('p','fx-note','הצבע הזהוב מסמן מה פעיל עכשיו. החלקים שעל הקווים נוצרים עכשיו בדפדפן שלכם, אקראיים באמת. המספר 16.8% לקוח מהרצת ה-POC על 500 קרנות מדומות.'));
      oldM.replaceWith(s);
      let sh=[0,0,0];
      const roll=()=>{ const a=Math.floor(Math.random()*19999)-9999, b=Math.floor(Math.random()*19999)-9999; sh=[a,b,100-a-b]; s.querySelectorAll('.rg-shv').forEach((t,i)=>t.textContent=L(sh[i].toLocaleString('en-US'))); };
      const ST=[
       {on:['F'],e:[],a:'כל קרן מכינה את המספר שלה. למשל: 100 מיליון דולר בהלוואות לחברות תוכנה.',b:'אמה: "את המספר הזה אני אף פעם לא אראה. וזה בסדר."',see:[['הקרן','100'],['שרת א','כלום'],['שרת ב','כלום'],['שרת ג','כלום'],['אמה','כלום']]},
       {on:['F','X'],e:[0],a:'המספר מתפרק לשלושה מספרים אקראיים שסכומם 100.',b:'אמה: "כמו לקרוע שטר לשלושה. חתיכה אחת לבדה לא שווה כלום."',see:[['הקרן','100, ושלושת החלקים'],['שרת א','כלום'],['שרת ב','כלום'],['שרת ג','כלום'],['אמה','כלום']],roll:true},
       {on:['X','A','B','C'],e:[1,2,3],a:'כל חלק נשלח לשרת אחר, אצל רשות אחרת: לונדון, פריז, וושינגטון.',b:'אמה: "אף רשות לא מחזיקה יותר מחתיכה אחת."',see:'shares'},
       {on:['A','B','C'],e:[],a:'כל שרת מחבר את החלקים שקיבל מכל 500 הקרנות. הסכום שלו עדיין נראה כמו רעש.',b:'אמה: "שלושה רואי חשבון, כל אחד סופר רק את החתיכות שהגיעו אליו."',see:[['הקרן','רק את עצמה'],['שרת א','סכום של רעש'],['שרת ב','סכום של רעש'],['שרת ג','סכום של רעש'],['אמה','כלום']]},
       {on:['A','B','C','O'],e:[4,5,6],a:'רק כששלושת הסכומים מתחברים, הרעש מתבטל ונשאר מספר אחד: החשיפה של כל השוק.',b:'אמה: "16.8% מהחשיפה בשוק נמצאת בריבית מעל 5%. ואין לי מושג מה מחזיקה אף קרן."',see:[['הקרן','רק את עצמה'],['שרת א','רעש'],['שרת ב','רעש'],['שרת ג','רעש'],['אמה','התמונה של כל השוק, ואף קרן']],ok:true}];
      const ALT=[
       {on:['O'],e:[],a:'בענף הספנות יש רק שתי קרנות: קרן א הלוותה 40, קרן ב הלוותה 65. הסכום יוצא 105.',b:'אמה: "נשמע תמים. סכום של שתי קרנות."',see:[['קרן א','40, והסכום 105'],['קרן ב','65, והסכום 105'],['אמה','105']],hot:true},
       {on:['O'],e:[],a:'אבל קרן א יודעת כמה היא עצמה הלוותה. 105 פחות 40 שווה 65: היא גילתה את הסוד של המתחרה.',b:'אמה: "התשובה המצרפית עצמה הסגירה קרן."',see:[['קרן א','40, וגם את 65 של קרן ב'],['אמה','105']],hot:true},
       {on:['O'],e:[],a:'לכן יש סף: תא עם פחות מחמש קרנות לא נפתח בכלל, ועל התשובות שכן נפתחות מוסיפים רעש קטן ומבוקר.',b:'אמה: "בענף הספנות אני רואה עכשיו: חסום. וזה בדיוק מה שצריך לראות."',see:[['קרן א','רק את עצמה'],['קרן ב','רק את עצמה'],['אמה','"חסום: פחות מ-5 קרנות"']],ok:true}];
      let cur=0, seq=ST;
      const nodes=s.querySelectorAll('.fx-n'), edges=s.querySelectorAll('.fx-e'), shv=s.querySelectorAll('.rg-shv');
      function go(i){ cur=i; const x=seq[i];
        nodes.forEach(g=>g.classList.toggle('on',x.on.includes(g.dataset.n))); edges.forEach(e=>e.classList.toggle('on',x.e.includes(+e.dataset.e)));
        if(x.roll) roll(); shv.forEach(t=>t.classList.toggle('on',seq===ST&&i>=1&&i<=2));
        const rows=x.see==='shares'?[['הקרן','100'],['שרת א',sh[0]],['שרת ב',sh[1]],['שרת ג',sh[2]],['אמה','כלום']]:x.see;
        seeL.textContent=''; rows.forEach(([w,v])=>{ const li=H('li'); li.append(H('b','',w+': ')); if(typeof v==='number'){ const bd=document.createElement('bdi'); bd.dir='ltr'; bd.textContent=v.toLocaleString('en-US'); li.append(bd,document.createTextNode(' (נראה כמו רעש)')); } else li.append(document.createTextNode(v)); seeL.append(li); });
        see.classList.toggle('hot',!!x.hot); see.classList.toggle('ok',!!x.ok);
        n.textContent=(seq===ALT?'ב':'')+(i+1); c1.textContent=x.a; c2.textContent=x.b;
        pv.disabled=(i===0&&seq===ST); nx.disabled=(i===seq.length-1); nx.textContent=i===seq.length-1?'סוף':'הצעד הבא ›';
        alt.hidden=!(seq===ST&&i===ST.length-1); if(seq===ALT&&i===ALT.length-1){ alt.hidden=false; alt.textContent='לחזור לתשובה של כל השוק'; } }
      nx.addEventListener('click',()=>{ if(cur<seq.length-1) go(cur+1); });
      pv.addEventListener('click',()=>{ if(cur>0) go(cur-1); else if(seq===ALT){ seq=ST; go(ST.length-1); } });
      alt.addEventListener('click',()=>{ if(seq===ST){ seq=ALT; go(0); } else { seq=ST; alt.textContent='ומה אם בענף יש רק שתי קרנות?'; go(ST.length-1); } });
      roll(); go(0);
    }

    /* 3 · who needs it */
    const oldA=secBy('מי צריך את זה');
    if(oldA){
      const s=H('section','ix-sec fx-aud'); s.append(H('p','ix-kicker','מי צריך את זה'),H('p','fx-sub','שלוש דמויות בדויות, ושלושה בקרים: בלי הכלי ועם הכלי.'));
      const PP=[
       ['אמה ריד, 38','אנליסטית ברשות פיקוח פיננסי',face('#4a2f22','#e9c6a8','#2f5d8a'),'"אני רואה כל קרן בנפרד. אני לא רואה שכולן עשו את אותו ההימור."','מקבלת דוחות מכל קרן לחוד, ומנסה לנחש מהם אם יש ריכוז מסוכן בענף אחד. אין לה דרך לחבר את הנתונים שלה לנתונים של רשויות אחרות.','רואה דוח רבעוני אחד: כמה מכל החשיפה בשוק, בשלוש המדינות יחד, נמצאת בריבית מעל 5%, ובאילו ענפים. אף קרן לא נחשפה, גם לא בפניה.'],
       ['ז\'וליאן מורו, 45','מפקח ברשות הפיקוח הצרפתית',face('#2b2b2b','#e2b896','#7a3b8f','<rect x="21" y="24" width="8" height="6" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/><rect x="31" y="24" width="8" height="6" rx="2" fill="none" stroke="#1e2422" stroke-width="1.2"/>'),'"אני חושד שהקרנות שלי והקרנות הבריטיות חשופות לאותן חברות. אסור לי לבדוק."','שולח בקשה לשיתוף מידע עם הרשות הבריטית. התשובה מגיעה אחרי חצי שנה, ובנתונים מצרפיים מדי כדי לענות על השאלה.','השרת שלו הוא אחד משלושה. החישוב המשותף רץ בכל רבעון, ואף נתון לא חוצה גבול.'],
       ['רות אלון, 50','מנהלת איגוד של קרנות אשראי',face('#6b4a2b','#d8a985','#b1502e'),'"החברות שלנו רוצות לדעת אם הן חשופות יותר מהממוצע. אף אחת לא תחשוף את עצמה."','שולחת סקר אנונימי. חצי מהחברות לא עונות, והחצי השני עונה בטווחים כלליים.','כל חברה רואה את עצמה מול הממוצע בענף, בלי שהאיגוד או המתחרות רואים את המספרים שלה.']];
      const g=H('div','fx-pg');
      PP.forEach(([nm,role,av,q,bf,af],i)=>{ const c=H('article','fx-p'); c.style.setProperty('--i',i);
        const hd=H('div','fx-ph'); const a=H('span','fx-pav'); a.innerHTML=av; const t=H('div'); t.append(H('strong','',nm),H('span','fx-role',role)); hd.append(a,t); c.append(hd,H('blockquote','fx-q',q));
        const ba=H('div','fx-ba'); const b=H('div','fx-bf'); b.append(H('span','fx-k','הבוקר בלי הכלי'),H('p','',bf)); const f=H('div','fx-af'); f.append(H('span','fx-k','הבוקר עם הכלי'),H('p','',af)); ba.append(b,f); c.append(ba); g.append(c); });
      s.append(g);
      const fin=H('div','fx-final'); fin.innerHTML='<span class="fx-k">ובסוף, מי מרוויח באמת</span><p><b>שרה,</b> המורה ממנצ\'סטר. החיסכון שלה יושב בקרן פנסיה, וכשמישהו רואה ריכוז מסוכן לפני שהוא מתפוצץ, יש פחות סיכוי שהקרן שלה תגלה אותו מאוחר מדי.</p>'; s.append(fin);
      oldA.replaceWith(s);
    }

    /* 4 · map: guess first */
    const mapS=secBy('איפה אנחנו על המפה');
    if(mapS){ const svg=mapS.querySelector('svg.ixmap'), ours=svg&&svg.querySelector('.ixdot.ours'), wrap=mapS.querySelector('.ix-mapw');
      if(svg&&ours&&wrap){ ours.classList.add('fx-hide');
        const tip=H('div','fx-guess'); tip.innerHTML='<b>רגע לפני:</b> איפה לדעתכם ייפול הכלי שלנו? לחצו על המקום במפה. <button type="button" class="fx-skip">לדלג</button>'; wrap.append(tip);
        const ring=svg.querySelector('.ixdot.ours circle.pt'); const tx=+ring.getAttribute('cx'), ty=+ring.getAttribute('cy'); const NS='http://www.w3.org/2000/svg';
        const corner=document.createElementNS(NS,'g'); corner.setAttribute('class','fx-corner'); corner.innerHTML=`<rect x="${tx-70}" y="${ty-26}" width="104" height="70" rx="10"/><text x="${tx-18}" y="${ty+60}" text-anchor="middle">כאן אין אף אחד. למה?</text>`; svg.insertBefore(corner,svg.firstChild.nextSibling);
        let done=false;
        function reveal(gx,gy){ if(done) return; done=true; tip.remove();
          if(gx!=null){ const gh=document.createElementNS(NS,'circle'); gh.setAttribute('cx',gx); gh.setAttribute('cy',gy); gh.setAttribute('r',9); gh.setAttribute('class','fx-ghost'); svg.append(gh);
            const lab=document.createElementNS(NS,'text'); lab.setAttribute('x',gx); lab.setAttribute('y',gy-14); lab.setAttribute('text-anchor','middle'); lab.setAttribute('class','fx-ghost-t'); lab.textContent='הניחוש שלכם'; svg.append(lab); }
          ours.classList.remove('fx-hide'); if(gx!=null&&!reduce){ ours.style.transform=`translate(${gx-tx}px,${gy-ty}px)`; ours.getBoundingClientRect(); ours.style.transition='transform 1s cubic-bezier(.3,1.3,.5,1)'; ours.style.transform=''; }
          setTimeout(()=>corner.classList.add('on'),reduce?0:900); }
        svg.addEventListener('click',e=>{ if(done) return; const pt=svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY; const p=pt.matrixTransform(svg.getScreenCTM().inverse()); reveal(p.x,p.y); e.stopPropagation(); },true);
        tip.querySelector('.fx-skip').addEventListener('click',e=>{ e.stopPropagation(); reveal(null,null); });
      } }

    /* 5 · pre-mortem */
    const oldC=secBy('אתגרים');
    if(oldC){
      const s=H('section','ix-sec fx-pm'); s.append(H('p','ix-kicker','אתגרים: תחקיר מקדים'));
      s.append(H('h5','fx-pmh','שנה מהיום. הפרויקט נכשל. מה קרה?'));
      s.append(H('p','fx-sub','תחקיר מקדים (pre-mortem) הוא טכניקה אמיתית: מדמיינים שהפרויקט כבר נכשל, וכותבים את הכותרות של הכישלון, לפני שהוא קורה. ככה רואים את הסכנות כשעוד אפשר להתגונן מפניהן.'));
      const PM=[
       ['שלוש רשויות הקימו מרשם. אף קרן לא הצטרפה.','גבוהה','זה לא אתגר טכני אלא מבני: למה שמישהו ישתתף? התשובה שלנו: המשתתפים הם רגולטורים שכבר אוספים את הנתונים בחובה. המערכת לא מבקשת מידע חדש, רק מאפשרת לחבר מידע שכבר נאסף.','דוגמה: הקרנות כבר מגישות דוחות לרשות שלהן. המרשם רק מחבר את הדוחות של שלוש רשויות, בלי שאף אחת תעביר אותם לאחרת.'],
       ['קרן גילתה את הנתונים של המתחרה שלה, מתוך דוח רשמי.','גבוהה','גם תשובה מצרפית יכולה לחשוף משתתף כשהקבוצה קטנה. לכן יש סף: תא עם פחות מחמש קרנות לא נפתח, ועל מה שנפתח מוסיפים רעש קטן ומבוקר.','דוגמה: בענף עם שתי קרנות, כל אחת יכולה להחסיר את עצמה מהסכום ולגלות את השנייה. עם הסף, התא פשוט חסום.'],
       ['שתי רשויות חיברו בסתר את החלקים שלהן.','בינונית','הסודיות נשענת על כך שהשרתים לא יחברו את החלקים שלהם בסתר. לכן כל שרת נמצא אצל רשות אחרת, במדינה אחרת, וכל שלושתן צריכות לשתף פעולה כדי להציץ.','דוגמה: ב-POC, שני שרתים מתוך שלושה שחיברו את החלקים קיבלו מספר אקראי ענק. רק שלושתם יחד יכולים לפתוח.']];
      const list=H('div','fx-pml');
      PM.forEach(([h,sev,ans,ex],i)=>{ const c=H('article','fx-pmc'); c.style.setProperty('--i',i);
        const np=H('div','fx-paper'); np.append(H('span','fx-date','חדשות · שנה מהיום'),H('h6','fx-hl',h),H('span','fx-sev '+(sev==='גבוהה'?'hi':'mid'),'חומרה: '+sev)); c.append(np);
        const b=H('button','fx-how','איך מונעים את זה? ←'); b.type='button'; const a=H('div','fx-ans'); a.hidden=true; a.append(H('span','fx-k','התשובה שלנו'),H('p','',ans),H('p','fx-ex',ex));
        b.addEventListener('click',()=>{ c.classList.add('solved'); a.hidden=false; b.remove(); }); c.append(b,a); list.append(c); });
      s.append(list); oldC.replaceWith(s);
    }

    /* 6 · downloads */
    const oldD=secBy('הורדה');
    if(oldD&&window.fxDownloads){ const s=H('section','ix-sec'); s.append(H('p','ix-kicker','הורדה')); s.append(window.fxDownloads('registry','ideation','מסמך הייזום','The ideation document','הרעיון, איך הוא עובד, למי הוא מיועד ומה יכול להשתבש.','The idea, how it works, who needs it and what could go wrong.')); oldD.replaceWith(s); }
    if(window.TermWin) window.TermWin.wire(root);
  })();

  /* ======================= POC LAB ======================= */
  (function(){
    const root=document.querySelector('.pl[data-pl="registry"]'); const D=window.LAB_RG; if(!root||!D) return;
    const secBy=k=>[...root.querySelectorAll('.pl-sec')].find(s=>{ const h=s.querySelector('.pl-h'); return h&&h.textContent.startsWith(k); });

    /* 1 · intro */
    const hero=root.querySelector('.pl-hero'); const intro=H('div','lb-intro');
    intro.innerHTML=`<div class="lb-what"><span class="lb-k">מה זה POC?</span><p>הוכחת היתכנות היא הגרסה הכי קטנה של הרעיון שעדיין בודקת את הדבר החשוב. כמו לבנות דגם של גשר מקרשים לפני שיוצקים בטון: לא בודקים איך הגשר ייראה, רק אם הוא מחזיק.</p></div>
     <div class="lb-what"><span class="lb-k">מה בודקים כאן?</span><p>שאלה אחת: האם אפשר לחבר את ה${tm('exposure','חשיפות')} של 500 קרנות לתמונה אחת ומדויקת, בלי ששרת כלשהו יראה נתון של קרן בודדת, ובזמן סביר.</p></div>
     <div class="lb-sarah"><span class="lb-av" aria-hidden="true">${EMMA}</span><div><span class="lb-k">אמה מסבירה מה זה פיצול סודות</span><p>"קרן חשופה ב-100. לשרת א היא שולחת מספר אקראי, לשרת ב עוד מספר אקראי, ולשרת ג את מה שמשלים ל-100. כל שרת רואה מספר שאין לו שום קשר ל-100. רק החיבור של שלושתם מחזיר אותו."</p>
     <div class="rg-split" aria-hidden="true"></div><button type="button" class="rg-b2">לפצל שוב</button></div></div>`;
    if(hero) hero.replaceWith(intro); else root.prepend(intro);
    const spl=intro.querySelector('.rg-split'); const doSplit=()=>{ const a=Math.floor(Math.random()*1999)-999, b=Math.floor(Math.random()*1999)-999; const c=100-a-b; spl.innerHTML=[['א',a],['ב',b],['ג',c]].map(([k,v])=>`<span><small>שרת ${k}</small><b>${L(v)}</b></span>`).join('<i>+</i>')+'<i>=</i><span class="t"><small>ביחד</small><b>100</b></span>'; };
    intro.querySelector('.rg-b2').addEventListener('click',doSplit); doSplit();

    /* 2 · four labs */
    const LABS=[
     {id:'honest',n:'מעבדה 1',t:'הסכום שאף אחד לא ראה',hyp:'אפשר לחבר מספרים של 500 קרנות, כשכל שרת רואה רק רעש, ולקבל את הסכום המדויק.',var:'500 קרנות מדומות, 33 תאים לכל אחת (4 מדרגות ריבית כפול 7 ענפים, ועוד 5 מדרגות מנוף). בלי רעש פרטיות.',
      who:['אמה, 38, אנליסטית ברשות הפיקוח (בדויה)','יום אחרון של הרבעון. אמה מחכה למספר אחד: כמה מהחשיפה בשוק נמצאת בריבית מעל 5%. היא לא תראה אף קרן, ואף שרת לא יראה אף קרן.'],proves:[0]},
     {id:'peek',n:'מעבדה 2',t:'השרת הסקרן',hyp:'שרת אחד שמסתכל על החלק שקיבל לא יכול לנחש אם הערך היה 0 או מיליון.',var:'מגרילים 20,000 פעמים חלק של 0, ו-20,000 פעמים חלק של מיליון, ומשווים את שתי ההתפלגויות.',
      who:['דוד, 29, מהנדס שמתחזק את שרת א (בדוי)','דוד סקרן. בלילה הוא פותח את הקובץ של השרת שלו ומסתכל על החלק של קרן מסוימת. הוא רואה מספר ענק, ולא יודע עליו כלום.'],proves:[1],
      sci:'למה זה עובד? החלק שהשרת מקבל הוא מספר אקראי לגמרי בטווח עצום, בלי קשר לערך. כמו כספת עם צירוף אקראי: הצירוף לבדו לא מספר לכם מה יש בפנים. אם ההתפלגות של חלק של 0 זהה להתפלגות של חלק של מיליון, השרת פשוט לא יכול להבחין ביניהם.'},
     {id:'collude',n:'מעבדה 3',t:'שניים מתוך שלושה',hyp:'גם שני שרתים שמחברים את החלקים שלהם בסתר לא לומדים כלום. רק שלושתם יחד פותחים.',var:'קרן אחת מדווחת 777. שרתים א ו-ב מחברים את החלקים שלהם, ואחר כך מצטרף שרת ג.',
      who:['שתי רשויות, בלילה אחד (בדוי)','שתי רשויות מחליטות לעקוף את הכללים ולהציץ יחד. מה שהן מקבלות הוא מספר בן 18 ספרות, בלי שום משמעות.'],proves:[2,3]},
     {id:'small',n:'מעבדה 4',t:'התא הקטן',hyp:'תשובה מצרפית יכולה להסגיר קרן כשהקבוצה קטנה. סף של חמש ורעש קטן מגינים בלי להרוס את התשובה.',var:'ענף הספנות, נדיר בכוונה. שלוש רמות של רעש פרטיות: חזק, בינוני, וחלש.',
      who:['קרן א וקרן ב, היחידות בענף הספנות (בדויות)','קרן א הלוותה 40. היא רואה בדוח שהסכום בענף הוא 105, ומחסירה: עכשיו היא יודעת שהמתחרה שלה הלוותה 65.'],proves:[4,5]}];
    const CL=[['בלי רעש, הסכום זהה בדיוק לאמיתי','אם החיבור לא מדויק, אין טעם להמשיך.',0],['שרת אחד לא מבחין בין 0 למיליון','זו הסודיות כולה: מה שהשרת רואה הוא רעש.',1],['שני שרתים מתוך שלושה לא משחזרים ערך','צריך לבגוד שלוש רשויות, לא אחת ולא שתיים.',2],['שלושת השרתים יחד משחזרים בדיוק','ההוכחה שהחלקים באמת מכילים את הערך.',2],['תא עם פחות מ-5 קרנות נחסם','התשובה עצמה לא מסגירה אף אחד.',3],['עם רעש חזק, התשובה המרכזית נשארת שימושית','פרטיות שהורסת את התשובה לא שווה כלום.',3]];
    const labS=secBy('הרצה חיה'); const sec=H('section','pl-sec lb-sec'); sec.append(H('h5','pl-h','ארבע מעבדות'),H('p','lb-sub','כל מעבדה היא עמוד במחברת: השערה, מה משנים, מי עומד מאחורי הניסוי, ואז מרימים את מכסה הבטיחות ומפעילים. החלקים האקראיים נוצרים עכשיו בדפדפן שלכם, באותו מספר ראשוני שבקוד הפייתון. הסכומים המצרפיים מגיעים מהרצת הקוד עצמו.'));
    const tabs=H('div','lb-tabs'); tabs.setAttribute('role','tablist'); sec.append(tabs); const page=H('div','lb-page'); sec.append(page);
    const journal=H('div','lb-journal'); journal.append(H('p','lb-jh','יומן מעבדה'),H('ol','lb-jl')); journal.querySelector('ol').append(H('li','lb-jempty','עוד לא הורצו ניסויים.'));
    const claims=H('div','lb-claims'); claims.append(H('p','lb-jh','לוח ההשערות')); const proved=new Set();
    const cEls=CL.map(([t,why,lab])=>{ const r=H('div','lb-claim'); r.append(H('span','lb-cst','ממתין'),H('b','',t),H('span','lb-cwhy',why)); const a=H('button','lb-cgo','נבדק במעבדה '+(lab+1)+' ←'); a.type='button'; a.addEventListener('click',()=>open(lab)); r.append(a); claims.append(r); return r; });
    const prove=i=>{ if(proved.has(i)) return; proved.add(i); cEls[i].classList.add('ok'); cEls[i].querySelector('.lb-cst').textContent='הוכח ✓'; };
    sec.append(claims,journal); if(labS) labS.replaceWith(sec); else root.append(sec);
    LABS.forEach((lb,i)=>{ const b=H('button','lb-tab'); b.type='button'; b.setAttribute('role','tab'); b.append(H('small','',lb.n),H('strong','',lb.t)); b.addEventListener('click',()=>open(i)); tabs.append(b); });
    function open(i,quiet){ [...tabs.children].forEach((b,j)=>{ b.classList.toggle('on',j===i); b.setAttribute('aria-selected',j===i); }); build(LABS[i]); if(!quiet) page.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'}); }
    function build(lb){
      page.innerHTML=''; page.dataset.lab=lb.id; const nb=H('div','lb-nb'); const left=H('div','lb-notes');
      left.append(H('p','lbx-title',lb.n+' · '+lb.t));
      [['השערה',lb.hyp],['מה משנים',lb.var]].forEach(([k,v])=>{ const r=H('div','lb-row'); r.append(H('span','lb-k',k),H('p','',v)); left.append(r); });
      const wh=H('div','lb-who'); wh.append(H('strong','',lb.who[0]),H('p','',lb.who[1])); left.append(wh);
      if(lb.sci){ const sc=H('div','lb-sci'); sc.append(H('span','lb-k','רגע של מדע'),H('p','',lb.sci)); left.append(sc); }
      const ctl=H('div','lb-ctl'); const cover=H('button','lb-cover'); cover.type='button'; cover.setAttribute('aria-label','להרים את מכסה הבטיחות'); cover.innerHTML='<span class="lid">להרים מכסה</span><span class="btn">הפעלה</span>';
      const again=H('button','lb-again','↻ להריץ שוב'); again.type='button'; again.hidden=true; const msg=H('p','lb-vmsg'); msg.setAttribute('aria-live','polite'); ctl.append(cover,again,msg); left.append(ctl);
      const panel=H('div','lb-panel rgl'); nb.append(left,panel); page.append(nb); PANEL[lb.id](panel);
      let armed=false;
      const go=async()=>{ const res=await panel._run(); lb.proves.forEach(prove); const jl=journal.querySelector('ol'); const em=jl.querySelector('.lb-jempty'); if(em) em.remove();
        const t=new Date(); const hh=[t.getHours(),t.getMinutes(),t.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':'); jl.prepend(H('li','',hh+' · '+lb.t+' · '+res)); };
      cover.addEventListener('click',async()=>{ if(!armed){ armed=true; cover.classList.add('open'); cover.setAttribute('aria-label','הפעלה'); return; } if(cover.disabled) return; cover.disabled=true; await go(); cover.disabled=false; again.hidden=false; });
      again.addEventListener('click',async()=>{ again.disabled=true; await go(); again.disabled=false; msg.textContent=lb.id==='honest'?'אותו סכום בדיוק, אבל חלקים אחרים לגמרי: האקראיות חדשה בכל הרצה, והתשובה לא משתנה.':''; });
    }
    const stamp=(p,cls,t)=>{ let s=p.querySelector('.ip-stamp'); if(!s){ s=H('div','ip-stamp'); p.append(s); } s.hidden=false; s.className='ip-stamp '+cls; s.textContent=t; };
    const NE=D.rate.length*D.sect.length, SEC=D.sect.length;
    const SECT_HE={software:'תוכנה',healthcare:'בריאות','real-estate':'נדל"ן',retail:'קמעונאות',industrial:'תעשייה',energy:'אנרגיה',shipping:'ספנות'};
    const grid=(p,vals,blocked,cls)=>{ const g=H('div','rgl-grid '+(cls||'')); g.append(H('span','rgl-c h',''),...D.sect.map(s=>H('span','rgl-c h',SECT_HE[s]||s)));
      D.rate.forEach((r,ri)=>{ g.append(H('span','rgl-c h',L(r))); D.sect.forEach((s,si)=>{ const j=ri*SEC+si; const v=vals?vals[j]:null; const c=H('span','rgl-c'+(blocked&&blocked.includes(j)?' blk':'')+(ri===3?' hi':''),blocked&&blocked.includes(j)?'חסום':(v==null?'':String(v))); c.style.setProperty('--d',(j*25)+'ms'); g.append(c); }); }); return g; };
    const PANEL={
      honest(p){ p.innerHTML=`<div class="rgl-srv">${['א · לונדון','ב · פריז','ג · וושינגטון'].map(s=>`<div class="rgl-s"><small>שרת ${s}</small><code dir="ltr">0</code><span class="rgl-cnt">0 / 500</span></div>`).join('')}</div><div class="rgl-out"></div><div class="ip-tape" aria-live="polite"><p class="ip-th">THE DIFFERENTIAL · LAB</p></div>`;
        const codes=p.querySelectorAll('.rgl-s code'), cnts=p.querySelectorAll('.rgl-cnt'), out=p.querySelector('.rgl-out'), tape=p.querySelector('.ip-tape');
        const add=(t,c)=>{ const l=H('p','ip-l '+(c||''),t); tape.append(l); tape.scrollTop=tape.scrollHeight; };
        p._run=async()=>{ tape.querySelectorAll('.ip-l').forEach(x=>x.remove()); out.textContent=''; p.querySelectorAll('.ip-stamp').forEach(x=>x.hidden=true);
          add('$ python registry_poc.py  # honest'); add('500 קרנות מקבצות את הספרים שלהן מקומית: 33 תאים לכל קרן');
          const total=D.truth.slice(0,NE).reduce((a,b)=>a+b,0); const acc=[0n,0n,0n]; let k=0;
          for(let f=1;f<=500;f+=reduce?500:25){ const v=Math.round(total/500); for(let q=0;q<(reduce?500:25);q++){ const s=share(v); s.forEach((x,i)=>acc[i]=(acc[i]+x)%P); }
            codes.forEach((c,i)=>c.textContent=fmt(acc[i])); cnts.forEach(c=>c.textContent=Math.min(500,f+24)+' / 500'); await sleep(40); }
          add('כל שרת מחבר רק את החלקים שקיבל. שלושת הסכומים נראים כמו רעש.');
          await sleep(500); add('שלושת הסכומים משתלבים...'); await sleep(400);
          out.append(H('p','rgl-h','התאים שנפתחו (מיליוני דולרים, לפי ריבית וענף)'),grid(p,D.eps['0'].rel,null)); await sleep(reduce?0:900);
          const ex=D.eps['0'].rel.every((x,j)=>x==null||x===D.truth[j]);
          add('חשיפה בריבית מעל 5%: '+D.above5_true.toFixed(1)+'% מהסך, ב-0.11 שניות (בהרצת הפייתון)','ok'); add('זהה בדיוק לסכום האמיתי '+(ex?'✓':'✗'),ex?'ok':'bad');
          stamp(p,'ok','זהה בדיוק · הוכח'); return D.above5_true.toFixed(1)+'% מעל 5%, מדויק'; };
      },
      peek(p){ p.innerHTML=`<div class="rgl-peek"><p class="rgl-h">החלק שהגיע לשרת א, עכשיו:</p><code class="rgl-big" dir="ltr">?</code></div><div class="rgl-hist"><svg viewBox="0 0 320 150" aria-label="היסטוגרמה של חלקים: ערך 0 מול ערך מיליון"><g class="rgl-bars"></g><line x1="10" y1="130" x2="310" y2="130" class="rgl-ax"/></svg><div class="rgl-leg"><span class="a">חלקים של 0</span><span class="b">חלקים של מיליון</span></div></div><div class="ip-tape" aria-live="polite"><p class="ip-th">THE DIFFERENTIAL · LAB</p></div>`;
        const big=p.querySelector('.rgl-big'), bars=p.querySelector('.rgl-bars'), tape=p.querySelector('.ip-tape'); const NSv='http://www.w3.org/2000/svg';
        const add=(t,c)=>{ const l=H('p','ip-l '+(c||''),t); tape.append(l); tape.scrollTop=tape.scrollHeight; };
        p._run=async()=>{ tape.querySelectorAll('.ip-l').forEach(x=>x.remove()); bars.textContent=''; add('$ python registry_poc.py  # peek');
          for(let i=0;i<6;i++){ big.textContent=fmt(share(i%2?1000000:0)[0]); await sleep(260); }
          add('שרת א מסתכל על מה שהוא מחזיק. מספר ענק, בלי משמעות.','bad');
          const B=10, n=20000, ha=Array(B).fill(0), hb=Array(B).fill(0);
          for(let i=0;i<n;i++){ ha[Number(share(0)[0]*BigInt(B)/P)]++; hb[Number(share(1000000)[0]*BigInt(B)/P)]++; }
          const fa=ha.map(x=>x/n), fb=hb.map(x=>x/n); const gap=Math.max(...fa.map((x,i)=>Math.abs(x-fb[i])));
          fa.forEach((x,i)=>{ [[x,'a',0],[fb[i],'b',1]].forEach(([v,c,o])=>{ const r=document.createElementNS(NSv,'rect'); const h=v*900; r.setAttribute('x',14+i*30+o*12); r.setAttribute('width',11); r.setAttribute('y',130-h); r.setAttribute('height',h); r.setAttribute('class','rgl-bar '+c); r.style.animationDelay=(i*60)+'ms'; bars.append(r); }); });
          await sleep(700); add('20,000 ניסיונות לכל ערך: חלק של 0 וחלק של מיליון נראים אותו הדבר (פער מרבי '+(gap*100).toFixed(2)+'%)','ok');
          stamp(p,'ok','אותו רעש · הוכח'); return 'פער מרבי '+(gap*100).toFixed(2)+'%'; };
      },
      collude(p){ p.innerHTML=`<div class="rgl-col">${['א','ב','ג'].map((k,i)=>`<div class="rgl-s" data-i="${i}"><small>החלק של שרת ${k}</small><code dir="ltr">?</code></div>`).join('')}</div><div class="rgl-res"><span class="rgl-h">מה יוצא מהחיבור</span><code class="rgl-big" dir="ltr">?</code></div><div class="ip-tape" aria-live="polite"><p class="ip-th">THE DIFFERENTIAL · LAB</p></div>`;
        const cs=p.querySelectorAll('.rgl-s'), out=p.querySelector('.rgl-res code'), tape=p.querySelector('.ip-tape');
        const add=(t,c)=>{ const l=H('p','ip-l '+(c||''),t); tape.append(l); tape.scrollTop=tape.scrollHeight; };
        p._run=async()=>{ tape.querySelectorAll('.ip-l').forEach(x=>x.remove()); cs.forEach(c=>c.classList.remove('on')); out.textContent='?'; out.className='rgl-big';
          const sh=share(777); add('$ python registry_poc.py  # collude'); add('קרן מדווחת 777. כל שרת מקבל חלק אחד.');
          cs.forEach((c,i)=>c.querySelector('code').textContent=fmt(sh[i])); await sleep(800);
          cs[0].classList.add('on'); cs[1].classList.add('on'); await sleep(500); const two=rec(sh.slice(0,2)); out.textContent=fmt(two<0n?-two:two); out.classList.add('bad');
          add('א ו-ב מחברים את החלקים שלהם: '+(two<0n?'-':'')+fmt(two<0n?-two:two),'bad'); await sleep(400); add('מספר אקראי ענק. הם לא למדו כלום.','ok'); await sleep(900);
          cs[2].classList.add('on'); await sleep(400); const three=rec(sh); out.textContent=three.toString(); out.className='rgl-big ok'; add('רק שלושת החלקים ביחד נותנים את הערך: '+three,'ok');
          stamp(p,'ok','שניים לא מספיקים · הוכח'); return 'שניים: רעש · שלושה: '+three; };
      },
      small(p){ const lvl=[['1','חזק'],['4','בינוני'],['16','חלש']];
        p.innerHTML=`<div class="rgl-atk"><div class="rgl-step"><b>בלי הגנה</b><span>${L('105 − 40 = 65')}: קרן א גילתה את קרן ב.</span></div><div class="rgl-step ok" hidden><b>עם סף של 5</b><span>תאי הספנות חסומים. אין סכום, אין מה להחסיר.</span></div></div>
          <div class="rgl-eps"><span>רעש פרטיות:</span>${lvl.map(([e,t],i)=>`<button type="button" class="rgl-e${i===0?' on':''}" data-e="${e}">${t}</button>`).join('')}</div><div class="rgl-out"></div><div class="rgl-meter"></div><div class="ip-tape" aria-live="polite"><p class="ip-th">THE DIFFERENTIAL · LAB</p></div>`;
        const out=p.querySelector('.rgl-out'), meter=p.querySelector('.rgl-meter'), tape=p.querySelector('.ip-tape'); let eps='1', ran=false;
        const add=(t,c)=>{ const l=H('p','ip-l '+(c||''),t); tape.append(l); tape.scrollTop=tape.scrollHeight; };
        const blocked=D.eps['1'].rel.map((x,j)=>x==null&&j<NE?j:-1).filter(j=>j>=0);
        const show=()=>{ const E=D.eps[eps]; out.textContent=''; out.append(H('p','rgl-h','התאים שנפתחו, עם רעש (מיליוני דולרים)'),grid(p,E.rel,blocked,'noisy'));
          meter.innerHTML=`<span><small>השאלה המרכזית: כמה מהחשיפה בריבית מעל 5%</small><b>${E.above5.toFixed(1)}%</b><em>האמת: ${D.above5_true.toFixed(1)}%</em></span><span><small>שגיאה חציונית בתא</small><b>${E.med.toFixed(1)}%</b></span><span><small>שגיאה מרבית בתא</small><b>${E.max.toFixed(1)}%</b></span>`; };
        p.querySelectorAll('.rgl-e').forEach(b=>b.addEventListener('click',()=>{ eps=b.dataset.e; p.querySelectorAll('.rgl-e').forEach(x=>x.classList.toggle('on',x===b)); if(ran) show(); }));
        p._run=async()=>{ tape.querySelectorAll('.ip-l').forEach(x=>x.remove()); p.querySelector('.rgl-step.ok').hidden=true; add('$ python registry_poc.py  # small'); add('ענף נדיר: רק שתי קרנות מדווחות בתא הזה');
          await sleep(600); add('בלי סף: קרן א רואה סכום 105, מחסירה את ה-40 שלה, ומגלה 65','bad'); await sleep(900);
          p.querySelector('.rgl-step.ok').hidden=false; add('עם K=5: תאים עם פחות מ-5 קרנות נחסמים ('+blocked.length+' תאים בספנות)','ok'); await sleep(600);
          ran=true; show(); const E=D.eps[eps]; add('עם רעש פרטיות: החשיפה מעל 5% = '+E.above5.toFixed(1)+'% (האמת '+D.above5_true.toFixed(1)+'%)','ok');
          stamp(p,'ok','חסום ושימושי · הוכח'); return 'מעל 5%: '+E.above5.toFixed(1)+'% מול '+D.above5_true.toFixed(1)+'%'; };
      }};
    root.querySelectorAll('.pl-checks').forEach(x=>x.remove());
    open(0,true);

    /* 3 · a machine of four stations */
    const compS=secBy('מי משתתף');
    if(compS){ const s=H('section','pl-sec mc-sec'); s.append(H('h5','pl-h','מי משתתף: מכונה של ארבע תחנות'),H('p','lb-sub','בתוך הקוד עובדות ארבע תחנות, ממש כמו מכונה. לחצו על תחנה כדי לקרוא מה היא עושה, ונסו להוציא אותה מהמכונה.'));
      const ST=[['client','המגרסה של הקרן','Participant Client','מקבצת את ספר ההלוואות לתאים, חותכת כל תא לתקרה, ומפצלת כל מספר לשלושה חלקים.','בלעדיה הנתונים הגולמיים יוצאים מהקרן כמו שהם. כל השאר כבר לא משנה.'],
        ['servers','שלושת המונים','Compute Servers','כל שרת מחבר רק את החלקים שהגיעו אליו, ולא רואה אף ערך.','בלעדיהם מישהו אחד צריך לראות הכול. בדיוק מה שהמערכת נבנתה למנוע.'],
        ['gate','שער הסף','Threshold Gate','סופר כמה קרנות יש בכל תא, וחוסם תא עם פחות מחמש.','בלעדיו, תשובה מצרפית בענף קטן מסגירה קרן.'],
        ['noise','מכונת הרעש','Noise','מוסיפה לכל סכום רעש קטן ומבוקר, כדי שהשוואה בין תשובות לא תחשוף קרן בודדת.','בלעדיה, מי שמשווה שתי תשובות קרובות יכול לחלץ קרן אחת.']];
      const ICO={client:'<rect x="10" y="8" width="32" height="16" rx="2"/><path d="M14 24 v18 M22 24 v18 M30 24 v18 M38 24 v18"/>',servers:'<rect x="6" y="10" width="11" height="32" rx="2"/><rect x="21" y="10" width="11" height="32" rx="2"/><rect x="36" y="10" width="11" height="32" rx="2"/>',gate:'<path d="M8 44 v-22 a18 18 0 0 1 36 0 v22 M8 44 h36 M26 44 v-18"/>',noise:'<path d="M6 26 l5 -8 l5 14 l5 -18 l5 22 l5 -16 l5 10 l5 -6 l5 4"/>'};
      const m=H('div','mc'); const det=H('div','mc-det'); det.setAttribute('aria-live','polite'); det.innerHTML='<p>לחצו על תחנה.</p>'; const out=new Set();
      ST.forEach(([k,he,en,what,without],i)=>{ const st=H('div','mc-st'); st.style.setProperty('--i',i); const b=H('button','mc-b'); b.type='button'; b.innerHTML=`<svg viewBox="0 0 52 52" aria-hidden="true">${ICO[k]}</svg>`; b.append(H('strong','',he),H('small','',en));
        const pull=H('button','mc-pull','להוציא מהמכונה'); pull.type='button';
        b.addEventListener('click',()=>{ m.querySelectorAll('.mc-st').forEach(x=>x.classList.toggle('sel',x===st)); det.innerHTML=''; det.append(H('strong','',he+' · '+en),H('p','',what)); if(out.has(k)) det.append(H('p','mc-bad',without)); });
        pull.addEventListener('click',()=>{ if(out.has(k)){ out.delete(k); st.classList.remove('out'); pull.textContent='להוציא מהמכונה'; } else { out.add(k); st.classList.add('out'); pull.textContent='להחזיר'; }
          m.classList.toggle('broken',out.size>0); det.innerHTML=''; det.append(H('strong','',out.has(k)?'הוצאתם את '+he:'החזרתם את '+he),H('p',out.has(k)?'mc-bad':'',out.has(k)?without:'המכונה עובדת שוב.')); });
        st.append(b,pull); m.append(st); if(i<ST.length-1) m.append(H('span','mc-belt')); });
      s.append(m,det); compS.replaceWith(s); }

    /* 4 · the limits: a fenced field */
    const limS=secBy('גבולות ה-POC');
    if(limS){ const s=H('section','pl-sec fn-sec'); s.append(H('h5','pl-h','גבולות ה-POC'),H('p','lb-sub','POC בודק דבר אחד, ומשאיר בכוונה את כל השאר בחוץ. מה שבחוץ לא נשכח: הוא רק נדחה לשלב הבא, לאפיון.'));
      const f=H('div','fn'); const inside=H('div','fn-in'); inside.append(H('span','fn-tag','בתוך הגדר: מה שבדקנו'));
      [['פיצול סודות, צבירה ופתיחה','הלב: חלקים אקראיים, סכומים חלקיים, ושילוב.'],['סף מינימום ורעש פרטיות','חמש קרנות לתא, ושלוש רמות רעש.'],['500 קרנות מדומות','עם שבעה ענפים, אחד מהם נדיר בכוונה.']].forEach(([a,b])=>{ const c=H('div','fn-item'); c.append(H('b','',a),H('span','',b)); inside.append(c); });
      const outside=H('div','fn-out');
      [['הגנה מפני שרת זדוני','כאן השרתים "ישרים אבל סקרנים": מבצעים את הפרוטוקול, אולי מציצים. שרת שמשנה מספרים בכוונה דורש הגנה נוספת, באפיון.'],['רשת אמיתית בין שלוש רשויות','כאן שלושת השרתים רצים על אותו מחשב. ברשת אמיתית זה איטי יותר, ומישהו צריך להפעיל כל שרת.'],['בדיקה שהקרן דיווחה אמת','השיטה שומרת על סוד, לא על אמת. קרן יכולה לדווח מספר לא נכון, ואף אחד לא יראה. זו השאלה הגדולה שעוברת הלאה.']].forEach(([a,b],i)=>{ const c=H('div','fn-note'); c.style.setProperty('--i',i); c.append(H('span','fn-stk','לאפיון'),H('b','',a),H('span','',b)); outside.append(c); });
      f.append(outside,inside); s.append(f); limS.replaceWith(s); }

    /* 5 · split screen */
    const vsS=secBy('במה זה שונה');
    if(vsS){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','במה זה שונה')); const g=H('div','vs2');
      const a=H('div','vs-side official'); a.innerHTML='<span class="vs-k">הדיווח הרגיל (Form PF ברשות האמריקאית)</span><div class="vs-pics"><span class="vs-safe" aria-hidden="true"><i></i><b>הרשות רואה הכול</b></span><span class="vs-cal" aria-hidden="true"><i></i><i></i><i></i><b>נשאר בבית</b></span></div><p>הרשות רואה כל נתון של כל קרן, ויכולה לבדוק כל מה שהיא רוצה. אבל הנתונים לא יכולים לצאת ממנה לרשויות אחרות.</p>';
      const b=H('div','vs-side ours'); b.innerHTML='<span class="vs-k">המרשם שלנו</span><div class="vs-pics"><span class="vs-box" aria-hidden="true"><i></i><b>אף אחד לא רואה</b></span><span class="vs-watch" aria-hidden="true"><b>3</b><small>רשויות, חישוב אחד</small></span></div><p>אף אחד לא רואה נתון בודד, ושלוש רשויות מחשבות יחד בלי להעביר נתונים. המחיר: אפשר לשאול רק שאלות מרשימה סגורה, וקשה יותר לבדוק אם קרן דיווחה אמת.</p>';
      g.append(a,H('span','vs-vs','מול'),b); s.append(g,H('p','vs-q','מה עדיף: לראות הכול בבית אחד, או לראות את השלם בלי לראות אף אחד?')); vsS.replaceWith(s); }

    /* 6 · ethics: what would you publish? */
    const ethS=secBy('שאלה אתית');
    if(ethS){ const s=H('section','pl-sec et-sec'); s.append(H('h5','pl-h','שאלה אתית: מה הייתם עושים?'));
      const w=H('div','et rg-et'); const side=H('div','et-side');
      side.append(H('p','','מערכת שמבטיחה "אף אחד לא רואה" חייבת לעמוד בהבטחה. דליפה אחת תפגע באמון בכל הכלים מהסוג הזה. אבל משהו תמיד דולף: למשל, כמה קרנות יש בכל תא. מה עושים עם זה?'));
      const ch=H('div','et-choice'); ch.append(H('p','','אתם מחליטים:')); const hide=H('button','et-c','להסתיר, ולהבטיח שלא דולף כלום'), show=H('button','et-c','לפרסם בגלוי מה כן דולף'); hide.type=show.type='button'; ch.append(hide,show); side.append(ch);
      const ans=H('div','et-ans'); ans.hidden=true; side.append(ans);
      const card=H('div','rg-etc'); card.innerHTML='<span class="et-src">הדוח הרבעוני · נספח שקיפות</span><ul><li>מספר הקרנות בכל תא, מעוגל לחמש</li><li>רמת הרעש בכל תשובה, ומרווח הטעות</li><li>כל שאלה שנשאלה, וכל שאלה שנדחתה</li></ul>'; card.hidden=true;
      const decide=pub=>{ ans.hidden=false; ans.innerHTML=''; card.hidden=false; ans.append(H('strong','',pub?'זו גם הבחירה שלנו.':'הבטחה שאי אפשר לקיים מסוכנת יותר מדליפה קטנה.'),H('p','','לכן: קטלוג שאלות סגור, סף מינימום, רעש מבוקר, ופרסום גלוי של מה כן דולף. מי שיודע בדיוק מה נחשף יכול לסמוך על כל השאר.')); };
      hide.addEventListener('click',()=>decide(false)); show.addEventListener('click',()=>decide(true));
      w.append(card,side); s.append(w); ethS.replaceWith(s); }

    /* 7 · envelopes */
    const openS=secBy('מה עובר לאפיון');
    if(openS){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','מה עובר לאפיון: שתי מעטפות חתומות'),H('p','lb-sub','מה שה-POC לא פתר לא נזרק. הוא נכנס למעטפה, ונמסר לשלב הבא. לחצו כדי לפתוח.'));
      const E=[['מי מבטיח שהנתונים נכונים?','השיטה מגינה על סודיות, לא על אמת. קרן יכולה לדווח מספר לא נכון, ואף אחד לא יראה, כי אף אחד לא רואה כלום. האפיון יצטרך דרך לבדוק בלי לראות.'],['מי מפעיל את השרתים?','ומה קורה כשאחד מהם נופל ביום האחרון של הרבעון? בשיטה שבה שלושת החלקים נחוצים, שרת אחד שנופל עוצר הכול. האפיון יצטרך להחליט מה עושים בזמן הזה.']];
      const g=H('div','env-g');
      E.forEach(([t,d],i)=>{ const e=H('button','env'); e.type='button'; e.style.setProperty('--i',i); e.setAttribute('aria-expanded','false'); e.innerHTML='<span class="env-back"></span><span class="env-flap"></span><span class="env-seal">לאפיון</span><span class="env-letter"><b></b><span></span></span>';
        e.querySelector('.env-letter b').textContent=t; e.querySelector('.env-letter span').textContent=d; e.append(H('span','env-lab',t)); e.addEventListener('click',()=>{ const o=e.classList.toggle('open'); e.setAttribute('aria-expanded',o); }); g.append(e); });
      s.append(g); openS.replaceWith(s); }

    /* 8 · annotated code */
    const techS=secBy('מה בקוד');
    if(techS){ const s=H('section','pl-sec cd-sec'); s.append(H('h5','pl-h','מה בקוד'),H('p','lb-sub','שלושה קטעים מהקוד האמיתי. ליד כל שורה חשובה יש הסבר בעברית.'));
      const SN=[['הפיצול: שלושה חלקים שסכומם הערך',[['P = (1 << 61) - 1','מספר ראשוני ענק. כל החשבון נעשה "מסביב לשעון" שלו, כמו שעון של 24 שעות שאחרי 23 חוזר ל-0.'],['s = [secrets.randbelow(P) for _ in range(n - 1)]','שני חלקים אקראיים לגמרי, מאקראיות קריפטוגרפית.'],['s.append((v - sum(s)) % P)','החלק השלישי משלים לערך. כל חלק לבדו נראה אקראי.']]],
        ['הצבירה: כל שרת מחבר רק את שלו',[['acc[s][j] = (acc[s][j] + x) % P','שרת s מוסיף לתא j את החלק שקיבל. הוא לא רואה את הערך, רק את החלק.'],['for s, x in enumerate(share(1 if v else 0)):','גם הספירה, כמה קרנות יש בתא, מפוצלת. אף שרת לא יודע מי דיווח.']]],
        ['השער והרעש',[['released = ... if counts[j] >= K_MIN else None','תא עם פחות מחמש קרנות לא נפתח בכלל.'],['laplace_int((CLIP if j < NE else 1) / eps, nrng)','רעש בגודל שתלוי בתקרה ובאפסילון: אפסילון קטן, רעש גדול, פרטיות חזקה.']]]];
      SN.forEach(([h,rows])=>{ const c=H('div','cd-card'); c.append(H('p','cd-h',h)); rows.forEach(([code,he])=>{ const r=H('div','cd-row'); const cd=H('code','',code); cd.setAttribute('dir','ltr'); r.append(cd,H('span','cd-he',he)); c.append(r); }); s.append(c); });
      const chips=H('div','cd-chips'); [['Python טהור','בלי ספריות חיצוניות, כדי שאותו קובץ ירוץ גם בדפדפן.'],['secrets','אקראיות קריפטוגרפית מהספרייה הסטנדרטית, ולא random רגיל שאפשר לנחש.'],['רעש Laplace','פרטיות דיפרנציאלית: רעש לפי כמה קרן אחת יכולה להשפיע על התשובה.']].forEach(([a,b])=>{ const d=H('div','cd-chip'); d.append(H('b','',a),H('span','',b)); chips.append(d); });
      const sw=H('div','cd-watch'); sw.innerHTML='<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="33" r="22"/><path d="M30 33 L30 16"/><rect x="26" y="4" width="8" height="6" rx="1"/></svg><span><b>0.11</b> שניות</span><small>ל-500 קרנות: פיצול, צבירה ופתיחה</small>'; chips.append(sw); s.append(chips);
      const det=techS.querySelector('details'); if(det) s.append(det); techS.replaceWith(s); }

    /* 9 · downloads */
    const dlS=secBy('הורדה');
    if(dlS&&window.fxDownloads){ const s=H('section','pl-sec'); s.append(H('h5','pl-h','הורדה')); s.append(window.fxDownloads('registry','poc','מסמך ה-POC','The POC document','המטרה, הרכיבים, הגבולות והמסקנה.','Goal, components, limits and conclusion.',null,[['../../assets/py/registry_poc.py','קוד · registry_poc.py']])); dlS.replaceWith(s); }
    if(window.TermWin) window.TermWin.wire(root);
  })();
})();
