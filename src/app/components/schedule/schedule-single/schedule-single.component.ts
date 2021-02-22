import { DisciplinesService } from './../../../core/disciplines.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../../core/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleService } from './../../../core/schedule.service';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-schedule-single',
  templateUrl: './schedule-single.component.html',
  styleUrls: ['./schedule-single.component.css']
})
export class ScheduleSingleComponent implements OnInit {
  id: number = undefined;
  schedulesList: any = [];
  schedule: any = {
    discipline: '',
    starts: '',
    finishes: '',
    day: ''
  };
  checkAction = 1;
  titleToolbar = 'Horário > Adicionar';
  message;
  disciplinesList: any = [];
  days = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta'
  ];

  constructor(
    private route: ActivatedRoute,
    private schedules: ScheduleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private disciplines: DisciplinesService
  ) {
    this.id = this.route.snapshot.params['id'] || undefined;
    this.disciplines.getDisciplines().subscribe(data => this.disciplinesList = data);
    this.checkFunction();
    this.message = this.messageService.message;
  }

  ngOnInit(): void {
  }


  // Verifica a ação a ser executada
  checkFunction() {
    if(this.id == undefined) {
      this.checkAction = 1; // Adicionar
      this.prepareToAddSchedule();
    } else {
      this.checkAction = 0; // Atualizar
      this.recoverSchedule();
    }
  }


  // Recupera os dados da disciplina passada via id na url
  recoverSchedule() {
    if(this.checkAction == 0) {
      this.schedules.getSchedule().subscribe(data => {
        this.schedulesList = data;
        this.schedule = this.schedulesList?.find(scheduleObject => scheduleObject?.id == this.id);
        this.titleToolbar = 'Horário > ' + this.schedule?.discipline;
        if(this.schedule == undefined || this.schedule?.discipline == undefined) {
          this.prepareToAddSchedule();
        }
      });
    }
  }


  // Função que atualiza uma disciplina no horário
  updateSchedule() {
    if(this.schedule.discipline == '' || this.schedule.starts == ''
    || this.schedule.finishes == '' || this.schedule.day == ''){
      this.message("Preencha os campos marcados com asterisco!");
    } else {
      this.schedules.updateSchedule(this.id, this.schedule).subscribe(
        success => {
          this.message("Horário atualizado!");
        },
        error => {
          this.message("Erro ao atualizar.");
          console.log(error);
        }
      );
    }
  } // Fim da função que atualiza uma disciplina no horário



  // Função de cadastro de disciplina ao horário
  createSchedule() {
    if(this.schedule.discipline == '' || this.schedule.starts == ''
    || this.schedule.finishes == '' || this.schedule.day == ''){
      this.message("Preencha os campos marcados com asterisco!");
      return;
    }
    this.schedules.createSchedule(this.schedule).subscribe(
      success => {
        this.message("Adicionado ao horário!");
        this.prepareToAddSchedule();
      },
      error => {
        this.message("Erro ao adicionar.");
        console.log(error);
      }
    );
  } // Fim da função que adiciona uma disciplina ao horário


  // Função que configura as propriedades de schedule para vazias
  prepareToAddSchedule() {
    this.schedule = {
      discipline: '',
      starts: '',
      finishes: ''
    };
    this.titleToolbar = "Horário > Adicionar";
    this.checkAction = 1;
  }


  // Função que deleta a disciplina selecionada do horário
  deleteSchedule() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.schedules.deleteSchedule(this.id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.prepareToAddSchedule();
          },
          error => {
            this.message("Erro ao deletar do horário.");
            console.log(error);
          }
        )
      }
    });
  }
}
