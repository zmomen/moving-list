export function dateFmt(stringTimestamp) {
  return new Date(stringTimestamp).toLocaleString();
}

export function dateOnly(timestamp) {
  return timestamp.split("T")[0];
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function customDateFormat(stringTimestamp = null) {
  var createdDate =
    stringTimestamp !== null ? new Date(stringTimestamp) : new Date();

  var day = createdDate.getDate();
  var month = createdDate.getMonth() + 1; //months are zero based
  if (month - 10 < 0) {
    month = "0" + month;
  }
  if (day - 10 < 0) {
    day = "0" + day;
  }
  var year = createdDate.getFullYear();
  var time = createdDate.toTimeString().substring(0, 8);
  let finalResult = year + "-" + month + "-" + day + "T" + time;
  return finalResult;
}
