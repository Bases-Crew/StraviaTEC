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

  ngOnInit() {
    this.getReportDetails();
  }

  getReportDetails(): void {
    const details = this.reportService.getReportDetails();
    if (details) {
      this.reportDetails = details;
      this.sortAthletesByCategoryAndTime();
      this.assignWinners();
    }
  }

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

  getCategoryByAge(age: number): string {
    if (age < 15) return 'Junior';
    if (age >= 15 && age <= 23) return 'Sub-23';
    if (age >= 24 && age <= 30) return 'Open';
    if (age > 30 && age <= 40) return 'Master A';
    if (age > 40 && age <= 50) return 'Master B';
    if (age > 51) return 'Master C';
    return 'Elite';
  }

  getAthletesByCategory(category: string): Athlete[] {
    return (
      this.reportDetails?.athletes.filter(
        (athlete) => this.getCategoryByAge(athlete.edad) === category
      ) || []
    );
  }

  onExportToPDF(): void {
    if (this.reportDetails) {
      this.reportService.exportReportToPDF(this.reportDetails);
    }
  }
}
