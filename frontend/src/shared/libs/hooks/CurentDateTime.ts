import { useState, useEffect } from "react";

const FirstLetterToUp = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function useCurrentDateTime() {
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();

    return {
      day: now.getDate(),
      dayName: FirstLetterToUp(now.toLocaleString("ru", { weekday: "long" })),
      month: now.getMonth(),
      monthName: FirstLetterToUp(now.toLocaleString("ru", { month: "long" })),
      year: now.getFullYear(),
      time: now.toLocaleTimeString(),
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime({
        day: now.getDate(),
        dayName: FirstLetterToUp(now.toLocaleString("ru", { weekday: "long" })),
        month: now.getMonth(),
        monthName: FirstLetterToUp(now.toLocaleString("ru", { month: "long" })),
        year: now.getFullYear(),
        time: now.toLocaleTimeString(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return dateTime;
}
