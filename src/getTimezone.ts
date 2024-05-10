export function getTimezone(dateString: string | undefined): string | undefined {
    if (!dateString)
        return;

    if (/(^|T|\s)\d\d:\d\d:\d\d(\.\d{3})?Z(\s|$)/.test(dateString))
        return 'Z';

    return dateString.match(/[+-]\d\d:?\d\d\b/)?.[0];
}
