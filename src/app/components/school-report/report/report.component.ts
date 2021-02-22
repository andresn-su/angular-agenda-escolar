import { MessageService } from './../../../core/message.service';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DisciplinesService } from './../../../core/disciplines.service';
import { ActivatedRoute } from '@angular/router';
import { SchoolReportService } from './../../../core/school-report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  report: any = {
    'discipline': '',
    'notes': '',
    'eval': 0,
    'date': ''
  };
  titleToolbar: string = 'Notas > Adicionar';
  id: number = undefined;
  disciplinesList: any = [];
  checkAction: number = 1; // Ação de Adicionar, por padrão
  message;
  

  constructor(
    private route: ActivatedRoute,
    private disciplines: DisciplinesService,
    private reports: SchoolReportService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService
    ) {
    this.id = this.route.snapshot.params['id'] || undefined;
    this.disciplines.getDisciplines().subscribe(data => this.disciplinesList = data);
    this.message = this.messageService.message;
    this.checkFunction();
  }


  ngOnInit(): void {
  }


  // Verifica a ação a ser executada
  checkFunction() {
    if(this.id == undefined) {
      this.checkAction = 1; // Adicionar
      this.prepareToAddReport();
    } else {
      this.checkAction = 0; // Atualizar
      this.recoverDiscipline();
    }
  }


  // Recupera os dados da disciplina passada via id na url
  recoverDiscipline() {
    if(this.checkAction == 0) {
      let reportsList;
      this.reports.getSchoolReport().subscribe(data => {
        reportsList = data;
        this.report = reportsList?.find(reportObject => reportObject?.id == this.id);
        this.titleToolbar = 'Notas > Nota de ' + this.report?.discipline;
        if(this.report == undefined || this.report?.discipline == undefined) {
          this.prepareToAddReport();
        }
      }); 
    }
  }


  // Função que configura as propriedades de discipline para vazias
  prepareToAddReport() {
    this.report = {
      'discipline': '',
      'notes': '',
      'eval': 0,
      'date': ''
    };
    this.titleToolbar = "Notas > Adicionar Nota";
    this.checkAction = 1;
  }


  // Função que adiciona as notas
  createReport(){
    if(this.report.discipline == '' || this.report.eval == '' || this.report.date == '')
    {
      this.message("Preencha os campos marcados com asterisco!");
    } else {
      this.reports.createReport(this.report).subscribe(
        success => {
          this.message("Nota adicionada com sucesso!");
          this.prepareToAddReport();
        },
        error => {
          this.message("Erro ao adicionar nota.");
          console.log(error);
        }
      )
    }
  } // Fim da função de adicionar as notas


  // Função que atualiza as notas
  updateReport() {
    if(this.report.discipline == '' || this.report.eval == '' || this.report.date == '')
    {
      this.message("Preencha os campos marcados com asterisco!");
    } else {
      this.reports.updateReport(this.id, this.report).subscribe(
        success => {
          this.message("Nota atualizada!");
        },
        error => {
          this.message("Erro ao atualizar nota.");
          console.log(error);
        }
      );
    }
  } // Fim da função que atualiza as notas


  // Função que deleta uma prova
  deleteReport() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.reports.deleteReport(this.id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.prepareToAddReport();
          },
          error => {
            this.message("Erro ao deletar nota.");
            console.log(error);
          }
        )
      }
    });
  }


}
