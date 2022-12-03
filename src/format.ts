import {fill} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponentKey} from '../types/DateComponentKey';
import type {DateComponents} from '../types/DateComponents';
import {INVALID_DATE_STRING} from './const';
import {isInvalidDate} from './isInvalidDate';
import {getDateComponents} from './getDateComponents';

export type FormatTemplate = string | ((dateComponents: DateComponents) => string);
export type FormatTransformMap = Partial<Record<DateComponentKey, (dateComponents: DateComponents) => unknown>>;

export function format(
    date: DateValue,
    template: FormatTemplate,
    targetTimezone?: string,
): string;

export function format(
    date: DateValue,
    template: FormatTemplate,
    transformMap?: FormatTransformMap,
    targetTimezone?: string,
): string;

export function format(
    date: DateValue,
    template: FormatTemplate,
    transformMap?: FormatTransformMap | string,
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

    let resolvedTemplate = typeof template === 'function'
        ? template(dateComponents)
        : template;

    return fill(resolvedTemplate, dateComponents, transformMap);
}
