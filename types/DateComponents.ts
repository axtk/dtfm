import type {DateValue} from './DateValue';
import {weekDays, months} from '../src/const';

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
    /** Year, zero-prefixed when shorter than 2 digits */
    YY: string;
    /** Year, zero-prefixed when shorter than 4 digits */
    YYYY: string;
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
    /** Month, zero-prefixed when shorter than 2 digits */
    MM: string;
    /** Month abbreviation */
    MMM: typeof months[number];
    /** Day */
    day: number;
    /** Day */
    D: string;
    /** Day, zero-prefixed when shorter than 2 digits */
    DD: string;
    /** Hours */
    hours: number;
    /** Hours */
    H: string;
    /** Hours, zero-prefixed when shorter than 2 digits */
    HH: string;
    /** 12h-clock hours */
    hours12: number;
    /** 12h-clock hours */
    h: string;
    /** 12h-clock hours, zero-prefixed when shorter than 2 digits */
    hh: string;
    /** Day period: AM/PM */
    a: string;
    /** Minutes */
    minutes: number;
    /** Minutes */
    m: string;
    /** Minutes, zero-prefixed when shorter than 2 digits */
    mm: string;
    /** Seconds */
    seconds: number;
    /** Seconds */
    s: string;
    /** Seconds, zero-prefixed when shorter than 2 digits */
    ss: string;
    /** Milliseconds */
    milliseconds: number;
    /** Milliseconds, zero-prefixed when shorter than 3 digits */
    ms: string;
    /** Time zone */
    tz: string;
    /** Week day */
    weekDay: number;
    /** Week day abbreviation */
    WD: typeof weekDays[number];
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
