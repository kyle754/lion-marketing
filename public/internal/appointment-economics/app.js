(() => {
  const $=id=>document.getElementById(id), M=window.LionModel, storageKey='lion-appointment-economics-v1';
  const money=(n,d=0)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:d,maximumFractionDigits:d}).format(n):'—';
  const num=(n,d=1)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(n):'—';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const schemas={};
  const definitions={
    'current-fields':[
      ['group','Lead investment'],['leads','Leads per month','',0,1000000,1],['cpl','Cost per lead','$',0,100000,1],
      ['group','Sequential conversion rates'],['connect','Connect rate','%',0,100,1,'Leads reached ÷ total leads',true],['book','Appointment booking rate','%',0,100,1,'Appointments booked ÷ connected leads',true],['show','Appointment show rate','%',0,100,1,'Held appointments ÷ booked appointments',true],['close','Close rate','%',0,100,1,'Sales ÷ held appointments',true],
      ['group','Follow-up time & cost'],['minutes','Total minutes per lead','min',0,600,.5],['hourly','Dialer cost / value per hour','$',0,10000,1],['tools','Monthly tools / overhead','$',0,100000,1]],
    'value-fields':[['commission','Average commission / contribution per sale','$',0,1000000,50],['reserve','Cancellation / chargeback reserve','%',0,100,1,'Applied to sale value, not appointment counts',true]],
    'hire-fields':[['setterHourly','Setter hourly wage','$',0,10000,.5],['setterMinutes','Total setter minutes per lead','min',0,600,.5],['penalty','Setting performance reduction','%',0,100,1,'Relative reduction in the booking rate only',true]],
    'hire-rate-fields':[['hireConnect','Setter connect rate','%',0,100,1,'Before the performance adjustment',true],['hireBook','Setter baseline booking rate','%',0,100,1,'Connected leads → bookings, before adjustment',true],['hireShow','Setter appointment show rate','%',0,100,1,'Booked → held appointments',true],['hireClose','Setter close rate','%',0,100,1,'Held appointments → sales',true]],
    'setup-fields':[['hireFee','Recruiting fees / one-time expenses','$',0,100000,25],['recruitHours','Your hiring / interview hours','hrs',0,500,.5],['trainerHours','Your training / onboarding hours','hrs',0,500,.5],['paidTraining','Paid setter training hours','hrs',0,500,.5],['managerHourly','Your management time value / hour','$',0,10000,5],['manageHours','Ongoing supervision / month','hrs',0,500,.5],['hireTools','Setter tools / month','$',0,100000,10],['hireExtra','Other recurring setter costs / month','$',0,100000,10],['rampWeeks','Time to recruit, train & get ready','wks',0,52,.5],['amortize','Spread setup cost over','mo',1,60,1]],
    'lion-price-field':[['price','Lion appointment price','$',0,100000,5,'Starts at $250 per held appointment; varies by product and market']],
    'lion-fields':[['lionShow','Lion appointment show rate','%',0,100,1,'Used to estimate calendar bookings needed',true],['lionClose','Close rate on Lion appointments','%',0,100,1,'Use the same close rate unless evidence supports a difference',true],['lionFees','Additional monthly fees / costs','$',0,100000,10],['lionHours','Your coordination time / month','hrs',0,500,.5,'Valued using your management hourly rate']],
    'target-field':[['target','Custom held appointments / month','',0,100000,1]]
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
    for(const [key,allowed] of Object.entries({operator:['owner','team'],targetMode:['current','manual'],compare:['current','hired'],billing:['held','booked']}))if(!allowed.includes(out[key]))out[key]=M.defaults[key];
    return out;
  }
  try{const saved=localStorage.getItem(storageKey);if(saved)state=validated(JSON.parse(saved));}catch{$('save-status').textContent='Browser storage is unavailable; use PDF to keep the comparison.';}
  function hydrate(){document.querySelectorAll('[data-key]').forEach(e=>{const v=state[e.dataset.key];if(e.type==='checkbox')e.checked=v;else e.value=v;});}
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));$('save-status').textContent='Changes stay in this browser. Reset for a new prospect.';}catch{$('save-status').textContent='Changes are not saved; use PDF to keep this comparison.';}}
  function modelRows(r){
    const {current:c,hired:h,lion:l}=r;
    const val=(m,k,format=money)=>m.available?format(m[k]):'Unavailable';
    const rows=[
      ['Required leads',val(c,'leads',num),val(h,'leads',num),'Included in appointment price'],
      ['Calendar bookings needed',val(c,'booked',num),val(h,'booked',num),val(l,'booked',num)],
      ['Held appointments',val(c,'held',num),val(h,'held',num),val(l,'held',num)],
      ['Estimated sales',val(c,'sales',num),val(h,'sales',num),val(l,'sales',num)],
      ['Lead acquisition',val(c,'leadCost'),val(h,'leadCost'),'Included'],
      ['Dialing labor / time value',val(c,'labor'),val(h,'labor'),money(0)],
      ['Tools / additional monthly costs',val(c,'tools'),money(h.tools+state.hireExtra),money(state.lionFees)],
      ['Owner management / coordination',money(0),money(h.management),money(l.timeValue)],
      ['Allocated hiring & training',money(0),money(h.allocatedStartup),money(0)],
      [`Lion billable ${state.billing==='held'?'held appointments':'bookings'}`,'—','—',`${num(l.billed)} × ${money(state.price)}`],
      ['Cash spend / month',val(c,'cash'),val(h,'cash'),val(l,'cash'),'subrow'],
      ['Value of owner / agent time',val(c,'timeValue'),money(h.timeValue+(h.startup-h.cashStartup)/state.amortize),money(l.timeValue),'subrow'],
      ['All-in modeled cost / month',val(c,'total'),val(h,'total'),val(l,'total'),'total-row'],
      ['All-in cost / held appointment',val(c,'costHeld',n=>money(n,2)),val(h,'costHeld',n=>money(n,2)),val(l,'costHeld',n=>money(n,2))],
      ['All-in cost / sale',val(c,'costSale'),val(h,'costSale'),val(l,'costSale')],
      ['Estimated sale value after reserve',val(c,'value'),val(h,'value'),val(l,'value')],
      ['Contribution after acquisition',val(c,'contribution'),val(h,'contribution'),val(l,'contribution')],
      ['Owner / agent hours per month',val(c,'ownerHours',n=>num(n)+' hrs'),val(h,'ownerHours',n=>num(n)+' hrs'),val(l,'ownerHours',n=>num(n)+' hrs')],
    ];
    return rows.map(([label,a,b,c,cls=''])=>`<tr class="${cls}"><th scope="row">${esc(label)}</th><td>${esc(a)}</td><td>${esc(b)}</td><td class="lion-col">${esc(c)}</td></tr>`).join('');
  }
  function render(){
    const r=M.calculate(state), {current:c,hired:h,lion:l}=r;
    $('target-field').hidden=state.targetMode!=='manual';$('hire-custom').hidden=state.hireLinked;
    document.querySelectorAll('[data-compare]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.compare===state.compare));
    const baseName=state.compare==='hired'?'hiring a setter':'the current process';
    $('gap-label').textContent=r.savings===null?'SET A VIABLE HELD-APPOINTMENT TARGET':r.savings>=0?'MODELED MONTHLY COST SAVED WITH LION':'MODELED EXTRA MONTHLY COST WITH LION';
    $('gap-value').textContent=money(r.savings===null?null:Math.abs(r.savings));
    $('time-value').textContent=r.ownerTime===null?'—':`${num(Math.abs(r.ownerTime))} hrs`;
    $('time-label').textContent=r.ownerTime===null||r.ownerTime>=0?'OWNER / AGENT HOURS FREED':'ADDITIONAL OWNER / AGENT HOURS';
    $('gap-copy').textContent=r.savings===null?'A positive target and non-zero conversion rates are needed for a meaningful comparison.':`At ${num(r.target)} held appointments per month, Lion is ${money(Math.abs(r.savings))} ${r.savings>=0?'lower':'higher'} in modeled cost than ${baseName}. ${r.cashSavings>=0?'Cash spend decreases by':'Cash spend increases by'} ${money(Math.abs(r.cashSavings))}; the rest of the modeled gap reflects time value and setup allocation.`;
    $('current-held').textContent=money(c.costHeld,2);$('hire-held').textContent=money(h.costHeld,2);$('lion-held').textContent=money(l.costHeld,2);$('threshold').textContent=money(r.threshold,2);
    $('threshold-note').textContent=`Per ${state.billing==='held'?'held appointment':'booking'} to match ${state.compare==='hired'?'setter':'current'} all-in cost`;
    $('lion-unit-note').textContent=state.billing==='held'?`${money(state.price)} / held + any added costs`:`${money(state.price)} / booked, adjusted for show rate`;
    $('funnel-meta').textContent=`${num(state.leads,0)} ${state.product.toLowerCase()} leads / month`;
    const stages=[['Leads',r.funnel.leads,'100% of input leads'],['Connected',r.funnel.connected,`${num(state.connect)}% of leads`],['Booked',r.funnel.booked,`${num(state.book)}% of connections`],['Held',r.funnel.held,`${num(state.show)}% of bookings`],['Sales',r.funnel.sales,`${num(state.close)}% of held`]];
    $('funnel').innerHTML=stages.map(([label,count,detail])=>`<div class="funnel-stage"><span class="stage-label">${label}</span><strong>${num(count)}</strong><p class="stage-rate">${detail}</p><div class="track"><div class="bar" style="width:${state.leads>0?count/state.leads*100:0}%"></div></div></div>`).join('');
    const baselineHours=state.leads*state.minutes/60;
    $('funnel-insight').textContent=`${num(state.leads-r.funnel.connected)} leads never connect; ${num(r.funnel.booked-r.funnel.held)} booked appointments do not show. This process takes ${num(baselineHours)} dialing / follow-up hours, valued at ${money(baselineHours*state.hourly)} per month.`;
    $('target-pill').textContent=`${num(r.target)} held appointments / month`;
    $('comparison-body').innerHTML=modelRows(r);
    const warnings=[];
    if(r.target===0)warnings.push('The held-appointment target is zero. Unit costs and break-even pricing are undefined; fixed costs still apply.');
    if(!c.available)warnings.push('The current process cannot reach this target with a zero conversion rate.');
    if(!h.available)warnings.push('The hired setter cannot reach this target with a zero adjusted conversion rate.');
    if(!l.available)warnings.push('Lion cannot reach this target with a 0% show rate.');
    $('model-warning').hidden=warnings.length===0;$('model-warning').textContent=warnings.join(' ');
    $('wage-only').textContent=money(r.naiveWage,2);$('full-booked').textContent=money(h.costBooked,2);
    $('setup-breakdown').innerHTML=[['One-time setup cost',money(h.startup),`${money(h.cashStartup)} cash + ${money(h.startup-h.cashStartup)} time value`],['Your hiring & training time',`${num(state.recruitHours+state.trainerHours)} hrs`,`${num(state.paidTraining)} paid setter training hours`],['Time until ready',`${num(state.rampWeeks)} weeks`,'Readiness assumption; no automatic lost-sales penalty'],['Setup + first active month',h.available?money(h.firstMonth):'Unavailable','Full setup + recurring modeled cost; no double-counted allocation']].map(([label,value,detail])=>`<div><span>${label}</span><strong>${value}</strong><small>${detail}</small></div>`).join('');
    const baselineBook=state.hireLinked?state.book:state.hireBook;
    $('penalty-note').textContent=`${num(baselineBook)}% baseline booking × (1 − ${num(state.penalty)}%) = ${num(h.effectiveBook,2)}% effective booking rate. A 15% reduction means 55% becomes 46.75%, not 40%.`;
    const extraLeads=c.available&&h.available?h.leads-c.leads:null;
    $('performance-story').textContent=`At the entered ${num(state.penalty)}% booking reduction, the hired setter books ${num(h.effectiveBook,2)}% of connections. ${extraLeads===null?'The target is not reachable under these assumptions.':`The hired model needs ${num(Math.abs(extraLeads))} ${extraLeads>=0?'more':'fewer'} leads than the current process to reach the same held-appointment target.`} Lower wages do not remove acquisition cost or management time.`;
    const questions=[
      `<strong>Start with the bottleneck.</strong> “You said ${esc(state.priority||'your current process has friction')}. Where does that show up in a typical week?”`,
      `<strong>Make the labor visible.</strong> “Who owns the ${num(baselineHours)} hours of follow-up each month, and what would you do with that time if appointments were already set?”`,
      `<strong>Pressure-test the cheap-setter alternative.</strong> “At ${money(state.setterHourly,2)}/hour, what is your plan for the ${num(state.recruitHours+state.trainerHours)} hiring and training hours, ${num(state.manageHours)} monthly supervision hours, and ${num(state.rampWeeks)} weeks until ready?”`,
      `<strong>Discuss the actual gap.</strong> ${r.savings===null?'Set a reachable target, then compare the economics.':`“At ${num(r.target)} held appointments, Lion is ${money(Math.abs(r.savings))} ${r.savings>=0?'lower':'higher'} in modeled cost than ${esc(baseName)}. Does that tradeoff make sense for your time and capacity?”`}`,
      `<strong>Agree on quality before price.</strong> “What must be true for an appointment to count, who handles attendance, and what happens when someone does not show?”`,
    ];
    $('talk-track').innerHTML=`<ol>${questions.map(q=>`<li>${q}</li>`).join('')}</ol>`;
    $('methodology').innerHTML=`<p><strong>Sequential funnel:</strong> leads × connect rate × booking rate = bookings. Bookings × show rate = held appointments. Held × close rate = sales. Connect is measured per unique lead reached; booking is measured per connected lead.</p><p><strong>Equal-output comparison:</strong> required leads = held target ÷ (connect × booking × show). Dialing hours = required leads × total minutes per lead ÷ 60. Required calendar bookings = held target ÷ show rate. Fractions represent expected monthly averages, not partial appointments sold.</p><p><strong>Current cost:</strong> lead spend + dialing labor / time value + monthly tools. Owner/agent time is economic value, not cash payroll savings. Paid-team labor is included in cash spend. Existing hiring costs are excluded unless you add them to overhead.</p><p><strong>Hired setter:</strong> baseline booking × (1 − performance reduction). One-time setup = recruiting fees + paid training wages + your hiring/training time. Monthly all-in cost = leads + setter wages + tools + other recurring costs + management time + setup ÷ allocation months. Cash spend excludes your time; setup + first active month cost replaces the setup allocation with the entire setup cost. Readiness weeks do not reduce steady-state output or create an automatic lost-sales estimate.</p><p><strong>Lion:</strong> ${state.billing==='held'?'held target':'held target ÷ Lion show rate'} × appointment price + additional monthly costs + coordination time. A fixed quoted price per billable appointment does not guarantee fixed cost per sale or fixed monthly spend. Appointment qualification and no-show terms must be confirmed.</p><p><strong>Value and break-even:</strong> sale value = sales × commission/contribution × (1 − reserve). Contribution after acquisition = that sale value − all-in acquisition cost, before other business expenses. Break-even Lion price = (selected model’s all-in cost − Lion added costs − Lion coordination value) ÷ billable appointments. This compares acquisition cost, not different close-rate outcomes.</p><p><strong>Assumptions:</strong> pricing starts at $250 per held appointment; actual pricing varies by product and market. Other starting values are illustrative. Setter performance changes and warm/cold queue behavior are hypotheses to discuss, not validated benchmarks. The comparison has no built-in Lion performance advantage.</p>`;
    updateReport(r,questions);
  }
  function updateReport(r,questions){
    const date=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',dateStyle:'long'}).format(new Date());
    const gap=r.savings===null?'No valid positive comparison target.':`Lion has ${money(Math.abs(r.savings))} ${r.savings>=0?'lower':'higher'} modeled monthly cost than ${state.compare==='hired'?'the hired setter':'the current process'} at ${num(r.target)} held appointments. Cash spend ${r.cashSavings>=0?'decreases':'increases'} by ${money(Math.abs(r.cashSavings))}. ${num(Math.abs(r.ownerTime))} owner/agent hours are ${r.ownerTime>=0?'freed':'added'} per month.`;
    const pairs=(a)=>a.map(([k,v])=>`<div>${esc(k)}: <strong>${esc(v)}</strong></div>`).join('');
    $('print-report').innerHTML=`<div class="print-brand"><div class="brand"><span class="monogram">LM</span>LION MARKETING</div><span>${esc(date)}</span></div><p>APPOINTMENT ECONOMICS • ILLUSTRATIVE PLANNING MODEL</p><h1>Map the process. <em>See the real cost.</em></h1><p><strong>Prepared for:</strong> ${esc(state.prospect||'Prospective partner')}<br><strong>Product:</strong> ${esc(state.product)} • <strong>Source:</strong> ${esc(state.source)}<br><strong>Biggest friction:</strong> ${esc(state.priority)}</p><section class="print-gap"><h2>The gap at equal held-appointment output</h2><p>${esc(gap)}</p><p>Break-even Lion price: ${money(r.threshold,2)} per ${state.billing==='held'?'held appointment':'booking'}.</p></section><h2>Three paths. One target.</h2><table>${$('comparison').querySelector('thead').outerHTML}<tbody>${modelRows(r)}</tbody></table><section><h2>Assumptions used in this conversation</h2><div class="print-assumptions"><div><h3>Current process</h3>${pairs([['Leads/month',num(state.leads)],['Cost/lead',money(state.cpl)],['Connect',num(state.connect)+'%'],['Booking (of connected)',num(state.book)+'%'],['Show',num(state.show)+'%'],['Close',num(state.close)+'%'],['Minutes/lead',num(state.minutes)],['Dialer hourly',money(state.hourly)],['Labor treatment',state.operator==='owner'?'Owner time value':'Paid team'],['Tools/month',money(state.tools)]])}</div><div><h3>Hired setter</h3>${pairs([['Hourly wage',money(state.setterHourly,2)],['Minutes/lead',num(state.setterMinutes)],['Rate baseline',state.hireLinked?'Current funnel':'Custom funnel'],['Connect',num(r.hired.connect)+'%'],['Effective booking',num(r.hired.effectiveBook,2)+'%'],['Show',num(r.hired.show)+'%'],['Close',num(r.hired.close)+'%'],['Booking reduction',num(state.penalty)+'%'],['Recruiting fees',money(state.hireFee)],['Hiring + training time',num(state.recruitHours+state.trainerHours)+' hrs'],['Paid training',num(state.paidTraining)+' hrs'],['Manager hourly',money(state.managerHourly)],['Management/month',num(state.manageHours)+' hrs'],['Tools + other/month',money(state.hireTools+state.hireExtra)],['Time until ready',num(state.rampWeeks)+' weeks'],['Setup allocation',num(state.amortize)+' months'],['One-time setup',money(r.hired.startup)],['Setup + first active month',r.hired.available?money(r.hired.firstMonth):'Unavailable']])}</div><div><h3>Lion</h3>${pairs([['Price',money(state.price)],['Billing unit',state.billing==='held'?'Held appointment':'Booked appointment'],['Show',num(state.lionShow)+'%'],['Close',num(state.lionClose)+'%'],['Additional costs/month',money(state.lionFees)],['Coordination/month',num(state.lionHours)+' hrs'],['Net value/sale',money(r.netValue)],['Gross value/sale',money(state.commission)],['Reserve',num(state.reserve)+'%'],['Target basis',state.targetMode==='current'?'Match current output':'Custom held target']])}</div></div></section><section><h2>Appointment quality & terms</h2><p class="print-note">${esc(state.qualified||'Qualification rules: to be confirmed.')}</p><p class="print-note">${esc(state.replacement||'No-show/replacement terms: to be confirmed.')}</p><p class="print-note">${esc(state.quality)}</p></section><section><h2>Operational load Lion helps remove</h2><p>Setter recruiting and training • Day-to-day setting team management • Lead chasing and repeat follow-up • Variable internal setting costs • Mixing warm inbound and cold/aged outbound queues</p><p>Maintain a dedicated cold/aged outbound cadence. Mixed queues can encourage cherry-picking; the impact should be verified in the prospect’s own team.</p></section><section><h2>Discovery notes & next step</h2><p class="print-note">${esc(state.notes||'No notes entered.')}</p></section><h2>Calculation notes</h2>${$('methodology').innerHTML}<p class="print-fine">Cash spend and owner time value are separate. All scenarios are sized to the same held-appointment target. Fractional volumes are expected averages. Figures are illustrative and depend on verified inputs, qualification rules, attendance, and sales execution. No guaranteed results.</p>`;
  }
  document.addEventListener('input',e=>{
    const key=e.target.dataset.key;if(!key)return;
    if(e.target.type==='checkbox')state[key]=e.target.checked;
    else if(schemas[key]){if(e.target.value==='')return;const n=Number(e.target.value);if(!Number.isFinite(n))return;state[key]=Math.max(schemas[key].min,Math.min(schemas[key].max,n));document.querySelectorAll(`[data-key="${key}"]`).forEach(other=>{if(other!==e.target)other.value=state[key];});}
    else state[key]=e.target.value;
    render();persist();
  });
  document.addEventListener('change',e=>{const key=e.target.dataset.key;if(schemas[key]){if(e.target.value==='')state[key]=schemas[key].min;e.target.value=state[key];render();persist();}});
  function selectTab(key){document.querySelectorAll('[data-tab]').forEach(b=>{const chosen=b.dataset.tab===key;b.setAttribute('aria-selected',chosen);b.tabIndex=chosen?0:-1;$('panel-'+b.dataset.tab).hidden=!chosen;});}
  document.querySelectorAll('[data-tab]').forEach(b=>{b.addEventListener('click',()=>selectTab(b.dataset.tab));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=['current','hired','lion'],i=tabs.indexOf(b.dataset.tab),next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;selectTab(tabs[next]);$('tab-'+tabs[next]).focus();});});
  document.querySelectorAll('[data-compare]').forEach(b=>b.addEventListener('click',()=>{state.compare=b.dataset.compare;render();persist();}));
  $('reset').addEventListener('click',()=>{state={...M.defaults};hydrate();render();persist();selectTab('current');$('toast').textContent='Reset to editable starting examples.';$('toast').hidden=false;setTimeout(()=>$('toast').hidden=true,2500);});
  $('export').addEventListener('click',()=>{render();window.print();});
  window.addEventListener('beforeprint',()=>render());
  hydrate();render();
})();
