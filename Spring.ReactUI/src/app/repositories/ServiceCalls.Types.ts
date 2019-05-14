export interface IResponse<TResult>{
    Result: TResult;
    Messages: IMessage[];
    Token: string;
}

export interface IMessage{
    Text: string;
    Severity: Severity;
}

export enum Severity{
    Information = 0,
    Warning = 1,
    Error = 2,
    Fatal = 3
}