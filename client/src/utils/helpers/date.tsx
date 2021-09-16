// import { days } from './constants';
import moment from 'moment';

export const getDayAndTime = (date: Date): string => {
  // const day = days[date.getDay()];
  // // const month = months[date.getMonth()];
  // const time = date.toLocaleTimeString([], {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });

  let dateTime = '';

  const calendarDate = moment(date).calendar();
  if (calendarDate.includes('at')) {
    dateTime = calendarDate.replace('at ', '');
  } else {
    dateTime = moment(date).format('LLL');
    dateTime = dateTime.replace(`, ${moment(date).get('year')} `, ' ');
  }
  return dateTime;
};

export const getDays = (month: number): Array<number> => {
  const year = moment().get('year');
  const noOfDays = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
  const daysOfMonth: Array<number> = [];
  for (let i = 1; i <= noOfDays; i++) {
    daysOfMonth.push(i);
  }
  return daysOfMonth;
};
