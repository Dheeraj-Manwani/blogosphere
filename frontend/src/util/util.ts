const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getNumberSuperScript = (number: number) => {
  let sup;

  switch (number) {
    case 1:
    case 21:
    case 31:
      sup = "st";
      break;
    case 2:
    case 22:
      sup = "nd";
      break;
    case 3:
    case 23:
      sup = "rd";
      break;
    default:
      sup = "th";
      break;
  }

  return sup;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthName = months[monthIndex];
  const formattedDate = `${day}${getNumberSuperScript(
    day
  )} ${monthName} ${year}`;

  return formattedDate;
};
