import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DialogType } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css'],
})
export class DialogComponent implements OnInit {
  message: any;
  dialogType: any;
  constructor(private dialogService: DialogService) {}

  ngOnInit(): any {
    /**
     *   This function waits for a message from alert service, it gets
     *   triggered when we call this from any other component
     */
    this.dialogService.getMessage().subscribe((message) => {
      this.message = message;
      this.dialogType = message.DialogType;
    });
  }
}
