import {format, FormatTemplate} from './src/format';
import {toTimeSpan} from './src/toTimeSpan';
import {DAY, HOUR, MIN, weekDays, months} from './src/const';

let k = 0, failed = false;

const customLocale = {
    weekDays: [
        'sunnudagur', 'mánudagur', 'þriðjudagur', 'miðvikudagur',
        'fimmtudagur', 'föstudagur', 'laugardagur',
    ],
    months: [
        'janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní',
        'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember',
    ],
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
is(format('2022-12-02T12:34:56.789', '{Y}-{M}-{D}'), '2022-12-02');
is(format('2022-12-02T12:34:56.789', '{Y}/{M}/{D}'), '2022/12/02');
is(format('2022-12-02T12:34:56.789', '{D}.{M}'), '02.12');
is(format('2022-12-02T12:34:56.789', '{h}:{m}:{s}'), '12:34:56');
is(format('2022-12-02T12:34:56.789', '{Y}-{M}-{D} {h}:{m}:{s}.{ms}'), '2022-12-02 12:34:56.789');
is(format('2022-12-02T12:34:56.789', '{$WD}'), '5');

suite('abbreviations');
is(format('2022-07-21T12:34:56.789', '{WD} {M}/{D}'), 'Thu 07/21');
is(format('2022-12-02T12:34:56.789', '{WD}, {MM} {$D}, {Y}'), 'Fri, Dec 2, 2022');

suite('am/pm');
is(format('2022-12-02T12:34:56.789', '{h12}:{m}:{s} {a}'), '12:34:56 PM');
is(format('2022-01-01T23:45:54.321', '{h12}:{m}:{s} {a}'), '11:45:54 PM');
is(format('2022-07-12T01:23:45.678', '{h12}:{m}:{s} {a}'), '01:23:45 AM');

suite('timezone');
is(format('2022-12-02T12:34:56.789', '{Y}-{M}-{D} {h}:{m}:{s}.{ms} {tz}', '-01:00'), '2022-12-02 12:34:56.789 -01:00');
is(format('2022-12-02T12:34:56.789-01:00', '{Y}-{M}-{D} {h}:{m}:{s}.{ms} {tz}'), '2022-12-02 12:34:56.789 -01:00');
is(format('2022-12-02T12:34:56.789-01:00', '{Y}-{M}-{D} {h}:{m}:{s}.{ms} {tz}', '-02:00'), '2022-12-02 11:34:56.789 -02:00');
is(format('2022-12-02T12:34:56.789-01:00', '{Y}-{M}-{D} {h}:{m}:{s}.{ms} {tz}', '+00:00'), '2022-12-02 13:34:56.789 +00:00');
is(format('2022-12-02T12:34:56.789-03:00', '{Y}-{M}-{D} {h}:{m}:{s}.{ms} {tz}', '+01:00'), '2022-12-02 16:34:56.789 +01:00');
is(format('2022-12-02T12:34:56.789Z', '{Y}-{M}-{D} {h}:{m}:{s}.{ms} {tz}'), '2022-12-02 12:34:56.789 +00:00');
is(format('2022-12-02T12:34:56.789', '{Y}-{M}-{D} {h}:{m}:{s}.{ms} {tz}', 'Z'), '2022-12-02 12:34:56.789 +00:00');

suite('iso');
is(format('2022-12-02T12:34:56.789', '{isoDate}'), '2022-12-02');
is(format('2022-12-02T12:34:56.789', '{isoTime}'), '12:34:56');
is(format('2022-12-02T12:34:56.789', '{isoTimeMs}'), '12:34:56.789');
is(format('2022-12-02T12:34:56.789', '{iso}', '+00:00'), '2022-12-02T12:34:56.789+00:00');

suite('era');
let eraTemplate: FormatTemplate = ({E}) => E === 'AD' ? '{E} {YE}' : '{YE} {E}';
is(format('2022-12-02T12:34:56.789', eraTemplate), 'AD 2022');
is(format(-62200000000000, eraTemplate), '3 BC');
is(format(-62200000000000, '{Y}/{M}/{D}'), '-2/12/17');
is(format('2022-12-02T12:34:56.789', '{YE} {CE}'), '2022 CE');
is(format(-62200000000000, '{YE} {CE}'), '3 BCE');
is(format(-62200000000000, '{Y}'), '-2');
is(format(-62200000000000, '{$Y}'), '-2');

suite('transform');
is(format('2022-12-02T12:34:56.789', '{WD} {$D}. {M} {Y}', {
    WD: ({$WD}) => customLocale.weekDays[$WD],
    M: ({$M}) => customLocale.months[$M],
}), 'föstudagur 2. desember 2022');

suite('span');
let d = Date.now();
is(toTimeSpan(d - 5678, d), '5.678"');
is(toTimeSpan(d - (2*MIN + 5678), d), '2\'05.678"');
is(toTimeSpan(d, d - (2*MIN + 5678)), '-2\'05.678"');
is(toTimeSpan(d - (3*HOUR + 7*MIN + 5678), d), '3h07\'05.678"');
is(toTimeSpan(d - (12*HOUR + 17*MIN + 25678), d), '12h17\'25.678"');
is(toTimeSpan(d - (2*DAY + 3*HOUR + 17*MIN + 25678), d), '2d03h17\'25.678"');

console.log();
if (failed) throw new Error('Failed');
else console.log('Passed');
