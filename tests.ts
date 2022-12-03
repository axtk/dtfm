import {format} from './src/format';

function is(testedValue: unknown, expectedValue: unknown) {
    console.assert(
        JSON.stringify(testedValue) === JSON.stringify(expectedValue),
        'is %o',
        {testedValue, expectedValue},
    );
}

let d;

console.log('basic');
d = '2022-12-02T12:34:56.789';
is(format(d, '{Y}-{M}-{D}'), '2022-12-02');
is(format(d, '{Y}/{M}/{D}'), '2022/12/02');
is(format(d, '{D}.{M}'), '02.12');
is(format(d, '{h}:{m}:{s}'), '12:34:56');
is(format(d, '{Y}-{M}-{D} {h}:{m}:{s}.{ms}'), '2022-12-02 12:34:56.789');
is(format(d, '{WD}'), 'Fri');
is(format(d, '{WD} {M}/{D}'), 'Fri 12/02');
is(format(d, '{isoDate}'), '2022-12-02');
is(format(d, '{isoTime}'), '12:34:56');
is(format(d, '{isoTimeMs}'), '12:34:56.789');

console.log('am/pm');
is(format('2022-12-02T12:34:56.789', '{h12}:{m}:{s} {a}'), '12:34:56 PM');
is(format('2022-01-01T23:45:54.321', '{h12}:{m}:{s} {a}'), '11:45:54 PM');
is(format('2022-07-12T01:23:45.678', '{h12}:{m}:{s} {a}'), '01:23:45 AM');
