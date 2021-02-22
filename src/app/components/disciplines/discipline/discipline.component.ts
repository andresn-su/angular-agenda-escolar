import { MessageService } from './../../../core/message.service';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeachersService } from './../../../core/teachers.service';
import { DisciplinesService } from './../../../core/disciplines.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'an-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnInit {
  discipline: any = {
    name: '',
    description: '',
    notes: '',
    teacher: '',
    bibliography: '',
    room: '',
    schedule: ''
  };
  titleToolbar: string = 'Disciplinas > Adicionar';
  id: number = undefined;
  teachersList: any;
  checkAction: number = 1; // Ação de Adicionar, por padrão
  message;
  

  constructor(
    private route: ActivatedRoute,
    private disciplines: DisciplinesService,
    private teachers: TeachersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService
    ) {
    this.id = this.route.snapshot.params['id'] || undefined;
    this.teachers.getTeachers().subscribe(data => this.teachersList = data);
    this.message = this.messageService.message;
    this.checkFunction();
  }


  ngOnInit(): void {
  }


  // Verifica a ação a ser executada
  checkFunction() {
    if(this.id == undefined) {
      this.checkAction = 1; // Adicionar
      this.prepareToAddDiscipline();
    } else {
      this.checkAction = 0; // Atualizar
      this.recoverDiscipline();
    }
  }


  // Recupera os dados da disciplina passada via id na url
  recoverDiscipline() {
    if(this.checkAction == 0) {
      let disciplinesList;

      this.disciplines.getDisciplines()
      .subscribe(data => {
        disciplinesList = data
        this.discipline = disciplinesList.find(disciplineObject => disciplineObject?.id == this.id);
        this.titleToolbar = 'Disciplinas > ' + this.discipline?.name;

        if(this.discipline == undefined || this.discipline?.name == undefined) {
          this.prepareToAddDiscipline();
        }
      });
      
    }
  }


  // Função que configura as propriedades de discipline para vazias
  prepareToAddDiscipline() {
    this.discipline = {
      name: '',
      description: '',
      notes: '',
      teacher: '',
      bibliography: '',
      room: '',
      schedule: ''
    };
    this.titleToolbar = "Disciplinas > Adicionar Disciplina";
    this.checkAction = 1;
  }


  // Função que adiciona uma disciplina
  createDiscipline() {
    if(this.discipline.name == '' || this.discipline.teacher == '' || this.discipline.room == '')
    {
      this.message("Preencha os campos marcados com asterisco!");
    } else {
      this.disciplines.createDisciplines(this.discipline).subscribe(
        success => {
          this.message("Disciplina adicionada!");
          this.prepareToAddDiscipline();
        },
        error => {
          this.message("Erro ao adicionar disciplina.");
          console.log(error);
        }
      )
    }
  } // Fim da função de adicionar disciplina


  // Função de atualizar disciplina
  updateDiscipline() {
    if(this.discipline.name == '' || this.discipline.teacher == '' || this.discipline.room == '')
    {
      this.message("Preencha os campos marcados com asterisco!");
    } else {
      this.disciplines.updateDiscipline(this.id, this.discipline).subscribe(
        success => {
          this.message("Disciplina atualizada!");
        },
        error => {
          this.message("Erro ao atualizar disciplina.");
          console.log(error);
        }
      );
    }
   } // Fim da função que atualiza disciplina


  // Função que deleta uma disciplina
  deleteDiscipline() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.disciplines.deleteDiscipline(this.id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.prepareToAddDiscipline();
          },
          error => {
            this.message("Erro ao deletar prova.");
            console.log(error);
          }
        )
      }
    });
  }

}
