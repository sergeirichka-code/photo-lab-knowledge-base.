/** @param {string} text */
export const normalize = text => text.toLocaleLowerCase('ru').replaceAll('ё','е');
/** @param {string} query */
const terms = query => normalize(query).trim().split(/\s+/).filter(Boolean).map(term=>/^родител(?:ь|и|я|ям|ями|ей|ях|ю)$/.test(term)?'родител':term);
/** @param {{title:string,source:string[],blocks:string[]}} card @param {string} query */
export function matches(card, query){const haystack=normalize([card.title,...card.source,...card.blocks].join(' '));return terms(query).every(t=>haystack.includes(t));}
/** @param {string} text @param {string} query */
export function segments(text,query){const source=normalize(text);const hits=new Uint8Array(text.length);for(const term of terms(query)){let start=0;while(start<source.length){const index=source.indexOf(term,start);if(index<0)break;hits.fill(1,index,index+term.length);start=index+Math.max(term.length,1);}}const result=[];for(let i=0;i<text.length;){const flag=hits[i];let end=i+1;while(end<text.length&&hits[end]===flag)end++;result.push({text:text.slice(i,end),match:!!flag});i=end;}return result;}
