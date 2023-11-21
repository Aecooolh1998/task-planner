import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskStatus } from 'src/app/types/types';
import { TaskInputComponent } from './task-input.component';

describe('TaskInputComponent', () => {
    let component: TaskInputComponent;
    let fixture: ComponentFixture<TaskInputComponent>;
    let formBuilder: FormBuilder;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TaskInputComponent
            ],
            imports: [
                MatInputModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskInputComponent);
        component = fixture.componentInstance;
        formBuilder = TestBed.inject(FormBuilder);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should create the taskInputForm and its controls with their validators', () => {
            component.ngOnInit();

            const nameControl = component.taskInputForm.get('name');
            const descriptionControl = component.taskInputForm.get('description');

            expect(nameControl).toBeTruthy();
            expect(descriptionControl).toBeTruthy();
            expect(nameControl?.valid).toBeFalse();
            expect(nameControl?.hasError('required')).toBeTrue();
            expect(nameControl?.hasError('minlength')).toBeFalse();
            expect(descriptionControl?.valid).toBeTrue();
            expect(descriptionControl?.hasError('minlength')).toBeFalse();
        });
    });

    describe('onSubmit', () => {
        it('should check the form is valid and emit the taskSubmittedEvent data', () => {
            component.taskInputForm.setValue({
                name: 'Make Bed',
                description: 'Make Bed Ready For The Evening'
            });
            const taskSubmittedSpy = spyOn(component.taskSubmittedEvent, 'emit');

            component.onSubmit();

            expect(taskSubmittedSpy).toHaveBeenCalledWith({
                name: 'Make Bed',
                description: 'Make Bed Ready For The Evening',
                status: TaskStatus.Open,
                creationDate: new Date()
            });
        });

        it('should not emit the taskSubmittedEvent data if the form is invalid', () => {
            component.taskInputForm.setValue({
                name: '',
                description: 'Make Bed'
            });
            const taskSubmittedSpy = spyOn(component.taskSubmittedEvent, 'emit');

            component.onSubmit();

            expect(taskSubmittedSpy).not.toHaveBeenCalled();
        });
    });
});
