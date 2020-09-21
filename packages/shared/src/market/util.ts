import { format, parse } from 'date-fns';

const investingFormat = 'MM/dd/yyyy';

export const investingDateUtil = {
    dateToStr: (date: Date) => format(date, investingFormat),
    strToDate: (dateISO: string) => parse(dateISO, investingFormat, new Date()),
} as const;
