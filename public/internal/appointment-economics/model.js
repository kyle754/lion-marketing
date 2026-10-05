(function(root){
  const defaults = {
    prospect:'', product:'Final Expense', source:'Paid inbound leads', operator:'owner', notes:'',
    leads:200, cpl:45, connect:60, book:55, show:65, close:20,
    minutes:12, hourly:50, tools:150, commission:2500, reserve:0,
    targetMode:'current', target:40, compare:'current',
    setterHourly:5, setterMinutes:12, penalty:15, hireLinked:true,
    hireConnect:60, hireBook:55, hireShow:65, hireClose:20,
    hireFee:300, recruitHours:6, trainerHours:10, paidTraining:20,
    managerHourly:75, manageHours:8, hireTools:150, hireExtra:0,
    rampWeeks:4, amortize:6,
    price:250, billing:'held', lionShow:65, lionClose:20,
    lionFees:0, lionHours:0, qualified:'', replacement:'',
    priority:'Time spent chasing leads', quality:'',
  };
  const rate = n => Number(n)/100;
  const divide = (a,b) => b>0 ? a/b : null;
  function calculate(s){
    const netValue=s.commission*(1-rate(s.reserve));
    const funnel={leads:s.leads, connected:s.leads*rate(s.connect)};
    funnel.booked=funnel.connected*rate(s.book);
    funnel.held=funnel.booked*rate(s.show);
    funnel.sales=funnel.held*rate(s.close);
    const target=s.targetMode==='current'?funnel.held:s.target;
    const currentYield=rate(s.connect)*rate(s.book)*rate(s.show);
    const hConnect=s.hireLinked?s.connect:s.hireConnect;
    const hBook=(s.hireLinked?s.book:s.hireBook)*(1-rate(s.penalty));
    const hShow=s.hireLinked?s.show:s.hireShow;
    const hClose=s.hireLinked?s.close:s.hireClose;
    function leadModel(y,show,close,minutes,hourly,tools,isOwner){
      const required=target===0?0:divide(target,y);
      const available=required!==null;
      const leads=available?required:0;
      const dialing=leads*minutes/60;
      const leadCost=leads*s.cpl;
      const labor=dialing*hourly;
      return {available,leads:available?leads:null,booked:available?(target===0?0:divide(target,rate(show))):null,held:available?target:null,sales:available?target*rate(close):null,dialing,leadCost,labor,tools,cash:leadCost+(isOwner?0:labor)+tools,timeValue:isOwner?labor:0,ownerHours:isOwner?dialing:0,startup:0,cashStartup:0,allocatedStartup:0,ongoing:leadCost+labor+tools,total:leadCost+labor+tools,show,close};
    }
    const current=leadModel(currentYield,s.show,s.close,s.minutes,s.hourly,s.tools,s.operator==='owner');
    const hired=leadModel(rate(hConnect)*rate(hBook)*rate(hShow),hShow,hClose,s.setterMinutes,s.setterHourly,s.hireTools,false);
    hired.management=s.manageHours*s.managerHourly;
    hired.startup=s.hireFee+s.paidTraining*s.setterHourly+(s.recruitHours+s.trainerHours)*s.managerHourly;
    hired.cashStartup=s.hireFee+s.paidTraining*s.setterHourly;
    hired.allocatedStartup=hired.startup/s.amortize;
    hired.timeValue=hired.management;
    hired.ownerHours=s.manageHours;
    hired.ongoing+=hired.management+s.hireExtra;
    hired.total=hired.ongoing+hired.allocatedStartup;
    hired.cash+=s.hireExtra+hired.cashStartup/s.amortize;
    hired.firstMonth=hired.ongoing+hired.startup;
    hired.effectiveBook=hBook;
    hired.connect=hConnect;
    const lionAvailable=target===0||s.lionShow>0;
    const lionBooked=target===0?0:divide(target,rate(s.lionShow));
    const billed=s.billing==='booked'?lionBooked:target;
    const lionTime=s.lionHours*s.managerHourly;
    const lion={available:lionAvailable,leads:null,booked:lionBooked,held:target,sales:target*rate(s.lionClose),dialing:0,leadCost:0,labor:0,tools:s.lionFees,cash:(billed??0)*s.price+s.lionFees,timeValue:lionTime,ownerHours:s.lionHours,startup:0,cashStartup:0,allocatedStartup:0,ongoing:(billed??0)*s.price+s.lionFees+lionTime,total:(billed??0)*s.price+s.lionFees+lionTime,show:s.lionShow,close:s.lionClose,billed};
    for(const m of [current,hired,lion]){
      m.costBooked=m.available?divide(m.total,m.booked):null;
      m.costHeld=m.available?divide(m.total,m.held):null;
      m.costSale=m.available?divide(m.total,m.sales):null;
      m.value=m.available?m.sales*netValue:null;
      m.contribution=m.available?m.value-m.total:null;
    }
    const base=s.compare==='hired'?hired:current;
    const both=base.available&&lion.available&&target>0;
    const savings=both?base.total-lion.total:null;
    const cashSavings=both?base.cash-lion.cash:null;
    const ownerTime=both?base.ownerHours-lion.ownerHours:null;
    const threshold=both?Math.max(0,divide(base.total-s.lionFees-lionTime,billed)):null;
    const naiveWage=target>0?divide(s.setterHourly*s.setterMinutes/60,rate(hConnect)*rate(hBook)):null;
    const lostBookings=funnel.connected*rate(s.book)*rate(s.penalty);
    return {funnel,target,current,hired,lion,base,savings,cashSavings,ownerTime,threshold,naiveWage,netValue,lostBookings};
  }
  root.LionModel={defaults,calculate};
  if(typeof module!=='undefined'&&module.exports)module.exports={defaults,calculate};
})(typeof globalThis!=='undefined'?globalThis:this);
