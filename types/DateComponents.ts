import type {DateComponentKey} from './DateComponentKey';

export type DateComponents = Record<Exclude<DateComponentKey, 'date' | 'timestamp'>, string> & {
    date: Date;
    timestamp: number;
};
