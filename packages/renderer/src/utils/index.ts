export function randomSelection(obj) {
  return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
}
