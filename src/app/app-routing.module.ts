import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskPlannerComponent } from './components/task-planner/task-planner.component';

const routes: Routes = [
    { path: '', component: TaskPlannerComponent, title: 'Task Planner' },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
