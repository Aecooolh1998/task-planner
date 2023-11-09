import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe('LoggerService', () => {
    let service: LoggerService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoggerService
            ]
        });
        service = TestBed.inject(LoggerService);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('none', () => {
        it('should log the message to the console', (() => {
            spyOn(console, 'log');
            const message = 'None Message';

            service.none(message);

            expect(console.log).toHaveBeenCalledWith(`${message}`);
        }));
    });

    describe('info', () => {
        it('should log the message to the console', (() => {
            spyOn(console, 'info');
            const message = 'Info Message';

            service.info(message);

            expect(console.info).toHaveBeenCalledWith(`%c${message}`, 'color: #6495ED');
        }));
    });

    describe('warn', () => {
        it('should log the message to the console', (() => {
            spyOn(console, 'warn');
            const message = 'Warn Message';

            service.warn(message);

            expect(console.warn).toHaveBeenCalledWith(`%c${message}`, 'color: #FF8C00');
        }));
    });

    describe('verbose', () => {
        it('should log the message to the console', (() => {
            spyOn(console, 'debug');
            const message = 'Debug Message';

            service.verbose(message);

            expect(console.debug).toHaveBeenCalledWith(`%c${message}`, 'color: #999999');
        }));
    });

    describe('error', () => {
        it('should log the message to the console', (() => {
            spyOn(console, 'error');
            const message = 'Error Message';

            service.error(message);

            expect(console.error).toHaveBeenCalledWith(`%c${message}`, 'color: #DC143C');
        }));
    });
});
