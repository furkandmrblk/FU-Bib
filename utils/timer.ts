import React, { useEffect } from 'react';

export const subtractMinutes = (date: number, minutes: number) => {
  return date - minutes * 60000;
};

export const delay = (time: number) => {
  return new Promise<void>(function (resolve, reject) {
    setTimeout(() => resolve(), time);
  });
};

export const useTimer = (
  timer: number,
  setTimerCount: React.Dispatch<React.SetStateAction<string | number | null>>
) => {
  useEffect(() => {
    const qrTimer = setInterval(() => {
      let now = new Date().getTime();
      let diff = timer - now;

      if (diff <= 0) {
        clearInterval(qrTimer);
        return setTimerCount('Zeit abgelaufen');
      }
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let styledSeconds: number | string = seconds;
      let styledMinutes: number | string = minutes;
      let styledHours: number | string = hours;

      if (hours <= 9) {
        styledHours = '0' + hours;
      }
      if (seconds <= 9) {
        styledSeconds = '0' + seconds;
      }
      if (minutes <= 9) {
        styledMinutes = '0' + minutes;
      }

      return setTimerCount(
        styledHours + ' : ' + styledMinutes + ' : ' + styledSeconds
      );
    }, 1000);
  }, [setTimerCount]);
};
