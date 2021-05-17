export const getInternationalDate = (date) => new Intl.DateTimeFormat('ru').format(new Date(date));
