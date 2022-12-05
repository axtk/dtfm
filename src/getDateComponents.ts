import {pad} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponents} from '../types/DateComponents';
import {isInvalidDate} from './isInvalidDate';
import {getTimezone} from './getTimezone';
import {getTimezoneOffset} from './getTimezoneOffset';
import {weekDays, months, MIN} from './const';

const {abs, floor, sign} = Math;

export function getDateComponents(date: DateValue, targetTimezone?: string): DateComponents | undefined {
    if (isInvalidDate(date))
        return;

    let d = date instanceof Date ? date : new Date(date);

    let tzOffset = d.getTimezoneOffset();
    let targetTzOffset = getTimezoneOffset(targetTimezone);

    if (typeof date === 'string') {
        let originalTzOffset = getTimezoneOffset(getTimezone(date));

        if (originalTzOffset !== undefined) {
            if (targetTzOffset === undefined)
                targetTzOffset = originalTzOffset;

            d.setTime(d.getTime() + (tzOffset - targetTzOffset)*MIN);
        }
    }

    if (targetTzOffset !== undefined)
        tzOffset = targetTzOffset;

    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let weekDay = d.getDay();

    let Y = String(year);
    let M = String(month);
    let D = String(day);
    let WD = weekDays[weekDay];

    let absYear = abs(year);
    let yearSign = sign(year) === -1 ? '-' : '';

    let YY = `${yearSign}${pad(absYear, 2)}`;
    let MM = pad(M, 2);
    let DD = pad(D, 2);

    let YYYY = `${yearSign}${pad(absYear, 4)}`;
    let yy = pad(absYear % 100, 2);
    let MMM = months[month - 1];

    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let milliseconds = d.getMilliseconds();

    let H = String(hours);
    let m = String(minutes);
    let s = String(seconds);

    let HH = pad(H, 2);
    let mm = pad(m, 2);
    let ss = pad(s, 2);
    let ms = pad(milliseconds, 3);

    // AD 1 = year 1, 1 BC = year 0, 2 BC = year -1, etc.
    let YE = String(year < 1 ? abs(year - 1) : year);
    let E: DateComponents['E'] = year < 1 ? 'BC' : 'AD';
    let CE: DateComponents['CE'] = year < 1 ? 'BCE' : 'CE';

    let hours12 = hours % 12 || 12;

    let h = String(hours12);
    let hh = pad(h, 2);
    let a: DateComponents['a'] = hours < 12 ? 'AM' : 'PM';

    let tzSign = -sign(tzOffset);
    let absTzOffset = abs(tzOffset);

    let tzHours = floor(absTzOffset/60);
    let tzMinutes = absTzOffset - tzHours*60;

    let tz = `${tzSign === -1 ? '-' : '+'}${pad(tzHours, 2)}:${pad(tzMinutes, 2)}`;

    let isoDate = `${YYYY}-${MM}-${DD}`;
    let isoTime = `${HH}:${mm}:${ss}`;
    let isoTimeMs = `${isoTime}.${ms}`;

    let iso = `${isoDate}T${isoTimeMs}${tz}`;

    return {
        input: date,
        date: d,
        timestamp: d.getTime(),

        year, month, day, weekDay,
        Y, M, D, WD,
        YY, YYYY, yy, MM, DD,
        YE, E, CE, MMM,

        hours, minutes, seconds, milliseconds, hours12,
        H, m, s, ms, h, a, tz,
        HH, mm, ss, hh,

        isoDate, isoTime, isoTimeMs, iso,
        timezoneOffset: tzOffset,
    };
}
