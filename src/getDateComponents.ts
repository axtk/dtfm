import {pad} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponents} from '../types/DateComponents';
import {isInvalidDate} from './isInvalidDate';
import {weekDays} from './const';

const {abs, floor, sign} = Math;

export function getDateComponents(date: DateValue): DateComponents | undefined {
    if (isInvalidDate(date))
        return;

    let d = date instanceof Date ? date : new Date(date);

    let Y = String(d.getFullYear());
    let M = pad(d.getMonth() + 1, 2);
    let D = pad(d.getDate(), 2);
    let WD = weekDays[d.getDay()];

    let h = pad(d.getHours(), 2);
    let m = pad(d.getMinutes(), 2);
    let s = pad(d.getSeconds(), 2);
    let ms = pad(d.getMilliseconds(), 3);

    let tzOffset = d.getTimezoneOffset();
    let tzSign = -sign(tzOffset);

    tzOffset = abs(tzOffset);

    let tzHours = floor(tzOffset/60);
    let tzMinutes = tzOffset - tzHours*60;

    let tz = `${tzSign === -1 ? '-' : '+'}${pad(tzHours, 2)}:${pad(tzMinutes, 2)}`;

    let isoDate = `${Y}-${M}-${D}`;
    let isoTime = `${h}:${m}:${s}`;
    let isoTimeMs = `${isoTime}.${ms}`;

    let iso = `${isoDate}T${isoTimeMs}Z${tz}`;

    return {
        date: d,
        timestamp: d.getTime(),
        Y, M, D,
        h, m, s, ms,
        tz, WD,
        isoDate, isoTime, isoTimeMs, iso,
    };
}
