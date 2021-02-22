import { MessageService } from './../../../core/message.service';
import { TeachersList } from './../../../models/teachers-list';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';
import { TeachersService } from './../../../core/teachers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacher: any = {
    name: '',
    email: '',
    phone: ''
  };
  titleToolbar: string = 'Professores > Adicionar';
  id: number = undefined;
  teachersList: any = [];
  checkAction: number = 1; // Ação de Adicionar, por padrão
  message;
  

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private teachers: TeachersService,
    private messageService: MessageService
    ) {
    this.id = this.route.snapshot.params['id'] || undefined;
    this.checkFunction();
    this.message = this.messageService.message;
  }


  ngOnInit(): void {
  }


  // Verifica a ação a ser executada
  checkFunction() {
    if(this.id == undefined) {
      this.checkAction = 1; // Adicionar
      this.prepareToAddTeacher();
    } else {
      this.checkAction = 0; // Atualizar
      this.recoverTeacher();
    }
  }


  // Recupera os dados da disciplina passada via id na url
  recoverTeacher() {
    if(this.checkAction == 0) {
      this.teachers.getTeachers().subscribe(data => {
        this.teachersList = data;
        this.teacher = this.teachersList?.find(teacherObject => teacherObject?.id == this.id);
        this.titleToolbar = 'Professores > ' + this.teacher?.name;
        if(this.teacher == undefined || this.teacher?.name == undefined) {
          this.prepareToAddTeacher();
        }
      });
    }
  }


  // Função que configura as propriedades de discipline para vazias
  prepareToAddTeacher() {
    this.teacher = {
      name: '',
      email: '',
      phone: ''
    };
    this.titleToolbar = "Professores > Adicionar";
    this.checkAction = 1;
  }


  // Função de cadastro de professor
  createTeacher() {
    if(this.teacher.name == '' || this.teacher.email == ''){
      this.message("Preencha os campos de nome e email!");
      return;
    }
    this.teachers.createTeacher(this.teacher).subscribe(
      success => {
        this.message("Professor adicionado!");
        this.prepareToAddTeacher();
      },
      error => {
        this.message("Erro ao adicionar professor.");
        console.log(error);
      }
    );
  } // Fim da função que adiciona um professor


  // Função que atualiza um professor
  updateTeacher() {
    if(this.teacher.name == '' || this.teacher.email == ''){
      this.message("Preencha os campos marcados com asterisco!");
    } else {
      this.teachers.updateTeacher(this.id, this.teacher).subscribe(
        success => {
          this.message("Professor atualizado!");
        },
        error => {
          this.message("Erro ao atualizar professor.");
          console.log(error);
        }
      );
    }
  } // Fim da função que atualiza o professor


  // Função que deleta uma prova
  deleteTeacher() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.teachers.deleteTeacher(this.id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.prepareToAddTeacher();
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
