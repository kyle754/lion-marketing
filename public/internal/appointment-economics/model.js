(function(root){
  const defaults={
    prospect:'',product:'Final Expense',source:'Paid inbound leads',priority:'Time spent chasing leads',
    market:'',nextStep:'',nextDate:'',launchDate:'',notes:'',quality:'',
    operator:'owner',leads:200,cpl:45,currentAppointments:40,capacity:80,
    connect:60,book:55,show:65,close:20,dialSeconds:60,connectMinutes:2.5,bookedMinutes:10,attemptsPerLead:1,staffHourly:0,tools:150,extraTools:0,
    commission:2500,reserve:0,proposed:20,compare:'current',price:250,
    setterMonthly:1200,setterHours:160,penalty:0,hireFee:300,recruitHours:6,trainerHours:10,
    manageHours:8,hireTools:150,hireExtra:0,rampWeeks:4
  };
  const divide=(a,b)=>b>0?a/b:null;
  function callWork(s,leads,bookingRate=s.book){
    const attempts=leads*s.attemptsPerLead;
    const connected=leads*s.connect/100,booked=connected*bookingRate/100;
    const unbooked=Math.max(0,connected-booked);
    const dialMinutes=attempts*s.dialSeconds/60;
    const connectTalkMinutes=unbooked*s.connectMinutes;
    const bookingTalkMinutes=booked*s.bookedMinutes;
    return {attempts,connected,unbooked,booked,dialMinutes,connectTalkMinutes,bookingTalkMinutes,
      hours:(dialMinutes+connectTalkMinutes+bookingTalkMinutes)/60};
  }
  function calculate(s){
    s={...defaults,...s};
    const netValue=s.commission*(1-s.reserve/100);
    const gap=Math.max(0,s.capacity-s.currentAppointments);
    const target=Math.max(0,Math.min(Math.floor(s.proposed),Math.floor(gap)));
    const todayWork=callWork(s,s.leads);
    const funnel={leads:s.leads,connected:s.leads*s.connect/100};
    funnel.booked=funnel.connected*s.book/100;funnel.held=funnel.booked*s.show/100;funnel.sales=funnel.held*s.close/100;
    const today={held:s.currentAppointments,leads:s.leads,dialing:todayWork.hours,callTime:todayWork,
      ownerHours:s.operator==='owner'?todayWork.hours:0,leadCost:s.leads*s.cpl,
      labor:s.operator==='team'?todayWork.hours*s.staffHourly:0,tools:s.tools};
    today.available=s.operator!=='team'||s.staffHourly>0;
    today.cash=today.leadCost+today.labor+today.tools;
    today.costHeld=today.available?divide(today.cash,today.held):null;
    function sourceModel(bookingRate){
      const y=s.connect/100*bookingRate/100*s.show/100;
      const available=target===0||(y>0&&y<=1&&s.currentAppointments<=s.leads);
      const leads=target===0?0:available?target/y:null;
      const callTime=callWork(s,available?(leads||0):0,bookingRate);
      const dialing=callTime.hours;
      return {available,held:target,leads,dialing,callTime,ownerHours:0,labor:0,tools:0,
        leadCost:available?(leads||0)*s.cpl:0,startup:0,recruitHours:0,trainingHours:0,hiringHours:0};
    }
    const current=sourceModel(s.book);
    if(target>0&&!today.available)current.available=false;
    current.labor=s.operator==='team'?current.dialing*s.staffHourly:0;
    current.tools=target>0?s.extraTools:0;
    current.ownerHours=s.operator==='owner'?current.dialing:0;
    current.cash=current.leadCost+current.labor+current.tools;
    const hired=sourceModel(s.book*(1-s.penalty/100));
    if(target>0&&(s.setterHours<=0))hired.available=false;
    hired.setters=target===0?0:hired.available?Math.max(1,Math.ceil(hired.dialing/s.setterHours-1e-9)):null;
    const setters=hired.setters||0;
    hired.labor=setters*s.setterMonthly;hired.tools=setters*s.hireTools+(target>0?s.hireExtra:0);
    hired.ownerHours=setters*s.manageHours;hired.recruitHours=setters*s.recruitHours;
    hired.trainingHours=setters*s.trainerHours;hired.hiringHours=hired.recruitHours+hired.trainingHours;
    hired.startup=setters*s.hireFee;hired.cash=hired.leadCost+hired.labor+hired.tools;
    hired.effectiveBook=s.book*(1-s.penalty/100);
    const lion={available:true,held:target,cash:target*s.price,dialing:0,ownerHours:0,
      labor:0,tools:0,leadCost:0,startup:0,hiringHours:0,recruitHours:0,trainingHours:0};
    for(const m of [current,hired,lion]){
      m.total=m.cash;m.ongoing=m.cash;m.firstMonth=m.cash+m.startup;
      m.operationsHours=m.dialing+m.ownerHours*(m===hired?1:0);
      m.sales=target*s.close/100;m.costHeld=m.available?divide(m.cash,target):null;
      m.costSale=m.available?divide(m.cash,m.sales):null;
      m.value=m.sales*netValue;m.contribution=m.available?m.value-m.cash:null;
    }
    const base=s.compare==='hired'?hired:current;
    const comparable=base.available&&target>0;
    const plan={requested:s.proposed,shows:target,totalShows:s.currentAppointments+target,
      remaining:gap-target,sales:target*s.close/100,investment:lion.cash};
    plan.saleValue=plan.sales*netValue;plan.contribution=plan.saleValue-plan.investment;
    plan.breakEvenSales=plan.investment===0?0:netValue>0?Math.ceil(plan.investment/netValue-1e-10):null;
    plan.breakEvenClose=netValue>0?s.price/netValue*100:null;
    const capacity={limit:s.capacity,current:s.currentAppointments,gap,utilization:divide(s.currentAppointments*100,s.capacity)};
    capacity.saleValue=gap*s.close/100*netValue;capacity.contribution=capacity.saleValue-gap*s.price;
    return {today,funnel,capacity,plan,target,netValue,current,hired,lion,base,
      savings:comparable?base.cash-lion.cash:null,ownerTime:comparable?base.ownerHours:null};
  }
  root.LionModel={defaults,calculate,callWork};
  if(typeof module!=='undefined'&&module.exports)module.exports={defaults,calculate,callWork};
})(typeof globalThis!=='undefined'?globalThis:this);
