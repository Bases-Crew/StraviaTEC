import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reportDetails: Report | null = null;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.getReportDetails();
  }

  getReportDetails(): void {
    const details = this.reportService.getReportDetails();
    if (details) {
      this.reportDetails = details;
      this.sortathletesByTime();
    }
  }

  sortathletesByTime(): void {
    if (this.reportDetails?.athletes) {
      this.reportDetails.athletes.sort(
        (a, b) => (a.tiempocompletado ?? 0) - (b.tiempocompletado ?? 0)
      );
    }
  }

  onExportToPDF(): void {
    if (this.reportDetails) {
      this.reportService.exportReportToPDF(this.reportDetails);
    }
  }
}
