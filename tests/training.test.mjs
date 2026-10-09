import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {build} from 'esbuild';
await build({entryPoints:['src/training.ts'],bundle:true,platform:'node',format:'esm',outfile:'.sites-runtime/training.mjs'});
const {situations,questions}=await import('../.sites-runtime/training.mjs');
const data=JSON.parse(fs.readFileSync('public/photographer.json','utf8'));
test('every situation and quiz source resolves to its actual category and rule',()=>{
 for(const item of [...situations,...questions])for(const source of item.sources??[item.source])assert.ok(data.cards.some(c=>c.id==='rule-'+source.replace('.','-')&&c.category===item.category));
});
test('five questions have one valid answer and explanations; critical rules are retained',()=>{
 assert.equal(questions.length,5);
 for(const q of questions){assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.explanation.length>20);}
 assert.match(questions[1].options[questions[1].correct],/Кривой горизонт/);
 assert.match(questions[2].options[questions[2].correct],/после получения предыдущей карты/);
 assert.match(questions[3].options[questions[3].correct],/Не настаивать/);
});
