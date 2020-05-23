export function dateFmt(stringTimestamp) {
  return new Date(stringTimestamp).toLocaleString();
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}