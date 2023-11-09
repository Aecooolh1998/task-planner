import { Component } from '@angular/core';
import { ITask } from 'src/app/types/types';

@Component({
    selector: 'app-task-planner',
    templateUrl: './task-planner.component.html',
    styleUrls: ['./task-planner.component.scss']
})
export class TaskPlannerComponent {

    public title = 'Task Planner';
    public taskList: ITask[] = [];

    public addTaskToList(task: ITask): void {
        this.taskList.push(task);
    }
}
