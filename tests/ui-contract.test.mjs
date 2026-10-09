import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {build} from 'esbuild';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
await build({entryPoints:['src/App.tsx'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:'.sites-runtime/test-app.mjs',jsx:'automatic'});
const {default:App}=await import('../.sites-runtime/test-app.mjs');
test('mobile navigation uses native modal focus containment',()=>{const html=renderToStaticMarkup(createElement(App));assert.match(html,/<dialog[^>]*aria-label="Разделы регламента"/);});
const linear=v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4;
function lum(hex){return hex.match(/\w\w/g).map(v=>linear(parseInt(v,16)/255)).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0)}
function contrast(a,b){const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
test('small factual qualifiers and instructions meet 4.5 contrast',()=>{const css=fs.readFileSync('src/styles.css','utf8');for(const [selector,bg]of[['.fact p','ffffff'],['.content-toolbar p','f8f9fb']]){const rules=css.split(selector+'{').slice(1).map(x=>x.split('}')[0]);const colors=rules.flatMap(r=>[...r.matchAll(/(?:^|;)color:#([\da-f]{6})(?:;|$)/g)].map(x=>x[1]));assert.ok(colors.length);const color=colors.at(-1);assert.ok(contrast(color,bg)>=4.5,selector+' '+contrast(color,bg));}});
