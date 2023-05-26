import dayjs from 'dayjs';

function getDayArray(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfMonthDate = dayjs(new Date(year, month, 1));
  let currentDayCount = 1 - (firstDayOfMonthDate.day() === 0 ? 7 : firstDayOfMonthDate.day());
  return new Array(7 * 6).fill([]).map(() => {
    currentDayCount += 1;
    return dayjs(new Date(year, month, currentDayCount));
  });
}

export default getDayArray;
