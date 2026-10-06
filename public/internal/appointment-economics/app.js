(() => {
  const $=id=>document.getElementById(id), M=window.LionModel, storageKey='lion-appointment-economics-v3';
  const money=(n,d=0)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:d,maximumFractionDigits:d}).format(n):'—';
  const num=(n,d=1)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(n):'—';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const schemas={};
  const definitions={
    'capacity-fields':[['group','Calendar capacity'],['capacity','Attended appointment capacity / month','',0,100000,1,'How many sales appointments can you actually take?'],['currentAppointments','Current attended appointments / month','',0,100000,.1,'Enter actual shows to calibrate booking rate. Funnel edits update this estimate.']],
    'current-fields':[
      ['group','Lead investment'],['leads','Leads per month','',0,1000000,1],['cpl','Cost per lead','$',0,100000,1],
      ['group','Sequential conversion rates'],['connect','Connect rate','%',0,100,.1,'Leads reached ÷ total leads',true],['book','Appointment booking rate','%',0,100,.1,'Appointments booked ÷ connected leads',true],['show','Appointment show rate','%',0,100,.1,'Attended appointments ÷ bookings',true],['close','Close rate','%',0,100,.1,'Sales ÷ attended appointments',true],
      ['group','Follow-up time & cost'],['minutes','Total minutes per lead','min',0,600,.5],['hourly','Your time value per hour','$',0,10000,1,'Values the time spent dialing and following up. Software costs belong below.'],['tools','Monthly tools / overhead','$',0,100000,1]],
    'value-fields':[['commission','Average commission / contribution per sale','$',0,1000000,50],['reserve','Cancellation / chargeback reserve','%',0,100,1,'Applied to sale value, not appointment counts',true]],
    'hire-fields':[['setterMonthly','Monthly salary per setter','$',0,100000,50,'Low-end planning assumption: $1,200. Paid regardless of appointment output.']],
    'performance-fields':[['group','Performance & workload'],['penalty','Booking performance reduction','%',0,100,1,'Relative booking adjustment only. Use 0% to assume equal performance.',true],['setterHours','Follow-up hours per setter / month','hrs',0,500,5,'Uses the current minutes per lead. Larger workloads may require more setters.']],
    'setup-fields':[['group','Hiring, training & management'],['hireFee','One-time recruiting costs per setter','$',0,100000,25],['recruitHours','Your hiring hours per setter','hrs',0,500,.5],['trainerHours','Your training hours per setter','hrs',0,500,.5],['managerHourly','Your management time value / hour','$',0,10000,5],['manageHours','Supervision hours per setter / month','hrs',0,500,.5],['hireTools','Tools cost per setter / month','$',0,100000,10],['hireExtra','Other recurring team costs / month','$',0,100000,10],['rampWeeks','Time to recruit, train & get ready','wks',0,52,.5]],
    'lion-price-field':[['price','Cost per attended appointment','$',0,100000,5,'Starts at $250; varies by product and market']],
    'target-field':[['target','Custom attended appointments / month','',0,100000,1]]
  };
  let state={...M.defaults};
  for(const [container,fields] of Object.entries(definitions)){
    $(container).innerHTML=fields.map(f=>{
      if(f[0]==='group')return `<p class="group-label">${f[1]}</p>`;
      const [key,label,unit,min,max,step,hint,slider]=f;schemas[key]={min,max,step};
      return `<div class="field"><div class="input-line"><label for="${key}">${label}</label><div class="numeric">${unit==='$'?'<span>$</span>':''}<input type="number" inputmode="decimal" id="${key}" data-key="${key}" min="${min}" max="${max}" step="${step}" ${hint?`aria-describedby="hint-${key}"`:''}>${unit&&unit!=='$'?`<span>${unit}</span>`:''}</div></div>${hint?`<p class="subhint" id="hint-${key}">${hint}</p>`:''}${slider?`<input type="range" data-key="${key}" min="${min}" max="${max}" step="${step}" aria-label="${label} slider"><div class="range-ends"><span>${min}%</span><span>${max}%</span></div>`:''}</div>`;
    }).join('');
  }
  function validated(v){
    const out={...M.defaults};
    for(const key of Object.keys(out)){
      if(!Object.hasOwn(v,key))continue;
      if(schemas[key]){const n=Number(v[key]);if(Number.isFinite(n))out[key]=Math.min(schemas[key].max,Math.max(schemas[key].min,n));}
      else if(typeof out[key]==='boolean')out[key]=v[key]===true;
      else if(typeof out[key]==='string'&&typeof v[key]==='string')out[key]=v[key].slice(0,5000);
    }
    for(const [key,allowed] of Object.entries({operator:['owner','team'],targetMode:['capacity','current','manual'],compare:['current','hired']}))if(!allowed.includes(out[key]))out[key]=M.defaults[key];
    return out;
  }
  try{
    const saved=localStorage.getItem(storageKey);
    if(saved)state=validated(JSON.parse(saved));
    else {
      const previous=localStorage.getItem('lion-appointment-economics-v2'), old=previous||localStorage.getItem('lion-appointment-economics-v1');
      if(old){const v=JSON.parse(old);state=validated(v);if(!previous){state.currentAppointments=state.leads*state.connect/100*state.book/100*state.show/100;state.targetMode=v.targetMode==='manual'?'manual':'capacity';}}
    }
  }catch{$('save-status').textContent='Browser storage is unavailable; download the PDF to keep the comparison.';}
  function hydrate(except){document.querySelectorAll('[data-key]').forEach(e=>{if(e===except)return;const v=state[e.dataset.key];if(e.type==='checkbox')e.checked=v;else e.value=typeof v==='number'?Math.round(v*10000)/10000:v;});}
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));$('save-status').textContent='Changes stay in this browser. Reset for a new prospect.';}catch{$('save-status').textContent='Changes are not saved; download the PDF to keep this comparison.';}}
  function linkFunnel(key){
    if(['leads','connect','book','show'].includes(key))state.currentAppointments=state.leads*state.connect/100*state.book/100*state.show/100;
    else if(key==='currentAppointments'){
      const potential=state.leads*state.connect/100*state.show/100;
      if(potential>0)state.book=Math.min(100,state.currentAppointments/potential*100);
    }
  }
  function modelRows(r){
    const {current:c,hired:h,lion:l}=r;
    const val=(m,k,format=money)=>m.available?format(m[k]):'Unavailable';
    const rows=[
      ['Attended appointments / month',val(c,'held',num),val(h,'held',num),num(l.held)],
      ['Required leads',val(c,'leads',num),val(h,'leads',num),'Included'],
      ['Estimated sales',val(c,'sales',num),val(h,'sales',num),num(l.sales)],
      ['Lead acquisition',val(c,'leadCost'),val(h,'leadCost'),'Included'],
      ['Follow-up labor / setter salary',val(c,'labor'),val(h,'labor'),money(0)],
      ['Setters needed', '—', h.available?num(h.setters,0):'Unavailable','Included'],
      ['Tools / other recurring costs',val(c,'tools'),money(h.tools+state.hireExtra),money(0)],
      ['Owner supervision time value',money(0),money(h.management),money(0)],
      ['Appointment investment','—','—',`${num(l.billed)} × ${money(state.price)}`],
      ['Cash spend / month',val(c,'cash'),val(h,'cash'),money(l.cash),'subrow'],
      ['Value of owner / agent time',val(c,'timeValue'),money(h.timeValue),money(0),'subrow'],
      ['Ongoing modeled cost / month',val(c,'total'),val(h,'total'),money(l.total),'total-row'],
      ['Ongoing cost / attended appointment',val(c,'costHeld',n=>money(n,2)),val(h,'costHeld',n=>money(n,2)),money(l.costHeld,2)],
      ['All-in cost / sale',val(c,'costSale'),val(h,'costSale'),money(l.costSale)],
      ['Contribution after acquisition',val(c,'contribution'),val(h,'contribution'),money(l.contribution)],
      ['Your setting / management hours',val(c,'ownerHours',n=>num(n)+' hrs'),val(h,'ownerHours',n=>num(n)+' hrs'),'0 hrs'],
      ['One-time hiring & training (separate)',money(0),money(h.startup),money(0)],
    ];
    return rows.map(([label,a,b,c,cls=''])=>`<tr class="${cls}"><th scope="row">${esc(label)}</th><td>${esc(a)}</td><td>${esc(b)}</td><td class="lion-col">${esc(c)}</td></tr>`).join('');
  }
  function render(){
    const r=M.calculate(state), {current:c,hired:h,lion:l,capacity:k}=r;
    $('target-field').hidden=state.targetMode!=='manual';
    document.querySelector('label[for="hourly"]').textContent=state.operator==='owner'?'Your time value per hour':'Staff cost per hour';
    $('hint-hourly').textContent=state.operator==='owner'?'Values your dialing and follow-up time; this is not cash paid out. Software costs belong below.':'Hourly labor cost of the person making calls. Software costs belong below.';
    $('hire-assumption-summary').innerHTML=`<strong>${num(h.setters,0)} ${h.setters===1?'setter':'setters'} at the selected target</strong><br>${money(h.labor)} monthly salary + ${money(h.tools+state.hireExtra)} tools / other costs + ${money(h.management)} supervision time value.<br>${money(h.startup)} one-time hiring / training; ${num(state.rampWeeks)} weeks until ready.<br>${num(state.penalty)}% booking reduction; ${num(state.setterHours)} follow-up hours per setter / month. Review the assumptions below.`;
    $('utilization-pill').textContent=k.utilization===null?'Enter monthly capacity':`${num(k.utilization)}% of capacity used`;
    $('capacity-stats').innerHTML=[['Monthly capacity',num(k.limit)],['Currently attended',num(k.current)],['Empty appointment slots',num(k.gap)]].map(([label,v])=>`<div><p>${label}</p><strong>${v}</strong></div>`).join('');
    $('capacity-bar').style.width=Math.min(100,k.utilization??0)+'%';
    $('opportunity-value').textContent=money(k.saleValue);
    $('opportunity-sales').textContent=`${num(k.gap)} empty slots × ${num(state.close)}% close rate = ${num(k.extraSales)} potential additional sales.`;
    $('opportunity-net').textContent=money(k.contribution);
    $('opportunity-cost').textContent=`After ${money(k.lionInvestment)} to fill those slots at ${money(state.price)} per show.`;
    $('opportunity-note').textContent=`Uses ${money(r.netValue)} net commission / contribution per sale. This is potential value from filling unused capacity, before other business costs; it is separate from the equal-volume cost comparison below.`;
    document.querySelectorAll('[data-compare]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.compare===state.compare));
    const baseName=state.compare==='hired'?'hiring a setter':'the current process';
    $('gap-label').textContent=r.savings===null?'SET A VIABLE ATTENDED-APPOINTMENT TARGET':r.savings>=0?'MODELED MONTHLY COST SAVED WITH LION':'MODELED EXTRA MONTHLY COST WITH LION';
    $('gap-value').textContent=money(r.savings===null?null:Math.abs(r.savings));
    $('time-value').textContent=r.ownerTime===null?'—':`${num(r.ownerTime)} hrs`;
    $('time-label').textContent='FOLLOW-UP / SUPERVISION HOURS FREED';
    $('gap-copy').textContent=r.savings===null?'A positive target and non-zero lead conversion are needed to compare the lead models.':`At ${num(r.target)} attended appointments per month, Lion is ${money(Math.abs(r.savings))} ${r.savings>=0?'lower':'higher'} in ongoing modeled cost than ${baseName}. Cash spend ${r.cashSavings>=0?'decreases':'increases'} by ${money(Math.abs(r.cashSavings))}; the remaining gap is time value. Hiring setup is separate.`;
    $('current-held').textContent=money(c.costHeld,2);$('hire-held').textContent=money(h.costHeld,2);$('lion-held').textContent=money(l.costHeld,2);$('threshold').textContent=money(r.threshold,2);
    $('threshold-note').textContent=`Per attended appointment to match ${state.compare==='hired'?'setter':'current'} ongoing modeled cost`;
    $('lion-unit-note').textContent=`${money(state.price)} per attended appointment`;
    $('funnel-meta').textContent=`${num(state.leads,0)} ${state.product.toLowerCase()} leads / month`;
    const stages=[['Leads',r.funnel.leads,'100% of input leads'],['Connected',r.funnel.connected,`${num(state.connect)}% of leads`],['Booked',r.funnel.booked,`${num(state.book,2)}% of connections`],['Attended',r.funnel.held,`${num(state.show)}% of bookings`],['Sales',r.funnel.sales,`${num(state.close)}% of attended`]];
    $('funnel').innerHTML=stages.map(([label,count,detail])=>`<div class="funnel-stage"><span class="stage-label">${label}</span><strong>${num(count)}</strong><p class="stage-rate">${detail}</p><div class="track"><div class="bar" style="width:${state.leads>0?count/state.leads*100:0}%"></div></div></div>`).join('');
    const baselineHours=state.leads*state.minutes/60;
    $('funnel-insight').textContent=`${num(state.leads-r.funnel.connected)} leads never connect; ${num(r.funnel.booked-r.funnel.held)} booked appointments do not show. Follow-up takes ${num(baselineHours)} hours, valued at ${money(baselineHours*state.hourly)} per month.`;
    $('target-pill').textContent=`${num(r.target)} attended appointments / month`;
    $('comparison-body').innerHTML=modelRows(r);
    const warnings=[];
    if(r.target===0)warnings.push('The comparison target is zero; unit costs and break-even pricing are undefined.');
    if(!c.available)warnings.push('The current lead model cannot reach the target with no attended output or a zero funnel conversion rate.');
    if(!h.available)warnings.push('The setter model needs a non-zero adjusted conversion rate and available follow-up hours.');
    if(state.currentAppointments>state.capacity)warnings.push('Current attended volume exceeds reported capacity. The empty-slot opportunity is zero.');
    if(r.target>state.capacity)warnings.push('The selected comparison target exceeds reported capacity.');
    if(Math.abs(state.currentAppointments-r.funnel.held)>.1)warnings.push('Recorded attended appointments and the funnel estimate differ. Check that inputs cover the same leads and time period.');
    $('model-warning').hidden=warnings.length===0;$('model-warning').textContent=warnings.join(' ');
    $('salary-only').textContent=money(r.salaryOnly,2);$('full-booked').textContent=money(h.costHeld,2);
    $('setup-breakdown').innerHTML=[['One-time hiring & training',money(h.startup),`${money(h.cashStartup)} cash + ${money(h.startup-h.cashStartup)} time value`],['Your hiring & training time',`${num(h.hiringHours)} hrs`,'Paid setter training is covered by salary'],['Time until ready',`${num(state.rampWeeks)} weeks`,'Before the setter is ready to work at the modeled pace'],['Setup + first active month',h.available?money(h.firstMonth):'Unavailable','Full setup + ongoing monthly cost']].map(([label,value,detail])=>`<div><span>${label}</span><strong>${value}</strong><small>${detail}</small></div>`).join('');
    const baselineBook=state.book;
    $('penalty-note').textContent=`${num(baselineBook,2)}% baseline booking × (1 − ${num(state.penalty)}%) = ${num(h.effectiveBook,2)}% effective booking rate.`;
    const extraLeads=c.available&&h.available?h.leads-c.leads:null;
    $('performance-story').textContent=`At ${num(state.penalty)}% lower booking performance, the setter needs ${extraLeads===null?'a viable conversion rate':`${num(Math.abs(extraLeads))} ${extraLeads>=0?'more':'fewer'} leads than the current model`} to reach the same attended volume. Salary is paid for the full month; leads, tools, and supervision are additional. The modeled workload requires ${num(h.setters,0)} ${h.setters===1?'setter':'setters'}.`;
    $('talk-track').innerHTML=`<ol><li><strong>Start with the empty calendar.</strong> “You can take ${num(k.limit)} appointments but currently attend ${num(k.current)}. What is preventing the remaining ${num(k.gap)} slots from getting filled?”</li><li><strong>Put a value on the gap.</strong> “At your ${num(state.close)}% close rate, those slots represent ${money(k.saleValue)} in potential monthly sale value and ${money(k.contribution)} after Lion’s appointment cost. What would that change for your business?”</li><li><strong>Pressure-test hiring.</strong> “Who will own the ${num(h.hiringHours)} hours of hiring/training, ${num(h.ownerHours)} hours of monthly supervision, and ${num(state.rampWeeks)} weeks until ready?”</li><li><strong>Agree on the next step.</strong> “Which product, market, and monthly appointment volume should we start with?”</li></ol>`;
    $('methodology').innerHTML=`<p><strong>Capacity opportunity:</strong> empty slots = max(0, attended capacity − current attended appointments). Potential sales = empty slots × current close rate. Sale value = potential sales × commission/contribution × (1 − reserve). Potential additional contribution = that sale value − empty slots × Lion price. This estimates filling unused capacity, before other business costs; it is not added to the separate equal-volume cost savings.</p><p><strong>Current process:</strong> current attended count ÷ monthly leads anchors cost per appointment. Entering attended volume calibrates booking rate; changes to lead count, connect, booking, or show rates update the attended estimate. All models are sized to the selected monthly attended target. Required leads = target ÷ observed lead-to-attended yield. Follow-up hours = required leads × minutes per lead ÷ 60. Cash spend excludes owner/agent time value.</p><p><strong>Hired setter:</strong> current baseline yield × (1 − booking performance reduction), using the current minutes per lead. Setters needed = max(1, round up required follow-up hours ÷ hours available per setter). Each setter receives the full monthly salary, regardless of shows. Monthly cost includes leads, salary, tools, other team costs, and supervision time. Recruiting and your hiring/training time are separate one-time setup costs; paid setter training is covered by salary and is not added twice. Setup is not divided across months or included again in recurring cost. Readiness weeks do not automatically create a lost-sales estimate.</p><p><strong>Lion:</strong> attended target × quoted appointment price. Pay per show only. Sales value uses the prospect’s current close rate and net sale value, with no extra Lion conversion assumptions. Break-even Lion price = selected model’s recurring modeled cost ÷ attended target. All values are editable planning assumptions, not guaranteed results.</p>`;
    $('print-report').innerHTML=window.LionReport.html(state,r);
  }
  document.addEventListener('input',e=>{
    const key=e.target.dataset.key;if(!key)return;
    if(e.target.type==='checkbox')state[key]=e.target.checked;
    else if(schemas[key]){if(e.target.value==='')return;const n=Number(e.target.value);if(!Number.isFinite(n))return;state[key]=Math.max(schemas[key].min,Math.min(schemas[key].max,n));linkFunnel(key);hydrate(e.target);}
    else state[key]=e.target.value;
    render();persist();
  });
  document.addEventListener('change',e=>{const key=e.target.dataset.key;if(schemas[key]){if(e.target.value===''){state[key]=schemas[key].min;linkFunnel(key);}hydrate();render();persist();}});
  function selectTab(key){document.querySelectorAll('[data-tab]').forEach(b=>{const chosen=b.dataset.tab===key;b.setAttribute('aria-selected',chosen);b.tabIndex=chosen?0:-1;$('panel-'+b.dataset.tab).hidden=!chosen;});}
  document.querySelectorAll('[data-tab]').forEach(b=>{b.addEventListener('click',()=>selectTab(b.dataset.tab));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=['current','hired','lion'],i=tabs.indexOf(b.dataset.tab),next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;selectTab(tabs[next]);$('tab-'+tabs[next]).focus();});});
  document.querySelectorAll('[data-compare]').forEach(b=>b.addEventListener('click',()=>{state.compare=b.dataset.compare;render();persist();}));
  $('reset').addEventListener('click',()=>{state={...M.defaults};hydrate();render();persist();selectTab('current');$('toast').textContent='Reset to editable starting examples.';$('toast').hidden=false;setTimeout(()=>$('toast').hidden=true,2500);});
  $('export').addEventListener('click',async()=>{
    const button=$('export');button.disabled=true;button.textContent='Preparing PDF…';
    try{
      const bytes=await window.LionReport.build(state,M.calculate(state),window.PDFLib);
      const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
      const a=document.createElement('a');a.href=url;a.download=`Lion-Appointment-Opportunity-${(state.prospect||'Summary').replace(/[^a-zA-Z0-9-]/g,'-').slice(0,60)}.pdf`;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
    }catch{$('toast').textContent='The PDF could not be prepared. Please try again.';$('toast').hidden=false;setTimeout(()=>$('toast').hidden=true,4500);}
    finally{button.disabled=false;button.textContent='Download 1-page PDF';}
  });
  window.addEventListener('beforeprint',render);
  hydrate();render();
})();
