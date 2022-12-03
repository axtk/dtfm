export type DateComponentKey =
    | 'date'
    | 'timestamp'
    | 'Y'          // year
    | 'M'          // month
    | 'D'          // day
    | 'h'          // hours
    | 'h12'        // 12h-clock hours
    | 'a'          // AM/PM day period
    | 'm'          // minutes
    | 's'          // seconds
    | 'ms'         // milliseconds
    | 'tz'         // time zone
    | 'WD'         // week day
    | 'iso'        // local time zone ISO date string
    | 'isoDate'    // date (Y-M-D)
    | 'isoTime'    // time (h:m:s)
    | 'isoTimeMs'; // time with milliseconds
