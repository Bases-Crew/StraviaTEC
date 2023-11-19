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
  ngOnInit(): void {
    if (user.aemail == '') {
      this.router.navigate(['/init']);
    } else {
      this.router.navigate(['/homepage']);
    }
  }
}
