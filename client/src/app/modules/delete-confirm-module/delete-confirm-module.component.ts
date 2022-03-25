import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-module',
  templateUrl: './delete-confirm-module.component.html',
  styleUrls: ['./delete-confirm-module.component.scss']
})
export class DeleteConfirmModuleComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog() {
    const confirmation = this.dialog.open(ConfirmationDialog);
    confirmation.afterClosed().subscribe(result => {

    })

  }
  
}
export class ConfirmationDialog {}
