(() => {
  const $=id=>document.getElementById(id),M=window.LionModel,R=window.LionReport,{money,num,esc}=R;
  const storageKey='lion-appointment-economics-v7',schemas={};
  const definitions={
    'baseline-fields':[
      ['capacity','Attended appointment capacity / month','',0,100000,1],['currentAppointments','Current attended appointments / month','',0,100000,.1,'Actual attendance stays separate from the funnel projection.'],
      ['leads','Leads per month','',0,1000000,1],['cpl','Cost per lead','$',0,100000,1],
      ['connect','Connect rate','%',0,100,.1,'Connected leads ÷ all leads.',true],['book','Appointment booking rate','%',0,100,.1,'Bookings ÷ connected leads.',true],['show','Appointment show rate','%',0,100,.1,'Attended appointments ÷ bookings.',true],
      ['close','Close rate','%',0,100,.1,'Sales ÷ attended appointments.',true]],
    'timing-fields':[['dialSeconds','Time per dial attempt','sec',60,600,5,'At least 60 seconds per dial.'],['connectMinutes','Talk time for a connect without a booking','min',0,60,.5,'Default: 2.5 minutes, the midpoint of 2–3 minutes.'],['bookedMinutes','Total talk time for a booked appointment','min',0,120,.5,'Default: 10 minutes. Includes the connection conversation.'],['attemptsPerLead','Average dial attempts per lead','',1,50,.5,'Default: one pass. Increase for repeated follow-up attempts.']],
    'value-fields':[['commission','Net commission / contribution per sale','$',0,1000000,50,'After direct delivery costs; before other business overhead.']],
    'cash-fields':[['tools','Existing tools / overhead per month','$',0,100000,10,'Included in today’s spending only.'],['extraTools','Extra tools needed to scale your process / month','$',0,100000,10,'Only new expenses for the additional appointments.']],
    'payroll-fields':[['staffHourly','Actual staff wage / hour','$',0,10000,1,'Use wages actually paid. Agent time has no hourly dollar value.']],
    'reserve-fields':[['reserve','Cancellation / chargeback reserve','%',0,100,1,'Reduces sale value only.',true]],
    'hire-fields':[['setterMonthly','Monthly salary per setter','$',0,100000,50]],
    'performance-fields':[['penalty','Booking performance reduction during training ramp','%',0,100,1,'15% is an editable planning scenario. After ramp, booking performance matches the current process.',true],['setterHours','Available follow-up hours per setter / month','hrs',0,500,5]],
    'setup-fields':[['hireFee','Recruiting cash cost per setter, once','$',0,100000,25],['recruitHours','Your hiring hours per setter, once','hrs',0,500,.5],['trainerHours','Your training hours per setter, once','hrs',0,500,.5],['manageHours','Supervision hours per setter / month','hrs',0,500,.5],['hireTools','Tools per setter / month','$',0,100000,10],['hireExtra','Other new team cash costs / month','$',0,100000,10],['rampWeeks','Paid setter training ramp','wks',0,52,.5]],
    'lion-price-field':[['price','Cost per attended appointment','$',0,100000,5,'Starts at $250; varies by product and market.']],
    'proposal-fields':[['proposed','Recommended additional attended appointments / month','',0,100000,1,'Defaults to capacity minus current attendance. Edit for a smaller starting plan.']]
  };
  let state={...M.defaults},presenting=false;
  for(const [container,fields] of Object.entries(definitions)){
    $(container).innerHTML=fields.map(([key,label,unit,min,max,step,hint,slider])=>{
      schemas[key]={min,max,step};
      return '<div class="field"><div class="input-line"><label for="'+key+'">'+label+'</label><div class="numeric">'+(unit==='$'?'<span>$</span>':'')+'<input type="number" inputmode="decimal" id="'+key+'" data-key="'+key+'" min="'+min+'" max="'+max+'" step="'+step+'"'+(hint?' aria-describedby="hint-'+key+'"':'')+'>'+(unit&&unit!=='$'?'<span>'+unit+'</span>':'')+'</div></div>'+(hint?'<p class="subhint" id="hint-'+key+'">'+hint+'</p>':'')+(slider?'<input type="range" data-key="'+key+'" min="'+min+'" max="'+max+'" step="'+step+'" aria-label="'+label+' slider">':'')+'</div>';
    }).join('');
  }
  function validated(v){
    const out={...M.defaults};
    for(const key of Object.keys(out)){
      if(!Object.hasOwn(v,key))continue;
      if(schemas[key]){const n=Number(v[key]);if(Number.isFinite(n))out[key]=Math.min(schemas[key].max,Math.max(schemas[key].min,n));}
      else if(typeof v[key]==='string')out[key]=v[key].slice(0,2000);
    }
    for(const [key,allowed] of Object.entries({operator:['owner','team'],volumeMode:['capacity','custom'],compare:['current','hired'],product:['Final Expense','Term Life','IUL','Whole Life','Mortgage Protection','Annuity','Other']}))if(!allowed.includes(out[key]))out[key]=M.defaults[key];
    for(const key of ['launchDate','nextDate'])if(out[key]&&!/^\d{4}-\d{2}-\d{2}$/.test(out[key]))out[key]='';
    return out;
  }
  try{
    const saved=localStorage.getItem(storageKey);
    if(saved)state=validated(JSON.parse(saved));
    else{
      const old=localStorage.getItem('lion-appointment-economics-v6')||localStorage.getItem('lion-appointment-economics-v5')||localStorage.getItem('lion-appointment-economics-v4')||localStorage.getItem('lion-appointment-economics-v3')||localStorage.getItem('lion-appointment-economics-v2')||localStorage.getItem('lion-appointment-economics-v1');
      if(old){
        const v=JSON.parse(old);state=validated(v);
        if(!Object.hasOwn(v,'volumeMode'))state.volumeMode='capacity';
      }
    }
  }catch{}
  function hydrate(except){if(state.volumeMode==='capacity')state.proposed=Math.floor(Math.max(0,state.capacity-state.currentAppointments));document.querySelectorAll('[data-key]').forEach(e=>{if(e!==except)e.value=state[e.dataset.key];});}
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));$('save-status').textContent='Saved in this browser. Reset for a new prospect.';}catch{$('save-status').textContent='Storage unavailable. Download the PDF to keep this plan.';}}
  const stats=items=>items.map(([label,value,detail])=>'<div><p class="eyebrow">'+esc(label)+'</p><strong>'+esc(value)+'</strong>'+(detail?'<p class="subhint">'+esc(detail)+'</p>':'')+'</div>').join('');
  const rowHtml=rows=>rows.map((row,i)=>'<tr'+(i===0?' class="total-row"':'')+'>'+row.map((v,j)=>'<'+(j?'td':'th scope="row"')+(j===3?' class="lion-col"':'')+'>'+esc(v)+'</'+(j?'td':'th')+'>').join('')+'</tr>').join('');
  const val=(m,k,f=money)=>m.available?f(m[k]):'Unavailable';
  function render(){
    const r=M.calculate(state),{today:t,current:c,hired:h,capacity:k,plan:p}=r;
    $('payroll-fields').hidden=state.operator!=='team';
    $('baseline-source').textContent=state.source;
    $('today-stats').innerHTML=stats([['Monthly cash',t.available?money(t.cash):'Incomplete'],['Attended appointments',num(t.held)],['Cash cost / show',money(t.costHeld,2)],['Your setting hours',num(t.ownerHours)+' hrs',state.operator==='team'?num(t.dialing)+' paid-team follow-up hours':'Calculated from dials, connects & bookings']]);
    $('capacity-copy').textContent=num(t.held)+' of '+num(k.limit)+' monthly appointment slots used';
    $('capacity-gap').textContent=num(k.gap)+' empty slots';
    $('capacity-bar').style.width=Math.min(100,k.utilization||0)+'%';
    $('today-note').textContent='Cash cost uses current attended volume. Setting time is calculated from your lead volume, connect rate, and booking rate.';
    const time=t.callTime;
    $('current-time-total').textContent=num(time.hours)+' hrs';
    $('current-time-breakdown').innerHTML=[['Dialing',num(time.attempts)+' attempts × '+num(state.dialSeconds)+' sec',num(time.dialMinutes/60)+' hrs'],['Connected, not booked',num(time.unbooked)+' × '+num(state.connectMinutes)+' min',num(time.connectTalkMinutes/60)+' hrs'],['Booked calls',num(time.booked)+' × '+num(state.bookedMinutes)+' min',num(time.bookingTalkMinutes/60)+' hrs']].map(([label,formula,hours])=>'<div><span>'+esc(label)+'<small>'+esc(formula)+'</small></span><strong>'+esc(hours)+'</strong></div>').join('');
    $('price-pill').textContent=money(state.price)+' / attended appointment';
    $('plan-label').textContent=p.contribution<0?'PROPOSED PLAN / REVIEW THE SHORTFALL':'YOUR PROPOSED MONTHLY PLAN';
    $('plan-stats').innerHTML=stats([['Additional shows',num(p.shows)],['Monthly investment',money(p.investment)],[p.contribution<0?'Potential shortfall':'Potential contribution',money(p.contribution),'Before other business costs'],['Projected sale value / spend',p.returnMultiple===null?'Unavailable':num(p.returnMultiple,2)+'×','Sale value ÷ appointment spend']]);
    $('plan-equation').textContent=num(p.shows)+' shows × '+num(state.close)+'% close × '+money(r.netValue)+' net sale value = '+money(p.saleValue)+' potential sale value, less '+money(p.investment)+' appointment spending.';
    $('break-even').textContent=R.coverage(state,r);
    $('growth-payoff').textContent=R.valueCase(state,r);
    $('volume-mode-copy').textContent=state.volumeMode==='capacity'?'Recommendation uses the full available gap: '+num(k.limit)+' capacity − '+num(t.held)+' current attendance, rounded down to '+num(p.shows)+' additional shows.':'Custom starting plan: '+num(p.shows)+' of '+num(Math.floor(k.gap))+' available additional shows.';
    $('use-capacity').hidden=state.volumeMode==='capacity';
    $('operating-tradeoffs').innerHTML=R.operations(state,r).map(([a,b],i)=>'<article'+(i===2?' class="lion-route"':'')+'><p class="eyebrow gold">'+['MORE PHONE WORK','A TEAM TO RUN','ATTEND & CLOSE'][i]+'</p><h3>'+esc(a)+'</h3><p>'+esc(b)+'</p></article>').join('');
    $('plan-note').textContent='This plan moves from '+num(t.held)+' to '+num(p.totalShows)+' attended appointments per month, with '+num(p.remaining)+' slots remaining. Full unused capacity is an opportunity ceiling, not a delivery promise.';
    $('capacity-ceiling').textContent='Filling all '+num(k.gap)+' empty slots would represent '+money(k.saleValue)+' in potential monthly sale value, or '+money(k.contribution)+' after Lion appointment costs and before other business costs. This ceiling is separate from the proposed '+num(p.shows)+'-show starting plan and assumes every unused slot is filled.';
    const warnings=[];
    if(state.currentAppointments>state.capacity)warnings.push('Reported attendance exceeds capacity. There is no unused capacity to fill.');
    if(state.volumeMode==='custom'&&state.proposed>Math.floor(k.gap))warnings.push('Requested '+num(state.proposed)+' extra shows; this plan is limited to '+num(p.shows)+' within reported capacity. The requested field has not changed.');
    if(!p.shows)warnings.push('Choose a positive volume within unused capacity before proposing a starting plan.');
    else if(p.contribution<0)warnings.push('At these close-rate and sale-value assumptions, appointment spending exceeds modeled sale value.');
    if(p.breakEvenSales!==null&&p.breakEvenSales>p.shows)warnings.push('Even closing every proposed appointment would not cover appointment spending.');
    $('plan-warning').hidden=!warnings.length;$('plan-warning').textContent=warnings.join(' ');
    $('comparison-title').textContent='What does adding '+num(p.shows)+' shows require?';
    $('comparison-body').innerHTML=rowHtml(R.rows(r));
    document.querySelectorAll('[data-compare]').forEach(e=>e.setAttribute('aria-pressed',e.dataset.compare===state.compare));
    $('decision-copy').textContent=R.decision(state,r);
    const missing=[];
    if(!c.available)missing.push(!t.available?'Enter the actual wage paid to the current team.':'Enter viable connect, booking, and show rates to project more shows.');
    if(!h.available)missing.push('The hiring scenario needs a viable yield and available setter hours.');
    else if(!h.rampAvailable)missing.push('The entered training-ramp performance cannot produce the planned first-month shows. Review the reduction or ramp duration.');
    if(state.currentAppointments>state.leads)missing.push('Recorded shows exceed lead count; check that the numbers describe the same monthly leads.');
    $('comparison-warning').hidden=!missing.length;$('comparison-warning').textContent=missing.join(' ');
    const hrs=n=>num(n)+' hrs';
    $('detail-body').innerHTML=rowHtml([
      ['Required additional leads',val(c,'leads',num),val(h,'leads',num),'Included'],
      ['Additional lead spending',val(c,'leadCost'),val(h,'leadCost'),'Included'],
      ['Paid wages / salary',val(c,'labor'),val(h,'labor'),'Included'],
      ['New tools / other cash costs',val(c,'tools'),val(h,'tools'),'Included'],
      ['New setters required','Existing process',h.setters===null?'Unavailable':num(h.setters,0),'Included'],
      ['Calculated setting time / month',val(c,'dialing',hrs),val(h,'dialing',hrs),'Handled by Lion'],
      ['Dialing hours / month',c.available?hrs(c.callTime.dialMinutes/60):'Unavailable',h.available?hrs(h.callTime.dialMinutes/60):'Unavailable','Handled by Lion'],
      ['Unbooked connection talk / month',c.available?hrs(c.callTime.connectTalkMinutes/60):'Unavailable',h.available?hrs(h.callTime.connectTalkMinutes/60):'Unavailable','Handled by Lion'],
      ['Booked-call talk / month',c.available?hrs(c.callTime.bookingTalkMinutes/60):'Unavailable',h.available?hrs(h.callTime.bookingTalkMinutes/60):'Unavailable','Handled by Lion'],
      ['Your supervision / month','0 hrs',val(h,'ownerHours',hrs),'Handled by Lion'],
      ['Your hiring hours, once','0 hrs',val(h,'recruitHours',hrs),'Handled by Lion'],
      ['Your training hours, once','0 hrs',val(h,'trainingHours',hrs),'Handled by Lion'],
      ['Paid training ramp','Existing process',num(state.rampWeeks)+' weeks','Established team'],
      ['Post-ramp booking rate',num(state.book)+'%',num(h.effectiveBook)+'%','Pay per attendance'],
      ['First-month booking rate',num(state.book)+'%',num(h.rampBook)+'%','Pay per attendance'],
      ['First-month extra ramp leads','0',h.rampExtraLeads===null?'Unavailable':num(h.rampExtraLeads),'Included'],
      ['First-month extra lead spend for ramp',money(0),h.rampExtraCash===null?'Unavailable':money(h.rampExtraCash),'Included'],
      ['First-month cash including ramp & setup',val(c,'firstMonth'),h.firstMonth===null?'Unavailable':money(h.firstMonth),money(r.lion.firstMonth)]
    ]);
    $('funnel-check').textContent='Funnel estimate: '+num(r.funnel.held)+' shows. Recorded attendance: '+num(t.held)+'. '+(Math.abs(r.funnel.held-t.held)>.1?'They differ; check that the rates describe the same monthly leads. Recorded attendance stays unchanged.':'The inputs reconcile.');
    $('hire-summary').textContent=(h.available?num(h.setters,0)+' setter(s); '+money(h.cash)+' ongoing monthly cash after ramp, including leads, salary, and tools. '+num(h.hiringHours)+' hiring/training hours once + '+num(h.ownerHours)+' supervision hours monthly. First month: '+(h.firstMonth===null?'unavailable':money(h.firstMonth))+' including '+money(h.startup)+' recruiting cash and '+money(h.rampExtraCash)+' extra leads during ramp.':'Review the staffing and funnel inputs.')+' Ramp: '+num(state.penalty)+'% lower booking performance for '+num(state.rampWeeks)+' weeks; equal performance after ramp.';
    $('methodology').innerHTML='<p><strong>Calculated time:</strong> dialing minutes = leads × average attempts per lead × seconds per dial ÷ 60. Connections = leads × connect rate. Bookings = connections × booking rate. Talk minutes = (connections − bookings) × unbooked-connect minutes + bookings × total booked-call minutes. Setting hours = (dialing + talk minutes) ÷ 60. Booked-call time already includes the connection conversation; it is counted once. These estimates exclude other admin and reminder work.</p><p><strong>Today:</strong> cash cost = leads × cost per lead + existing tools + actual paid staff wages. Staff wages use calculated setting hours. Your own time has no dollar value.</p><p><strong>Growth:</strong> the recommended volume defaults to unused attended appointment capacity, rounded down; a custom starting volume stays editable. Proposed shows are limited to unused capacity. Projected yield = connect rate × booking rate × show rate. Additional leads = proposed shows ÷ projected yield. The same call-stage calculation estimates time for those leads. Current-process growth includes only new leads, actual staff wages, and the extra tools budget; existing tools are not charged again.</p><p><strong>Hiring:</strong> ongoing booking performance equals your current process. During the entered paid training ramp, booking performance is reduced by the entered percentage. First-month booking averages that reduction across ramp days (up to 30 days). Extra ramp leads = first-month leads required for the same shows minus post-ramp leads. Setters = round up the greater of ramp and ongoing call hours ÷ available hours, with a full salary for each setter. Tools, supervision, recruiting cash, and hiring/training hours scale by staff count. Paid setter training is covered by salary; owner training stays in hours. First-month cash = ongoing spending + recruiting cash + extra ramp lead spending. Salary already includes paid training and is never added a second time. Owner hiring, training, and supervision remain hours, with no dollar value. Later ramp months, sick days, turnover, and replacement hiring are operational considerations, not added dollar estimates.</p><p><strong>Lion:</strong> attended shows × appointment price. Potential sales use your close rate and net sale value after reserve. Contribution subtracts appointment spending only, before other business costs. Sales needed to cover spending = round up investment ÷ net sale value. Equal-volume cost differences are separate from growth contribution.</p>';
    $('benefit-title').textContent='Keep the leads that work. Add shows without another job.';
    $('personal-copy').textContent='Low-cost leads can stay in your business. This plan fills more of the calendar while Lion handles sourcing, chasing, and appointment setting for the added volume. You keep your attention on appointments and sales.';
    $('benefits').innerHTML=R.benefits(state,r).map(([a,b])=>'<article><h3>'+esc(a)+'</h3><p>'+esc(b)+'</p></article>').join('');
    $('proposal-summary').innerHTML='<strong>'+num(p.shows)+' attended appointments / month</strong><span>'+esc(state.product)+' · '+esc(state.market||'Market to confirm')+'</span><span>'+money(state.price)+' / show · '+money(p.investment)+' monthly investment</span>';
    $('next-summary').textContent=R.next(state,r);
    $('presentation-context').textContent=(state.prospect||'Prospective partner')+' / '+state.product;
    $('print-report').innerHTML=R.html(state,r);
  }
  document.addEventListener('input',e=>{
    const key=e.target.dataset.key;if(!key)return;
    if(schemas[key]){
      if(e.target.value==='')return;
      const n=Number(e.target.value);if(!Number.isFinite(n))return;
      state[key]=Math.min(schemas[key].max,Math.max(schemas[key].min,n));if(key==='proposed')state.volumeMode='custom';hydrate(e.target);
    }else state[key]=e.target.value;
    render();persist();
  });
  document.addEventListener('change',e=>{const key=e.target.dataset.key;if(schemas[key]){if(e.target.value===''){state[key]=schemas[key].min;if(key==='proposed')state.volumeMode='custom';}hydrate();render();persist();}});
  function selectTab(key){
    document.querySelectorAll('[data-tab]').forEach(b=>{const selected=b.dataset.tab===key;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;$('panel-'+b.dataset.tab).hidden=!selected;});
  }
  document.querySelectorAll('[data-tab]').forEach(b=>{
    b.addEventListener('click',()=>selectTab(b.dataset.tab));
    b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=['current','hired','lion'],i=tabs.indexOf(b.dataset.tab),next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;selectTab(tabs[next]);$('tab-'+tabs[next]).focus();});
  });
  $('use-capacity').addEventListener('click',()=>{state.volumeMode='capacity';hydrate();render();persist();});
  document.querySelectorAll('[data-compare]').forEach(b=>b.addEventListener('click',()=>{state.compare=b.dataset.compare;render();persist();}));
  $('present').addEventListener('click',()=>{presenting=!presenting;document.body.classList.toggle('presenting',presenting);$('present').setAttribute('aria-pressed',presenting);$('present').textContent=presenting?'Edit inputs':'Present';$('presentation-context').hidden=!presenting;});
  $('reset').addEventListener('click',()=>{state={...M.defaults};hydrate();render();persist();selectTab('current');});
  $('export').addEventListener('click',async()=>{
    const button=$('export');button.disabled=true;button.textContent='Preparing PDF…';
    try{
      const bytes=await R.build(state,M.calculate(state),window.PDFLib),url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
      const a=document.createElement('a');a.href=url;a.download='Lion-Appointment-Plan-'+(state.prospect||'Summary').replace(/[^a-zA-Z0-9-]/g,'-').slice(0,60)+'.pdf';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
    }catch{$('toast').textContent='The PDF could not be prepared. Please try again.';$('toast').hidden=false;setTimeout(()=>$('toast').hidden=true,4500);}
    finally{button.disabled=false;button.textContent='Download 1-page PDF';}
  });
  window.addEventListener('beforeprint',render);hydrate();render();
})();
