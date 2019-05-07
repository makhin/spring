export interface ICustomerDto {
    id?: number;
    contractId?: number;
    name?: string | undefined;
    dateOfBirth?: Date | undefined;
    tin?: string | undefined;
    department?: string | undefined;
    personnelNumber?: string | undefined;
    disabilityGroup?: number | undefined;
    mobilePhone?: string | undefined;
    position?: string | undefined;
    additionalInfo?: string | undefined;
    cardNumber?: string | undefined;
    address?: string | undefined;
    sex?: boolean | undefined;
    passport?: string | undefined;
    startDate?: Date;
    endDate?: Date | undefined;
}
