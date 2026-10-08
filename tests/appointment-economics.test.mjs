import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context={};
for(const file of ['model.js','report.js'])vm.runInNewContext(readFileSync(new URL('../public/internal/appointment-economics/'+file,import.meta.url),'utf8'),context);
const {calculate}=context.LionModel,R=context.LionReport;
const defaults={...context.LionModel.defaults,volumeMode:"custom",penalty:0,attemptsPerLead:1,currentAppointments:40};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} should equal ${b}`);

test('time is calculated from lead volume and mutually exclusive call outcomes',()=>{
 const r=calculate(defaults),t=r.today.callTime;
 near(t.attempts,200);near(t.connected,120);near(t.unbooked,54);near(t.booked,66);
 near(t.dialMinutes,200);near(t.connectTalkMinutes,135);near(t.bookingTalkMinutes,660);
 near(r.today.ownerHours,995/60);near(r.today.cash,9150);near(r.today.costHeld,228.75);
});
test('booked-call talk includes the connection rather than double-counting it',()=>{
 const r=calculate({...defaults,leads:100,connect:100,book:100});
 near(r.today.callTime.connectTalkMinutes,0);near(r.today.callTime.bookingTalkMinutes,1000);near(r.today.ownerHours,1100/60);
 const unbooked=calculate({...defaults,leads:100,connect:100,book:0});near(unbooked.today.ownerHours,350/60);
 const none=calculate({...defaults,leads:100,connect:0});near(none.today.ownerHours,100/60);
});
test('repeat attempts add dial time without multiplying connected talk time',()=>{
 const r=calculate(defaults),more=calculate({...defaults,attemptsPerLead:3});
 near(more.today.callTime.attempts,600);near(more.today.callTime.bookingTalkMinutes,r.today.callTime.bookingTalkMinutes);
 near(more.today.ownerHours-r.today.ownerHours,400/60);near(more.current.cash,r.current.cash);
});
test('changing lead and funnel inputs automatically changes calculated hours',()=>{
 const r=calculate(defaults),leads=calculate({...defaults,leads:400});near(leads.today.ownerHours,r.today.ownerHours*2);
 assert.notEqual(calculate({...defaults,connect:30}).today.ownerHours,r.today.ownerHours);
 assert.notEqual(calculate({...defaults,book:25}).today.ownerHours,r.today.ownerHours);
 near(calculate({...defaults,currentHours:999,minutes:999}).today.ownerHours,r.today.ownerHours);
});
test('growth requirements use connect, booking and show rates; attendance is never mutated',()=>{
 const s={...defaults,currentAppointments:30,show:50};const r=calculate(s);
 near(r.current.leads,20/(.6*.55*.5));near(r.current.callTime.booked,40);assert.equal(s.currentAppointments,30);
 const lowerShow=calculate({...s,show:25});near(lowerShow.current.leads,r.current.leads*2);near(lowerShow.current.ownerHours,r.current.ownerHours*2);
 near(lowerShow.today.ownerHours,r.today.ownerHours);
});
test('today cash stays separate from additional cost and capacity plan',()=>{
 const r=calculate(defaults);near(r.today.cash,9150);near(r.current.cash,20/(.6*.55*.65)*45);
 near(r.hired.cash-r.current.cash,1350);near(r.lion.cash,5000);
 assert.equal(r.target,20);near(r.plan.totalShows,60);near(r.plan.remaining,20);near(r.plan.contribution,5000);
});
test('proposed volume is capped without changing its input',()=>{
 const s={...defaults,proposed:60};const r=calculate(s);near(r.target,40);assert.equal(s.proposed,60);
 assert.equal(calculate({...defaults,capacity:30}).target,0);
 assert.equal(calculate({...defaults,capacity:0,currentAppointments:0}).capacity.utilization,null);
});
test('zero funnel output blocks growth projections while recording incurred dialing time',()=>{
 const r=calculate({...defaults,connect:0});assert.equal(r.current.available,false);assert.equal(r.hired.available,false);
 near(r.today.ownerHours,200/60);assert.equal(r.savings,null);
 assert.equal(calculate({...defaults,show:0}).current.available,false);
});
test('ramp reduction is temporary and costs the extra leads needed for the same shows',()=>{
 const equal=calculate(defaults),reduced=calculate({...defaults,penalty:15,rampWeeks:30/7});
 near(reduced.hired.leads,equal.hired.leads);near(reduced.hired.cash,equal.hired.cash);
 near(reduced.hired.rampLeads,equal.hired.leads/.85);
 near(reduced.hired.rampCallTime.booked,equal.hired.callTime.booked);
 near(reduced.hired.rampBook,46.75);near(reduced.hired.effectiveBook,55);
 near(reduced.hired.rampExtraCash,(reduced.hired.rampLeads-reduced.hired.leads)*45);
 near(reduced.hired.firstMonth,reduced.hired.cash+reduced.hired.startup+reduced.hired.rampExtraCash);
 const blocked=calculate({...defaults,penalty:100,rampWeeks:30/7});assert.equal(blocked.hired.rampAvailable,false);assert.equal(blocked.hired.firstMonth,null);assert.equal(blocked.hired.available,true);
});
test('first-month ramp weighting follows duration and does not add salary twice',()=>{
 const full=calculate({...defaults,penalty:20,rampWeeks:30/7});
 const partial=calculate({...defaults,penalty:20,rampWeeks:15/7});near(partial.hired.rampBook,49.5);
 assert.ok(partial.hired.rampExtraCash<full.hired.rampExtraCash);
 const none=calculate({...defaults,penalty:20,rampWeeks:0});near(none.hired.rampExtraCash,0);
 near(none.hired.firstMonth,none.hired.cash+none.hired.startup);
 const long=calculate({...defaults,penalty:20,rampWeeks:12});near(long.hired.rampBook,full.hired.rampBook);
});
test('capacity is the default recommendation, with manual smaller plans preserved and capped',()=>{
 const d=context.LionModel.defaults;const full=calculate(d);near(full.target,37);near(full.plan.totalShows,79.9);
 const fractional=calculate({...d,capacity:80,currentAppointments:22.275});near(fractional.target,57);
 const custom=calculate({...d,volumeMode:'custom',proposed:10});near(custom.target,10);
 near(calculate({...d,volumeMode:'custom',proposed:100}).target,37);
 near(calculate({...d,currentAppointments:90}).target,0);
});
test('return multiple uses sale value and contribution subtracts appointment spending',()=>{
 const r=calculate({...defaults,price:250,close:25,commission:3000});near(r.plan.returnMultiple,3);near(r.plan.saleValue,15000);near(r.plan.investment,5000);near(r.plan.contribution,10000);
 near(r.plan.valuePerShow,750);near(r.plan.contributionPerShow,500);
 near(calculate({...defaults,price:250,close:25,commission:3000,cpl:1}).plan.returnMultiple,3);
 assert.equal(calculate({...defaults,price:0}).plan.returnMultiple,null);
});
test('salary is full-month and staffing scales from calculated call workload',()=>{
 near(calculate({...defaults,proposed:1}).hired.labor,1200);
 const s={...defaults,setterHours:calculate(defaults).hired.dialing,capacity:80,proposed:20};
 const one=calculate(s);assert.equal(one.hired.setters,1);near(one.hired.labor,1200);
 const two=calculate({...s,proposed:40});assert.equal(two.hired.setters,2);near(two.hired.labor,2400);near(two.hired.tools,300);
 near(two.hired.ownerHours,44);near(two.hired.startup,600);near(two.hired.hiringHours,32);
 assert.equal(calculate({...defaults,setterHours:0}).hired.available,false);
});
test('no growth plan creates no incremental hire or Lion expense',()=>{
 const r=calculate({...defaults,proposed:0});near(r.hired.setters,0);near(r.hired.cash,0);near(r.hired.startup,0);near(r.lion.cash,0);
 assert.equal(r.current.costHeld,null);assert.equal(r.savings,null);
});
test('existing tools are not charged again and management/setup time has no dollar value',()=>{
 const r=calculate(defaults),changed=calculate({...defaults,tools:30000,manageHours:25,recruitHours:20,trainerHours:30,managerHourly:999,hourly:999});
 near(changed.current.cash,r.current.cash);near(changed.hired.cash,r.hired.cash);near(changed.hired.startup,r.hired.startup);
 near(changed.today.cash-r.today.cash,29850);near(changed.hired.hiringHours,50);near(changed.hired.ownerHours,25);
 near(calculate({...defaults,extraTools:200}).current.cash-r.current.cash,200);
});
test('actual paid staff wages use calculated hours, while owner time stays unpriced',()=>{
 const r=calculate({...defaults,operator:'team',staffHourly:20}),owner=calculate(defaults);
 near(r.today.cash,9150+995/60*20);near(r.current.cash,owner.current.cash+owner.current.dialing*20);near(r.current.ownerHours,0);
 assert.equal(calculate({...defaults,operator:'team'}).current.available,false);
 near(calculate({...defaults,staffHourly:20}).today.cash,9150);
});
test('investment coverage and unfavorable results remain explicit',()=>{
 const r=calculate({...defaults,commission:1200});near(r.plan.breakEvenSales,5);
 near(calculate({...defaults,commission:1200,reserve:20}).plan.breakEvenSales,6);
 assert.equal(calculate({...defaults,commission:0}).plan.breakEvenSales,null);
 near(calculate({...defaults,close:0}).plan.contribution,-5000);
 assert.match(R.costDifference(defaults,calculate(defaults)),/more monthly/);
 assert.match(R.decision(defaults,calculate(defaults)),/added dial attempts/);
});
test('report preserves proposal dates, escapes prospect text and omits removed metadata',()=>{
 const s={...defaults,prospect:'<script>alert(1)</script>',market:'Arizona',nextStep:'Review the quote',nextDate:'2026-10-12',launchDate:'2026-10-19'};
 const html=R.html(s,calculate(s));assert.match(html,/20 extra shows/);assert.match(html,/Arizona/);assert.match(html,/Oct 12, 2026/);assert.match(html,/Oct 19, 2026/);
 assert.doesNotMatch(html,/<script>/);assert.match(html,/&lt;script&gt;/);assert.doesNotMatch(html,/Editable examples|Typical month/);
});

test('cheap leads stay cheap while operating work and ramp costs remain visible',()=>{
 const s={...defaults,cpl:1,penalty:15,close:25,commission:3000},r=calculate(s);
 assert.ok(r.current.cash<r.lion.cash);near(r.plan.returnMultiple,3);
 const copy=R.operations(s,r).map(row=>row.join(' ')).join(' ');
 assert.match(copy,/additional dial attempts/);assert.match(copy,/sick-day coverage, turnover, and retraining/);assert.match(copy,/only when the prospect attends/);
 const html=R.html(s,r);assert.match(html,/Total cash - first month/);assert.match(html,/after ramp|post-ramp|Post-ramp/);assert.match(html,/3x projected revenue/);
 assert.ok(r.hired.firstMonth>r.hired.cash+r.hired.startup);
});

test('initial staffing covers ramp workload and training salary is counted once',()=>{
 const baseline=calculate(defaults),ramp=calculate({...defaults,penalty:20,rampWeeks:30/7});
 const available=(baseline.hired.dialing+ramp.hired.rampCallTime.hours)/2;
 const r=calculate({...defaults,penalty:20,rampWeeks:30/7,setterHours:available});
 assert.ok(r.hired.dialing<available);assert.ok(r.hired.rampCallTime.hours>available);
 assert.equal(r.hired.setters,2);near(r.hired.labor,2400);
 near(r.hired.firstMonth,r.hired.leadCost+2400+r.hired.tools+r.hired.startup+r.hired.rampExtraCash);
 near(r.hired.ownerHours,44);near(r.hired.hiringHours,32);
});

test('attendance updates from leads and each funnel rate, and updates the capacity recommendation',()=>{
 const {updateInput}=context.LionModel;
 let s={...defaults};
 s=updateInput(s,'leads',300);near(s.currentAppointments,64.4);
 s=updateInput(s,'connect',40);near(s.currentAppointments,42.9);
 s=updateInput(s,'book',50);near(s.currentAppointments,39);
 s=updateInput(s,'show',50);near(s.currentAppointments,30);
 const r=calculate({...s,volumeMode:'capacity'});near(r.today.held,30);near(r.target,50);
 near(r.today.costHeld,r.today.cash/30);
 s=updateInput(s,'leads',0);near(s.currentAppointments,0);
});
test('manual attendance remains editable until a funnel input changes',()=>{
 const {updateInput}=context.LionModel;
 let s=updateInput(defaults,'currentAppointments',35);near(s.currentAppointments,35);
 s=updateInput(s,'cpl',10);near(s.currentAppointments,35);
 s=updateInput(s,'close',50);near(s.currentAppointments,35);
 s=updateInput(s,'attemptsPerLead',5);near(s.currentAppointments,35);
 s=updateInput(s,'leads',250);near(s.currentAppointments,53.6);
 s=updateInput(s,'book',0);near(s.currentAppointments,0);
});
test('reset defaults use three dial attempts and matching attendance',()=>{
 const d=context.LionModel.defaults,r=calculate(d);
 near(d.attemptsPerLead,3);near(d.currentAppointments,42.9);
 near(r.today.callTime.attempts,600);near(r.today.callTime.dialMinutes,600);
 near(r.today.callTime.bookingTalkMinutes,660);near(r.today.ownerHours,1395/60);
});


test('default daily supervision and first-month hours include hiring/training only once',()=>{
 const d=context.LionModel.defaults,r=calculate(d);
 near(d.manageHours,22);near(r.hired.ownerHours,22);near(r.hired.hiringHours,16);
 near(r.hired.firstMonthOwnerHours,38);
 near(r.current.firstMonthOwnerHours,r.current.ownerHours);
 near(r.lion.firstMonthOwnerHours,0);near(r.lion.ownerHours,0);
 const changed=calculate({...d,manageHours:30});near(changed.hired.firstMonthOwnerHours,46);
 near(changed.hired.cash,r.hired.cash);near(changed.hired.firstMonth,r.hired.firstMonth);
 const blocked=calculate({...d,penalty:100,rampWeeks:30/7});assert.equal(blocked.hired.firstMonthOwnerHours,null);
});
test('projected revenue is before appointment fees and reflects the cancellation reserve',()=>{
 const s={...defaults,close:25,commission:3000,reserve:20},r=calculate(s);
 near(r.plan.saleValue,12000);near(r.plan.investment,5000);near(r.plan.contribution,7000);near(r.plan.returnMultiple,2.4);
 const html=R.html(s,r);
 assert.match(html,/PROJECTED MONTHLY REVENUE<\/p><h1>\$12,000<\/h1>/);
 assert.match(html,/140% projected ROI/);
 assert.doesNotMatch(html,/potential contribution/i);
});


test('report ROI measures the return after appointment fees, with negative and zero-investment cases',()=>{
 near(R.roiPercent(calculate({...defaults,close:25,commission:3000,price:250})),200);
 near(R.roiPercent(calculate({...defaults,close:0,price:250})),-100);
 assert.equal(R.roiPercent(calculate({...defaults,price:0})),null);
 const r=calculate(defaults),html=R.html(defaults,r);
 assert.ok(html.indexOf('PROJECTED MONTHLY REVENUE')<html.indexOf('Same shows. Less to manage.'));
 assert.equal(R.executiveRows(r).length,4);
});
