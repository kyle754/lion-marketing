import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context={};
for(const file of ['model.js','report.js'])vm.runInNewContext(readFileSync(new URL('../public/internal/appointment-economics/'+file,import.meta.url),'utf8'),context);
const {defaults,calculate}=context.LionModel,R=context.LionReport;
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
test('setter reduction is applied once and call stages are recomputed',()=>{
 const equal=calculate(defaults),reduced=calculate({...defaults,penalty:15});near(reduced.hired.leads,equal.hired.leads/.85);
 near(reduced.hired.callTime.booked,equal.hired.callTime.booked);near(reduced.hired.callTime.bookingTalkMinutes,equal.hired.callTime.bookingTalkMinutes);
 assert.ok(reduced.hired.callTime.connectTalkMinutes>equal.hired.callTime.connectTalkMinutes);
 near(reduced.hired.effectiveBook,46.75);assert.equal(calculate({...defaults,penalty:100}).hired.available,false);
});
test('salary is full-month and staffing scales from calculated call workload',()=>{
 near(calculate({...defaults,proposed:1}).hired.labor,1200);
 const s={...defaults,setterHours:calculate(defaults).hired.dialing,capacity:80,proposed:20};
 const one=calculate(s);assert.equal(one.hired.setters,1);near(one.hired.labor,1200);
 const two=calculate({...s,proposed:40});assert.equal(two.hired.setters,2);near(two.hired.labor,2400);near(two.hired.tools,300);
 near(two.hired.ownerHours,16);near(two.hired.startup,600);near(two.hired.hiringHours,32);
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
 assert.match(R.decision(defaults,calculate(defaults)),/more per month/);
});
test('report preserves proposal dates, escapes prospect text and omits removed metadata',()=>{
 const s={...defaults,prospect:'<script>alert(1)</script>',market:'Arizona',nextStep:'Review the quote',nextDate:'2026-10-12',launchDate:'2026-10-19'};
 const html=R.html(s,calculate(s));assert.match(html,/20 extra shows/);assert.match(html,/Arizona/);assert.match(html,/Oct 12, 2026/);assert.match(html,/Oct 19, 2026/);
 assert.doesNotMatch(html,/<script>/);assert.match(html,/&lt;script&gt;/);assert.doesNotMatch(html,/Editable examples|Typical month/);
});
