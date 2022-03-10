import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faChevronDown = faChevronDown;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;

  constructor() { }

  ngOnInit(): void {
  }

}
