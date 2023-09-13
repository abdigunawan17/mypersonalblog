 import { DateTime } from "luxon"
 import readingTime from "reading-time"

 export const getReadingTime = (text: string, locale: string) => {
   const minute = readingTime(text).minutes;

   const minutesRounded = Math.floor(minute);

   if (locale === "in") {
      if (minutesRounded === 1) {
         return `${minutesRounded} Menit`;
      } else {
         return `${minutesRounded} Menit`;
      }
   } else {
      if (minutesRounded === 1) {
         return `${minutesRounded} minute`;
      } else {
         return `${minutesRounded} minutes`;
      }
   }
 }

 export const getRelativeDate = (date: string, locale: string) => {
    return DateTime.fromISO(date).setLocale(locale).toRelative();
 }

