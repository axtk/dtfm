import type {DateComponentKey} from './DateComponentKey';

export type DateComponents = Record<Exclude<DateComponentKey, 'date' | 'timestamp' | 'a' | 'E' | 'CE'>, string> & {
    date: Date;
    timestamp: number;
    a: 'AM' | 'PM';
    E: 'AD' | 'BC';
    CE: 'CE' | 'BCE';
};
