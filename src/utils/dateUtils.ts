export function getFormattedDateTime(dateJson: string, format: string): string {
  const date = new Date(dateJson);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (format === "date") {
    return `${dayOfWeek}, ${day}.${month}.`;
  } else if (format === "day") {
    return `${dayOfWeek}`;
  } else if (format === "hour") {
    return `${hour}:${minutes}`;
  } else if (format === "alert") {
    return `${dayOfWeek} ${hour}:${minutes}`;
  } else {
    return ``;
  }
}
