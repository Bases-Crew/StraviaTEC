import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Report, Athlete } from 'src/app/models/report.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
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

  constructor(private reportService: ReportService) {}

  /**
   * Initializes the component and calls the getReportDetails function.
   *
   * @param None
   * @return None
   */
  ngOnInit() {
    this.getReportDetails();
  }

  /**
   * Retrieves the report details and performs sorting and assigning of winners if details are available.
   *
   * @returns {void} No return value.
   */
  getReportDetails(): void {
    const details = this.reportService.getReportDetails();
    if (details) {
      this.reportDetails = details;
      this.sortAthletesByCategoryAndTime();
      this.assignWinners();
    }
  }

  /**
   * Sorts athletes by category and time.
   *
   * @return {void} This function does not return a value.
   */
  sortAthletesByCategoryAndTime(): void {
    this.reportDetails?.athletes.sort((a, b) => {
      const categoryOrder = [
        'Junior',
        'Sub-23',
        'Open',
        'Elite',
        'Master A',
        'Master B',
        'Master C',
      ];
      const categoryIndexA = categoryOrder.indexOf(
        this.getCategoryByAge(a.edad)
      );
      const categoryIndexB = categoryOrder.indexOf(
        this.getCategoryByAge(b.edad)
      );

      if (categoryIndexA !== categoryIndexB) {
        return categoryIndexA - categoryIndexB;
      }

      return (
        (a.tiempocompletado ?? Number.MAX_VALUE) -
        (b.tiempocompletado ?? Number.MAX_VALUE)
      );
    });
  }

  /**
   * Assigns winners based on athlete's category and completion time.
   *
   * @return {void}
   */
  assignWinners(): void {
    const categoryWinners = new Map<string, Athlete>();

    this.reportDetails?.athletes.forEach((athlete) => {
      const category = this.getCategoryByAge(athlete.edad);
      if (
        !categoryWinners.has(category) ||
        (categoryWinners.get(category)?.tiempocompletado ?? Number.MAX_VALUE) >
          (athlete.tiempocompletado ?? Number.MAX_VALUE)
      ) {
        categoryWinners.set(category, athlete);
      }
    });

    this.reportDetails?.athletes.forEach((athlete) => {
      const category = this.getCategoryByAge(athlete.edad);
      if (categoryWinners.get(category) === athlete) {
        athlete.isWinner = true;
      }
    });
  }

  /**
   * Returns the category based on the given age.
   *
   * @param {number} age - The age used to determine the category.
   * @return {string} The category corresponding to the age.
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
   * Retrieves an array of athletes based on the given category.
   *
   * @param {string} category - The category to filter the athletes by.
   * @return {Athlete[]} An array of athletes that belong to the specified category.
   */
  getAthletesByCategory(category: string): Athlete[] {
    return (
      this.reportDetails?.athletes.filter(
        (athlete) => this.getCategoryByAge(athlete.edad) === category
      ) || []
    );
  }

  /**
   * Export the report to PDF.
   *
   * @return {void} No return value.
   */
  onExportToPDF(): void {
    if (this.reportDetails) {
      this.reportService.exportReportToPDF(this.reportDetails);
    }
  }
}
