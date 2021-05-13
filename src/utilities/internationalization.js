export const internationalizeDate = (date) => new Intl.DateTimeFormat('ru').format(new Date(date));
