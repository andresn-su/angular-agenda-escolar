import { MessageService } from './../../../core/message.service';
import { TestsService } from './../../../core/tests.service';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DisciplinesService } from './../../../core/disciplines.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'an-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: any = {
    title: '',
    description: '',
    date: '',
    discipline: ''
  };
  titleToolbar: string = 'Provas > Adicionar';
  id: number = undefined;
  disciplinesList: any = [];
  checkAction: number = 1; // Ação de Adicionar, por padrão
  message;

  constructor(
    private route: ActivatedRoute,
    private disciplines: DisciplinesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tests: TestsService,
    private messageService: MessageService
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
      this.prepareToAddTest();
    } else {
      this.checkAction = 0; // Atualizar
      this.recoverTest();
    }
  }


  // Recupera os dados da disciplina passada via id na url
  recoverTest() {
    if(this.checkAction == 0) {
      let activitiesList;
      this.tests.getTests().subscribe(data => {
        activitiesList = data;
        this.test = activitiesList?.find(testObject => testObject?.id == this.id);
        this.titleToolbar = 'Provas > ' + this.test?.title;
        if(this.test == undefined || this.test?.title == undefined) {
          this.prepareToAddTest();
        }
      });
      
    }
  }


  // Função que configura as propriedades de discipline para vazias
  prepareToAddTest() {
    this.test = {
      title: '',
      description: '',
      date: '',
      discipline: ''
    };
    this.titleToolbar = "Disciplinas > Adicionar Disciplina";
    this.checkAction = 1;
  }

  // Função que adiciona uma nova prova
  createTest() {
    if(this.test.title == '' || this.test.date == '' || this.test.discipline == '')
    {
      this.message("Preencha os campos marcados com asterisco!");
    } else {
      this.tests.createTest(this.test).subscribe(
        success => {
          this.message("Prova adicionada!");
          this.prepareToAddTest();
        },
        error => {
          this.message("Erro ao adicionar prova.");
          console.log(error);
        }
      );
    }
  } // Fim da função que adiciona uma nova nota


  // Função que atualiza uma nota
  updateTest() {
    if(this.test.title == '' || this.test.date == '' || this.test.discipline == '')
    {
      this.message("Preencha os campos marcados com asterisco!");
    } else {
      this.tests.updateTest(this.id, this.test).subscribe(
        success => {
          this.message("Prova atualizada!");
        },
        error => {
          this.message("Erro ao adicionar prova.");
          console.log(error);
        }
      )
    }
  } // Fim da função que atualiza a nota


  // Função que deleta uma prova
  deleteTest() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Você quer mesmo deletar?`,
        ok: 'Deletar',
        cancel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.tests.deleteTest(this.id).subscribe(
          success => {
            this.message("Deletado com sucesso!");
            this.prepareToAddTest();
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
