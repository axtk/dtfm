import type {DateValue} from '../types/DateValue';
import {formatDate} from './formatDate';

export function toLocalISOString(date: DateValue) {
    return formatDate(date, '{iso}');
}
