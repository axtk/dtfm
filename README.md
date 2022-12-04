# dtfm

*Locale-agnostic date formatting utilities*

-----

```js
formatDate(new Date(), '{YY}-{MM}-{DD} {HH}:{mm}:{ss}');
// = 2022-07-19 12:34:56
```

<details>
<summary>List of placeholders</summary>

| Placeholder | Value |
|-------------|-------|
| `{Y}` | Year |
| `{YY}` | Year |
| `{YE}` | Year of a calendar era (specified by AD/BC or CE/BCE) |
| `{E}` | Christian era: AD/BC |
| `{CE}` | Common Era: CE/BCE |
| `{M}` | Month |
| `{MM}` | Month (always 2-digit, zero-padded) |
| `{MMM}` | Month abbreviation |
| `{D}` | Day |
| `{DD}` | Day (always 2-digit, zero-padded) |
| `{H}` | Hours |
| `{HH}` | Hours (always 2-digit, zero-padded) |
| `{h}` | 12h-clock hours |
| `{hh}` | 12h-clock hours (always 2-digit, zero-padded) |
| `{a}` | Day period: AM/PM |
| `{m}` | Minutes |
| `{mm}` | Minutes (always 2-digit, zero-padded) |
| `{s}` | Seconds |
| `{ss}` | Seconds (always 2-digit, zero-padded) |
| `{ms}` | Milliseconds (always 3-digit, zero-padded) |
| `{tz}` | Time zone |
| `{wd}` | Week day |
| `{WD}` | Week day abbreviation |
| `{iso}` | Local time zone ISO date string |
| `{isoDate}` | Date (= `{YY}-{MM}-{DD}`) |
| `{isoTime}` | Time (= `{HH}:{mm}:{ss}`) |
| `{isoTimeMs}` | Time with milliseconds |

</details>

<details>
<summary>Using external locale-specific formats</summary>

```js
formatDate(new Date(), customLocale.fullDate);
// = þriðjudagur 19. júlí 2022
```

```js
// custom-locale.js (outside the package)
const customWeekDays = [
    'sunnudagur', 'mánudagur', 'þriðjudagur', 'miðvikudagur',
    'fimmtudagur', 'föstudagur', 'laugardagur',
];
const customMonths = [
    'janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní',
    'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember',
];
const customFullDateFormat = {
    template: '{WD} {D}. {MMM} {Y}',
    transform: {
        WD: ({ weekDay }) => customWeekDays[weekDay],
        MMM: ({ month }) => customMonths[month - 1],
    },
};
export const customLocale = {
    fullDate: customFullDateFormat,
};
```
</details>

<details>
<summary>Dynamic templates</summary>

```js
let eraTemplate = ({ E }) => E === 'AD' ? '{E} {YE}' : '{YE} {E}';

formatDate('2022-07-19', eraTemplate);
// = AD 2022

formatDate(-62200000000000, eraTemplate);
// = 3 BC
```
</details>

-----

```js
formatDuration(123456);
// = 2'03.456"
```
