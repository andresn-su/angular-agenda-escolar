import { MessageService } from './../../../core/message.service';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivitiesService } from './../../../core/activities.service';
import { DisciplinesService } from './../../../core/disciplines.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activity: any = {
    title: '',
    description: '',
    status: '',
    discipline: '',
    submitDate: '',
  };
  titleToolbar: string = 'Atividades > Adicionar';
  id: number = undefined;
  disciplinesList: any = [];
  checkAction: number = 1; // Ação de Adicionar, por padrão
  status = [
    {name: 'Aguardando'},
    {name: 'Enviada'},
    {name: 'Fora do prazo'}
  ];
  message;


  constructor(
    private route: ActivatedRoute,
    private disciplines: DisciplinesService,
    private activities: ActivitiesService,
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
      this.prepareToAddActivity();
    } else {
      this.checkAction = 0; // Atualizar
      this.recoverActivity();
    }
  }


  // Recupera os dados da disciplina passada via id na url
  recoverActivity() {
    if(this.checkAction == 0) {
      let activitiesList;
      this.activities.getActivities()
      .subscribe(data => {
        activitiesList = data;
        console.log(activitiesList)
        this.activity = activitiesList?.find(activityObject => activityObject?.id == this.id);
        this.titleToolbar = 'Atividades > ' + this.activity?.title;
        if(this.activity == undefined || this.activity?.title == undefined) {
          this.prepareToAddActivity();
        }
      });
    }
  }


  // Função que configura as propriedades de activity para vazias
  prepareToAddActivity() {
    this.activity = {
      title: '',
      description: '',
      status: '',
      discipline: '',
      submitDate: '',
    };
    this.titleToolbar = "Disciplinas > Adicionar Atividade";
    this.checkAction = 1;
  }

  // Função de adiciona uma nova atividade
  createActivity() {
    if(this.activity.title == '' || this.activity.status == '' || this.activity.submitDate == '' || this.activity.status == '')
    {
      this.message("Preencha os campos marcados com asterisco!");
      return;
    } else {
      this.activities.createActivity(this.activity).subscribe(
        success => {
          this.message("Atividade adicionada!");
          this.prepareToAddActivity();
        },
        error => {
          this.message("Erro ao adicionar atividade.");
          console.log(error);
        }
      );
    }
  } // Fim da função de adicionar atividade


  // Função que atualiza as atividades
  updateActivity() {
    if(this.activity.title == '' || this.activity.status == '' || this.activity.submitDate == '' || this.activity.status == '')
    {
      this.message("Preencha os campos marcados com asterisco.");
    } else {
      this.activities.updateActivity(this.id, this.activity).subscribe(
        success => {
          this.message("Atividade atualizada!");
        },
        error => {
          this.message("Erro ao atualizar a atividade.");
          console.log(error);
        }
      );
    }
  } // Fim da função de atualizar atividade


  // Função que deleta uma atividade
  deleteActivity() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.activities.deleteActivity(this.id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.prepareToAddActivity();
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
