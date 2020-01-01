import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _configDefault = { duration: 3000 };
  constructor(private _snackBar: MatSnackBar) {}

  open(text: string, config: MatSnackBarConfig = this._configDefault) {
    return this._snackBar.open(text, '', config);
  }
}
