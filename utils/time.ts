export function isTomorrow(date: Date, compare: Date) {
  const _date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  _date.setDate(_date.getDate() + 1);

  return (
    _date.getFullYear() === compare.getFullYear() &&
    _date.getMonth() === compare.getMonth() &&
    _date.getDate() === compare.getDate()
  );
}
