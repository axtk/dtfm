export type DateComponents = {
    date: Date;
    /** Timestamp */
    $t: number;
    /** Year */
    $Y: number;
    /** Year */
    Y: string;
    /** Year of a calendar era (specified by AD/BC or CE/BCE) */
    YE: string;
    /** Christian era: AD/BC */
    E: string;
    /** Common Era: CE/BCE */
    CE: string;
    /** Month */
    $M: number;
    /** Month */
    M: string;
    /** Day */
    $D: number;
    /** Day */
    D: string;
    /** Hours */
    $h: number;
    /** Hours */
    h: string;
    /** 12h-clock hours */
    $h12: number;
    /** 12h-clock hours */
    h12: string;
    /** Day period: AM/PM */
    a: string;
    /** Minutes */
    $m: number;
    /** Minutes */
    m: string;
    /** Seconds */
    $s: number;
    /** Seconds */
    s: string;
    /** Milliseconds */
    $ms: number;
    /** Milliseconds */
    ms: string;
    /** Time zone */
    tz: string;
    /** Week day */
    $WD: number;
    /** Week day */
    WD: string;
    /** Local time zone ISO date string */
    iso: string;
    /** Date (Y-M-D) */
    isoDate: string;
    /** Time (h:m:s) */
    isoTime: string;
    /** Time with milliseconds */
    isoTimeMs: string;
};
