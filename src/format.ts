import {fill} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponentKey} from '../types/DateComponentKey';
import type {DateComponents} from '../types/DateComponents';
import {INVALID_DATE_STRING} from './const';
import {isInvalidDate} from './isInvalidDate';
import {getDateComponents} from './getDateComponents';

export function format(
    date: DateValue,
    template: string,
    targetTimezone?: string,
): string;

export function format(
    date: DateValue,
    template: string,
    transformMap?: Partial<Record<DateComponentKey, (dateComponents: DateComponents) => unknown>>,
    targetTimezone?: string,
): string;

export function format(
    date: DateValue,
    template: string,
    transformMap?: Partial<Record<DateComponentKey, (dateComponents: DateComponents) => unknown>> | string,
    targetTimezone?: string,
): string {
    if (isInvalidDate(date))
        return INVALID_DATE_STRING;

    if (typeof transformMap === 'string') {
        targetTimezone = transformMap;
        transformMap = undefined;
    }

    let dateComponents = getDateComponents(date, targetTimezone);

    if (!dateComponents)
        return INVALID_DATE_STRING;

    return fill(template, dateComponents, transformMap);
}
