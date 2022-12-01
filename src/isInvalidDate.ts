import type {DateValue} from '../types/DateValue';
import {toTimestamp} from './toTimestamp';

export function isInvalidDate(date: DateValue) {
    return Number.isNaN(toTimestamp(date));
}
