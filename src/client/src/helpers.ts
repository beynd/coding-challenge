import humanFormat from 'human-format';

export const humanDecimal = (number = 0) =>
  humanFormat(number, { decimals: 2 });
