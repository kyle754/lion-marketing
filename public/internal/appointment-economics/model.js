(function(root){
  const defaults = {
    prospect:'', product:'Final Expense', source:'Paid inbound leads', operator:'owner', notes:'',
    leads:200, cpl:45, connect:60, book:55, show:65, close:20,
    minutes:12, hourly:50, tools:150, commission:2500, reserve:0,
    capacity:80, currentAppointments:42.9, targetMode:'capacity', target:40, compare:'current',
    setterHourly:5, setterMinutes:12, penalty:15, hireLinked:true,
    hireConnect:60, hireBook:55, hireShow:65, hireClose:20,
    hireFee:300, recruitHours:6, trainerHours:10, paidTraining:20,
    managerHourly:75, manageHours:8, hireTools:150, hireExtra:0, rampWeeks:4,
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
    const hConnect=s.hireLinked?s.connect:s.hireConnect;
    const hBook=(s.hireLinked?s.book:s.hireBook)*(1-rate(s.penalty));
    const hShow=s.hireLinked?s.show:s.hireShow;
    const hClose=s.hireLinked?s.close:s.hireClose;
    const hireYield=s.hireLinked?observedYield*(1-rate(s.penalty)):rate(hConnect)*rate(hBook)*rate(hShow);
    function leadModel(y,show,close,minutes,hourly,tools,isOwner){
      const required=target===0?0:divide(target,y);
      const available=required!==null;
      const leads=available?required:0;
      const dialing=leads*minutes/60;
      const leadCost=leads*s.cpl, labor=dialing*hourly;
      return {available,leads:available?leads:null,booked:available?(target===0?0:divide(target,rate(show))):null,held:available?target:null,sales:available?target*rate(close):null,dialing,leadCost,labor,tools,cash:leadCost+(isOwner?0:labor)+tools,timeValue:isOwner?labor:0,ownerHours:isOwner?dialing:0,startup:0,cashStartup:0,ongoing:leadCost+labor+tools,total:leadCost+labor+tools,show,close};
    }
    const current=leadModel(observedYield,s.show,s.close,s.minutes,s.hourly,s.tools,s.operator==='owner');
    const hired=leadModel(hireYield,hShow,hClose,s.setterMinutes,s.setterHourly,s.hireTools,false);
    hired.management=s.manageHours*s.managerHourly;
    hired.startup=s.hireFee+s.paidTraining*s.setterHourly+(s.recruitHours+s.trainerHours)*s.managerHourly;
    hired.cashStartup=s.hireFee+s.paidTraining*s.setterHourly;
    hired.timeValue=hired.management;
    hired.ownerHours=s.manageHours;
    hired.ongoing+=hired.management+s.hireExtra;
    hired.total=hired.ongoing;
    hired.cash+=s.hireExtra;
    hired.firstMonth=hired.ongoing+hired.startup;
    hired.effectiveBook=hBook;hired.connect=hConnect;
    const lion={available:true,leads:null,booked:null,held:target,sales:target*rate(s.close),dialing:0,leadCost:0,labor:0,tools:0,cash:target*s.price,timeValue:0,ownerHours:0,startup:0,cashStartup:0,ongoing:target*s.price,total:target*s.price,close:s.close,billed:target};
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
    const naiveWage=divide(s.setterHourly*s.setterMinutes/60,hireYield);
    return {funnel,target,current,hired,lion,base,savings,cashSavings,ownerTime,threshold,naiveWage,netValue,capacity};
  }
  root.LionModel={defaults,calculate};
  if(typeof module!=='undefined'&&module.exports)module.exports={defaults,calculate};
})(typeof globalThis!=='undefined'?globalThis:this);
