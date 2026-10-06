(function(root){
  const money=(n,d=0)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:d,maximumFractionDigits:d}).format(n):'—';
  const num=(n,d=1)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(n):'—';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date=()=>new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',dateStyle:'long'}).format(new Date());
  const formatDate=v=>/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v+'T12:00:00Z'))?new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(v+'T12:00:00Z')):'To confirm';
  const v=(m,key,f=money)=>m.available?f(m[key]):'Unavailable';
  function rows(r){
    return [
      ['Cash cost / attended appointment',v(r.current,'costHeld',n=>money(n,2)),v(r.hired,'costHeld',n=>money(n,2)),money(r.lion.costHeld,2)],
      ['Additional monthly cash cost',v(r.current,'cash'),v(r.hired,'cash'),money(r.lion.cash)],
      ['Your setting hours / month',v(r.current,'ownerHours',n=>num(n)+' hrs'),v(r.hired,'ownerHours',n=>num(n)+' hrs'),'Handled by Lion'],
      ['One-time setup cash',money(0),v(r.hired,'startup'),money(0)],
      ['Your hiring / training hours once','0 hrs',v(r.hired,'hiringHours',n=>num(n)+' hrs'),'Handled by Lion']
    ];
  }
  function decision(s,r){
    if(r.target===0)return 'There is no unused appointment capacity in this plan. Confirm capacity or the proposed volume before moving forward.';
    if(r.savings===null)return 'Confirm the missing baseline or staffing inputs before comparing cash costs and hours.';
    const name=s.compare==='hired'?'hiring a setter':'scaling your current process';
    const cost='For '+num(r.target)+' extra shows, Lion costs '+money(Math.abs(r.savings))+' '+(r.savings>=0?'less':'more')+' per month than '+name+'.';
    const time=r.ownerTime>0?' It avoids '+num(r.ownerTime)+' of your monthly setting hours for this volume.':' Appointment setting is handled by Lion; this scenario does not project any of your own monthly hours saved.';
    return cost+time;
  }
  function benefits(s,r){
    const pain=s.priority.toLowerCase();
    const list=[];
    if(/cold|outbound|aged/.test(pain))list.push(['Keep outbound focused','Keep cold and aged leads in their own queue while Lion handles the added appointments.']);
    else if(/hir|train|quit/.test(pain))list.push(['Skip hiring and onboarding',r.hired.available?'Avoid '+num(r.hired.hiringHours)+' hiring / training hours and '+num(s.rampWeeks)+' weeks of readiness time in the hiring scenario.':'Skip recruiting, onboarding, and paid setter setup.']);
    else if(/manag|supervis|team/.test(pain))list.push(['No added setting team to manage',r.hired.available?'Avoid '+num(r.hired.ownerHours)+' supervision hours each month in the hiring scenario.':'Lion handles appointment-setting supervision.']);
    else list.push(['Less time chasing leads',r.current.available&&r.current.ownerHours>0?'Avoid '+num(r.current.ownerHours)+' of your follow-up hours to generate this extra volume.':'Lion handles the follow-up for the extra appointments.']);
    list.push(['A clear price per show',money(s.price)+' for each attended appointment. Spend follows the agreed volume.']);
    list.push(/cold|outbound|aged/.test(pain)?['No added setting team','Lion handles the added appointment-setting work.']:['Keep your current channels','Add shows alongside current lead sources and cold outbound, without an added setting team.']);
    return list;
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
    return '<div class="decision-report"><div class="brand">LION MARKETING</div><h1>Your appointment plan</h1><p>Prepared for '+esc(s.prospect||'Prospective partner')+' / '+esc(s.product)+' / '+esc(s.market||'Market to confirm')+'</p><h2>Today</h2><p>'+num(r.today.held)+' shows / '+(r.today.available?money(r.today.cash):'Cash cost incomplete')+' cash / '+money(r.today.costHeld,2)+' per show / '+num(r.today.ownerHours)+' of your setting hours.</p><p>'+num(r.capacity.gap)+' empty slots out of '+num(s.capacity)+' monthly capacity.</p><h2>Proposed monthly plan</h2><p>'+num(r.target)+' extra shows / '+money(r.plan.investment)+' investment / '+money(r.plan.contribution)+' potential contribution / '+num(r.ownerTime)+' of your setting hours avoided.</p><p>'+coverage(s,r)+' Before other business costs.</p><h2>Three ways to add '+num(r.target)+' shows</h2><table><thead><tr><th></th><th>Your process</th><th>Hired setter</th><th>Lion</th></tr></thead><tbody>'+table+'</tbody></table><p>'+esc(decision(s,r))+'</p>'+benefits(s,r).map(([a,b])=>'<p><strong>'+esc(a)+':</strong> '+esc(b)+'</p>').join('')+'<h2>Next step</h2><p>'+esc(next(s,r))+'</p><p>Assumptions: '+num(s.close)+'% close / '+money(r.netValue)+' net value per sale / '+num(s.penalty)+'% setter reduction. Forecasts are not guaranteed. Hours have no dollar valuation.</p></div>';
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
    text('Fill the gap. Focus on sales.',36,677,29,serif);
    text((s.prospect||'Prospective partner')+' / '+s.product+' / '+(s.market||'Market to confirm'),36,658,10,sans,muted);
    text("TODAY'S BASELINE / MONTHLY",36,634,8,bold,muted);
    const stats=[['CURRENT SHOWS',num(r.today.held)],['MONTHLY CASH',r.today.available?money(r.today.cash):'Incomplete'],['CASH / SHOW',money(r.today.costHeld,2)],['YOUR SETTING TIME',num(r.today.ownerHours)+' hrs']];
    stats.forEach(([label,value],i)=>{const x=36+i*139;text(label,x,615,7.5,bold,muted,125);text(value,x,591,22,serif,ink,125);});
    text(num(r.capacity.gap)+' empty slots / '+num(s.capacity)+' monthly capacity. Proposed plan: '+num(r.plan.totalShows)+' total shows, with '+num(r.plan.remaining)+' slots remaining.',36,571,9,sans,muted);
    page.drawRectangle({x:36,y:452,width:540,height:103,color:ink});
    text('PROPOSED MONTHLY PLAN / ADD TO YOUR EXISTING PIPELINE',52,537,8,bold,white,508);
    const planStats=[['EXTRA SHOWS',num(r.target)],['LION INVESTMENT',money(r.plan.investment)],[r.plan.contribution<0?'POTENTIAL SHORTFALL':'POTENTIAL CONTRIBUTION',money(r.plan.contribution)],['YOUR HOURS AVOIDED',r.ownerTime===null?'Unavailable':num(r.ownerTime)+' hrs']];
    planStats.forEach(([label,value],i)=>{const x=52+i*130;text(label,x,516,6.9,bold,white,120);text(value,x,492,23,serif,rgb(.85,.79,.59),120);});
    text(num(r.target)+' shows x '+num(s.close)+'% close x '+money(r.netValue)+' net sale value, less '+money(r.plan.investment)+' appointment cost.',52,474,9,sans,white,508);
    text('Potential contribution is before other business costs. Hours compared with '+(s.compare==='hired'?'hiring a setter.':'your process scaled up.'),52,461,8,sans,white,508);
    paragraph(coverage(s,r),36,434,540,9,ink,1);
    text('Three ways to add '+num(r.target)+' attended appointments',36,408,19,serif);
    text("Additional costs only. Today's baseline spending is separate.",36,390,9,sans,muted);
    const colX=[36,259,367,475],colW=[223,108,108,101];
    page.drawRectangle({x:36,y:354,width:540,height:25,color:paper});
    ['','YOUR PROCESS','HIRED SETTER','LION / SHOW'].forEach((v,i)=>text(v,colX[i]+(i?7:0),363,8,bold,muted,colW[i]-12));
    rows(r).forEach((row,i)=>{const bottom=330-i*23;if(i===1)page.drawRectangle({x:36,y:bottom-1,width:540,height:23,color:paper});row.forEach((v,j)=>text(v,colX[j]+(j?7:0),bottom+7,9,j===3||i===1?bold:sans,ink,colW[j]-12));page.drawLine({start:{x:36,y:bottom},end:{x:576,y:bottom},thickness:.4,color:lineColor});});
    paragraph(decision(s,r),36,223,540,9,ink,2,12);
    benefits(s,r).forEach(([a,b],i)=>paragraph(a+': '+b,36,186-i*16,540,9,muted,1));
    text('PROPOSED NEXT STEP',36,129,8,bold,gold);
    paragraph(s.nextStep||'Confirm the product, market, appointment volume, and final quote.',36,113,540,9.5,ink,2,12);
    text('Next step: '+formatDate(s.nextDate)+' / Proposed launch: '+formatDate(s.launchDate),36,88,8,sans,muted);
    line(83);
    paragraph('Assumptions: '+num(s.close)+'% close; '+money(r.netValue)+' net value per sale; '+money(s.price)+'/show. Setter: '+money(s.setterMonthly)+'/month each; '+num(r.hired.setters,0)+' needed; '+num(s.penalty)+'% performance reduction.',36,70,540,8,muted,2,10);
    paragraph('Time: '+num(s.dialSeconds)+' sec/dial x '+num(s.attemptsPerLead)+' attempt(s)/lead; '+num(s.connectMinutes)+' min/unbooked connect; '+num(s.bookedMinutes)+' min/booked call. Booked talk includes the connection. Hours have no dollar value; results are estimates before other business costs.',36,43,540,8,muted,2,10);
    pdf.setTitle('Lion Marketing - Proposed Appointment Plan');pdf.setAuthor('Lion Marketing');return pdf.save();
  }
  root.LionReport={html,build,rows,decision,benefits,formatDate,next,coverage,money,num,esc};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.LionReport;
})(typeof globalThis!=='undefined'?globalThis:this);
