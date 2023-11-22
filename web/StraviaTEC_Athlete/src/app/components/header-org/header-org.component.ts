import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User, user } from 'src/app/models/login.model';

@Component({
  selector: 'app-header-org',
  templateUrl: './header-org.component.html',
  styleUrls: ['./header-org.component.css'],
})
export class HeaderOrgComponent implements OnInit {
  user: User = {
    aemail: '',
    apassword: '',
    fname: '',
    mname: '',
    lname: '',
    lname2: '',
    birth_date: '',
    flag: '',
    countryname: '',
    image: '',
  };

  photo: File | null = null;

  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = user;

    let urlSegments = this.route.snapshot.url; // array of segments
    this.currentUrl = urlSegments.map((segment) => segment.path).join('/');
    console.log('Actual URL: ', this.currentUrl);
  }
}
