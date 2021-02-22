import { MessageService } from './../../core/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { DisciplinesListItem } from './../../models/disciplines-list-item';
import { DisciplinesService } from './../../core/disciplines.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'an-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit {
  titleToolbar = 'Disciplinas';
  disciplinesList$: Observable<DisciplinesListItem[]>;
  message;

  constructor(
    private disciplines: DisciplinesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService
    ) { 
    this.disciplinesList$ =this.disciplines.getDisciplines();
    this.message = this.messageService.message;
   }

  ngOnInit(): void {
  }

  // Função que deleta uma disciplina
  deleteDiscipline(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.disciplines.deleteDiscipline(id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.disciplinesList$ = this.disciplines.getDisciplines();
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
