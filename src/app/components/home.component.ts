import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, effect, EventEmitter, Input, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormatTextPipe } from '../format-text-pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, MatTableModule, CdkDropList, CdkDrag, MatPaginatorModule, FormatTextPipe],
  template: `
  <div class="mat-elevation-z8">
    <table mat-table [dataSource]="dataSource" cdkDropList
       cdkDropListOrientation="horizontal"
       (cdkDropListDropped)="drop($event)">

      <ng-container [matColumnDef]="col" *ngFor="let col of displayedColumns()">
        <th mat-header-cell *matHeaderCellDef cdkDrag>
          {{col}}
          <button mat-icon-button (click)="removeCol(col)">
            <mat-icon color="secondary">delete_circle</mat-icon>
          </button>
        </th>
        <td mat-cell *matCellDef="let element">
          {{ element[col] | formatTextPipe:formatText() }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns();"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="pageSizeOptions()" showFirstLastButtons></mat-paginator>
  </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  @Input() displayedColumns: WritableSignal<string[]> = signal([]);
  @Input() formatText: WritableSignal<string> = signal('');

  @Output() removeColAction: EventEmitter<string> = new EventEmitter();

  pageSizeOptions: WritableSignal<number[]> = signal([5, 10, 20]);
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor() {
   effect(() => {
      //console.log(this.displayedColumns())
      //console.log(this.formatText())

      if(this.formatText()) {
        this.displayedColumns.set(['position', 'name', 'weight', 'symbol'])
    }}, { allowSignalWrites: true });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns(), event.previousIndex, event.currentIndex);
  }

  removeCol(col: string) {
    this.removeColAction.emit(col);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  {position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 22, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 25, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 31, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 32, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 33, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 34, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 35, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 36, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 37, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 38, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 39, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 40, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
