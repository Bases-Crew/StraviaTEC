import { Injectable } from '@angular/core';
import {
  Report,
  Athlete,
  reportExample,
} from '../models/report-participants.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReportParticipantsService {
  /**
   * Initializes the constructor.
   *
   * @param {void} None - No parameters required.
   * @return {void} No return value.
   */
  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  /**
   * Retrieves the details of the report.
   *
   * @return {Report} The report details.
   */
  getReportDetails(): Report {
    return reportExample;
  }

  /**
   * Export the given report to a PDF file.
   *
   * @param {Report} report - The report object to export.
   * @return {void} This function does not return a value.
   */
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
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('report.pdf');
  }

  /**
   * Generates a participants table based on the given array of athletes.
   *
   * @param {Athlete[]} athletes - The array of athletes.
   * @return {any} The participants table object.
   */
  private getParticipantsTable(athletes: Athlete[]): any {
    const body = athletes.map((athlete) => [
      `${athlete.fname} ${athlete.mname ?? ''} ${athlete.lname1} ${
        athlete.lname2
      }`,
      this.getCategoryByAge(athlete.edad),
      athlete.edad, // Edad del atleta
    ]);

    return {
      table: {
        body: [['Name', 'Category', 'Age'], ...body], // Solo las columnas necesarias
      },
    };
  }

  /**
   * Returns the category based on the given age.
   *
   * @param {number} age - The age to determine the category.
   * @return {string} The category determined based on the age.
   */
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
