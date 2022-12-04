import {fill} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponentKey} from '../types/DateComponentKey';
import type {DateComponents} from '../types/DateComponents';
import {INVALID_DATE_STRING} from './const';
import {isInvalidDate} from './isInvalidDate';
import {getDateComponents} from './getDateComponents';

export type FormatTemplate = string | ((dateComponents: DateComponents) => string);
export type FormatTransform = Partial<Record<DateComponentKey, (dateComponents: DateComponents) => unknown>>;

export type FormatOptions = {
    template: FormatTemplate;
    transform?: FormatTransform;
    targetTimezone?: string;
};

export function format(
    date: DateValue,
    template: FormatTemplate,
    targetTimezone?: string,
): string;

export function format(
    date: DateValue,
    template: FormatTemplate,
    transform?: FormatTransform,
    targetTimezone?: string,
): string;

export function format(
    date: DateValue,
    options: FormatOptions,
): string;

export function format(
    date: DateValue,
    template: FormatTemplate | FormatOptions,
    transform?: FormatTransform | string,
    targetTimezone?: string,
): string {
    if (isInvalidDate(date))
        return INVALID_DATE_STRING;

    if (typeof template === 'object') {
        let options = template;

        transform = options.transform;
        targetTimezone = options.targetTimezone;
        template = options.template;
    }
    else if (typeof transform === 'string') {
        targetTimezone = transform;
        transform = undefined;
    }

    let dateComponents = getDateComponents(date, targetTimezone);

    if (!dateComponents)
        return INVALID_DATE_STRING;

    let resolvedTemplate = typeof template === 'function'
        ? template(dateComponents)
        : template;

    return fill(resolvedTemplate, dateComponents, transform);
}
