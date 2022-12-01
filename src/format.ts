import {fill} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponentKey} from '../types/DateComponentKey';
import type {DateComponents} from '../types/DateComponents';
import {getDateComponents} from '../lib/getDateComponents';

type FillTransformMap = Parameters<typeof fill>[2];

export function format(
    date: DateValue,
    dateTemplate: string,
    transformMap?: Partial<Record<DateComponentKey, (dateComponents: DateComponents) => unknown>>,
): string {
    let t = date instanceof Date ? date : new Date(date);

    if (Number.isNaN(t.getTime()))
        return t.toString();

    let dateComponents = getDateComponents(date);

    if (!dateComponents)
        return new Date('-').toString(); // invalid date string

    return fill(dateTemplate, dateComponents, transformMap as FillTransformMap);
}
