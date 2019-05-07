export interface IOrderDto {
    id?: number;
    recipeDate?: Date | undefined;
    orderDate?: Date | undefined;
    recipeNumber?: string | undefined;
    orderNumber?: string | undefined;
    pharmacy?: string | undefined;
    amount?: number;
}
