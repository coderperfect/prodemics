import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  links = [
    { title: 'Home', url: '/' },
    { title: 'Login', url: '/login' }
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
