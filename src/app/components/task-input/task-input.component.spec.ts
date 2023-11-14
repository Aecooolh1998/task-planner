import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should create the taskInputForm and its controls', () => {
            component.ngOnInit();

            expect(component.taskInputForm).toBeDefined();
            expect(component.taskInputForm.valid).toBeTrue();
            expect(component.taskInputForm.get('description')).toBeTruthy();
            expect(component.taskInputForm.get('name')).toBeTruthy();
        });
    });

    describe('onSubmit', () => {
        it('should check the form is valid and emit the taskSubmittedEvent data', () => {
            component.taskInputForm.setValue({
                name: 'Bed',
                description: 'Make Bed'
            });
            const taskSubmittedSpy = spyOn(component.taskSubmittedEvent, 'emit');

            component.onSubmit();

            expect(taskSubmittedSpy).toHaveBeenCalledWith({
                name: 'Bed',
                description: 'Make Bed',
                status: TaskStatus.Open,
                creationDate: new Date()
            });
        });

        //TODO: Test For When it is invalid, no validators currently so it cannot be tested.
    });
});
