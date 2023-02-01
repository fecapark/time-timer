import { LanguageOptionType } from "../../../shared/types";

export function getDateString(time: Date, language: LanguageOptionType) {
  const monthName = [
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

  if (language === "kor")
    return `${time.getFullYear()}년 ${
      time.getMonth() + 1
    }월 ${time.getDate()}일`;

  return `${
    monthName[time.getMonth()]
  } ${time.getDate()}, ${time.getFullYear()}`;
}
