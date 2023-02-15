import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableControlService {
  selectedTab: number;

  constructor() {
    this.selectedTab = 1;
  }
}
