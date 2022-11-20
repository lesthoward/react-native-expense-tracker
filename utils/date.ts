export const getFormattedDate = (
  date: Date,
  replacer: string = '-'
): string => {
  return `${date.getDate()}${replacer}${
    date.getMonth() + 1
  }${replacer}${date.getFullYear()}`;
};
