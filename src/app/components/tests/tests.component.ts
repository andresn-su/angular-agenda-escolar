import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from './../../core/message.service';
import { TestsList } from './../../models/tests-list';
import { Observable } from 'rxjs';
import { TestsService } from './../../core/tests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  titleToolbar = 'Provas';
  testsList$: Observable<TestsList[]>;
  message;

  constructor(
    private tests: TestsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService
    ) {
    this.testsList$ = this.tests.getTests();
    this.message = this.messageService.message;
  }

  ngOnInit(): void {
  }

  // Função que deleta uma disciplina
  deleteTest(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.tests.deleteTest(id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.testsList$ = this.tests.getTests();
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
