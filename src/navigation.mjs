// Positions are ordered in document order, measured against the compact search bar.
export function activeSection(sections, readingLine, atBottom) {
 if (!sections.length) return '';
 if (atBottom) return sections.at(-1).id;
 let active = '';
 for (const section of sections) {
  if (section.top <= readingLine) active = section.id;
  else break;
 }
 return active;
}
