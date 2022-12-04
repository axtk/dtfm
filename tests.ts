import {format, FormatTemplate, FormatOptions} from './src/format';
import {toTimeSpan} from './src/toTimeSpan';
import {DAY, HOUR, MIN} from './src/const';

let k = 0, failed = false;

const customWeekDays = [
    'sunnudagur', 'mánudagur', 'þriðjudagur', 'miðvikudagur',
    'fimmtudagur', 'föstudagur', 'laugardagur',
];
const customMonths = [
    'janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní',
    'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember',
];
const customFullDateFormat: FormatOptions = {
    template: '{WD} {D}. {MMM} {YY}',
    transform: {
        WD: ({weekDay}) => customWeekDays[weekDay],
        MMM: ({month}) => customMonths[month - 1],
    },
};
const customLocale = {
    weekDays: customWeekDays,
    months: customMonths,
    fullDate: customFullDateFormat,
};

function is(testedValue: unknown, expectedValue: unknown) {
    let ok = JSON.stringify(testedValue) === JSON.stringify(expectedValue);

    console.log(`  #${('00' + (++k)).slice(-3)} ${ok ? 'ok' : 'failed'}`);

    if (!ok) {
        try {
            throw new Error('Assertion failed');
        }
        catch (error) {
            console.log({testedValue, expectedValue});
            console.log(error);
        }
        failed = true;
    }
}

function suite(title: string) {
    console.log();
    console.log(title);
    k = 0;
}

suite('basic');
is(format('2022-12-02T12:34:56.789', '{YY}-{MM}-{DD}'), '2022-12-02');
is(format('2022-12-02T12:34:56.789', '{YY}/{MM}/{DD}'), '2022/12/02');
is(format('2022-01-03T12:34:56.789', '{YY}/{MM}/{DD}'), '2022/01/03');
is(format('2022-12-02T12:34:56.789', '{DD}.{MM}'), '02.12');
is(format('2022-12-02T12:34:56.789', '{D}.{MM}'), '2.12');
is(format('2022-12-02T19:34:56.789', '{HH}:{mm}:{ss}'), '19:34:56');
is(format('2022-12-02T07:34:56.789', '{HH}:{mm}:{ss}'), '07:34:56');
is(format('2022-12-02T19:34:56.789', '{H}:{mm}:{ss}'), '19:34:56');
is(format('2022-12-02T07:34:56.789', '{H}:{mm}:{ss}'), '7:34:56');
is(format('2022-12-02T12:34:56.789', '{YY}-{MM}-{DD} {HH}:{mm}:{ss}.{ms}'), '2022-12-02 12:34:56.789');
is(format('2022-12-02T12:34:56.789').slice(0, 23), '2022-12-02T12:34:56.789');

suite('abbreviations');
let months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
for (let m = 0; m < months.length; m++) {
    is(format(new Date(2022, m, 1), '{MM}/{DD}'), `${String(m + 1).padStart(2, '0')}/01`);
    is(format(new Date(2022, m, 1), '{MMM} {D}'), `${months[m]} 1`);
}
let weekDays = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');
for (let wd = 0; wd < weekDays.length; wd++)
    is(format(new Date(2022, 6, 10 + wd), '{WD} {M}/{DD}'), `${weekDays[wd]} 7/${10 + wd}`);
is(format('2022-07-21T12:34:56.789', '{WD} {M}/{DD}'), 'Thu 7/21');
is(format('2022-12-02T12:34:56.789', '{WD}, {MMM} {D}, {Y}'), 'Fri, Dec 2, 2022');

suite('am/pm');
is(format('2022-12-02T12:34:56.789', '{hh}:{mm}:{ss} {a}'), '12:34:56 PM');
is(format('2022-01-01T23:45:54.321', '{hh}:{mm}:{ss} {a}'), '11:45:54 PM');
is(format('2022-07-12T01:23:45.678', '{hh}:{mm}:{ss} {a}'), '01:23:45 AM');
is(format('2022-07-12T01:23:45.678', '{h}:{mm}:{ss} {a}'), '1:23:45 AM');

suite('timezone');
is(format('2022-12-02T12:34:56.789', '{YY}-{MM}-{DD} {HH}:{mm}:{ss}.{ms} {tz}', '-01:00'),
    '2022-12-02 12:34:56.789 -01:00');
is(format('2022-12-02T12:34:56.789-01:00', '{YY}-{MM}-{DD} {HH}:{mm}:{ss}.{ms} {tz}'),
    '2022-12-02 12:34:56.789 -01:00');
is(format('2022-12-02T12:34:56.789-01:00', '{YY}-{MM}-{DD} {HH}:{mm}:{ss}.{ms} {tz}', '-02:00'),
    '2022-12-02 11:34:56.789 -02:00');
is(format('2022-12-02T12:34:56.789-01:00', '{YY}-{MM}-{DD} {HH}:{mm}:{ss}.{ms} {tz}', '+00:00'),
    '2022-12-02 13:34:56.789 +00:00');
is(format('2022-12-02T12:34:56.789-03:00', '{YY}-{MM}-{DD} {HH}:{mm}:{ss}.{ms} {tz}', '+01:00'),
    '2022-12-02 16:34:56.789 +01:00');
is(format('2022-12-02T12:34:56.789Z', '{YY}-{MM}-{DD} {HH}:{mm}:{ss}.{ms} {tz}'),
    '2022-12-02 12:34:56.789 +00:00');
is(format('2022-12-02T12:34:56.789', '{YY}-{MM}-{DD} {HH}:{mm}:{ss}.{ms} {tz}', 'Z'),
    '2022-12-02 12:34:56.789 +00:00');

suite('iso');
is(format('2022-12-02T12:34:56.789', '{isoDate}'), '2022-12-02');
is(format('2022-12-02T12:34:56.789', '{isoTime}'), '12:34:56');
is(format('2022-12-02T12:34:56.789', '{isoTimeMs}'), '12:34:56.789');
is(format('2022-12-02T12:34:56.789', '{iso}', '+00:00'), '2022-12-02T12:34:56.789+00:00');
is(format('2022-12-02T07:34:56.789', '{iso}', '-02:00'), '2022-12-02T07:34:56.789-02:00');

suite('era');
let eraTemplate: FormatTemplate = ({E}) => E === 'AD' ? '{E} {YE}' : '{YE} {E}';
is(format('2022-12-02T12:34:56.789', eraTemplate), 'AD 2022');
is(format(-62200000000000, eraTemplate), '3 BC');
is(format(-62200000000000, '{YY}/{MM}/{DD}'), '-2/12/17');
is(format('2022-12-02T12:34:56.789', '{YE} {CE}'), '2022 CE');
is(format(-62200000000000, '{YE} {CE}'), '3 BCE');
is(format(-62200000000000, '{Y}'), '-2');

suite('transform');
is(format('2022-12-02T12:34:56.789', '{WD} {D}. {MMM} {Y}', {
    WD: ({weekDay}) => customLocale.weekDays[weekDay],
    MMM: ({month}) => customLocale.months[month - 1],
}), 'föstudagur 2. desember 2022');
is(format('2022-07-19T12:34:56.789', customLocale.fullDate), 'þriðjudagur 19. júlí 2022');

suite('span');
is(toTimeSpan(5678), '5.678"');
is(toTimeSpan(2*MIN + 5678), '2\'05.678"');
is(toTimeSpan(-(2*MIN + 5678)), '-2\'05.678"');
is(toTimeSpan(3*HOUR + 7*MIN + 5678), '3h07\'05.678"');
is(toTimeSpan(12*HOUR + 17*MIN + 25678), '12h17\'25.678"');
is(toTimeSpan(2*DAY + 3*HOUR + 17*MIN + 25678), '2d03h17\'25.678"');

console.log();
if (failed) throw new Error('Failed');
else console.log('Passed');
