import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask, TaskStatus } from 'src/app/types/types';

@Component({
    selector: 'app-task-input',
    templateUrl: './task-input.component.html',
    styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {

    @Output() public taskSubmittedEvent = new EventEmitter<ITask>();

    public taskInputForm!: FormGroup;
    public tasks: ITask[] = [];
    public minDate = new Date();
    public maxDate = new Date();

    constructor(
        private readonly formBuilder: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.maxDate.setFullYear(this.minDate.getFullYear() + 1);
        this.taskInputForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.minLength(5)]],
            completionDate: [null, [Validators.required]]
        });
    }

    public onSubmit(): void {
        if (this.taskInputForm.valid) {
            const formValues = this.taskInputForm.value;
            const task: ITask = {
                name: formValues.name,
                description: formValues.description,
                creationDate: new Date(),
                status: TaskStatus.Open,
                completionDate: formValues.completionDate
            }
            this.taskSubmittedEvent.emit(task);
        }
    }
}
