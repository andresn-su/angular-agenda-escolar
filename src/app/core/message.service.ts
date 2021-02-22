import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  message(msg: string) {
    return this.snackBar.open(msg, "Fechar", {duration: 3000});
  }
}
