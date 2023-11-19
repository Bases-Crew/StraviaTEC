import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ReportParticipantsService } from 'src/app/services/report-participants.service';
import { Report, Athlete } from 'src/app/models/report.model';

@Component({
  selector: 'app-report-participants',
  templateUrl: './report-participants.component.html',
  styleUrls: ['./report-participants.component.css'],
})
export class ReportParticipantsComponent implements OnInit {
  reportDetails: Report | null = null;
  categories = [
    'Junior',
    'Sub-23',
    'Open',
    'Elite',
    'Master A',
    'Master B',
    'Master C',
  ];

  constructor(
    private reportService: ReportService,
    private reportParticipantsService: ReportParticipantsService
  ) {}

  ngOnInit() {
    this.getReportDetails();
  }

  getReportDetails(): void {
    this.reportDetails = this.reportService.getReportDetails();
  }

  getAthletesByCategory(category: string): Athlete[] {
    return (
      this.reportDetails?.athletes.filter(
        (athlete) => this.getCategoryByAge(athlete.edad) === category
      ) || []
    );
  }

  getCategoryByAge(age: number): string {
    if (age < 15) return 'Junior';
    if (age >= 15 && age <= 23) return 'Sub-23';
    if (age >= 24 && age <= 30) return 'Open';
    if (age > 30 && age <= 40) return 'Master A';
    if (age > 40 && age <= 50) return 'Master B';
    if (age > 51) return 'Master C';
    return 'Elite';
  }

  exportToPDF(): void {
    if (this.reportDetails) {
      this.reportParticipantsService.exportReportToPDF(this.reportDetails);
    }
  }
}
