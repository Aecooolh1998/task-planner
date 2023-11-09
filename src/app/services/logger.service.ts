import { Injectable } from '@angular/core';
import { LogLevel } from '../types/types';
@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    constructor() {}

    public none(msg: string): void {
        this.logWith(LogLevel.None, msg);
    }

    public info(msg: string): void {
        this.logWith(LogLevel.Info, msg);
    }

    public warn(msg: string): void {
        this.logWith(LogLevel.Warn, msg);
    }

    public verbose(msg: string): void {
        this.logWith(LogLevel.Verbose, msg);
    }

    public error(msg: string): void {
        this.logWith(LogLevel.Error, msg);
    }

    private logWith(level: LogLevel, msg: string): void {
        switch (level) {
            case LogLevel.None:
                return console.log(msg);
            case LogLevel.Info:
                return console.info('%c' + msg, 'color: #6495ED');
            case LogLevel.Warn:
                return console.warn('%c' + msg, 'color: #FF8C00');
            case LogLevel.Verbose:
                return console.debug('%c' + msg, 'color: #999999');
            case LogLevel.Error:
                return console.error('%c' + msg, 'color: #DC143C');
            default:
                console.debug(msg);
        }
    }
}
