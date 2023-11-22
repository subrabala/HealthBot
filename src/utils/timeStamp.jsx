export default function timeStamp(inputDate) {
  const dateObject = new Date(inputDate);

  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthAbbreviation = monthAbbreviations[dateObject.getMonth()];
  const year = String(dateObject.getFullYear()).slice(-2);

  return `${hours}:${minutes} ${day} ${monthAbbreviation}`;
}
