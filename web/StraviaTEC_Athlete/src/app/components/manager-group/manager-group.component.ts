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

  /**
   * A constructor function that initializes the GroupService and SharedService instances.
   *
   * @param {GroupService} groupService - An instance of the GroupService class.
   * @param {SharedService} sharedService - An instance of the SharedService class.
   */
  constructor(
    private groupService: GroupService,
    private sharedService: SharedService
  ) {}

  /**
   * Initializes the component and loads the groups.
   *
   * No parameters.
   *
   * No return value.
   */
  ngOnInit() {
    this.loadGroups();
  }

  /**
   * Loads the groups by making a request to the group service API.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  loadGroups() {
    this.groupService.getGroups().subscribe(
      (groups) => (this.groups = groups),
      (error) => console.error('Error fetching groups:', error)
    );
  }

  /**
   * Sets the mode of the function.
   *
   * @param {string} mode - The mode to set. Must be either 'create' or 'edit'.
   * @return {void} This function does not return anything.
   */
  setMode(mode: 'create' | 'edit') {
    this.mode = mode;
    if (mode === 'create') {
      this.currentGroup = { gname: '', logo: '' };
    }
  }

  /**
   * Handles the submit event.
   *
   * @return {void}
   */
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

  /**
   * Selects a group for editing.
   *
   * @param {Group} group - The group to be edited.
   */
  selectGroupForEdit(group: Group) {
    this.currentGroup = group;
    this.setMode('edit');
  }

  deleteGroup() {}
}
