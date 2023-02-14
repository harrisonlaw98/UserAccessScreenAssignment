import { Component, OnInit } from '@angular/core';
import { columnDefinition, TabId } from '../ColumnDefinition';
import { UserService } from '../Data/user.service';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css'],
})
export class AppTableComponent implements OnInit {
  _data: any[] = [];
  _tableViewData: any[] = [];

  _columnDefinition: any[] = [];
  _viewSelected = TabId.User;
  isEditMode: boolean = false;
  activeId: number = TabId.User; //Start by User Tab

  searchText: string = '';

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    //Init current selected Tab to User
    this._viewSelected = this.activeId;

    this.refreshTable();
  }

  changeMode() {
    this.isEditMode = !this.isEditMode;

    this.refreshTable();
  }

  refreshTable() {
    this._columnDefinition = columnDefinition.filter(
      (columnDefinition) => columnDefinition.tabId === this._viewSelected
    );

    if (this._viewSelected == TabId.User) {
      this._data = this.userService.getUser().map((e) => e);
    } else {
      this._data = [];
    }

    //clone obejct without reference
    this._tableViewData = this._data;
  }

  public inputChange(event: any, key: any) {
    console.log(event);

    console.log(key);

    if (this._viewSelected == TabId.User) {
      let userId = this._columnDefinition
        .find((column) => column.columnId === 'userId')
        ?.ngValue?.toLowerCase();
      let firstName = this._columnDefinition
        .find((column) => column.columnId === 'firstName')
        ?.ngValue?.toLowerCase();
      let lastName = this._columnDefinition
        .find((column) => column.columnId === 'lastName')
        ?.ngValue?.toLowerCase();
      let loginName = this._columnDefinition
        .find((column) => column.columnId === 'loginName')
        ?.ngValue?.toLowerCase();
      let email = this._columnDefinition
        .find((column) => column.columnId === 'email')
        ?.ngValue?.toLowerCase();

      if (userId || firstName || lastName || loginName || email) {
        //TODO complete filter code
        this._tableViewData = this._data.filter((row) => {
          if (userId && row.userId.includes(userId)) return true;
          return false;
        });

        //end TODO
      } else {
        this._tableViewData = this._data;
      }
    }
  }

  // pop up ref
  // https://ng-bootstrap.github.io/releases/13.x/#/components/modal/examples
  deleteRecord(deleteUser: any) {
    if (this._viewSelected == TabId.User) {
      this.userService.deleteUser(deleteUser);
    }

    this.refreshTable();
  }

  addRecord() {
    if (this._viewSelected == TabId.User) {
      let newUser = {
        userId: '',
        firstName: '',
        lastName: '',
        loginName: '',
        password: '',
        email: '',
        newRecord: true,
      };
      this._data.splice(0, 0, newUser);
    }
  }

  save() {
    if (this._viewSelected == TabId.User) {
      //Do each records validation
      this.userService.updateUser(this._data);
    }

    this.changeMode();
  }

  onModeChange(): void {
    console.log(this.activeId);
    this._viewSelected = this.activeId;
    this.refreshTable();
  }

  saveBtnDisabled() {
    if (this._viewSelected == TabId.User) {
      return JSON.stringify(this._data).includes('""');
    }
    return true;
  }
}
