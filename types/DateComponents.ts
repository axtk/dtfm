import type {DateComponentKey} from './DateComponentKey';

export type DateComponents = Record<Exclude<DateComponentKey, 'date' | 'timestamp' | 'a'>, string> & {
    date: Date;
    timestamp: number;
    a: 'AM' | 'PM';
};
