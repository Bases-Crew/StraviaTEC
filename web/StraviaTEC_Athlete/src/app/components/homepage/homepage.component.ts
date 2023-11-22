import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/login.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router) {}

  /**
   * Initializes the component.
   *
   * This function is called when the component is first created.
   * It checks if the user's email is empty and navigates to the
   * initial page if it is, or navigates to the homepage if it
   * is not.
   *
   * @return {void}
   */
  ngOnInit(): void {
    if (user.aemail == '') {
      this.router.navigate(['/init']);
    } else {
      this.router.navigate(['/homepage']);
    }
  }
}
