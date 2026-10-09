/** Bound Google Apps Script for the Health Awareness Survey.
 * Deploy > Manage deployments > Edit > New version after updating this file.
 */
const RESPONSES_TAB = 'الردود';
const PATHS_TAB = 'المسارات والمنسقون';
const NONCE_TAB = '_receipts';

function doPost(e) {
  let nonce='';
  try {
    const incoming=JSON.parse(((e||{}).parameter||{}).payload||'{}');
    nonce=String(incoming.nonce||'').trim().slice(0,100);
    if(!/^[a-zA-Z0-9._-]{8,100}$/.test(nonce))throw Error('معرف الطلب غير صحيح');
    if(incoming.website)throw Error('إرسال غير مقبول');
    const a=incoming.answers||{}, paths=incoming.paths;
    const sector=String(a.sector||'').trim().slice(0,100);
    const respondent=String(a.respondent||'').trim().slice(0,160);
    const notes=String(a.notes||'').trim().slice(0,1000);
    const count=Number(a.path_count);
    if(!sector||sector==='اختر القطاع الصحي'||!respondent||!Number.isInteger(count)||count<0||count>30||!Array.isArray(paths)||paths.length!==count)throw Error('بيانات النموذج غير مكتملة');
    const cleaned=paths.map(p=>({name:String(p.name||'').trim().slice(0,160),coordinator:String(p.coordinator||'').trim().slice(0,160)}));
    if(cleaned.some(p=>!p.name||!p.coordinator))throw Error('يرجى إدخال المسارات والمنسقين');
    const lock=LockService.getScriptLock();lock.waitLock(20000);
    try {
      const ss=SpreadsheetApp.getActiveSpreadsheet();
      const receipts=getOrCreate_(ss,NONCE_TAB,['معرف الطلب','معرف الرد','وقت الاستجابة']);
      if(findNonce_(receipts,nonce))return reply_(true,'',nonce);
      const main=getOrCreate_(ss,RESPONSES_TAB,['معرف الرد','وقت الاستجابة','القطاع الصحي','اسم المدير','عدد المسارات','الملاحظات']);
      const sub=getOrCreate_(ss,PATHS_TAB,['معرف الرد','وقت الاستجابة','القطاع الصحي','اسم المدير','رقم المسار','اسم المسار','اسم المنسق']);
      const now=new Date(), id=Utilities.getUuid();
      main.appendRow([id,now,safe_(sector),safe_(respondent),count,safe_(notes)]);
      if(cleaned.length){const rows=cleaned.map((p,i)=>[id,now,safe_(sector),safe_(respondent),i+1,safe_(p.name),safe_(p.coordinator)]);sub.getRange(sub.getLastRow()+1,1,rows.length,rows[0].length).setValues(rows);}
      receipts.appendRow([nonce,id,now]);
      SpreadsheetApp.flush();
      return reply_(true,'',nonce);
    }finally{lock.releaseLock();}
  }catch(err){console.error(err);return reply_(false,err.message||'تعذر حفظ الرد',nonce);}
}
function doGet(e){
  const p=(e||{}).parameter||{};
  if(p.action!=='status')return ContentService.createTextOutput('Not found');
  const nonce=String(p.nonce||'').slice(0,100),callback=String(p.callback||'');
  if(!/^[a-zA-Z0-9._-]{8,100}$/.test(nonce)||!/^[A-Za-z_$][\w$]{0,100}$/.test(callback))return ContentService.createTextOutput('Invalid request');
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const sheet=ss.getSheetByName(NONCE_TAB);
  const stored=Boolean(sheet&&findNonce_(sheet,nonce));
  return ContentService.createTextOutput(callback+'('+JSON.stringify({stored:stored})+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
}
function findNonce_(sheet,nonce){
 if(sheet.getLastRow()<2)return false;
 return !!sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(nonce).matchEntireCell(true).findNext();
}
function getOrCreate_(ss,name,headers){let sheet=ss.getSheetByName(name);if(!sheet){sheet=ss.insertSheet(name);sheet.appendRow(headers);sheet.setFrozenRows(1);}return sheet;}
function safe_(str){return /^[=+\-@\t\r]/.test(str)?"'"+str:str;}
function reply_(ok,error,nonce){
 const data=JSON.stringify({kind:'health-survey-result',ok,error,nonce}).replace(/</g,'\u003c');
 const html='<!doctype html><html><body><script>try{parent.postMessage('+data+',"*")}catch(e){}<\/script></body></html>';
 return HtmlService.createHtmlOutput(html);
}
