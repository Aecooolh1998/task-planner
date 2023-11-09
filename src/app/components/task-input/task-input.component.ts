import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITask } from 'src/app/types/types';

@Component({
    selector: 'app-task-input',
    templateUrl: './task-input.component.html',
    styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {

    @Output() public taskSubmittedEvent = new EventEmitter<ITask>();

    public taskInputForm!: FormGroup;
    public tasks: ITask[] = [];

    constructor(
        private readonly formBuilder: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.taskInputForm = this.formBuilder.group({
            taskDescription: ['']
        });
    }

    public onSubmit(): void {
        if (this.taskInputForm.valid) {
            const formValues = this.taskInputForm.value;
            const task: ITask = {
                description: formValues.taskDescription
            }
            this.taskSubmittedEvent.emit(task);
        }
    }
}
