import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-create-race',
  templateUrl: './manager-create-race.component.html',
  styleUrls: ['./manager-create-race.component.css'],
})
export class ManagerCreateRaceComponent implements OnInit {
  rname: string = '';
  price: number = 0;
  rdate: string = '';
  rroute: File | null = null;
  pid: boolean = false;
  sptid: string = '';
  bankAccountInput: number | null = null;
  bankAccounts: number[] = [];
  selectedSponsor: string = '';
  addedSponsors: string[] = [];
  selectedGroup: string = '';
  addedGroups: string[] = [];
  sports: any[] = []; // Replace with actual type
  sponsors: any[] = []; // Replace with actual type
  groups: any[] = []; // Replace with actual type

  constructor(
    private raceService: RaceService,
    private sharedService: SharedService
  ) {}
  ngOnInit() {
    this.loadSports();
    this.loadSponsors();
    this.loadGroups();
  }

  loadSports() {
    this.raceService.getSports().subscribe((data) => {
      this.sports = data;
    });
  }

  loadSponsors() {
    this.raceService.getSponsors().subscribe((data) => {
      this.sponsors = data;
    });
  }

  loadGroups() {
    this.raceService.getGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  addBankAccount(accountNumber: number | null) {
    if (accountNumber !== null) {
      this.bankAccounts.push(accountNumber);
      this.bankAccountInput = null;
    }
  }

  removeBankAccount(index: number) {
    this.bankAccounts.splice(index, 1);
  }

  addSponsor() {
    if (this.selectedSponsor) {
      this.addedSponsors.push(this.selectedSponsor);
      this.selectedSponsor = '';
    }
  }

  removeSponsor(index: number) {
    this.addedSponsors.splice(index, 1);
  }

  addGroup() {
    if (this.selectedGroup) {
      this.addedGroups.push(this.selectedGroup);
      this.selectedGroup = '';
    }
  }

  removeGroup(index: number) {
    this.addedGroups.splice(index, 1);
  }

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.rroute = fileList[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    const userEmail = this.sharedService.getEmail();
    if (userEmail) {
      formData.append('email', userEmail); // Append email as the first parameter
    }
    formData.append('rname', this.rname);
    formData.append('price', this.price.toString());
    formData.append('rdate', this.rdate);
    formData.append('pid', this.pid ? '1' : '0');
    formData.append('sptid', this.sptid);
    if (this.rroute) {
      formData.append('rroute', this.rroute, this.rroute.name);
    }

    this.bankAccounts.forEach((account) => {
      formData.append('bankAccounts', account.toString());
    });

    this.addedSponsors.forEach((sponsor) => {
      formData.append('sponsors', sponsor);
    });

    this.addedGroups.forEach((group) => {
      formData.append('groups', group);
    });

    this.raceService.createRace(formData).subscribe(
      (response) => {
        // Handle response
        console.log('Race data submitted successfully', response);
      },
      (error) => {
        // Handle error
        console.error('Error submitting race data', error);
      }
    );
  }
}
