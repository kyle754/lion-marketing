import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context={};
vm.runInNewContext(readFileSync(new URL('../public/internal/appointment-economics/model.js',import.meta.url),'utf8'),context);
const {defaults,calculate}=context.LionModel;
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} should equal ${b}`);

test('capacity gap uses actual attendance and shows net value after appointment cost',()=>{
  const r=calculate({...defaults,capacity:80,currentAppointments:40});
  assert.equal(r.target,80);near(r.capacity.gap,40);near(r.capacity.utilization,50);
  near(r.capacity.extraSales,8);near(r.capacity.saleValue,20000);near(r.capacity.lionInvestment,10000);near(r.capacity.contribution,10000);
});
test('current attended volume anchors all unit economics and target choices',()=>{
  const r=calculate({...defaults,currentAppointments:40,targetMode:'current'});
  near(r.current.leads,200);near(r.current.total,11150);near(r.current.cash,9150);near(r.current.ownerHours,40);
  near(r.current.costHeld,11150/40);near(r.lion.total,10000);near(r.savings,1150);near(r.cashSavings,-850);
  near(r.hired.held,r.current.held);near(r.lion.held,r.current.held);
});
test('setter performance reduction is relative and applied once',()=>{
  const r=calculate({...defaults,targetMode:'current'});near(r.hired.effectiveBook,46.75);near(r.hired.leads,200/.85);
  const equal=calculate({...defaults,targetMode:'current',penalty:0});near(equal.hired.leads,200);
});
test('setup is separate and never buried in recurring cost',()=>{
  const r=calculate({...defaults,targetMode:'current'});near(r.hired.startup,1600);near(r.hired.cashStartup,400);
  near(r.hired.total,r.hired.ongoing);near(r.hired.total,r.hired.cash+r.hired.management);
  near(r.hired.firstMonth-r.hired.total,1600);
  const extra=calculate({...defaults,targetMode:'current',hireFee:3000});near(extra.hired.total,r.hired.total);near(extra.hired.startup-r.hired.startup,2700);
});
test('Lion is always pay per show and uses the prospect close rate',()=>{
  const r=calculate({...defaults,targetMode:'manual',target:30,close:30,lionShow:0,lionClose:100,lionFees:900,billing:'booked'});
  near(r.lion.total,30*250);near(r.lion.cash,r.lion.total);near(r.lion.sales,9);assert.equal(r.lion.ownerHours,0);
  assert.equal(r.lion.booked,null);assert.equal(r.lion.available,true);
});
test('at or above capacity has no unfilled opportunity; zero capacity has no divide-by-zero',()=>{
  const r=calculate({...defaults,capacity:30,currentAppointments:40});near(r.capacity.gap,0);near(r.capacity.contribution,0);
  const zero=calculate({...defaults,capacity:0,currentAppointments:0});assert.equal(zero.capacity.utilization,null);assert.equal(zero.savings,null);assert.equal(zero.current.costHeld,null);
});
test('unfavorable economics and unreachable lead scenarios remain visible',()=>{
  const expensive=calculate({...defaults,price:1000});assert.ok(expensive.savings<0);assert.ok(expensive.capacity.contribution<0);
  const zero=calculate({...defaults,connect:0});assert.equal(zero.current.available,false);assert.equal(zero.savings,null);assert.equal(zero.lion.available,true);
  const missing=calculate({...defaults,currentAppointments:0});assert.equal(missing.current.available,false);
  const impossible=calculate({...defaults,penalty:100});assert.equal(impossible.hired.available,false);
  const noClose=calculate({...defaults,close:0});assert.equal(noClose.current.costSale,null);assert.equal(noClose.lion.costSale,null);near(noClose.capacity.saleValue,0);
});
test('custom setter funnel, net-sale reserve, and paid labor are respected',()=>{
  const s={...defaults,targetMode:'manual',target:30,hireLinked:false,hireConnect:50,hireBook:40,hireShow:75,hireClose:30,reserve:10,operator:'team'};
  const r=calculate(s);near(r.hired.leads,30/(.5*.4*.85*.75));near(r.hired.sales,9);near(r.netValue,2250);
  near(r.current.cash,r.current.total);near(r.current.ownerHours,0);
  near(calculate({...s,rampWeeks:12}).hired.total,r.hired.total);
});
