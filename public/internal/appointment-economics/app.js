(() => {
  const $=id=>document.getElementById(id),M=window.LionModel,R=window.LionReport,{money,num,esc}=R;
  const storageKey='lion-appointment-economics-v5',schemas={};
  const definitions={
    'baseline-fields':[
      ['capacity','Attended appointment capacity / month','',0,100000,1],['currentAppointments','Actual attended appointments / month','',0,100000,1,'Recorded result; never recalculated from funnel edits.'],
      ['leads','Leads per month','',0,1000000,1],['cpl','Cost per lead','$',0,100000,1],
      ['currentHours','Total follow-up hours / month','hrs',0,100000,.5,'Include dialing, retries, follow-up, and setting admin. Time stays in hours.'],
      ['close','Close rate','%',0,100,.1,'Sales ÷ attended appointments.',true],
      ['commission','Net commission / contribution per sale','$',0,1000000,50,'After direct delivery costs; before other business overhead.']],
    'funnel-fields':[['connect','Connect rate','%',0,100,.1,'Connected leads ÷ all leads.',true],['book','Appointment booking rate','%',0,100,.1,'Bookings ÷ connected leads.',true],['show','Appointment show rate','%',0,100,.1,'Attended appointments ÷ bookings.',true]],
    'cash-fields':[['tools','Existing tools / overhead per month','$',0,100000,10,'Included in today’s spending only.'],['extraTools','Extra tools needed to scale your process / month','$',0,100000,10,'Only new expenses for the additional appointments.']],
    'payroll-fields':[['staffHourly','Actual staff wage / hour','$',0,10000,1,'Use wages actually paid. Agent time has no hourly dollar value.']],
    'reserve-fields':[['reserve','Cancellation / chargeback reserve','%',0,100,1,'Reduces sale value only.',true]],
    'hire-fields':[['setterMonthly','Monthly salary per setter','$',0,100000,50]],
    'performance-fields':[['penalty','Optional booking performance reduction','%',0,100,1,'0% means equal performance. Applied once to the observed baseline yield.',true],['setterHours','Available follow-up hours per setter / month','hrs',0,500,5]],
    'setup-fields':[['hireFee','Recruiting cash cost per setter, once','$',0,100000,25],['recruitHours','Your hiring hours per setter, once','hrs',0,500,.5],['trainerHours','Your training hours per setter, once','hrs',0,500,.5],['manageHours','Supervision hours per setter / month','hrs',0,500,.5],['hireTools','Tools per setter / month','$',0,100000,10],['hireExtra','Other new team cash costs / month','$',0,100000,10],['rampWeeks','Recruiting & onboarding readiness time','wks',0,52,.5]],
    'lion-price-field':[['price','Cost per attended appointment','$',0,100000,5,'Starts at $250; varies by product and market.']],
    'proposal-fields':[['proposed','Additional appointments proposed / month','',0,100000,1,'A starting plan within unused capacity; not an automatic delivery commitment.']]
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
    for(const [key,allowed] of Object.entries({operator:['owner','team'],compare:['current','hired'],basis:['example','reported','verified'],quoteStatus:['starting','quoted'],product:['Final Expense','Term Life','IUL','Whole Life','Mortgage Protection','Annuity','Other']}))if(!allowed.includes(out[key]))out[key]=M.defaults[key];
    for(const key of ['launchDate','nextDate'])if(out[key]&&!/^\d{4}-\d{2}-\d{2}$/.test(out[key]))out[key]='';
    return out;
  }
  try{
    const saved=localStorage.getItem(storageKey);
    if(saved)state=validated(JSON.parse(saved));
    else{
      const old=localStorage.getItem('lion-appointment-economics-v4')||localStorage.getItem('lion-appointment-economics-v3')||localStorage.getItem('lion-appointment-economics-v2')||localStorage.getItem('lion-appointment-economics-v1');
      if(old){
        const v=JSON.parse(old);state=validated(v);
        state.currentHours=Number.isFinite(Number(v.minutes))?Math.max(0,Number(v.leads)*Number(v.minutes)/60):M.defaults.currentHours;
        state.proposed=Math.min(20,Math.max(0,state.capacity-state.currentAppointments));
        state.penalty=0;state.basis='example';state.quoteStatus='starting';
      }
    }
  }catch{}
  function hydrate(except){document.querySelectorAll('[data-key]').forEach(e=>{if(e!==except)e.value=state[e.dataset.key];});}
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));$('save-status').textContent='Saved in this browser. Reset for a new prospect.';}catch{$('save-status').textContent='Storage unavailable. Download the PDF to keep this plan.';}}
  const stats=items=>items.map(([label,value,detail])=>'<div><p class="eyebrow">'+esc(label)+'</p><strong>'+esc(value)+'</strong>'+(detail?'<p class="subhint">'+esc(detail)+'</p>':'')+'</div>').join('');
  const rowHtml=rows=>rows.map((row,i)=>'<tr'+(i===1?' class="total-row"':'')+'>'+row.map((v,j)=>'<'+(j?'td':'th scope="row"')+(j===3?' class="lion-col"':'')+'>'+esc(v)+'</'+(j?'td':'th')+'>').join('')+'</tr>').join('');
  const val=(m,k,f=money)=>m.available?f(m[k]):'Unavailable';
  function render(){
    const r=M.calculate(state),{today:t,current:c,hired:h,capacity:k,plan:p}=r;
    $('payroll-fields').hidden=state.operator!=='team';
    $('basis-pill').textContent=R.basis(state);
    $('baseline-period').textContent=state.period+' / '+state.source;
    $('today-stats').innerHTML=stats([['Monthly cash',t.available?money(t.cash):'Incomplete'],['Attended appointments',num(t.held)],['Cash cost / show',money(t.costHeld,2)],['Your setting hours',num(t.ownerHours)+' hrs',state.operator==='team'?num(t.dialing)+' paid-team follow-up hours':'Follow-up, retries & setting admin']]);
    $('capacity-copy').textContent=num(t.held)+' of '+num(k.limit)+' monthly appointment slots used';
    $('capacity-gap').textContent=num(k.gap)+' empty slots';
    $('capacity-bar').style.width=Math.min(100,k.utilization||0)+'%';
    $('today-note').textContent='This is today’s recorded baseline. It is separate from the growth projections below.';
    $('price-pill').textContent=money(state.price)+' / show · '+(state.quoteStatus==='quoted'?'Quoted':'Starting example');
    $('plan-label').textContent=p.contribution<0?'PROPOSED PLAN / REVIEW THE SHORTFALL':'YOUR PROPOSED MONTHLY PLAN';
    $('plan-stats').innerHTML=stats([['Additional shows',num(p.shows)],['Monthly investment',money(p.investment)],[p.contribution<0?'Potential shortfall':'Potential contribution',money(p.contribution),'Before other business costs'],['Your setting hours avoided',r.ownerTime===null?'Unavailable':num(r.ownerTime)+' hrs',state.compare==='hired'?'Versus hiring a setter':'Versus scaling your process']]);
    $('plan-equation').textContent=num(p.shows)+' shows × '+num(state.close)+'% close × '+money(r.netValue)+' net sale value = '+money(p.saleValue)+' potential sale value, less '+money(p.investment)+' appointment spending.';
    $('break-even').textContent=R.coverage(state,r);
    $('plan-note').textContent='This plan moves from '+num(t.held)+' to '+num(p.totalShows)+' attended appointments per month, with '+num(p.remaining)+' slots remaining. Full unused capacity is an opportunity ceiling, not a delivery promise.';
    $('capacity-ceiling').textContent='Filling all '+num(k.gap)+' empty slots would represent '+money(k.saleValue)+' in potential monthly sale value, or '+money(k.contribution)+' after Lion appointment costs and before other business costs. This ceiling is separate from the proposed '+num(p.shows)+'-show starting plan and assumes every unused slot is filled.';
    const warnings=[];
    if(state.currentAppointments>state.capacity)warnings.push('Reported attendance exceeds capacity. There is no unused capacity to fill.');
    if(state.proposed>Math.floor(k.gap))warnings.push('Requested '+num(state.proposed)+' extra shows; this plan is limited to '+num(p.shows)+' within reported capacity. The requested field has not changed.');
    if(!p.shows)warnings.push('Choose a positive volume within unused capacity before proposing a starting plan.');
    else if(p.contribution<0)warnings.push('At these close-rate and sale-value assumptions, appointment spending exceeds modeled sale value.');
    if(p.breakEvenSales!==null&&p.breakEvenSales>p.shows)warnings.push('Even closing every proposed appointment would not cover appointment spending.');
    $('plan-warning').hidden=!warnings.length;$('plan-warning').textContent=warnings.join(' ');
    $('comparison-title').textContent='Three ways to add '+num(p.shows)+' attended appointments';
    $('comparison-body').innerHTML=rowHtml(R.rows(r));
    document.querySelectorAll('[data-compare]').forEach(e=>e.setAttribute('aria-pressed',e.dataset.compare===state.compare));
    $('decision-copy').textContent=R.decision(state,r);
    const missing=[];
    if(!c.available)missing.push(!t.available?'Enter the actual wage paid to the current team.':'Your process needs recorded attended output from the same lead cohort to project more shows.');
    if(!h.available)missing.push('The hiring scenario needs a viable yield and available setter hours.');
    if(state.currentAppointments>state.leads)missing.push('Recorded shows exceed lead count; check cohort and reporting period before comparing.');
    $('comparison-warning').hidden=!missing.length;$('comparison-warning').textContent=missing.join(' ');
    const hrs=n=>num(n)+' hrs';
    $('detail-body').innerHTML=rowHtml([
      ['Required additional leads',val(c,'leads',num),val(h,'leads',num),'Included'],
      ['Additional lead spending',val(c,'leadCost'),val(h,'leadCost'),'Included'],
      ['Paid wages / salary',val(c,'labor'),val(h,'labor'),'Included'],
      ['New tools / other cash costs',val(c,'tools'),val(h,'tools'),'Included'],
      ['New setters required','Existing process',h.setters===null?'Unavailable':num(h.setters,0),'Included'],
      ['Follow-up operations / month',val(c,'dialing',hrs),val(h,'dialing',hrs),'Handled by Lion'],
      ['Your supervision / month','0 hrs',val(h,'ownerHours',hrs),'Handled by Lion'],
      ['Your hiring hours, once','0 hrs',val(h,'recruitHours',hrs),'Handled by Lion'],
      ['Your training hours, once','0 hrs',val(h,'trainingHours',hrs),'Handled by Lion'],
      ['Hiring scenario readiness','Existing process',num(state.rampWeeks)+' weeks','Confirm launch']
    ]);
    $('funnel-check').textContent='Funnel estimate: '+num(r.funnel.held)+' shows. Recorded attendance: '+num(t.held)+'. '+(Math.abs(r.funnel.held-t.held)>.1?'They differ; check that the rates cover the same cohort and period. Recorded attendance stays unchanged.':'The inputs reconcile.');
    $('hire-summary').textContent=(h.available?num(h.setters,0)+' setter(s) for this additional volume; '+money(h.labor)+' salary + '+money(h.tools)+' tools / other cash costs. '+num(h.ownerHours)+' supervision hours per month; '+money(h.startup)+' setup cash + '+num(h.hiringHours)+' hiring / training hours once.':'Review missing workload inputs.')+' Performance scenario: '+(state.penalty===0?'equal to the current process.':num(state.penalty)+'% reduction.');
    $('methodology').innerHTML='<p><strong>Today:</strong> leads × cost per lead + existing tools + actual paid staff wages. Your own time has no dollar value.</p><p><strong>Growth:</strong> proposed shows are limited to unused capacity. Observed yield = recorded attendance ÷ leads; additional required leads = proposed shows ÷ yield. Additional follow-up hours = required leads × current monthly follow-up hours ÷ current leads. The current process includes only new lead spending, paid staff wages, and the extra tools budget; existing tools are not charged again. Stable yield, lead availability, and workload are planning assumptions.</p><p><strong>Hiring:</strong> observed yield × (1 − optional performance reduction). Setters = round up follow-up hours ÷ available hours, with a full salary for each setter. Tools, supervision, recruiting cash, and hiring/training hours scale by staff count. Salary already covers paid setter training; owner training time stays in hours. One-time setup is never spread across monthly spending. Readiness weeks do not create a lost-sales estimate.</p><p><strong>Lion:</strong> proposed attended shows × appointment price. Potential sales use the prospect’s close rate and net sale value after reserve. Contribution subtracts Lion appointment spending only, before other business costs. Sales needed to cover spend = round up investment ÷ net sale value. Cost differences at the same extra volume are separate from growth contribution and are never added to it.</p>';
    $('benefit-title').textContent=state.priority?'Address the friction: '+state.priority:'Keep your focus on closing.';
    $('personal-copy').textContent=state.priority?'You identified “'+state.priority+'” as the biggest friction. This plan adds '+num(p.shows)+' attended appointments while Lion handles the appointment-setting work.':'Lion handles appointment setting for the proposed extra volume.';
    $('benefits').innerHTML=R.benefits(state,r).map(([a,b])=>'<article><h3>'+esc(a)+'</h3><p>'+esc(b)+'</p></article>').join('');
    $('proposal-summary').innerHTML='<strong>'+num(p.shows)+' attended appointments / month</strong><span>'+esc(state.product)+' · '+esc(state.market||'Market to confirm')+'</span><span>'+money(state.price)+' / show · '+money(p.investment)+' monthly investment</span><span>'+esc(state.quoteStatus==='quoted'?'Product / market quote entered':'Starting-price example; final quote to confirm')+'</span>';
    $('next-summary').textContent=R.next(state,r);
    $('presentation-context').textContent=(state.prospect||'Prospective partner')+' / '+state.product+' / '+R.basis(state);
    $('print-report').innerHTML=R.html(state,r);
  }
  document.addEventListener('input',e=>{
    const key=e.target.dataset.key;if(!key)return;
    if(schemas[key]){
      if(e.target.value==='')return;
      const n=Number(e.target.value);if(!Number.isFinite(n))return;
      state[key]=Math.min(schemas[key].max,Math.max(schemas[key].min,n));hydrate(e.target);
    }else state[key]=e.target.value;
    render();persist();
  });
  document.addEventListener('change',e=>{const key=e.target.dataset.key;if(schemas[key]){if(e.target.value==='')state[key]=schemas[key].min;hydrate();render();persist();}});
  function selectTab(key){
    document.querySelectorAll('[data-tab]').forEach(b=>{const selected=b.dataset.tab===key;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;$('panel-'+b.dataset.tab).hidden=!selected;});
  }
  document.querySelectorAll('[data-tab]').forEach(b=>{
    b.addEventListener('click',()=>selectTab(b.dataset.tab));
    b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=['current','hired','lion'],i=tabs.indexOf(b.dataset.tab),next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;selectTab(tabs[next]);$('tab-'+tabs[next]).focus();});
  });
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
