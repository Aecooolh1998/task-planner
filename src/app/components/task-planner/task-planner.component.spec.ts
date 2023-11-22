import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ITask, TaskStatus } from 'src/app/types/types';
import { TaskInputComponent } from '../task-input/task-input.component';
import { TaskPlannerComponent } from './task-planner.component';

describe('TaskPlannerComponent', () => {
    let component: TaskPlannerComponent;
    let fixture: ComponentFixture<TaskPlannerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations:
                [
                    TaskPlannerComponent,
                    TaskInputComponent
                ],
            imports: [
                MatInputModule,
                MatDatepickerModule,
                MatNativeDateModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskPlannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('addTaskToList', () => {
        it('should add the emitted task to the task list', () => {
            component.taskList = [];
            const task: ITask = {
                name: 'Bed',
                description: 'Make Bed',
                status: TaskStatus.Open,
                creationDate: new Date(),
                completionDate: new Date(2023, 10, 10)
            }

            component.addTaskToList(task);

            expect(component.taskList.length).toEqual(1);
            expect(component.taskList[0]).toEqual(task);
        });
    });
});
