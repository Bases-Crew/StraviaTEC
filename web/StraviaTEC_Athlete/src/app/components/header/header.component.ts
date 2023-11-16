import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User, user } from 'src/app/models/login.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User = {
    aemail: '',
    apassword: '',
    fname: '',
    mname: '',
    lname: '',
    lname2: '',
    cno: 0,
    birth_date: '',
  };

  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = user;

    let urlSegments = this.route.snapshot.url; // array of segments
    this.currentUrl = urlSegments.map((segment) => segment.path).join('/');
    console.log('Actual URL: ', this.currentUrl);
  }
}
