(function(root){
  const defaults = {
    prospect:'', product:'Final Expense', source:'Paid inbound leads', operator:'owner', notes:'',
    leads:200, cpl:45, connect:60, book:55, show:65, close:20,
    minutes:12, staffHourly:0, tools:150, commission:2500, reserve:0,
    capacity:80, currentAppointments:42.9, targetMode:'capacity', target:40, compare:'current',
    setterMonthly:1200, setterHours:160, penalty:15,
    hireFee:300, recruitHours:6, trainerHours:10,
    manageHours:8, hireTools:150, hireExtra:0, rampWeeks:4,
    price:250, priority:'Time spent chasing leads', quality:'',
  };
  const rate=n=>Number(n)/100;
  const divide=(a,b)=>b>0?a/b:null;
  function calculate(s){
    const netValue=s.commission*(1-rate(s.reserve));
    const funnel={leads:s.leads,connected:s.leads*rate(s.connect)};
    funnel.booked=funnel.connected*rate(s.book);
    funnel.held=funnel.booked*rate(s.show);
    funnel.sales=funnel.held*rate(s.close);
    const target=s.targetMode==='capacity'?s.capacity:s.targetMode==='current'?s.currentAppointments:s.target;
    // Actual attended volume anchors unit economics; funnel rates remain diagnostic.
    const observedYield=s.leads>0&&funnel.held>0?s.currentAppointments/s.leads:0;
    const hBook=s.book*(1-rate(s.penalty));
    const hireYield=observedYield*(1-rate(s.penalty));
    function leadModel(y,show,close,minutes,hourly,tools,isOwner){
      const required=target===0?0:divide(target,y);
      const available=required!==null;
      const leads=available?required:0;
      const dialing=leads*minutes/60;
      const leadCost=leads*s.cpl, labor=dialing*hourly;
      const cash=leadCost+labor+tools;
      return {available,leads:available?leads:null,booked:available?(target===0?0:divide(target,rate(show))):null,held:available?target:null,sales:available?target*rate(close):null,dialing,leadCost,labor,tools,cash,ownerHours:isOwner?dialing:0,operationsHours:dialing,hiringHours:0,recruitHours:0,trainingHours:0,startup:0,ongoing:cash,total:cash,show,close};
    }
    const current=leadModel(observedYield,s.show,s.close,s.minutes,s.operator==='team'?s.staffHourly:0,s.tools,s.operator==='owner');
    if(s.operator==='team'&&s.staffHourly<=0&&target>0)current.available=false;
    const hired=leadModel(hireYield,s.show,s.close,s.minutes,0,s.hireTools,false);
    if(s.setterHours<=0&&target>0)hired.available=false;
    // A full monthly salary is paid even when the setter has unused capacity.
    hired.setters=hired.available?Math.max(1,Math.ceil(hired.dialing/s.setterHours-1e-9)||1):1;
    hired.labor=hired.setters*s.setterMonthly;
    hired.tools=hired.setters*s.hireTools;
    hired.ownerHours=hired.setters*s.manageHours;
    hired.recruitHours=hired.setters*s.recruitHours;
    hired.trainingHours=hired.setters*s.trainerHours;
    hired.hiringHours=hired.recruitHours+hired.trainingHours;
    hired.operationsHours=hired.dialing+hired.ownerHours;
    hired.startup=hired.setters*s.hireFee;
    hired.cash=hired.leadCost+hired.labor+hired.tools+s.hireExtra;
    hired.ongoing=hired.cash;
    hired.total=hired.ongoing;
    hired.firstMonth=hired.ongoing+hired.startup;
    hired.effectiveBook=hBook;hired.connect=s.connect;
    const lion={available:true,leads:null,booked:null,held:target,sales:target*rate(s.close),dialing:0,leadCost:0,labor:0,tools:0,cash:target*s.price,ownerHours:0,operationsHours:0,hiringHours:0,recruitHours:0,trainingHours:0,startup:0,ongoing:target*s.price,total:target*s.price,close:s.close,billed:target};
    for(const m of [current,hired,lion]){
      m.costBooked=m.available?divide(m.total,m.booked):null;
      m.costHeld=m.available?divide(m.total,m.held):null;
      m.costSale=m.available?divide(m.total,m.sales):null;
      m.value=m.available?m.sales*netValue:null;
      m.contribution=m.available?m.value-m.total:null;
    }
    const base=s.compare==='hired'?hired:current;
    const both=base.available&&target>0;
    const savings=both?base.total-lion.total:null;
    const cashSavings=both?base.cash-lion.cash:null;
    const ownerTime=both?base.ownerHours:null;
    const threshold=both?divide(base.total,target):null;
    const gap=Math.max(0,s.capacity-s.currentAppointments);
    const capacity={limit:s.capacity,current:s.currentAppointments,gap,utilization:divide(s.currentAppointments*100,s.capacity),extraSales:gap*rate(s.close)};
    capacity.saleValue=capacity.extraSales*netValue;
    capacity.lionInvestment=gap*s.price;
    capacity.contribution=capacity.saleValue-capacity.lionInvestment;
    const salaryOnly=hired.available?divide(hired.labor,target):null;
    return {funnel,target,current,hired,lion,base,savings,cashSavings,ownerTime,threshold,salaryOnly,netValue,capacity};
  }
  root.LionModel={defaults,calculate};
  if(typeof module!=='undefined'&&module.exports)module.exports={defaults,calculate};
})(typeof globalThis!=='undefined'?globalThis:this);
