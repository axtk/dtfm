export function getTimezone(dateString: string | undefined): string | undefined {
    return dateString?.match(/[-\+]\d\d:?\d\d\b/)?.[0];
}
