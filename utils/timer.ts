import React from 'react';

type TimerProps = {
  timer: number;
  setTimerCount: React.Dispatch<React.SetStateAction<string | number | null>>;
};

export const reservationTimer = ({ timer, setTimerCount }: TimerProps) => {
  const qrTimer = setInterval(() => {
    let now = new Date().getTime();
    let diff = timer - now;

    if (diff <= 0) {
      clearInterval(qrTimer);
      setTimerCount('Zeit abgelaufen.');
    }
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimerCount(minutes + ' : ' + seconds);
  }, 1000);
};
