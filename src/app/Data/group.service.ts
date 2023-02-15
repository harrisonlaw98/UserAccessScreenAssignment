import { Injectable } from '@angular/core';
import { Group } from './group';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  group: Group[] = [
    {
      groupId: 'group1',
      groupName: 'Group 1',
      description: 'Group 1',
      newRecord: false,
    },
    {
      groupId: 'group2',
      groupName: 'Group 2',
      description: 'Group 2',
      newRecord: false,
    },
    {
      groupId: 'group3',
      groupName: 'Group 3',
      description: 'Group 3',
      newRecord: false,
    },
    {
      groupId: 'group4',
      groupName: 'Group 4',
      description: 'Group 4',
      newRecord: false,
    },
    {
      groupId: 'group5',
      groupName: 'Group 5',
      description: 'Group 5',
      newRecord: false,
    },
  ];

  getGroup() {
    return JSON.parse(JSON.stringify(this.group));
  }

  updateGroup(groups: Group[]) {
    this.group = groups.map((group) => {
      group.newRecord = false;
      return group;
    });
  }

  deleteGroup(deletegroup: Group) {
    this.group = this.group.filter((v) => v.groupId != deletegroup.groupId);
  }

  vaildate(groups: Group[]) {
    this.group.forEach((group: Group) => {});
  }
}
