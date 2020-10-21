import format from 'date-fns/format';
import parse from 'date-fns/parse';

const investingFormat = 'MM/dd/yyyy';

export const investingDateUtil = {
    dateToStr: (date: Date) => format(date, investingFormat),
    strToDate: (dateISO: string) => parse(dateISO, investingFormat, new Date()),
} as const;
