export type DateComponentKey =
    | 'date'
    | 'timestamp'
    | 'Y'          // year
    | 'YE'         // year of a calendar era (specified by AD/BC or CE/BCE)
    | 'E'          // Christian era: AD/BC
    | 'CE'         // Common Era: CE/BCE
    | 'M'          // month
    | 'D'          // day
    | 'h'          // hours
    | 'h12'        // 12h-clock hours
    | 'a'          // day period: AM/PM
    | 'm'          // minutes
    | 's'          // seconds
    | 'ms'         // milliseconds
    | 'tz'         // time zone
    | 'WD'         // week day
    | 'iso'        // local time zone ISO date string
    | 'isoDate'    // date (Y-M-D)
    | 'isoTime'    // time (h:m:s)
    | 'isoTimeMs'; // time with milliseconds
