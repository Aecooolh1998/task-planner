import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskStatus } from 'src/app/types/types';
import { TaskInputComponent } from './task-input.component';

describe('TaskInputComponent', () => {
    let component: TaskInputComponent;
    let fixture: ComponentFixture<TaskInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TaskInputComponent
            ],
            imports: [
                MatInputModule,
                MatDatepickerModule,
                MatNativeDateModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const expectedDate = new Date();
        expectedDate.setMilliseconds(0);
        component.minDate.setMilliseconds(0);

        expect(component).toBeTruthy();

        expect(component.minDate).toEqual(expectedDate);
    });

    describe('ngOnInit', () => {
        it('should create the taskInputForm and its controls with their validators', () => {
            component.ngOnInit();

            const nameControl = component.taskInputForm.get('name');
            const descriptionControl = component.taskInputForm.get('description');
            const completionDateControl = component.taskInputForm.get('completionDate');

            expect(nameControl).toBeTruthy();
            expect(descriptionControl).toBeTruthy();
            expect(completionDateControl).toBeTruthy();
            expect(nameControl?.valid).toBeFalse();
            expect(nameControl?.hasError('required')).toBeTrue();
            expect(nameControl?.hasError('minlength')).toBeFalse();
            expect(descriptionControl?.valid).toBeTrue();
            expect(descriptionControl?.hasError('minlength')).toBeFalse();
            expect(completionDateControl?.valid).toBeFalse();
            expect(completionDateControl?.hasError('required')).toBeTrue();
        });

        it('should set the max date value a year from today', () => {
            const expectedDate = new Date();
            expectedDate.setFullYear(expectedDate.getFullYear() + 1);
            expectedDate.setMilliseconds(0);
            component.maxDate.setMilliseconds(0);

            component.ngOnInit();
            
            expect(component.maxDate).toEqual(expectedDate);
        });
    });

    describe('onSubmit', () => {
        it('should check the form is valid and emit the taskSubmittedEvent data', () => {
            component.taskInputForm.setValue({
                name: 'Make Bed',
                description: 'Make Bed Ready For The Evening',
                completionDate: new Date(2023, 12, 21)
            });
            const taskSubmittedSpy = spyOn(component.taskSubmittedEvent, 'emit');

            component.onSubmit();

            expect(taskSubmittedSpy).toHaveBeenCalledWith({
                name: 'Make Bed',
                description: 'Make Bed Ready For The Evening',
                status: TaskStatus.Open,
                creationDate: new Date(),
                completionDate: new Date(2023, 12, 21)
            });
        });

        it('should not emit the taskSubmittedEvent data if the form is invalid', () => {
            component.taskInputForm.setValue({
                name: '',
                description: 'Make Bed',
                completionDate: new Date(2023, 12, 21)
            });
            const taskSubmittedSpy = spyOn(component.taskSubmittedEvent, 'emit');

            component.onSubmit();

            expect(taskSubmittedSpy).not.toHaveBeenCalled();
        });
    });
});
