const I={
'clipboard-list':'<path d="M8 4h8v4H8z"/><path d="M9 4a3 3 0 0 1 6 0M6 5H5a2 2 0 0 0-2 2v14h18V7a2 2 0 0 0-2-2h-1M8 13h9M8 17h9"/>',
'heart-pulse':'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8"/><path d="M3.6 12h4l2-3 3 6 2-3h5.7"/>',
'hospital':'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h6M12 4v6M9 21v-5h6v5M7 13h2m6 0h2"/>',
'building-2':'<rect x="3" y="6" width="11" height="15" rx="1"/><path d="M14 11h7v10H3M7 10h3M7 14h3M7 18h3M17 15h2M17 18h2"/>',
'map-pin':'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
'calendar':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18M8 15h3"/>',
'user':'<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
'users':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.1a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9"/><circle cx="9" cy="7" r="4"/>',
'activity':'<path d="M2 12h4l3-8 5 16 3-8h5"/>',
'target':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
'check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
'file-text':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
'stethoscope':'<path d="M6 3v6a4 4 0 0 0 8 0V3M4 3h4m4 0h4M10 13v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/>',
'shield-check':'<path d="M12 22s9-4 9-10V5l-9-3-9 3v7c0 6 9 10 9 10z"/><path d="m8 12 3 3 5-6"/>',
'bar-chart':'<path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/>',
'syringe':'<path d="m18 2 4 4m-3-1-4 4m-4-4 8 8-8 8-8-8 8-8zm-9 17 6-6"/>',
'thermometer':'<path d="M14 14V5a3 3 0 0 0-6 0v9a5 5 0 1 0 6 0"/><path d="M11 9v9"/>',
'message-square':'<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12l6 3V6a2 2 0 0 0-2-2z"/>',
'hash':'<path d="M4 9h16M3 15h16M11 3 7 21M17 3l-4 18"/>',
'list-checks':'<path d="m3 6 2 2 4-4M12 6h9M3 14l2 2 4-4m3 2h9M12 21h9"/>',
'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
'settings':'<circle cx="12" cy="12" r="3"/><path d="M10 2h4l.6 2.4 2.1.9 2.1-1.3 2.8 2.8-1.3 2.1.9 2.1L23 12v4l-2.4.6-.9 2.1 1.3 2.1-2.8 2.8-2.1-1.3-2.1.9L14 24h-4l-.6-2.4-2.1-.9-2.1 1.3-2.8-2.8 1.3-2.1-.9-2.1L.4 14v-4l2.4-.6.9-2.1L2.4 5.2l2.8-2.8 2.1 1.3 2.1-.9z" transform="translate(2 0) scale(.83)"/>',
'layers':'<path d="m12 2 10 5-10 5L2 7l10-5zM2 12l10 5 10-5M2 17l10 5 10-5"/>',
'briefcase-medical':'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V4h6v3m-3 4v6m-3-3h6"/>',
'plus':'<path d="M12 5v14M5 12h14"/>','minus':'<path d="M5 12h14"/>','arrow-left':'<path d="m12 19-7-7 7-7M5 12h14"/>',
'arrow-up':'<path d="m12 19 0-14m-7 7 7-7 7 7"/>','arrow-down':'<path d="m12 5 0 14m-7-7 7 7 7-7"/>',
'edit':'<path d="M12 20h9M4 16l10-10 4 4L8 20H4v-4zm12-12 2-2 4 4-2 2"/>','trash':'<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m5 4v7m4-7v7"/>',
'download':'<path d="M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3"/>','eye':'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
'log-out':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9"/>',
'chevron-left':'<path d="m15 18-6-6 6-6"/>','chevron-right':'<path d="m9 18 6-6-6-6"/>','save':'<path d="M4 3h14l3 3v15H3V3h1zm2 0v6h10V3M7 21v-9h10v9"/>',
'check':'<path d="m4 12 5 5 11-11"/>','info':'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10v.5"/>','search':'<circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/>'};
function icon(name){return `<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24">${I[name]||I['clipboard-list']}</svg></span>`}
function E(tag,attrs={},...kids){const n=document.createElement(tag);for(const [k,v] of Object.entries(attrs)){if(k==='class')n.className=v;else if(k==='text')n.textContent=v;else if(k==='html')n.innerHTML=v;else if(k==='value')n.value=v;else if(k==='checked')n.checked=!!v;else if(k.startsWith('on')&&typeof v==='function')n.addEventListener(k.slice(2),v);else if(v!==null&&v!==undefined)n.setAttribute(k,v)}for(const child of kids.flat()){if(child!=null)n.append(child instanceof Node?child:document.createTextNode(String(child)))}return n}
function txt(s){return String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]))}
async function api(path,options={}){let o={credentials:'same-origin',...options};if(o.body&&typeof o.body!=='string')o.body=JSON.stringify(o.body);if(o.body)o.headers={'Content-Type':'application/json',...(o.headers||{})};let r=await fetch(path,o);if(!r.ok){let x;try{x=await r.json()}catch{}throw new Error(x?.error||'تعذر الاتصال بالخادم.')}let ct=r.headers.get('Content-Type')||'';return ct.includes('json')?r.json():r}
function applyAppearance(a){if(!a)return;document.documentElement.style.setProperty('--brand',a.brand||'#087f8c');document.documentElement.style.setProperty('--navy',a.navy||'#17334c');let hex=(a.brand||'#087f8c').slice(1);document.documentElement.style.setProperty('--brand-rgb',[0,2,4].map(x=>parseInt(hex.slice(x,x+2),16)).join(','));document.body.classList.remove('radius-soft','radius-square','font-tahoma','font-arial','font-jannat');if(a.radius&&a.radius!=='rounded')document.body.classList.add('radius-'+a.radius);if(a.font&&a.font!=='system')document.body.classList.add('font-'+a.font)}
function brandMark(a){return a.logo?`<img class="brand-logo" alt="شعار الموقع" src="${a.logo}">`:`<div class="logo-mark">${icon(a.brand_icon||'heart-pulse')}</div>`}
function toast(message,error=false){let prev=document.querySelector('.toast');prev?.remove();let n=E('div',{class:'toast'+(error?' error':''),text:message});document.body.appendChild(n);setTimeout(()=>n.remove(),4200)}
function localToday(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function renderInput(q,val){const id='q_'+q.id;let typ=q.type;const valString=val==null?'':String(val);let input;
 if(typ==='textarea')input=E('textarea',{id,class:'textarea',placeholder:q.placeholder||'',rows:'3'});else if(typ==='select'){
  input=E('select',{id,class:'select'});const hint=E('option',{value:'',text:q.placeholder||'اختر الإجابة'});hint.disabled=true;hint.hidden=true;hint.selected=true;input.append(hint);q.options.filter(opt=>q.id!=='sector'||(opt&&opt.trim()!=='اختر القطاع الصحي')).forEach(opt=>input.append(E('option',{value:opt,text:opt})));}
 else if(typ==='radio'||typ==='checkboxes'||typ==='yesno'){
  const opts=typ==='yesno'?['نعم','لا']:q.options;input=E('div',{class:'radio-set',id});opts.forEach((opt,i)=>{let field=E('input',{type:typ==='checkboxes'?'checkbox':'radio',value:opt,name:id});field.checked=Array.isArray(val)?val.includes(opt):valString===opt;input.append(E('label',{class:'radio-pill'},field,E('span',{text:opt})))});}
 else input=E('input',{id,class:'input',type:typ==='number'?'number':typ==='date'?'date':'text',placeholder:q.placeholder||'',step:typ==='number'?'any':null});
 if(!['radio','checkboxes','yesno'].includes(typ)){input.value=valString;if(q.required)input.required=true;}
 return input;
}
function formFields(questions,values={}){const frag=document.createDocumentFragment();questions.forEach(q=>{
 if(q.type==='section'){frag.append(E('div',{class:'question-heading'},E('h3',{html:icon(q.icon)+' '+txt(q.label)}),E('p',{text:q.placeholder||''})));return;}
 const full=['textarea','radio','checkboxes','yesno'].includes(q.type);
 const label=E('label',{for:'q_'+q.id,html:txt(q.label)+(q.required?' <span class="star">*</span>':'')});const field=E('div',{class:'field question'+(full?' full':'')},label,renderInput(q,values[q.id]??(q.id==='report_date'?localToday():'')));
 if(q.type==='number')field.querySelector('input').min='0';frag.append(field);
 });return frag;}
function readForm(questions,root){const out={};for(const q of questions){if(q.type==='section')continue;const el=root.querySelector('#q_'+q.id);if(!el)continue;if(q.type==='checkboxes')out[q.id]=[...el.querySelectorAll('input:checked')].map(x=>x.value);else if(q.type==='radio'||q.type==='yesno')out[q.id]=el.querySelector('input:checked')?.value||'';else out[q.id]=el.value.trim();}return out}
