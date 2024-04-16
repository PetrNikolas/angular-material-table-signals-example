import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HomeComponent
  ],
  template: `
    <button mat-raised-button (click)="changeFormatText()">
      Změna velikosti textu tabulky
    </button>
    <button mat-raised-button (click)="shuffleCols()"> Změna pořadí sloupečků </button>

    <app-home [displayedColumns]="displayedColumns" [formatText]="formatText" (removeColAction)="removeCol($event)"></app-home>
  `,
  styles: [``],
})
export class AppComponent {
  displayedColumns = signal(['position', 'name', 'weight', 'symbol']);
  formatText = signal('upprcase');

  shuffleCols() {
    let currentIndex = this.displayedColumns().length;
    while (0 !== currentIndex) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      const displayedColumns = this.displayedColumns();

      const temp = displayedColumns[currentIndex];
      displayedColumns[currentIndex] = displayedColumns[randomIndex];
      displayedColumns[randomIndex] = temp;
      this.displayedColumns.set(displayedColumns);
    }
  }

  changeFormatText() {
    if (this.formatText() === 'uppercase') {
      this.formatText.set('lowercase');
    } else {
      this.formatText.set('uppercase');
    }
  }

  removeCol(col: string) {
    this.displayedColumns.update((cols: string[]) => {
      cols = cols.filter((item: string) => item !== col);
      return [...cols];
    })
  }
}
