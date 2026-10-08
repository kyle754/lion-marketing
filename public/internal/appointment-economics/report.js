(function(root){
  const money=(n,d=0)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:d,maximumFractionDigits:d}).format(n):'—';
  const num=(n,d=1)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(n):'—';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date=()=>new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',dateStyle:'long'}).format(new Date());
  const formatDate=v=>/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v+'T12:00:00Z'))?new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(v+'T12:00:00Z')):'To confirm';
  const v=(m,key,f=money)=>m.available?f(m[key]):'Unavailable';
  const reportScript=typeof document!=='undefined'?document.currentScript?.src:null;
  let fontAssetsPromise;
  function loadFonts(){
    if(!fontAssetsPromise){
      fontAssetsPromise=(async()=>{
        if(!reportScript)throw new Error('PDF font assets must be supplied outside the browser.');
        const asset=path=>new URL(path,reportScript).href;
        const kit=window.fontkit?Promise.resolve(window.fontkit):new Promise((resolve,reject)=>{
          const script=document.createElement('script');script.src=asset('vendor/fontkit.umd.min.js');
          script.onload=()=>window.fontkit?resolve(window.fontkit):reject(new Error('PDF font library unavailable.'));
          script.onerror=()=>{script.remove();reject(new Error('PDF font library could not load.'));};
          document.head.appendChild(script);
        });
        const bytes=async path=>{const response=await fetch(asset(path));if(!response.ok)throw new Error('PDF typeface unavailable.');return new Uint8Array(await response.arrayBuffer());};
        const [fontkit,sans,bold,serif]=await Promise.all([kit,bytes('fonts/Lato-Regular.ttf'),bytes('fonts/Lato-Bold.ttf'),bytes('fonts/LibreBaskerville-Regular.ttf')]);
        return {fontkit,sans,bold,serif};
      })().catch(error=>{fontAssetsPromise=null;throw error;});
    }
    return fontAssetsPromise;
  }
  const roiPercent=r=>r.plan.returnMultiple===null?null:(r.plan.returnMultiple-1)*100;
  const executiveRows=r=>{const all=rows(r);return [all[0],all[1],all[3],all[4]];};
  function rows(r){
    return [
      ['Total cash - first month',v(r.current,'firstMonth'),r.hired.rampAvailable?money(r.hired.firstMonth):'Unavailable',money(r.lion.firstMonth)],
      ['Total cash / month after ramp',v(r.current,'cash'),v(r.hired,'cash'),money(r.lion.cash)],
      ['Cash / attended appointment',v(r.current,'costHeld',n=>money(n,2)),v(r.hired,'costHeld',n=>money(n,2)),money(r.lion.costHeld,2)],
      ['Your hours - first month',v(r.current,'firstMonthOwnerHours',n=>num(n)+' hrs'),r.hired.rampAvailable?num(r.hired.firstMonthOwnerHours)+' hrs':'Unavailable','0 hrs'],
      ['Your hours / month after ramp',v(r.current,'ownerHours',n=>num(n)+' hrs'),v(r.hired,'ownerHours',n=>num(n)+' hrs'),'0 hrs']
    ];
  }
  function valueCase(s,r){
    if(!r.target)return 'Confirm unused attended appointment capacity to build a growth plan.';
    return 'At your entered close rate, each '+money(s.price)+' attended appointment projects '+money(r.plan.valuePerShow)+' in revenue. Revenue less the appointment fee: '+money(r.plan.contributionPerShow)+' per show, before other business costs.';
  }
  function costDifference(s,r){
    if(r.savings===null)return 'Confirm missing comparison inputs to compare cash costs.';
    return 'Lion costs '+money(Math.abs(r.savings))+' '+(r.savings>=0?'less':'more')+' monthly than '+(s.compare==='hired'?'hiring a setter after ramp.':'scaling your current process.');
  }
  function decision(s,r){
    if(r.target===0)return 'There is no unused appointment capacity in this plan. Confirm capacity or the proposed volume before moving forward.';
    if(r.plan.contribution<=0)return valueCase(s,r)+' Review the appointment price, close rate, and sale value before proceeding.';
    const burden=s.compare==='hired'&&r.hired.available?'Skip '+num(r.hired.hiringHours)+' hiring/training hours and '+num(r.hired.ownerHours)+' monthly supervision hours, with no setter team to run.':r.current.available?'Lion handles the '+num(r.plan.selfDials,0)+' added dial attempts and '+num(r.plan.selfHours)+' monthly setting hours this volume would require.':'Lion handles lead sourcing, follow-up, and appointment setting for the added volume.';
    return 'Your plan adds '+num(r.target)+' attended appointments and '+money(r.plan.saleValue)+' in projected monthly revenue. After '+money(r.plan.investment)+' in Lion appointment fees, '+money(r.plan.contribution)+' remains before other business costs. '+costDifference(s,r)+' '+burden+' Keep the lead sources that already work for you.';
  }
  function operations(s,r){
    const team=s.operator==='team';
    return [
      ['Scale your current process',r.current.available?num(r.plan.selfDials,0)+' additional dial attempts and '+num(r.plan.selfHours)+' setting hours every month. More shows also mean more phone work'+(team?' for your team.':'.'):'Enter viable funnel rates to calculate the added phone workload.'],
      ['Build and manage a setter team',r.hired.available?num(r.hired.hiringHours)+' hiring/training hours once + '+num(r.hired.ownerHours)+' supervision hours monthly for KPI checks, coaching, and questions. Plan for '+num(s.rampWeeks)+' weeks of training ramp, plus sick-day coverage, turnover, and retraining.':'Recruit, train, supervise, and arrange coverage for absences and turnover.'],
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
    if(r.plan.breakEvenSales===null)return 'Appointment spending is not covered at the entered revenue per sale.';
    return num(r.plan.breakEvenSales,0)+' '+(r.plan.breakEvenSales===1?'sale':'sales')+' to cover '+money(r.plan.investment)+' in appointment spending. Modeled sales: '+num(r.plan.sales)+'.';
  }
  function html(s,r){
    const p=r.plan,roi=roiPercent(r);
    const table=executiveRows(r).map(row=>'<tr>'+row.map((x,i)=>'<'+(i?'td':'th')+'>'+esc(x)+'</'+(i?'td':'th')+'>').join('')+'</tr>').join('');
    return '<div class="decision-report"><div class="brand">LION MARKETING</div><p>Prepared for '+esc(s.prospect||'Prospective partner')+' / '+esc(s.product)+' / '+esc(s.market||'Market to confirm')+'</p><h2>Your monthly appointment plan</h2><section class="report-revenue"><p>PROJECTED MONTHLY REVENUE</p><h1>'+money(p.saleValue)+'</h1><p>From the additional Lion appointments. Before appointment and other business costs.</p><div class="report-plan"><span>'+num(r.target)+' extra shows</span><span>'+money(p.investment)+' Lion investment</span><span>'+(roi===null?'Unavailable':num(roi,0)+'%')+' projected ROI</span></div><p>'+num(p.returnMultiple,2)+'x projected revenue to spend.</p></section><p><strong>'+money(p.contribution)+'/month after Lion fees</strong>, before other business costs.</p><p>'+num(r.today.held)+' current + '+num(r.target)+' Lion shows = '+num(p.totalShows)+' of '+num(s.capacity)+' monthly slots filled.</p><h2>Same shows. Less to manage.</h2><table><thead><tr><th></th><th>More leads</th><th>Hire a setter</th><th>Lion</th></tr></thead><tbody>'+table+'</tbody></table><p>First-month totals include setup and ramp. Hours include hiring/training in month one. Everyone still attends appointments and closes sales.</p><p><strong>No setting team to manage. Pay only for shows.</strong></p><h2>Next step</h2><p>'+esc(next(s,r))+'</p><p>Projection: '+num(s.close)+'% close / '+money(r.netValue)+' revenue per sale after reserve. ROI = (revenue - Lion fees) / Lion fees, before other business costs. Setter: '+money(s.setterMonthly)+'/month; '+num(s.penalty)+'% lower booking during '+num(s.rampWeeks)+' weeks of ramp. Projections are not guaranteed; see the calculator for full assumptions.</p></div>';
  }
  async function build(s,r,lib,assets){
    const {PDFDocument,rgb}=lib,pdf=await PDFDocument.create(),page=pdf.addPage([612,792]);
    const fonts=assets||await loadFonts();pdf.registerFontkit(fonts.fontkit);
    const [sans,bold,serif]=await Promise.all([pdf.embedFont(fonts.sans,{subset:true}),pdf.embedFont(fonts.bold,{subset:true}),pdf.embedFont(fonts.serif,{subset:true})]);
    const ink=rgb(.047,.106,.165),gold=rgb(.714,.631,.42),muted=rgb(.37,.41,.44),paper=rgb(1,.992,.973),white=rgb(1,1,1),cream=rgb(.955,.937,.889),soft=rgb(.75,.79,.81),rule=rgb(.86,.84,.8);
    const safe=v=>String(v??'').replace(/[\r\n\t]/g,' ').replace(/[\u2010-\u2015]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/\u2026/g,'...').replace(/[^\x20-\x7e\u00a0-\u00ff]/g,'?');
    function text(value,x,y,size=11,font=sans,color=ink,max=540){
      value=safe(value);let use=size;
      while(font.widthOfTextAtSize(value,use)>max&&use>9)use-=.25;
      while(font.widthOfTextAtSize(value,use)>max&&value.length>3)value=value.slice(0,-4)+'...';
      page.drawText(value,{x,y,size:use,font,color});
    }
    function paragraph(value,x,y,width=540,size=10,color=muted,maxLines=2,lineHeight=13){
      const lines=[];let pending='';
      for(const word of safe(value).split(/\s+/)){
        const proposed=pending?pending+' '+word:word;
        if(sans.widthOfTextAtSize(proposed,size)>width&&pending){lines.push(pending);pending=word;}else pending=proposed;
      }
      if(pending)lines.push(pending);
      const shown=lines.slice(0,maxLines);
      if(lines.length>maxLines){let last=shown[maxLines-1];while(sans.widthOfTextAtSize(last+'...',size)>width&&last.length)last=last.slice(0,-1);shown[maxLines-1]=last+'...';}
      shown.forEach((v,i)=>text(v,x,y-i*lineHeight,size,sans,color,width));
    }
    const line=(y,x=36,width=540,color=rule)=>page.drawLine({start:{x,y},end:{x:x+width,y},thickness:.7,color});
    page.drawRectangle({x:0,y:0,width:612,height:792,color:paper});
    page.drawRectangle({x:36,y:738,width:30,height:30,borderWidth:.8,borderColor:gold});
    text('LM',41,747,14,serif,ink,22);text('LION MARKETING',78,749,10.5,bold);
    text(date(),430,749,9.5,sans,muted,146);
    text((s.prospect||'Prospective partner')+' / '+s.product+' / '+(s.market||'Market to confirm'),36,719,11,sans,muted);
    text('Your monthly appointment plan',36,691,22,serif);

    const p=r.plan,roi=roiPercent(r);
    page.drawRectangle({x:42,y:442,width:540,height:227,color:gold});
    page.drawRectangle({x:36,y:448,width:540,height:227,color:ink});
    text('PROJECTED MONTHLY REVENUE',54,647,10,bold,gold,504);
    text(money(p.saleValue),52,586,54,serif,white,504);
    text(num(p.sales)+' projected sales x '+money(r.netValue)+' revenue per sale',54,565,12,sans,white,504);
    text('From the additional Lion appointments. Before appointment and business costs.',54,547,10.5,sans,soft,504);
    line(531,54,504,rgb(.25,.31,.35));
    const stats=[['ADDITIONAL SHOWS',num(r.target),'Attended appointments / month'],['LION INVESTMENT',money(p.investment),money(s.price)+' / attended show'],['PROJECTED ROI',roi===null?'Unavailable':num(roi,0)+'%',p.returnMultiple===null?'Set an appointment price':num(p.returnMultiple,2)+'x revenue / Lion fees']];
    stats.forEach(([label,value,detail],i)=>{const x=54+i*171;text(label,x,509,9,bold,soft,159);text(value,x,475,26,serif,gold,159);text(detail,x,457,9.5,sans,soft,159);});

    page.drawRectangle({x:36,y:388,width:540,height:44,color:cream});
    text('Revenue after Lion appointment fees',50,413,11,bold,ink,270);
    text('Before other business costs',50,397,10,sans,muted,270);
    text(money(p.contribution)+'/mo',328,402,24,serif,ink,232);
    text(num(r.today.held)+' current + '+num(r.target)+' Lion shows = '+num(p.totalShows)+' of '+num(s.capacity)+' monthly slots filled.',36,365,11,sans,muted);

    text('Same shows. Less to manage.',36,337,21,serif);
    text('Compare the same '+num(r.target)+' additional attended appointments each month.',36,319,10.5,sans,muted);
    const colX=[36,259,367,475],colW=[223,108,108,101];
    page.drawRectangle({x:36,y:286,width:540,height:23,color:cream});
    ['YOUR COSTS & TIME','MORE LEADS','HIRE A SETTER','LION'].forEach((v,i)=>text(v,colX[i]+8,295,9,bold,muted,colW[i]-16));
    const data=executiveRows(r),labels=['Cash - first month','Cash / month after ramp','Your hours - first month','Your hours / month'];
    data.forEach((row,i)=>{
      const bottom=258-i*28;
      page.drawRectangle({x:475,y:bottom,width:101,height:28,color:ink});
      row.forEach((value,j)=>text(j?value:labels[i],colX[j]+8,bottom+9,11,j?bold:sans,j===3?white:ink,colW[j]-16));
      line(bottom);
    });
    paragraph('First month includes setup and ramp; monthly cash is after ramp. Your hours include hiring/training in month one. Everyone still attends appointments and closes sales.',36,159,540,10,muted,2,12);
    text('No setting team to manage. Pay only for shows. You attend and close.',36,126,11,bold,ink);
    text('NEXT STEP',36,107,9,bold,gold);
    paragraph(s.nextStep||'Confirm '+num(r.target)+' attended appointments/month at '+money(s.price)+' per show.',36,93,540,10,ink,2,12);
    if(s.nextDate||s.launchDate)text((s.nextDate?'Next step: '+formatDate(s.nextDate):'')+(s.nextDate&&s.launchDate?' / ':'')+(s.launchDate?'Launch: '+formatDate(s.launchDate):''),36,69,9,sans,muted);
    line(63);
    text('Projection: '+num(s.close)+'% close; '+money(r.netValue)+' revenue/sale after reserve. ROI = (revenue - Lion fees) / Lion fees.',36,50,9,sans,muted);
    text('Setter: '+money(s.setterMonthly)+'/month; '+num(s.penalty)+'% lower booking during '+num(s.rampWeeks)+' weeks of ramp. Setup/ramp included in first month.',36,38,9,sans,muted);
    text('Revenue and ROI are projected before other business costs, not guaranteed. See the calculator for full assumptions.',36,26,9,sans,muted);
    pdf.setTitle('Lion Marketing - Monthly Appointment Plan');pdf.setAuthor('Lion Marketing');return pdf.save();
  }
  root.LionReport={html,build,loadFonts,roiPercent,executiveRows,rows,decision,benefits,valueCase,costDifference,operations,formatDate,next,coverage,money,num,esc};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.LionReport;
})(typeof globalThis!=='undefined'?globalThis:this);
