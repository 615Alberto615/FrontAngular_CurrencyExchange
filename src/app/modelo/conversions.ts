export interface Conversion {
    conversionId: number;
    fromCurrencyCode: string;
    toCurrencyCode: string;
    amount: number;
    convertedAmount: number;
    conversionDate: string;
}   