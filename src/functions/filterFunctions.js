import moment from 'moment';

//sc -specific column
export const globalFilter = (res, filterWay, sc = '') =>
  res.filter((client) =>
    JSON.stringify(sc ? client[sc] : client)
      .toLocaleLowerCase()
      .includes(filterWay),
  );

export const dateFilter = (res, filterWay) => {
  //current day/week/month etc...
  const checkDateZone = (dateToCheck) => {
    if (filterWay === 'overYear') return moment(dateToCheck).isBefore(new Date(), 'year');
    return moment(dateToCheck).isSame(new Date(), filterWay);
  };
  return res.filter(({ date }) => checkDateZone(date));
};

export const idFilter = (res, filterWay) => {
  const { lessThen = 0, moreThen = 0 } = filterWay || {};
  return res.filter(({ id }) => id >= moreThen && id <= lessThen);
};
