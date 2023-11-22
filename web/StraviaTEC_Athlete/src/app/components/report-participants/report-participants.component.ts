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

  /**
   * Constructs a new instance of the class.
   *
   * @param {ReportService} reportService - The report service.
   * @param {ReportParticipantsService} reportParticipantsService - The report participants service.
   */
  constructor(
    private reportService: ReportService,
    private reportParticipantsService: ReportParticipantsService
  ) {}

  /**
   * Initializes the component and calls the getReportDetails function.
   *
   */
  ngOnInit() {
    this.getReportDetails();
  }

  /**
   * Retrieves the report details from the report service.
   *
   * @return {void} This function does not return a value.
   */
  getReportDetails(): void {
    this.reportDetails = this.reportService.getReportDetails();
  }

  /**
   * Retrieves an array of athletes filtered by category.
   *
   * @param {string} category - The category to filter by.
   * @return {Athlete[]} - An array of athletes filtered by category.
   */
  getAthletesByCategory(category: string): Athlete[] {
    return (
      this.reportDetails?.athletes.filter(
        (athlete) => this.getCategoryByAge(athlete.edad) === category
      ) || []
    );
  }

  /**
   * Returns the category based on the given age.
   *
   * @param {number} age - The age used to determine the category.
   * @return {string} The category based on the age.
   */
  getCategoryByAge(age: number): string {
    if (age < 15) return 'Junior';
    if (age >= 15 && age <= 23) return 'Sub-23';
    if (age >= 24 && age <= 30) return 'Open';
    if (age > 30 && age <= 40) return 'Master A';
    if (age > 40 && age <= 50) return 'Master B';
    if (age > 51) return 'Master C';
    return 'Elite';
  }

  /**
   * Export the report to PDF.
   *
   * @return {void}
   */
  exportToPDF(): void {
    if (this.reportDetails) {
      this.reportParticipantsService.exportReportToPDF(this.reportDetails);
    }
  }
}
