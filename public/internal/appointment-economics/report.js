(function(root){
  const money=(n,d=0)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:d,maximumFractionDigits:d}).format(n):'—';
  const num=(n,d=1)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(n):'—';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date=()=>new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',dateStyle:'long'}).format(new Date());
  const formatDate=v=>/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v+'T12:00:00Z'))?new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(v+'T12:00:00Z')):'To confirm';
  const v=(m,key,f=money)=>m.available?f(m[key]):'Unavailable';
  function rows(r){
    return [
      ['Monthly cash / after setter ramp',v(r.current,'cash'),v(r.hired,'cash'),money(r.lion.cash)],
      ['Cash cost / attended appointment',v(r.current,'costHeld',n=>money(n,2)),v(r.hired,'costHeld',n=>money(n,2)),money(r.lion.costHeld,2)],
      ['First-month cash / setup & ramp included',v(r.current,'firstMonth'),r.hired.rampAvailable?money(r.hired.firstMonth):'Unavailable',money(r.lion.firstMonth)],
      ['Your setting / supervision hours monthly',v(r.current,'ownerHours',n=>num(n)+' hrs'),v(r.hired,'ownerHours',n=>num(n)+' hrs'),'Handled by Lion'],
      ['Your hiring / training hours once','0 hrs',v(r.hired,'hiringHours',n=>num(n)+' hrs'),'Handled by Lion']
    ];
  }
  function valueCase(s,r){
    if(!r.target)return 'Confirm unused attended appointment capacity to build a growth plan.';
    return 'At your entered close rate, each '+money(s.price)+' attended appointment projects '+money(r.plan.valuePerShow)+' in sale value and '+money(r.plan.contributionPerShow)+' after the appointment cost, before other business costs.';
  }
  function costDifference(s,r){
    if(r.savings===null)return 'Confirm missing comparison inputs to compare cash costs.';
    return 'Lion costs '+money(Math.abs(r.savings))+' '+(r.savings>=0?'less':'more')+' monthly than '+(s.compare==='hired'?'hiring a setter after ramp.':'scaling your current process.');
  }
  function decision(s,r){
    if(r.target===0)return 'There is no unused appointment capacity in this plan. Confirm capacity or the proposed volume before moving forward.';
    if(r.plan.contribution<=0)return valueCase(s,r)+' Review the appointment price, close rate, and sale value before proceeding.';
    const burden=s.compare==='hired'&&r.hired.available?'Skip '+num(r.hired.hiringHours)+' hiring/training hours and '+num(r.hired.ownerHours)+' monthly supervision hours, with no setter team to run.':r.current.available?'Lion handles the '+num(r.plan.selfDials,0)+' added dial attempts and '+num(r.plan.selfHours)+' monthly setting hours this volume would require.':'Lion handles lead sourcing, follow-up, and appointment setting for the added volume.';
    return 'Your plan adds '+num(r.target)+' attended appointments and '+money(r.plan.contribution)+' in potential contribution after appointment spending, before other business costs. '+burden+' Keep the lead sources that already work for you.';
  }
  function operations(s,r){
    const team=s.operator==='team';
    return [
      ['Scale your current process',r.current.available?num(r.plan.selfDials,0)+' additional dial attempts and '+num(r.plan.selfHours)+' setting hours every month. More shows also mean more phone work'+(team?' for your team.':'.'):'Enter viable funnel rates to calculate the added phone workload.'],
      ['Build and manage a setter team',r.hired.available?num(r.hired.hiringHours)+' hiring/training hours once + '+num(r.hired.ownerHours)+' supervision hours monthly. Plan for '+num(s.rampWeeks)+' weeks of training ramp, plus sick-day coverage, turnover, and retraining.':'Recruit, train, supervise, and arrange coverage for absences and turnover.'],
      ['Lion handles appointment setting','An established team handles lead sourcing and follow-up from the agreed launch. You attend appointments and close sales. Pay '+money(s.price)+' only when the prospect attends.']
    ];
  }
  function benefits(s,r){
    return [
      ['More selling. Less lead chasing.',r.current.available?'Add '+num(r.target)+' shows without adding '+num(r.plan.selfHours)+' monthly setting hours to your operation.':'Lion handles the lead follow-up and appointment setting.'],
      ['No setter team to build or run','Skip recruiting, training, daily supervision, sick-day coverage, replacement hiring, and retraining for this added volume.'],
      ['Pay for attendance','An established setting team. One agreed '+money(s.price)+' price per attended appointment. Keep your current lead sources and add to the calendar.']
    ];
  }
  function next(s,r){
    return (s.nextStep||'Confirm the product, market, appointment volume, and final quote.')+(s.nextDate?' Next step: '+formatDate(s.nextDate)+'.':'')+(s.launchDate?' Proposed launch: '+formatDate(s.launchDate)+'.':'');
  }
  function coverage(s,r){
    if(!r.target)return 'Choose a positive appointment plan to calculate investment coverage.';
    if(r.plan.breakEvenSales===null)return 'Appointment spending is not covered at the entered net sale value.';
    return num(r.plan.breakEvenSales,0)+' '+(r.plan.breakEvenSales===1?'sale':'sales')+' to cover '+money(r.plan.investment)+' in appointment spending. Modeled sales: '+num(r.plan.sales)+'.';
  }
  function html(s,r){
    const table=rows(r).map(row=>'<tr>'+row.map((x,i)=>'<'+(i?'td':'th')+'>'+esc(x)+'</'+(i?'td':'th')+'>').join('')+'</tr>').join('');
    return '<div class="decision-report"><div class="brand">LION MARKETING</div><h1>Fill your calendar. Focus on sales.</h1><p>Prepared for '+esc(s.prospect||'Prospective partner')+' / '+esc(s.product)+' / '+esc(s.market||'Market to confirm')+'</p><h2>Your opportunity</h2><p>'+num(r.today.held)+' attended appointments / '+num(s.capacity)+' monthly capacity / '+num(r.capacity.gap)+' empty slots.</p><h2>Your appointment plan</h2><p>'+num(r.target)+' extra shows / '+money(r.plan.investment)+' appointment spend / '+money(r.plan.contribution)+' potential contribution / '+num(r.plan.returnMultiple,2)+'x projected sale value to spend.</p><p>'+esc(valueCase(s,r))+'</p><p>'+coverage(s,r)+'</p><h2>What this growth requires</h2><table><thead><tr><th></th><th>Your process</th><th>Hired setter</th><th>Lion</th></tr></thead><tbody>'+table+'</tbody></table>'+operations(s,r).map(([a,b])=>'<p><strong>'+esc(a)+':</strong> '+esc(b)+'</p>').join('')+'<p>'+esc(decision(s,r))+'</p><h2>Next step</h2><p>'+esc(next(s,r))+'</p><p>Assumptions: '+num(s.close)+'% close / '+money(r.netValue)+' net value per sale / '+num(s.penalty)+'% booking reduction during '+num(s.rampWeeks)+' weeks of training ramp. Post-ramp booking matches your process. Returns are estimates before other business costs. Hours have no dollar valuation.</p></div>';
  }
  async function build(s,r,lib){
    const {PDFDocument,StandardFonts,rgb}=lib,pdf=await PDFDocument.create(),page=pdf.addPage([612,792]);
    const sans=await pdf.embedFont(StandardFonts.Helvetica),bold=await pdf.embedFont(StandardFonts.HelveticaBold),serif=await pdf.embedFont(StandardFonts.TimesRoman);
    const ink=rgb(.047,.106,.165),gold=rgb(.714,.631,.42),muted=rgb(.42,.45,.46),paper=rgb(.969,.957,.925),white=rgb(1,1,1),lineColor=rgb(.86,.84,.8);
    const safe=v=>String(v??'').replace(/[\r\n\t]/g,' ').replace(/[\u2010-\u2015]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/\u2026/g,'...').replace(/[^\x20-\x7e\u00a0-\u00ff]/g,'?');
    function text(v,x,y,size=10,font=sans,color=ink,max=540){
      let value=safe(v),use=size;
      while(font.widthOfTextAtSize(value,use)>max&&use>8)use-=.25;
      while(font.widthOfTextAtSize(value,use)>max&&value.length>3)value=value.slice(0,-4)+'...';
      page.drawText(value,{x,y,size:use,font,color});
    }
    function paragraph(v,x,y,width=540,size=9,color=muted,maxLines=2,lineHeight=12){
      const lines=[];let pending='';
      for(const word of safe(v).split(/\s+/)){
        const proposal=pending?pending+' '+word:word;
        if(sans.widthOfTextAtSize(proposal,size)>width&&pending){lines.push(pending);pending=word;}else pending=proposal;
      }
      if(pending)lines.push(pending);
      const shown=lines.slice(0,maxLines);
      if(lines.length>maxLines){let last=shown[maxLines-1];while(sans.widthOfTextAtSize(last+'...',size)>width&&last.length)last=last.slice(0,-1);shown[maxLines-1]=last+'...';}
      shown.forEach((v,i)=>text(v,x,y-i*lineHeight,size,sans,color,width));
    }
    const line=y=>page.drawLine({start:{x:36,y},end:{x:576,y},thickness:.7,color:lineColor});
    page.drawRectangle({x:36,y:737,width:32,height:32,borderWidth:.8,borderColor:gold});text('LM',42,747,15,serif,ink,22);text('LION MARKETING',80,748,10,bold);text(date(),430,748,8,sans,muted,146);line(726);
    text('YOUR APPOINTMENT OPPORTUNITY',36,705,8,bold,gold);
    text('Fill your calendar. Focus on sales.',36,677,28,serif);
    text((s.prospect||'Prospective partner')+' / '+s.product+' / '+(s.market||'Market to confirm'),36,658,10,sans,muted);
    text("TODAY'S BASELINE / MONTHLY",36,634,8,bold,muted);
    const stats=[['CURRENT SHOWS',num(r.today.held)],['MONTHLY CASH',r.today.available?money(r.today.cash):'Incomplete'],['CASH / SHOW',money(r.today.costHeld,2)],['YOUR SETTING TIME',num(r.today.ownerHours)+' hrs']];
    stats.forEach(([label,value],i)=>{const x=36+i*139;text(label,x,615,7.5,bold,muted,125);text(value,x,591,22,serif,ink,125);});
    text(num(r.capacity.gap)+' empty slots / '+num(s.capacity)+' monthly capacity. Proposed plan: '+num(r.plan.totalShows)+' total shows, with '+num(r.plan.remaining)+' slots remaining.',36,571,9,sans,muted);
    page.drawRectangle({x:36,y:452,width:540,height:103,color:ink});
    text('PROPOSED MONTHLY PLAN / ADD TO YOUR EXISTING PIPELINE',52,537,8,bold,white,508);
    const planStats=[['EXTRA SHOWS',num(r.target)],['LION INVESTMENT',money(r.plan.investment)],[r.plan.contribution<0?'POTENTIAL SHORTFALL':'POTENTIAL CONTRIBUTION',money(r.plan.contribution)],['PROJECTED SALE VALUE / SPEND',r.plan.returnMultiple===null?'Unavailable':num(r.plan.returnMultiple,2)+'x']];
    planStats.forEach(([label,value],i)=>{const x=52+i*130;text(label,x,516,6.9,bold,white,120);text(value,x,492,23,serif,rgb(.85,.79,.59),120);});
    text(num(r.target)+' shows x '+num(s.close)+'% close x '+money(r.netValue)+' net sale value, less '+money(r.plan.investment)+' appointment cost.',52,474,9,sans,white,508);
    text('Potential contribution is after appointment spending, before other business costs. Return = sale value / appointment spend.',52,461,8,sans,white,508);
    paragraph(coverage(s,r),36,434,540,9,ink,1);
    text('What does adding '+num(r.target)+' shows require?',36,408,20,serif);
    text("Same extra shows. Monthly hiring cost is after ramp; first month includes setup and ramp.",36,390,8.5,sans,muted);
    const colX=[36,259,367,475],colW=[223,108,108,101];
    page.drawRectangle({x:36,y:354,width:540,height:25,color:paper});
    ['','YOUR PROCESS','HIRED SETTER','LION / SHOW'].forEach((v,i)=>text(v,colX[i]+(i?7:0),363,8,bold,muted,colW[i]-12));
    rows(r).forEach((row,i)=>{const bottom=330-i*23;if(i===0)page.drawRectangle({x:36,y:bottom-1,width:540,height:23,color:paper});row.forEach((v,j)=>text(v,colX[j]+(j?7:0),bottom+7,9,j===3||i===0?bold:sans,ink,colW[j]-12));page.drawLine({start:{x:36,y:bottom},end:{x:576,y:bottom},thickness:.4,color:lineColor});});
    operations(s,r).forEach(([a,b],i)=>paragraph(a+': '+b,36,223-i*36,540,8.5,i===2?ink:muted,2,11));
    text('KEEP WHAT WORKS. ADD SHOWS WITHOUT ADDING A SETTING TEAM.',36,112,8,bold,gold);
    paragraph(s.nextStep||'Next step: confirm the product, market, appointment volume, and final quote.',36,97,540,9,ink,2,11);
    text('Next step: '+formatDate(s.nextDate)+' / Proposed launch: '+formatDate(s.launchDate),36,72,8,sans,muted);
    line(66);
    paragraph('Assumptions: '+num(s.close)+'% close; '+money(r.netValue)+' net sale value; '+money(s.price)+'/show. Setter: '+money(s.setterMonthly)+'/month; '+num(r.hired.setters,0)+' needed; '+num(s.penalty)+'% booking reduction during '+num(s.rampWeeks)+' weeks of ramp. First month uses 30 days; post-ramp performance matches your process.',36,54,540,7.5,muted,2,9);
    paragraph('Time: '+num(s.dialSeconds)+' sec/dial x '+num(s.attemptsPerLead)+' attempts/lead; '+num(s.connectMinutes)+' min/unbooked connect; '+num(s.bookedMinutes)+' min/booked call, including the connection. Hours have no dollar value. Results are estimates before other business costs.',36,28,540,7.5,muted,2,9);
    pdf.setTitle('Lion Marketing - Proposed Appointment Plan');pdf.setAuthor('Lion Marketing');return pdf.save();
  }
  root.LionReport={html,build,rows,decision,benefits,valueCase,costDifference,operations,formatDate,next,coverage,money,num,esc};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.LionReport;
})(typeof globalThis!=='undefined'?globalThis:this);
