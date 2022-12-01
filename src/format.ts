import {fill} from 'stfm';
import type {DateValue} from '../types/DateValue';
import type {DateComponentKey} from '../types/DateComponentKey';
import type {DateComponents} from '../types/DateComponents';
import {INVALID_DATE_STRING} from './const';
import {isInvalidDate} from './isInvalidDate';
import {getDateComponents} from './getDateComponents';

type FillTransformMap = Parameters<typeof fill>[2];

export function format(
    date: DateValue,
    dateTemplate: string,
    transformMap?: Partial<Record<DateComponentKey, (dateComponents: DateComponents) => unknown>>,
): string {
    if (isInvalidDate(date))
        return INVALID_DATE_STRING;

    let dateComponents = getDateComponents(date);

    if (!dateComponents)
        return INVALID_DATE_STRING;

    return fill(dateTemplate, dateComponents, transformMap as FillTransformMap);
}
