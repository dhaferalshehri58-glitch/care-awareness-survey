/** Google Apps Script. Bind this project to the response spreadsheet. */
const RESPONSES_TAB = 'الردود';
const PATHS_TAB = 'المسارات والمنسقون';
function doPost(e) {
  let nonce = '';
  try {
    const incoming = JSON.parse((e.parameter || {}).payload || '{}');
    nonce = String(incoming.nonce || '').slice(0,100);
    if (incoming.website) throw Error('إرسال غير مقبول');
    const a=incoming.answers||{}, paths=incoming.paths;
    const sector=String(a.sector||'').trim().slice(0,100);
    const respondent=String(a.respondent||'').trim().slice(0,160);
    const notes=String(a.notes||'').trim().slice(0,1000);
    const count=Number(a.path_count);
    if (!sector || sector==='اختر القطاع الصحي' || !respondent || !Number.isInteger(count) || count<0 || count>30 || !Array.isArray(paths) || paths.length!==count) throw Error('بيانات النموذج غير مكتملة');
    const cleaned=paths.map(p=>({name:String(p.name||'').trim().slice(0,160),coordinator:String(p.coordinator||'').trim().slice(0,160)}));
    if(cleaned.some(p=>!p.name||!p.coordinator)) throw Error('يرجى إدخال المسارات والمنسقين');
    const ss=SpreadsheetApp.getActiveSpreadsheet();
    const lock=LockService.getScriptLock();lock.waitLock(20000);
    try {
      const main=getOrCreate_(ss,RESPONSES_TAB,['معرف الرد','وقت الاستجابة','القطاع الصحي','اسم المدير','عدد المسارات','الملاحظات']);
      const sub=getOrCreate_(ss,PATHS_TAB,['معرف الرد','وقت الاستجابة','القطاع الصحي','اسم المدير','رقم المسار','اسم المسار','اسم المنسق']);
      const now=new Date(), id=Utilities.getUuid();
      main.appendRow([id,now,safe_(sector),safe_(respondent),count,safe_(notes)]);
      if(cleaned.length){const rows=cleaned.map((p,i)=>[id,now,safe_(sector),safe_(respondent),i+1,safe_(p.name),safe_(p.coordinator)]);sub.getRange(sub.getLastRow()+1,1,rows.length,rows[0].length).setValues(rows);}
      SpreadsheetApp.flush();
    } finally { lock.releaseLock(); }
    return reply_(true,'',nonce);
  } catch (err) {console.error(err);return reply_(false,err.message||'تعذر حفظ الرد',nonce);}
}
function getOrCreate_(ss,name,headers){let sheet=ss.getSheetByName(name);if(!sheet){sheet=ss.insertSheet(name);sheet.appendRow(headers);sheet.setFrozenRows(1);}return sheet;}
function safe_(str){return /^[=+\-@\t\r]/.test(str)?"'"+str:str;}
function reply_(ok,error,nonce){const data=JSON.stringify({kind:'health-survey-result',ok,error,nonce}).replace(/</g,'\\u003c');const html=`<!doctype html><html><body><script>(function(){var data=${data};try{window.top.postMessage(data,'*');window.parent.postMessage(data,'*')}catch(e){}})();<\/script></body></html>`;return HtmlService.createHtmlOutput(html);}
