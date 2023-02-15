import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

export enum DialogType {
  oneOKButton = 1,
  yesNoButton = 2,
}

@Injectable()
export class DialogService {
  private subject = new Subject<any>();
  dialogType: DialogType | undefined;

  confirmThis(
    message: string,
    yesFn: () => void,
    noFn: () => void,
    dialogType: DialogType
  ): any {
    this.setConfirmation(message, yesFn, noFn, dialogType);
  }

  setConfirmation(
    message: string,
    yesFn: () => void,
    noFn: () => void,
    dialogType: DialogType
  ): any {
    console.log('dialogType:' + dialogType);
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      yesFn(): any {
        that.subject.next(null);
        yesFn();
      },
      noFn(): any {
        that.subject.next(null);
        noFn();
      },
      DialogType: dialogType,
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getDialogType(): Observable<any> {
    return this.subject.asObservable();
  }
}
