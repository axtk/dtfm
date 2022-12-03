export function getTimezoneOffset(timezone: string | undefined): number | undefined {
    let [, sign, h, m] = timezone?.match(/^([-\+])(\d\d):?(\d\d)$/) ?? [];

    if (!sign || !h || !m)
        return;
    
    return (sign === '+' ? -1 : 1)*(parseInt(h, 10)*60 + parseInt(m, 10));
}
