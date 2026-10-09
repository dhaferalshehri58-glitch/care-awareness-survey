'use strict';
let config;
const questions=[{id:'sector',label:'القطاع الصحي',type:'select',required:true,placeholder:'اختر القطاع الصحي',options:[]},{id:'respondent',label:'اسم مدير القطاع',type:'text',required:true,placeholder:'اكتب الاسم'},{id:'path_count',label:'عدد المسارات المطبقة فعليًا في القطاع',type:'number',required:true,placeholder:'من 0 إلى 30'},{id:'notes',label:'ملاحظات إضافية (اختياري)',type:'textarea',required:false,placeholder:'اكتب ملاحظاتك هنا'}];
function pathsUI() {
 const target=document.getElementById('dynamic-paths');
 const n=Number(document.getElementById('q_path_count').value);
 if(!Number.isInteger(n)||n<0||n>(config?.maxPaths||30)){target.replaceChildren();return;}
 const old=[...target.querySelectorAll('.path-card')].map(card=>({name:card.querySelector('[data-name]')?.value||'',coordinator:card.querySelector('[data-coordinator]')?.value||''}));
 target.replaceChildren();if(!n)return;
 target.append(E('h3',{text:'المسارات المطبقة'}));
 for(let i=0;i<n;i++){
  const nameField=E('div',{class:'field'},E('label',{text:'اسم المسار *'}),E('input',{class:'input','data-name':'',required:'true',maxlength:'160',value:old[i]?.name||''}));
  const coordField=E('div',{class:'field'},E('label',{text:'اسم منسق المسار *'}),E('input',{class:'input','data-coordinator':'',required:'true',maxlength:'160',value:old[i]?.coordinator||''}));
  target.append(E('div',{class:'path-card'},E('h3',{text:'المسار '+(i+1)}),nameField,coordField));
 }
}
const escaped=s=>String(s||'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
(async()=>{try{config=await(await fetch('config.json',{cache:'no-store'})).json();questions[0].options=config.sectors||[];const a=config.appearance;applyAppearance(a);document.title=a.site_title;document.getElementById('public-brand').innerHTML=brandMark(a)+`<div><h1>${escaped(a.site_title)}</h1><p>${escaped(a.site_subtitle)}</p></div>`;document.getElementById('side-symbol').innerHTML=icon(a.side_icon||a.brand_icon);document.getElementById('aside-title').textContent=a.side_title;document.getElementById('aside-description').textContent=a.side_description;document.getElementById('form-title').textContent=a.form_title;document.getElementById('form-description').textContent=a.form_description;document.getElementById('form-count').textContent='4 حقول رئيسية';document.getElementById('questions').append(formFields(questions));const sel=document.getElementById('q_sector');sel.value='';sel.required=true;const count=document.getElementById('q_path_count'),el=E('div',{id:'dynamic-paths',class:'paths-section'});count.closest('.field').after(el);count.max=config.maxPaths||30;count.step=1;count.addEventListener('input',pathsUI);pathsUI();const d=document.createElement('div');d.id='integration-status';d.className='muted';d.style.fontSize='12px';d.textContent=config.appsScriptUrl?.startsWith('https://script.google.com/macros/s/')?'':'لم يتم ربط Google Sheets بعد. لن يُفعّل الإرسال حتى إضافة رابط Apps Script في config.json.';document.querySelector('.submit-row').prepend(d);
}catch(err){toast('تعذر تحميل إعدادات الموقع: '+err.message,true)}})();
// Each submission has a durable idempotency key; verify storage via a read-only JSONP status endpoint.
let awaiting=null;
function doneSending(ok, message='') {
 const sent=awaiting;if(!sent)return;
 awaiting=null;clearTimeout(sent.timer);clearInterval(sent.pollTimer);
 sent.iframe.remove();
 const btn=document.getElementById('submit-btn');
 if(ok){btn.disabled=true;btn.textContent='تم إرسال الاستبيان';document.getElementById('survey-form').classList.add('hidden');document.querySelector('.form-top').classList.add('hidden');document.querySelector('.form-desc').classList.add('hidden');const success=document.getElementById('success');success.classList.remove('hidden');success.innerHTML=`<div class="circle">${icon('check')}</div><h2>تم إرسال الاستبيان</h2><p class="muted">${escaped(config.appearance.success_message)}</p><button class="btn secondary" id="new-form" type="button">إجابة أخرى</button>`;document.getElementById('new-form').onclick=()=>location.reload();}
 else {btn.disabled=true;btn.textContent='لم يتأكد الحفظ — لا تُعد الإرسال';toast(message||'تعذر التحقق من وصول الاستجابة. تواصل مع مسؤول النموذج قبل إعادة إرسالها.',true);}
}
window.addEventListener('message',event=>{
 const pending=awaiting;if(!pending)return;
 const payload=event.data;
 if(!payload||payload.kind!=='health-survey-result'||payload.nonce!==pending.nonce)return;
 // A reply is emitted by Google Apps Script; reject unrelated pages.
 if(event.origin!=='null'&&!/^https:\/\/(script\.google\.com|script\.googleusercontent\.com|[^/]+\.googleusercontent\.com)$/.test(event.origin))return;
 if(payload.ok)doneSending(true);
 else if(payload.error)doneSending(false,payload.error);
});
function verifyStored(nonce){
 const pending=awaiting;if(!pending||pending.nonce!==nonce||pending.pollInFlight)return;
 pending.pollInFlight=true;
 const callback='surveyConfirm_'+nonce.replace(/[^a-zA-Z0-9_]/g,'').slice(0,55);
 const tag=document.createElement('script');
 window[callback]=data=>{
  cleanup();if(!awaiting||awaiting.nonce!==nonce)return;
  if(data?.stored===true)doneSending(true);
 };
 const cleanup=()=>{tag.remove();delete window[callback];if(awaiting&&awaiting.nonce===nonce)awaiting.pollInFlight=false;};
 tag.onerror=cleanup;
 tag.src=config.appsScriptUrl+'?action=status&nonce='+encodeURIComponent(nonce)+'&callback='+callback+'&_='+Date.now();
 document.head.append(tag);
 setTimeout(cleanup,4500);
}
document.getElementById('survey-form').addEventListener('submit',event=>{
 event.preventDefault();
 if(!config?.appsScriptUrl?.startsWith('https://script.google.com/macros/s/')){toast('أضف رابط Google Apps Script أولًا.',true);return;}
 if(awaiting)return;
 const ans=readForm(questions,event.target);
 if(!config.sectors.includes(ans.sector)){toast('اختر قطاعًا من القائمة.',true);return;}
 const count=Number(ans.path_count);
 if(!Number.isInteger(count)||count<0||count>(config.maxPaths||30)){toast('عدد المسارات غير صحيح.',true);return;}
 const paths=[...document.querySelectorAll('.path-card')].map(card=>({name:card.querySelector('[data-name]').value.trim(),coordinator:card.querySelector('[data-coordinator]').value.trim()}));
 if(paths.length!==count||paths.some(p=>!p.name||!p.coordinator)){toast('أكمل أسماء المسارات والمنسقين.',true);return;}
 const nonce=(crypto.randomUUID?.()||String(Date.now())+Math.random());
 const payload=JSON.stringify({nonce,answers:ans,paths,website:document.getElementById('website').value});
 const iframe=document.createElement('iframe');iframe.name='submit_frame_'+Date.now();iframe.style.display='none';document.body.append(iframe);
 const post=document.createElement('form');post.method='POST';post.action=config.appsScriptUrl;post.target=iframe.name;post.style.display='none';
 const input=document.createElement('input');input.name='payload';input.value=payload;post.append(input);document.body.append(post);
 const btn=document.getElementById('submit-btn');btn.disabled=true;btn.textContent='جارٍ التحقق من حفظ الاستجابة...';
 const timer=setTimeout(()=>doneSending(false,'لم يصل تأكيد حفظ الاستجابة. راجع Google Sheets قبل إعادة إرسالها.'),45000);
 awaiting={nonce,iframe,timer,pollTimer:null,pollInFlight:false};
 post.submit();post.remove();
 setTimeout(()=>verifyStored(nonce),1500);
 awaiting.pollTimer=setInterval(()=>verifyStored(nonce),5500);
});
