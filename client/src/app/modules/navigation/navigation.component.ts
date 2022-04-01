import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import { faCartShopping } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  faChevronDown = faChevronDown;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;

  constructor() { }

  ngOnInit(): void {
  }

}
