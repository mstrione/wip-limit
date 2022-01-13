import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { ModalPlayersComponent } from '../modal-players/modal-players.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  countDown: Subscription | any;
  color = "primary";
  globalTimer1 = 0;
  globalTimer2 = 0;
  round = 0;
  fieldValue = '';
  lastKey = '';
  players = [''];

  beginTime1 = [] as any;
  endTime1 = [] as any;
  processTime1 = [0, 0, 0, 0, 0, 0, 0, 0];
  leadTime1 = [] as any;
  eficiency1 = [] as any;
  errors1 = [0, 0, 0, 0, 0, 0, 0, 0];
  fields1 = [false, false, false, false, false, false, false, false];

  beginTime2 = [] as any;
  endTime2 = [] as any;
  processTime2 = [0, 0, 0, 0, 0, 0, 0, 0];
  leadTime2 = [] as any;
  eficiency2 = [] as any;
  errors2 = [0, 0, 0, 0, 0, 0, 0, 0];
  fields2 = [false, false, false, false, false, false, false, false];

  activeField = -1;
  tick = 10;
  running = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

    this.countDown = timer(0, this.tick).subscribe(() => {

      if (this.running) {
        if (this.round === 1) {
          ++this.globalTimer1;
          if (this.activeField !== -1) {
            ++this.processTime1[this.activeField];
            if (!this.beginTime1[this.activeField]) {
              this.beginTime1[this.activeField] = this.globalTimer1;
            }
          }
        } else {
          ++this.globalTimer2;
          if (this.activeField !== -1) {
            ++this.processTime2[this.activeField];
            if (!this.beginTime2[this.activeField]) {
              this.beginTime2[this.activeField] = this.globalTimer2;
            }
          }
        }
      }
    })

  }

  ngOnDestroy() {
    this.countDown = null;
  }

  start(i: number) {
    this.running = true;
    this.round = i;
  }

  continue() {
    this.running = false;
    ++this.round;
  }

  finish() {
    this.running = false;
  }

  restart() {
    this.players = [''];
    this.round = 0;

    this.beginTime1 = [] as any;
    this.endTime1 = [] as any;
    this.processTime1 = [0, 0, 0, 0, 0, 0, 0, 0];
    this.leadTime1 = [] as any;
    this.eficiency1 = [] as any;
    this.errors1 = [0, 0, 0, 0, 0, 0, 0, 0];
    this.fields1 = [false, false, false, false, false, false, false, false];
  
    this.beginTime2 = [] as any;
    this.endTime2 = [] as any;
    this.processTime2 = [0, 0, 0, 0, 0, 0, 0, 0];
    this.leadTime2 = [] as any;
    this.eficiency2 = [] as any;
    this.errors2 = [0, 0, 0, 0, 0, 0, 0, 0];
    this.fields2 = [false, false, false, false, false, false, false, false];
  }

  onFocus(value: number) {
    this.activeField = value;
  }

  onBlur() {
    this.activeField = -1;
  }

  openModalPlayers(): void {
    const dialogRef = this.dialog.open(ModalPlayersComponent, {
      width: '500px',
      data: {
        players: this.players
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.players = result;
        this.round = 1;
      }
    });

  }

  markAsFinished(event: any, field: number) {
    if (event) {
      if (this.round === 1) {
        this.endTime1[field] = this.globalTimer1;
        this.leadTime1[field] = this.endTime1[field] - this.beginTime1[field];
        this.eficiency1[field] = this.processTime1[field] / this.leadTime1[field] * 100;
        this.fields1[field] = true;
      } else {
        this.endTime2[field] = this.globalTimer2;
        this.leadTime2[field] = this.endTime2[field] - this.beginTime2[field];
        this.eficiency2[field] = this.processTime2[field] / this.leadTime2[field] * 100;
        this.fields2[field] = true;
      }

    } else {
      if (this.round === 1) {
        this.fields1[field] = false;
      } else {
        this.fields2[field] = false;
      }
    }
  }

  logValue(event: any) {
    if (this.lastKey !== event.key) {
      this.fieldValue = event.target.value;
      this.lastKey = event.key
    }
  }

  checkIfDeleted(event: any, field: number) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (event.target.value != this.fieldValue) {
        this.errors1[field] += this.fieldValue.length - event.target.value.length;
      }
    }
    this.fieldValue = event.target.value;
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}