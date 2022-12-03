import {pad} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponents} from '../types/DateComponents';
import {isInvalidDate} from './isInvalidDate';
import {getTimezone} from './getTimezone';
import {getTimezoneOffset} from './getTimezoneOffset';
import {weekDays, MIN} from './const';

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

    let $Y = d.getFullYear();
    let $M = d.getMonth();
    let $D = d.getDate();
    let $WD = d.getDay();

    let Y = String($Y);
    let M = pad($M + 1, 2);
    let D = pad($D, 2);
    let WD = weekDays[$WD];

    let $h = d.getHours();
    let $m = d.getMinutes();
    let $s = d.getSeconds();
    let $ms = d.getMilliseconds();

    let h = pad($h, 2);
    let m = pad($m, 2);
    let s = pad($s, 2);
    let ms = pad($ms, 3);

    // AD 1 = year 1, 1 BC = year 0, 2 BC = year -1, etc.
    let YE = String($Y < 1 ? abs($Y - 1) : $Y);
    let E: DateComponents['E'] = $Y < 1 ? 'BC' : 'AD';
    let CE: DateComponents['CE'] = $Y < 1 ? 'BCE' : 'CE';

    let $h12 = $h % 12 || 12;
    let h12 = pad($h12, 2);
    let a: DateComponents['a'] = $h < 12 ? 'AM' : 'PM';

    let tzSign = -sign(tzOffset);
    let absTzOffset = abs(tzOffset);

    let tzHours = floor(absTzOffset/60);
    let tzMinutes = absTzOffset - tzHours*60;

    let tz = `${tzSign === -1 ? '-' : '+'}${pad(tzHours, 2)}:${pad(tzMinutes, 2)}`;

    let isoDate = `${Y}-${M}-${D}`;
    let isoTime = `${h}:${m}:${s}`;
    let isoTimeMs = `${isoTime}.${ms}`;

    let iso = `${isoDate}T${isoTimeMs}${tz}`;

    return {
        date: d,
        $t: d.getTime(),
        $Y, $M, $D, $WD,
        Y, M, D, WD, YE, E, CE,
        $h, $m, $s, $ms, $h12,
        h, m, s, ms, h12, a, tz,
        isoDate, isoTime, isoTimeMs, iso,
    };
}
