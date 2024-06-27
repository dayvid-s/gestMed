export type QuantityOfDaysTypes = 7 | 30;

export interface ScaleData {
    name: string;
    isAutoFilled: boolean;
    quantityOfDays: QuantityOfDaysTypes | null;
}
