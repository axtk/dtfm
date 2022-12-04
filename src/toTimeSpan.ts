import {pad} from 'stfm';
import type {DateValue} from '../types/DateValue';
import {SEC, MIN, HOUR, DAY} from './const';
import {toTimestamp} from './toTimestamp';

const {abs, floor, sign} = Math;

export function toTimeSpan(startTime: DateValue, endTime: DateValue = Date.now()) {
    let dt = toTimestamp(endTime) - toTimestamp(startTime);
    let dtSign = sign(dt);

    dt = abs(dt);

    let d = floor(dt/DAY);
    let h = floor((dt - d*DAY)/HOUR);
    let m = floor((dt - d*DAY - h*HOUR)/MIN);
    let s = floor((dt - d*DAY - h*HOUR - m*MIN)/SEC);
    let ms = dt - d*DAY - h*HOUR - m*MIN - s*SEC;

    let span = '';

    span += d === 0 ? '' : `${d}d`;
    span += span ? `${pad(h, 2)}h` : (h === 0 ? '' : `${h}h`);
    span += span ? `${pad(m, 2)}'` : (m === 0 ? '' : `${m}'`);
    span += `${span ? pad(s, 2) : s}.${pad(ms, 3)}"`;

    return `${dtSign === -1 ? '-' : ''}${span}`;
}
