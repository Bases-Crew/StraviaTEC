import { Injectable } from '@angular/core';
import { Report, Athlete, reportExample } from '../models/report.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  getReportDetails(): Report {
    return reportExample;
  }

  exportReportToPDF(report: Report): void {
    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: report.rname, style: 'header' },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Date', report.rdate.toDateString()],
              ['Sport', report.sportname],
              ['Price', `$${report.price}`],
            ],
          },
        },
        { text: 'Participants', style: 'subheader' },
        this.getParticipantsTable(report.athletes),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10], // Corregido a arreglo de 4 elementos
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 10, 0, 5], // Corregido a arreglo de 4 elementos
        },
        tableExample: {
          margin: [0, 5, 0, 15], // Corregido a arreglo de 4 elementos
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('report.pdf');
  }

  private getParticipantsTable(athletes: Athlete[]): any {
    const body = athletes.map((athlete) => [
      `${athlete.fname} ${athlete.mname ?? ''} ${athlete.lname1} ${
        athlete.lname2
      }`,
      this.getCategoryByAge(athlete.edad),
      athlete.edad, // Agregado la edad aquí
      `${athlete.tiempocompletado ?? ''} mins`,
    ]);

    return {
      table: {
        body: [['Name', 'Category', 'Age', 'Completion Time'], ...body], // Incluyendo la columna de edad
      },
    };
  }

  private getCategoryByAge(age: number): string {
    if (age < 15) return 'Junior';
    if (age >= 15 && age <= 23) return 'Sub-23';
    if (age >= 24 && age <= 30) return 'Open';
    if (age > 30 && age <= 40) return 'Master A';
    if (age > 40 && age <= 50) return 'Master B';
    if (age > 51) return 'Master C';
    return 'Elite';
  }
}
