import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const context = {};
vm.runInNewContext(readFileSync(new URL('../public/internal/appointment-economics/model.js', import.meta.url), 'utf8'), context);
const { defaults, calculate } = context.LionModel;
const near = (a, b) => assert.ok(Math.abs(a-b)<1e-8, `${a} should equal ${b}`);

test('sequential funnel and identical held target include lead acquisition and time', () => {
  const r=calculate({...defaults});
  near(r.funnel.connected,120);near(r.funnel.booked,66);near(r.funnel.held,42.9);near(r.funnel.sales,8.58);
  near(r.current.total,11150);near(r.current.cash,9150);near(r.current.ownerHours,40);
  near(r.lion.total,10725);near(r.savings,425);near(r.cashSavings,-1575);
  near(r.hired.held,r.current.held);near(r.lion.held,r.current.held);
  near(r.hired.total,r.hired.cash+r.hired.management+(r.hired.startup-r.hired.cashStartup)/defaults.amortize);
});
test('booking reduction is relative and affects required lead volume once', () => {
  const r=calculate({...defaults});near(r.hired.effectiveBook,46.75);near(r.hired.leads,200/.85);
  const equal=calculate({...defaults,penalty:0});near(equal.hired.leads,200);
});
test('held billing does not charge for no-shows; booked billing adjusts for attendance', () => {
  const held=calculate({...defaults,lionShow:50});near(held.lion.total,42.9*250);near(held.lion.booked,85.8);
  const booked=calculate({...defaults,lionShow:50,billing:'booked'});near(booked.lion.total,85.8*250);
});
test('one-time setup appears once in first-month cost and is allocated in monthly cost', () => {
  const r=calculate({...defaults});near(r.hired.startup,1600);near(r.hired.cashStartup,400);
  near(r.hired.firstMonth-r.hired.ongoing,1600);near(r.hired.total-r.hired.ongoing,1600/6);
});
test('paid labor is cash, zero rates produce unavailable unit costs, and unfavorable Lion economics remain visible', () => {
  const paid=calculate({...defaults,operator:'team'});near(paid.current.cash,paid.current.total);near(paid.current.ownerHours,0);
  const zero=calculate({...defaults,connect:0});assert.equal(zero.target,0);assert.equal(zero.current.costHeld,null);assert.equal(zero.savings,null);
  const impossible=calculate({...defaults,targetMode:'manual',target:40,penalty:100,lionShow:0});assert.equal(impossible.hired.available,false);assert.equal(impossible.lion.available,false);assert.equal(impossible.savings,null);
  const expensive=calculate({...defaults,price:1000});assert.ok(expensive.savings<0);
  const noClose=calculate({...defaults,close:0,lionClose:0});assert.equal(noClose.current.costSale,null);assert.equal(noClose.lion.costSale,null);
});
test('custom setter rates, fees and coordination time are used, and readiness delay is separate', () => {
  const s={...defaults,targetMode:'manual',target:30,hireLinked:false,hireConnect:50,hireBook:40,hireShow:75,hireClose:30,lionFees:100,lionHours:2};
  const r=calculate(s);near(r.hired.leads,30/(.5*.4*.85*.75));near(r.hired.sales,9);
  near(r.lion.total,30*250+100+2*75);near(r.lion.cash,30*250+100);
  const delayed=calculate({...s,rampWeeks:12});near(delayed.hired.total,r.hired.total);
});
