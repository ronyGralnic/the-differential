/* Light analytics helper (GoatCounter). Safe when blocked or offline. */
window.gcEvent=function(name){ try{ if(window.goatcounter&&window.goatcounter.count) window.goatcounter.count({path:name,title:name,event:true}); }catch(e){} };
document.addEventListener('click',function(e){ var a=e.target.closest&&e.target.closest('a[href]'); if(!a) return; var h=a.getAttribute('href')||''; if(/\.(pdf|docx)(\?|#|$)/i.test(h)) window.gcEvent('download '+h.split('/').pop()); });
