export const getTimeFromDegree = (degree: number) => {
  const totalSec = Math.round((360 - degree) * 10);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;

  return {
    min: min < 10 ? `0${min}` : `${min}`,
    sec: sec < 10 ? `0${sec}` : `${sec}`,
  };
};
