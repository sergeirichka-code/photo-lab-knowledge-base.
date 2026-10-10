import test from 'node:test';
import assert from 'node:assert/strict';
import {activeSection} from '../src/navigation.mjs';
test('navigation is unselected above the content and follows sections past the reading line',()=>{
 assert.equal(activeSection([{id:'situations',top:450},{id:'duties',top:800}],110,false),'');
 assert.equal(activeSection([{id:'situations',top:-300},{id:'duties',top:80},{id:'standards',top:600}],110,false),'duties');
 assert.equal(activeSection([{id:'duties',top:-1000},{id:'standards',top:-80},{id:'interaction',top:50}],110,false),'interaction');
});
test('bottom of page selects the final section even if its heading cannot reach the top',()=>{
 assert.equal(activeSection([{id:'interaction',top:-400},{id:'quiz',top:250}],110,true),'quiz');
 assert.equal(activeSection([],110,true),'');
});
