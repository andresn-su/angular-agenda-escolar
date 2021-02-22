import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MessageService } from './../../core/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DisciplinesService } from './../../core/disciplines.service';
import { Observable } from 'rxjs';
import { ActivitiesList } from './../../models/activities-list';
import { ActivitiesService } from './../../core/activities.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  titleToolbar = 'Atividades';
  activitiesList$: Observable<ActivitiesList[]>;
  message;

  constructor(
    private activities: ActivitiesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService
    ) {
    this.activitiesList$ = this.activities.getActivities();
    this.message = this.messageService.message;
   }

  ngOnInit(): void {
  }

  // Função que deleta uma atividade
  deleteActivity(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.activities.deleteActivity(id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.activitiesList$ = this.activities.getActivities();
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
