export function isTomorrow(date: Date, compare: Date) {
  const _date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  _date.setDate(_date.getDate() + 1);

  return (
    _date.getFullYear() === compare.getFullYear() &&
    _date.getMonth() === compare.getMonth() &&
    _date.getDate() === compare.getDate()
  );
}

export function getDayGapBetween(date1: Date, date2: Date) {
  const _date1 = new Date(date1);
  const _date2 = new Date(date2);

  _date1.setHours(0, 0, 0, 0);
  _date2.setHours(0, 0, 0, 0);

  const gap = Math.abs(_date1.getTime() - _date2.getTime());
  const dayTimeMS = 1000 * 60 * 60 * 24;
  const days = Math.floor(gap / dayTimeMS);
  return days;
}
