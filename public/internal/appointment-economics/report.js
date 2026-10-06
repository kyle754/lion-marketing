(function(root){
  const money=(n,d=0)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:d,maximumFractionDigits:d}).format(n):'—';
  const num=(n,d=1)=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(n):'—';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cut=(v,n=160)=>String(v??'').slice(0,n);
  const date=()=>new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',dateStyle:'long'}).format(new Date());
  function rows(r){
    const v=(m,key,f=money)=>m.available?f(m[key]):'Unavailable';
    return [
      ['Cost / attended appointment',v(r.current,'costHeld',n=>money(n,2)),v(r.hired,'costHeld',n=>money(n,2)),money(r.lion.costHeld,2)],
      ['Cash spend / month',v(r.current,'cash'),v(r.hired,'cash'),money(r.lion.cash)],
      ['Monthly cost incl. time value',v(r.current,'total'),v(r.hired,'total'),money(r.lion.total)],
      ['Your setting / management hours',v(r.current,'ownerHours',n=>num(n)+' hrs'),v(r.hired,'ownerHours',n=>num(n)+' hrs'),'0 hrs'],
      ['One-time hiring & training',money(0),money(r.hired.startup),money(0)],
    ];
  }
  const next=(s,r)=>cut(s.notes||`Agree on ${s.product.toLowerCase()}, market, and monthly volume. Plan to fill the ${num(r.capacity.gap)} remaining attended-appointment slots.`,190);
  function html(s,r){
    const k=r.capacity;
    return `<div class="decision-report"><div class="print-brand"><div class="brand"><span class="monogram">LM</span>LION MARKETING</div><span>${date()}</span></div><p class="eyebrow gold">APPOINTMENT OPPORTUNITY • MONTHLY</p><h1>Make room for more sales.</h1><p>Prepared for <strong>${esc(cut(s.prospect||'Prospective partner',80))}</strong> • ${esc(s.product)}</p><div class="print-capacity">${[['Capacity',k.limit],['Currently attended',k.current],['Empty slots',k.gap]].map(([label,v])=>`<div><span>${label}</span><strong>${num(v)}</strong></div>`).join('')}<div><span>Capacity used</span><strong>${num(k.utilization)}%</strong></div></div><div class="print-opportunity"><p class="eyebrow">POTENTIAL MONTHLY CONTRIBUTION FROM EMPTY SLOTS</p><strong>${money(k.contribution)}</strong><p>${num(k.gap)} more shows × ${num(s.close)}% close × ${money(r.netValue)} net value = ${money(k.saleValue)} sale value.<br>Less ${money(k.lionInvestment)} at ${money(s.price)} per show. Before other business costs.</p></div><h2>Three ways to fill the calendar</h2><p>Comparison at ${num(r.target)} attended appointments per month. One-time setup is separate.</p><table><thead><tr><th></th><th>Current</th><th>Hired setter</th><th>Lion</th></tr></thead><tbody>${rows(r).map(row=>`<tr>${row.map((v,i)=>i?`<td>${esc(v)}</td>`:`<th>${esc(v)}</th>`).join('')}</tr>`).join('')}</tbody></table><h2>With Lion, your focus stays on closing.</h2><div class="print-benefits"><div><strong>No setter to hire</strong><p>Skip recruiting, onboarding, and training.</p></div><div><strong>No setting team to manage</strong><p>Skip call reviews and daily supervision.</p></div><div><strong>Pay for attendance</strong><p>One agreed price per showed appointment.</p></div></div><h3>Recommended next step</h3><p>${esc(next(s,r))}</p><p class="print-fine">Assumptions: ${num(s.close)}% close; ${money(r.netValue)} net value per sale; ${money(s.price)} per show. Setter: ${money(s.setterHourly,2)}/hr with ${num(s.penalty)}% booking reduction. Monthly modeled costs include owner/agent time value, which is separate from cash savings. Potential value is a forecast, not guaranteed.</p></div>`;
  }
  async function build(s,r,lib){
    const {PDFDocument,StandardFonts,rgb}=lib;
    const pdf=await PDFDocument.create();const page=pdf.addPage([612,792]);
    const sans=await pdf.embedFont(StandardFonts.Helvetica), bold=await pdf.embedFont(StandardFonts.HelveticaBold), serif=await pdf.embedFont(StandardFonts.TimesRoman);
    const ink=rgb(.047,.106,.165), gold=rgb(.714,.631,.42), muted=rgb(.42,.45,.46), paper=rgb(.969,.957,.925), white=rgb(1,1,1), lineColor=rgb(.86,.84,.8);
    const safe=v=>String(v??'').replace(/[\r\n\t]/g,' ').replace(/[\u2010-\u2015]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/\u2026/g,'...').replace(/[^\x20-\x7e\u00a0-\u00ff]/g,'?');
    function text(v,x,y,size=10,font=sans,color=ink,max=540){
      const value=safe(v);let use=size;
      while(font.widthOfTextAtSize(value,use)>max&&use>6.5)use-=.25;
      page.drawText(value,{x,y,size:use,font,color});
    }
    function paragraph(v,x,y,width,size=9,color=muted,maxLines=2,lineHeight=12){
      const words=safe(v).split(/\s+/);const lines=[];let pending='';
      for(const word of words){
        const proposal=pending?pending+' '+word:word;
        if(sans.widthOfTextAtSize(proposal,size)>width&&pending){lines.push(pending);pending=word;}else pending=proposal;
      }
      if(pending)lines.push(pending);
      const shown=lines.slice(0,maxLines);
      if(lines.length>maxLines){let last=shown[maxLines-1];while(sans.widthOfTextAtSize(last+'...',size)>width&&last.length)last=last.slice(0,-1);shown[maxLines-1]=last+'...';}
      shown.forEach((v,i)=>text(v,x,y-i*lineHeight,size,sans,color,width));
    }
    const line=y=>page.drawLine({start:{x:36,y},end:{x:576,y},thickness:.7,color:lineColor});
    page.drawRectangle({x:36,y:737,width:32,height:32,borderWidth:.8,borderColor:gold});text('LM',42,747,15,serif,ink,22);
    text('LION MARKETING',80,748,10,bold);text(date(),430,748,8,sans,muted,146);line(726);
    text('APPOINTMENT OPPORTUNITY / MONTHLY',36,706,8,bold,gold);
    text('Make room for more sales.',36,676,29,serif);
    text(`Prepared for ${cut(s.prospect||'Prospective partner',75)}  |  ${s.product}`,36,657,10,sans,muted,540);
    const k=r.capacity;
    const stats=[['MONTHLY CAPACITY',num(k.limit)],['CURRENTLY ATTENDED',num(k.current)],['EMPTY SLOTS',num(k.gap)],['CAPACITY USED',k.utilization===null?'—':num(k.utilization)+'%']];
    stats.forEach(([label,value],i)=>{const x=36+i*139;text(label,x,632,7.2,bold,muted,125);text(value,x,607,24,serif,ink,125);});
    page.drawRectangle({x:36,y:481,width:540,height:107,color:ink});
    text(k.contribution>=0?'POTENTIAL MONTHLY CONTRIBUTION FROM EMPTY SLOTS':'MODELED MONTHLY SHORTFALL AT THIS APPOINTMENT PRICE',52,569,8,bold,white,508);
    text(money(k.contribution),52,535,34,serif,rgb(.85,.79,.59),508);
    text(`${num(k.gap)} more shows x ${num(s.close)}% close x ${money(r.netValue)} net value = ${money(k.saleValue)} sale value`,52,514,9,sans,white,508);
    text(`Less ${money(k.lionInvestment)} appointment cost at ${money(s.price)} per show. Before other business costs.`,52,498,8.5,sans,white,508);
    text('Three ways to fill the calendar',36,456,19,serif);
    text(`Same target: ${num(r.target)} attended appointments / month. One-time setup is separate.`,36,438,9,sans,muted);
    const colX=[36,233,360,468], colW=[197,127,108,108];
    page.drawRectangle({x:36,y:401,width:540,height:25,color:paper});
    ['','CURRENT','HIRED SETTER','LION / PAY PER SHOW'].forEach((v,i)=>text(v,colX[i]+(i?10:0),410,8,bold,i===3?ink:muted,colW[i]-17));
    rows(r).forEach((row,i)=>{
      const bottom=375-i*25;
      if(i===2)page.drawRectangle({x:36,y:bottom-1,width:540,height:25,color:paper});
      row.forEach((v,j)=>text(v,colX[j]+(j?10:0),bottom+7,j===0?8.5:10,i===2||j===3?bold:sans,ink,colW[j]-17));
      page.drawLine({start:{x:36,y:bottom},end:{x:576,y:bottom},thickness:.4,color:lineColor});
    });
    text('With Lion, your focus stays on closing.',36,251,19,serif);
    const benefits=[['No setter to hire','Skip recruiting, onboarding, and training.'],['No team to manage','Skip setting team supervision and call reviews.'],['Pay for attendance','One agreed price for each showed appointment.'],['Keep outbound focused','Keep cold / aged leads in their own queue.']];
    benefits.forEach(([title,body],i)=>{const x=36+i*139;text(title,x,229,10,bold,ink,125);paragraph(body,x,214,123,8.5,muted,3,11);});
    text('RECOMMENDED NEXT STEP',36,162,8,bold,gold);
    paragraph(next(s,r),36,145,540,10,ink,2,13);
    line(116);
    paragraph(`Assumptions: ${num(s.close)}% close | ${money(r.netValue)} net value per sale | ${money(s.price)} per show. Setter: ${money(s.setterHourly,2)}/hour with ${num(s.penalty)}% booking reduction.`,36,101,540,8,muted,2,11);
    paragraph('Monthly modeled cost includes owner / agent time value; cash spend excludes that time. Setup is separate. Empty-slot contribution is a forecast before other business expenses and is separate from equal-volume cost savings.',36,73,540,7.8,muted,2,10);
    text('LION MARKETING  /  APPOINTMENT ECONOMICS',36,39,7,bold,muted);text('ILLUSTRATIVE ESTIMATE / 1 PAGE',418,39,7,sans,muted,158);
    pdf.setTitle('Lion Marketing - Appointment Opportunity');pdf.setAuthor('Lion Marketing');pdf.setSubject('Monthly capacity opportunity and appointment cost comparison');
    return pdf.save();
  }
  root.LionReport={html,build};
  if(typeof module!=='undefined'&&module.exports)module.exports={html,build};
})(typeof globalThis!=='undefined'?globalThis:this);
