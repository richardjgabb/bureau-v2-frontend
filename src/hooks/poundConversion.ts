export const poundConversion = (pence: number): string => {
    const pounds = pence / 100;
    return `£${pounds.toFixed(2)}`;
}
