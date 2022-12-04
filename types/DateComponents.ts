import {DateValue} from './DateValue';

export type DateComponents = {
    /** Original value */
    input: DateValue;
    /** Date object corresponding to the original value */
    date: Date;
    /** Timestamp */
    timestamp: number;
    /** Year */
    year: number;
    /** Year */
    Y: string;
    /** Year */
    YY: string;
    /** Year of a calendar era (specified by AD/BC or CE/BCE) */
    YE: string;
    /** Christian era: AD/BC */
    E: string;
    /** Common Era: CE/BCE */
    CE: string;
    /** Month */
    month: number;
    /** Month */
    M: string;
    /** Month (always 2-digit, zero-padded) */
    MM: string;
    /** Month abbreviation */
    MMM: string;
    /** Day */
    day: number;
    /** Day */
    D: string;
    /** Day (always 2-digit, zero-padded) */
    DD: string;
    /** Hours */
    hours: number;
    /** Hours */
    H: string;
    /** Hours (always 2-digit, zero-padded) */
    HH: string;
    /** 12h-clock hours */
    hours12: number;
    /** 12h-clock hours */
    h: string;
    /** 12h-clock hours (always 2-digit, zero-padded) */
    hh: string;
    /** Day period: AM/PM */
    a: string;
    /** Minutes */
    minutes: number;
    /** Minutes */
    m: string;
    /** Minutes (always 2-digit, zero-padded) */
    mm: string;
    /** Seconds */
    seconds: number;
    /** Seconds */
    s: string;
    /** Seconds (always 2-digit, zero-padded) */
    ss: string;
    /** Milliseconds */
    milliseconds: number;
    /** Milliseconds (always 3-digit, zero-padded) */
    ms: string;
    /** Time zone */
    tz: string;
    /** Week day */
    weekDay: number;
    /** Week day abbreviation */
    WD: string;
    /** Local time zone ISO date string */
    iso: string;
    /** Date (YY-MM-DD) */
    isoDate: string;
    /** Time (HH:mm:ss) */
    isoTime: string;
    /** Time with milliseconds */
    isoTimeMs: string;
    /** Timezone offset (in minutes) */
    timezoneOffset: number;
};
