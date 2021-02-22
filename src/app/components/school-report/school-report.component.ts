import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MessageService } from './../../core/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ReportsList } from './../../models/reports-list';
import { Observable } from 'rxjs';
import { SchoolReportService } from './../../core/school-report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-school-report',
  templateUrl: './school-report.component.html',
  styleUrls: ['./school-report.component.css']
})
export class SchoolReportComponent implements OnInit {
  titleToolbar = 'Notas';
  reportsList$: Observable<ReportsList[]>;
  message;

  constructor(
    private reports: SchoolReportService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService
    ) {
    this.reportsList$ = this.reports.getSchoolReport();
    this.message = this.messageService.message;
  }

  ngOnInit(): void {
  }

  // Função que deleta uma disciplina
  deleteReport(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.reports.deleteReport(id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.reportsList$ = this.reports.getSchoolReport();
          },
          error => {
            this.message("Erro ao deletar atividade.");
            console.log(error);
          }
        );
      }
    });
  }



}
