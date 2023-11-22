import { Component } from '@angular/core';
import { Group } from '../../models/grp.model';
import { GroupService } from '../../services/grp.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-manager-group',
  templateUrl: './manager-group.component.html',
  styleUrls: ['./manager-group.component.css'],
})
export class ManagerGroupComponent {
  currentGroup: Group = { gname: '', logo: '' };
  groups: Group[] = [];
  mode: 'create' | 'edit' = 'create';

  constructor(
    private groupService: GroupService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(
      (groups) => (this.groups = groups),
      (error) => console.error('Error fetching groups:', error)
    );
  }

  setMode(mode: 'create' | 'edit') {
    this.mode = mode;
    if (mode === 'create') {
      this.currentGroup = { gname: '', logo: '' };
    }
  }

  onSubmit() {
    if (this.mode === 'create') {
      this.currentGroup.ouser = this.sharedService.getEmail() || undefined;
      this.groupService.createGroup(this.currentGroup).subscribe(
        (group) => {
          console.log('Group created:', group);
          this.loadGroups();
        },
        (error) => console.error('Error creating group:', error)
      );
    } else {
      this.groupService.updateGroup(this.currentGroup).subscribe(
        (group) => {
          console.log('Group updated:', group);
          this.loadGroups();
        },
        (error) => console.error('Error updating group:', error)
      );
    }
  }

  selectGroupForEdit(group: Group) {
    this.currentGroup = group;
    this.setMode('edit');
  }

  deleteGroup() {}
}
