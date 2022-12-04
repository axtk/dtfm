# dtfm

*Locale-agnostic date formatting utilities*

-----

**`formatDate(date, template, [transform], [targetTimezone])`**<br>
**`formatDate(date, options: { template, [transform], [targetTimezone] })`**

```js
formatDate(new Date(), '{YY}-{MM}-{DD} {HH}:{mm}:{ss}');

// = 2022-07-19 12:34:56
```

<details>
<summary>Bringing in locale specifics</summary>

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

**`toTimeSpan(duration)`**

```js
toTimeSpan(123456);

// = 2'03.456"
```
