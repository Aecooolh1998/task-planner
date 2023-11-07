import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  public title = 'Page Not Found';

  constructor(
    private readonly router: Router
  ) {}

  public goBack(): void {
    this.router.navigate(['']);
  }

}
