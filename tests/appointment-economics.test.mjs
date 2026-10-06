import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context={};
for(const file of ['model.js','report.js'])vm.runInNewContext(readFileSync(new URL('../public/internal/appointment-economics/'+file,import.meta.url),'utf8'),context);
const {defaults,calculate}=context.LionModel,R=context.LionReport;
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} should equal ${b}`);

test('today stays separate from proposed incremental spending',()=>{
 const r=calculate(defaults);near(r.today.cash,9150);near(r.today.costHeld,228.75);near(r.today.ownerHours,40);
 near(r.current.leads,100);near(r.current.cash,4500);near(r.current.costHeld,225);near(r.current.ownerHours,20);
 near(r.hired.cash,5850);near(r.lion.cash,5000);near(r.savings,-500);
});
test('plan adds a realistic starting volume rather than filling every empty slot',()=>{
 const r=calculate(defaults);assert.equal(r.target,20);near(r.capacity.gap,40);near(r.plan.totalShows,60);near(r.plan.remaining,20);
 near(r.plan.sales,4);near(r.plan.saleValue,10000);near(r.plan.contribution,5000);near(r.capacity.contribution,10000);
});
test('requested volume is capped by unused capacity without changing the request',()=>{
 const s={...defaults,proposed:60};const r=calculate(s);assert.equal(s.proposed,60);near(r.plan.requested,60);near(r.target,40);
 assert.equal(calculate({...defaults,capacity:30}).target,0);
 assert.equal(calculate({...defaults,capacity:0,currentAppointments:0}).capacity.utilization,null);
});
test('funnel rates never overwrite recorded attendance or actual economics',()=>{
 const s={...defaults,connect:0,book:0,show:0};const r=calculate(s);assert.equal(s.currentAppointments,40);
 near(r.funnel.held,0);near(r.today.cash,9150);near(r.current.leads,100);assert.equal(r.current.available,true);
});
test('a zero observed yield blocks extrapolation while Lion plan remains explicit',()=>{
 const r=calculate({...defaults,currentAppointments:0});assert.equal(r.current.available,false);assert.equal(r.hired.available,false);
 assert.equal(r.savings,null);assert.equal(r.today.costHeld,null);near(r.lion.cash,5000);
});
test('equal setter performance is default and reduction is optional and applied once',()=>{
 assert.equal(defaults.penalty,0);const r=calculate(defaults);near(r.hired.leads,r.current.leads);
 const reduced=calculate({...defaults,penalty:15});near(reduced.hired.leads,100/.85);near(reduced.hired.effectiveBook,46.75);
 assert.equal(calculate({...defaults,penalty:100}).hired.available,false);
});
test('salary is paid in full for small plans, and scales at staffing boundaries',()=>{
 near(calculate({...defaults,proposed:1}).hired.labor,1200);
 const s={...defaults,leads:160,currentAppointments:40,currentHours:160,capacity:120,proposed:40};
 const one=calculate(s);assert.equal(one.hired.setters,1);near(one.hired.labor,1200);
 const two=calculate({...s,proposed:80});assert.equal(two.hired.setters,2);near(two.hired.labor,2400);
 near(two.hired.tools,300);near(two.hired.ownerHours,16);near(two.hired.startup,600);near(two.hired.hiringHours,32);
 assert.equal(calculate({...defaults,setterHours:0}).hired.available,false);
});
test('no growth plan creates no incremental hire or Lion expense',()=>{
 const r=calculate({...defaults,proposed:0});near(r.hired.setters,0);near(r.hired.cash,0);near(r.hired.startup,0);near(r.lion.cash,0);
 assert.equal(r.current.costHeld,null);assert.equal(r.savings,null);near(r.plan.breakEvenSales,0);
});
test('existing tools are never charged again, but new growth tools are included',()=>{
 const r=calculate(defaults),changed=calculate({...defaults,tools:30000});near(changed.current.cash,r.current.cash);near(changed.hired.cash,r.hired.cash);
 near(changed.today.cash-r.today.cash,29850);near(calculate({...defaults,extraTools:200}).current.cash-r.current.cash,200);
});
test('agent and management hours are separate from cash, setup is never amortized',()=>{
 const r=calculate(defaults),changed=calculate({...defaults,manageHours:25,recruitHours:20,trainerHours:30,managerHourly:1000,hourly:1000});
 near(changed.hired.cash,r.hired.cash);near(changed.hired.startup,r.hired.startup);near(changed.hired.hiringHours,50);near(changed.hired.ownerHours,25);
 near(changed.hired.firstMonth-changed.hired.cash,300);near(calculate({...defaults,hireFee:3000}).hired.cash,r.hired.cash);
 near(calculate({...defaults,currentHours:80}).current.cash,r.current.cash);near(calculate({...defaults,currentHours:80}).current.ownerHours,40);
});
test('only actual paid wages affect cash; a missing staff wage leaves comparison incomplete',()=>{
 const r=calculate({...defaults,operator:'team',staffHourly:20});near(r.today.cash,9950);near(r.current.cash,4900);near(r.current.ownerHours,0);
 assert.equal(calculate({...defaults,operator:'team'}).current.available,false);
 near(calculate({...defaults,staffHourly:20}).today.cash,9150);
});
test('sales needed to cover spend rounds up and uses net sale value after reserve',()=>{
 const r=calculate({...defaults,commission:1200});near(r.plan.breakEvenSales,5);near(r.plan.breakEvenClose,250/1200*100);
 near(calculate({...defaults,commission:1200,reserve:20}).plan.breakEvenSales,6);
 assert.equal(calculate({...defaults,commission:0}).plan.breakEvenSales,null);
 near(calculate({...defaults,price:0,commission:0}).plan.breakEvenSales,0);
});
test('unfavorable close assumptions remain negative rather than becoming a savings claim',()=>{
 const r=calculate({...defaults,close:0});near(r.plan.contribution,-5000);assert.equal(r.lion.costSale,null);
 assert.match(R.decision(defaults,calculate(defaults)),/costs \$500 more/);
 assert.match(R.decision({...defaults,compare:'hired'},calculate({...defaults,compare:'hired'})),/costs \$850 less/);
});
test('one-page report uses the same starting volume, proposal dates, and comparison',()=>{
 const s={...defaults,prospect:'Example Agency',market:'Arizona',nextStep:'Review the quote',nextDate:'2026-10-12',launchDate:'2026-10-19'};
 const html=R.html(s,calculate(s));assert.match(html,/20 extra shows/);assert.match(html,/Arizona/);assert.match(html,/Review the quote/);
 assert.match(html,/Oct 12, 2026/);assert.match(html,/Oct 19, 2026/);assert.doesNotMatch(html,/fill the 40/);
});
test('prospect text is escaped in printable report, and chosen pain changes benefits',()=>{
 const s={...defaults,prospect:'<script>alert(1)</script>',priority:'Keeping cold outbound focused'};
 const html=R.html(s,calculate(s));assert.doesNotMatch(html,/<script>/);assert.match(html,/&lt;script&gt;/);
 assert.equal(R.benefits(s,calculate(s))[0][0],'Keep outbound focused');
});

test('invalid cohort yield blocks both lead extrapolations even with a performance adjustment',()=>{
 const r=calculate({...defaults,leads:10,currentAppointments:40,penalty:80});assert.equal(r.current.available,false);assert.equal(r.hired.available,false);
});
