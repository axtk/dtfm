import type {DateValue} from '../types/DateValue';

export function toTimestamp(x: DateValue): number {
    return (x instanceof Date ? x : new Date(x)).getTime();
}
