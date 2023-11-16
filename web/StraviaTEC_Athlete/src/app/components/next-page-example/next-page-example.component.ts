import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-page-example',
  templateUrl: './next-page-example.component.html',
  styleUrls: ['./next-page-example.component.css'],
})
export class NextPageExampleComponent {
  constructor(private router: Router) {}
  nextPage() {
    this.router.navigate(['/display-example']);
  }
}
