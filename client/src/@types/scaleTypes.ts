export type QuantityOfDaysTypes = 15 | 30;

export interface ScaleData {
    name: string;
    isAutoFilled: boolean;
    quantityOfDays: QuantityOfDaysTypes;
}
