export interface IContractDto {
    id?: number;
    name?: string | undefined;
    code?: string | undefined;
    description?: string | undefined;
    beginDate?: Date;
    endDate?: Date;
    isActive?: boolean;
}
