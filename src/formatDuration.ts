import {pad} from 'stfm';
import {SEC, MIN, HOUR, DAY} from './const';

const {abs, floor, sign} = Math;

export function formatDuration(duration: number) {
    let durationSign = sign(duration);
    let absDuration = abs(duration);

    let d = floor(absDuration/DAY);
    let h = floor((absDuration - d*DAY)/HOUR);
    let m = floor((absDuration - d*DAY - h*HOUR)/MIN);
    let s = floor((absDuration - d*DAY - h*HOUR - m*MIN)/SEC);
    let ms = absDuration - d*DAY - h*HOUR - m*MIN - s*SEC;

    let value = '';

    value += d === 0 ? '' : `${d}d`;
    value += value ? `${pad(h, 2)}h` : (h === 0 ? '' : `${h}h`);
    value += value ? `${pad(m, 2)}'` : (m === 0 ? '' : `${m}'`);
    value += `${value ? pad(s, 2) : s}.${pad(ms, 3)}"`;

    return `${durationSign === -1 ? '-' : ''}${value}`;
}
