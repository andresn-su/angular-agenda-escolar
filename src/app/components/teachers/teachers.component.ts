import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MessageService } from './../../core/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeachersService } from './../../core/teachers.service';
import { Component, OnInit } from '@angular/core';
import { TeachersList } from 'src/app/models/teachers-list';

@Component({
  selector: 'an-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  titleToolbar = 'Professores';
  teachersList$: Observable<any[]>;
  message;

  constructor(
    private teachers: TeachersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService
    ) {
    this.teachersList$ = this.teachers.getTeachers();
    this.message = this.messageService.message;
  }

  ngOnInit(): void {
  }

  // Função que deleta uma disciplina
  deleteTeacher(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.teachers.deleteTeacher(id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.teachersList$ = this.teachers.getTeachers();
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
