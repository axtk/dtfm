import {fill} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponentKey} from '../types/DateComponentKey';
import type {DateComponents} from '../types/DateComponents';
import {INVALID_DATE_STRING} from './const';
import {isInvalidDate} from './isInvalidDate';
import {getDateComponents} from './getDateComponents';

export type FormatDateTemplate = string | ((dateComponents: DateComponents) => string);
export type FormatDateTransform = Partial<Record<DateComponentKey, (dateComponents: DateComponents) => unknown>>;

export type FormatDateOptions = {
    template: FormatDateTemplate;
    transform?: FormatDateTransform;
    targetTimezone?: string;
};

export function formatDate(
    date: DateValue,
    template?: FormatDateTemplate,
    targetTimezone?: string,
): string;

export function formatDate(
    date: DateValue,
    template?: FormatDateTemplate,
    transform?: FormatDateTransform,
    targetTimezone?: string,
): string;

export function formatDate(
    date: DateValue,
    options?: FormatDateOptions,
): string;

export function formatDate(
    date: DateValue,
    template: FormatDateTemplate | FormatDateOptions = '{iso}',
    transform?: FormatDateTransform | string,
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
