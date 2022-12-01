import type {DateValue} from '../types/DateValue';
import {format} from './format';

export function toLocalISOString(date: DateValue) {
    return format(date, '{iso}');
}
