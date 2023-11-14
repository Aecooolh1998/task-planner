export interface ITask {
    name: string;
    description: string;
    creationDate: Date;
    status: TaskStatus
}

export enum LogLevel {
    None = "None",
    Info = "Info",
    Warn = "Warn",
    Error = "Error",
    Verbose = "Verbose"
}

export enum TaskStatus {
    Open = 'Open',
    Completed = 'Completed'
}