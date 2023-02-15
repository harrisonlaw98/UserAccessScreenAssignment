import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { columnDefinition, TabId } from '../ColumnDefinition';
import { GroupService } from '../Data/group.service';
import { UserAccessService } from '../Data/user-access.service';
import { UserService } from '../Data/user.service';
import { DialogService, DialogType } from '../dialog/dialog.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css'],
})
export class AppTableComponent implements OnInit {
  _data: any[] = [];
  _tableViewData: any[] = []; //temp object for display
  _userData: any[] = [];
  _groupData: any[] = [];

  _columnDefinition: any[] = [];
  _viewSelected = TabId.User;
  isEditMode: boolean = false;
  activeId: number = TabId.User; //Start by User Tab

  searchText: string = '';
  datePicker: NgbDateStruct | undefined;

  constructor(
    public userService: UserService,
    public groupService: GroupService,
    public userAccessService: UserAccessService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    //Init current selected Tab to User
    this._viewSelected = this.activeId;

    this.refreshTable();
  }

  //Top Bar start//
  onTabChange(changeEvent: NgbNavChangeEvent): void {
    if (this.isEditMode) {
      changeEvent.preventDefault();
    }
  }

  onActiveIdChange(): void {
    this._viewSelected = this.activeId;
    console.log('top bar selectedTab: ' + this._viewSelected);

    this.refreshTable();
  }
  //Top Bar End//

  changeMode() {
    this.isEditMode = !this.isEditMode;

    this.refreshTable();
  }

  refreshTable() {
    this._columnDefinition = columnDefinition.filter(
      (columnDefinition) => columnDefinition.tabId === this._viewSelected
    );
    this._tableViewData = [];
    if (this._viewSelected == TabId.User) {
      this._data = this.userService.getUser();
    } else if (this._viewSelected == TabId.UserAccess) {
      this._data = this.userAccessService.getuserAccess();
      this._userData = this.userService.getUser();
      this._groupData = this.groupService.getGroup();
    } else if (this._viewSelected == TabId.Group) {
      this._data = this.groupService.getGroup();
    } else {
      this._data = [];
    }

    //clone obejct without reference
    this._tableViewData = JSON.parse(JSON.stringify(this._data));
  }

  // pop up ref
  // https://ng-bootstrap.github.io/releases/13.x/#/components/modal/examples
  deleteRecord(deleteUser: any) {
    if (this._viewSelected == TabId.User) {
      this.showDialog(
        deleteUser.userId + ' will be deleted. Confirm?',
        () => {
          this.userService.deleteUser(deleteUser);
          this.refreshTable();
        },
        function () {},
        DialogType.yesNoButton
      );
    } else if (this._viewSelected == TabId.UserAccess) {
      this.showDialog(
        'Do you want to remove the relationship between ' +
          deleteUser.userId +
          ' and ' +
          deleteUser.groupId +
          '?',
        () => {
          this.userAccessService.deleteuserAccess(deleteUser);
          this.refreshTable();
        },
        function () {},
        DialogType.yesNoButton
      );
    } else if (this._viewSelected == TabId.Group) {
      this.showDialog(
        deleteUser.groupId + ' will be deleted. Confirm?',
        () => {
          this.groupService.deleteGroup(deleteUser);
          this.refreshTable();
        },
        function () {},
        DialogType.yesNoButton
      );
    }
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
      this._tableViewData.splice(0, 0, newUser);
    } else if (this._viewSelected == TabId.UserAccess) {
      let newUserAccess = {
        userId: '',
        groupId: '',
        dateOfRelationshipCreation: '',
        newRecord: true,
      };
      this._tableViewData.splice(0, 0, newUserAccess);
    } else if (this._viewSelected == TabId.Group) {
      let newGroup = {
        groupId: '',
        groupName: '',
        description: '',
        newRecord: true,
      };
      this._tableViewData.splice(0, 0, newGroup);
    }
  }

  save() {
    if (this._viewSelected == TabId.User) {
      this.userService.updateUser(
        JSON.parse(JSON.stringify(this._tableViewData))
      );
    } else if (this._viewSelected == TabId.UserAccess) {
      this.userAccessService.updateuserAccess(
        JSON.parse(JSON.stringify(this._tableViewData))
      );
    } else if (this._viewSelected == TabId.Group) {
      this.groupService.updateGroup(
        JSON.parse(JSON.stringify(this._tableViewData))
      );
    }

    this.changeMode();
  }

  //Disable Save button
  saveBtnDisabled() {
    if (this._viewSelected == TabId.User) {
      //Is data equals
      if (JSON.stringify(this._tableViewData) == JSON.stringify(this._data))
        return true;
      //Is empty input exist?
      let tempViewData = this._tableViewData.map((e) => e);
      tempViewData = tempViewData.filter((row) => {
        if (
          row.userId.length == 0 ||
          row.firstName.length == 0 ||
          row.lastName.length == 0 ||
          row.loginName.length == 0 ||
          row.password.length == 0
        )
          return true;
        return false;
      });
      //return JSON.stringify(this._tableViewData).includes('""');
      return tempViewData.length > 0;
    } else if (this._viewSelected == TabId.UserAccess) {
      //Is data equals
      if (JSON.stringify(this._tableViewData) == JSON.stringify(this._data))
        return true;
      //Is empty input exist?
      let tempViewData = this._tableViewData.map((e) => e);
      tempViewData = tempViewData.filter((row) => {
        if (row.userId.length == 0 || row.groupId.length == 0) return true;
        return false;
      });
      //return JSON.stringify(this._tableViewData).includes('""');
      return tempViewData.length > 0;

      //return angular.equals(val1, val2);
    } else if (this._viewSelected == TabId.Group) {
      //Is data equals
      if (JSON.stringify(this._tableViewData) == JSON.stringify(this._data))
        return true;
      //Is empty input exist?
      let tempViewData = this._tableViewData.map((e) => e);
      tempViewData = tempViewData.filter((row) => {
        if (
          row.groupId.length == 0 ||
          row.groupName.length == 0 ||
          row.description.length == 0
        )
          return true;
        return false;
      });
      //return JSON.stringify(this._tableViewData).includes('""');
      return tempViewData.length > 0;

      //return angular.equals(val1, val2);
    }
    return true;
  }

  onInputUserIdleave(id: string): void {
    if (id.length > 0) {
      let tempCount = 0;
      this._tableViewData.forEach(function (row) {
        if (row.userId == id) {
          tempCount++;
        }
      });
      if (tempCount >= 2) {
        this.showDialog(
          id + ' already defined',
          function () {},
          function () {},
          DialogType.oneOKButton
        );
      }
    }
  }

  onInputUserAccessleave(id: any): void {
    console.log('OnInputUserAccessLeave');
    if (id) {
      let tempCount = 0;
      this._tableViewData.forEach(function (row) {
        console.log(row);
        if (row.userId == id.userId && row.groupId == id.groupId) {
          tempCount++;
        }
      });
      if (tempCount >= 2) {
        this.showDialog(
          'The relationship between ' +
            id.userId +
            ' and ' +
            id.groupId +
            ' already exists.',
          function () {},
          function () {},
          DialogType.oneOKButton
        );
      }
    }
  }

  onInputGroupIdleave(id: string): void {
    if (id.length > 0) {
      let tempCount = 0;
      this._tableViewData.forEach(function (row) {
        if (row.groupId == id) {
          tempCount++;
        }
      });
      if (tempCount >= 2) {
        this.showDialog(
          id + ' already defined',
          function () {},
          function () {},
          DialogType.oneOKButton
        );
      }
    }
  }

  showDialog(
    msg: string,
    yesFn: () => void,
    noFn: () => void,
    dialogType: DialogType
  ) {
    this.dialogService.confirmThis(msg, yesFn, noFn, dialogType);
  }

  ////////////////////////////Filter Start/////////////////////////////////
  // Filter data when user input anything
  public inputChange(event: any, key: any) {
    // User Tab
    if (this._viewSelected == TabId.User) {
      this.userFilter();
    } else if (this._viewSelected == TabId.UserAccess) {
      this.userAccessFilter();
    } else if (this._viewSelected == TabId.Group) {
      this.groupFilter();
    }
  }

  userFilter() {
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
      let tempViewData = this._data.map((e) => e);
      //userId
      if (userId?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.userId.toLowerCase().includes(userId)) return true;
          return false;
        });
      }
      //firstName
      if (firstName?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.firstName.toLowerCase().includes(firstName)) return true;
          return false;
        });
      }
      //lastName
      if (lastName?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.lastName.toLowerCase().includes(lastName)) return true;
          return false;
        });
      }
      //loginName
      if (loginName?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.loginName.toLowerCase().includes(loginName)) return true;
          return false;
        });
      }
      //email
      if (email?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.email.toLowerCase().includes(email)) return true;
          return false;
        });
      }

      this._tableViewData = tempViewData;
    } else {
      this._tableViewData = JSON.parse(JSON.stringify(this._data));
    }
  }

  userAccessFilter() {
    let userId = this._columnDefinition
      .find((column) => column.columnId === 'userId')
      ?.ngValue?.toLowerCase();
    let groupId = this._columnDefinition
      .find((column) => column.columnId === 'groupId')
      ?.ngValue?.toLowerCase();
    let dateOfRelationshipCreation = this._columnDefinition
      .find((column) => column.columnId === 'dateOfRelationshipCreation')
      ?.ngValue?.toLowerCase();

    if (userId || groupId || dateOfRelationshipCreation) {
      let tempViewData = this._data.map((e) => e);
      //userId
      if (userId?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.userId.toLowerCase().includes(userId)) return true;
          return false;
        });
      }
      //groupId
      if (groupId?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.groupId.toLowerCase().includes(groupId)) return true;
          return false;
        });
      }
      //dateOfRelationshipCreation
      if (dateOfRelationshipCreation?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (
            row.dateOfRelationshipCreation
              .toLowerCase()
              .includes(dateOfRelationshipCreation)
          )
            return true;
          return false;
        });
      }

      this._tableViewData = tempViewData;
    } else {
      this._tableViewData = JSON.parse(JSON.stringify(this._data));
    }
  }

  groupFilter() {
    let groupId = this._columnDefinition
      .find((column) => column.columnId === 'groupId')
      ?.ngValue?.toLowerCase();
    let groupName = this._columnDefinition
      .find((column) => column.columnId === 'groupName')
      ?.ngValue?.toLowerCase();
    let description = this._columnDefinition
      .find((column) => column.columnId === 'description')
      ?.ngValue?.toLowerCase();

    if (groupId || groupName || description) {
      let tempViewData = this._data.map((e) => e);

      //groupId
      if (groupId?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.groupId.toLowerCase().includes(groupId)) return true;
          return false;
        });
      }
      //groupName
      if (groupName?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.groupName.toLowerCase().includes(groupName)) return true;
          return false;
        });
      }
      //description
      if (description?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.description.toLowerCase().includes(description)) return true;
          return false;
        });
      }

      this._tableViewData = tempViewData;
    } else {
      this._tableViewData = JSON.parse(JSON.stringify(this._data));
    }
  }

  ////////////////////////////Filter End/////////////////////////////////
}
