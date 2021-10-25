import React from 'react';

export const reservationTimer = (
  timer: number,
  setTimerCount: React.Dispatch<React.SetStateAction<string | number | null>>
) => {
  const qrTimer = setInterval(() => {
    let now = new Date().getTime();
    let diff = timer - now;

    if (diff <= 0) {
      clearInterval(qrTimer);
      return setTimerCount('Zeit abgelaufen');
    }
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let styledSeconds: number | string = seconds;
    let styledMinutes: number | string = minutes;

    if (seconds <= 9) {
      styledSeconds = '0' + seconds;
    }
    if (minutes <= 9) {
      styledMinutes = '0' + minutes;
    }

    return setTimerCount(styledMinutes + ' : ' + styledSeconds);
  }, 1000);
};
