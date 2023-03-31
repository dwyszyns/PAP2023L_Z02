import dayjs from 'dayjs';

function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfMonthDate = dayjs(new Date(year, month, 1));
  let currentMonthCount = 0 - firstDayOfMonthDate.day();
  // firstDayOfMonthDate.month().
  //
  // const daysMatrix = new Array(35).fill(undefined);
  // const beginIndex = firstDayOfMonthDate.day() === 0 ? 6 : firstDayOfMonthDate.day() - 1;
  const daysMatrix = new Array(5).fill([]).map(() => new Array(7).fill(null).map(() => {
    currentMonthCount += 1;
    return dayjs(new Date(year, month, currentMonthCount));
  }));
  return daysMatrix;
}

export { getMonth };
