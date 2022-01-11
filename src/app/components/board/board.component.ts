import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  countDown: Subscription | any;
  color = "primary";
  globalTimer = 0;
  round = 1;
  fieldValue = '';
  lastKey = '';

  beginTime1 = [] as any;
  endTime1 = [] as any;
  processTime1 = [0,0,0,0,0,0];
  leadTime1  = [] as any;
  eficiency1 = [] as any;
  errors1 = [0,0,0,0,0,0];
  fields1 = [false,false,false,false,false,false];

  activeField = -1;
  tick = 10;
  running = false;


  ngOnInit() {
    this.countDown = timer(0, this.tick).subscribe(() => {
        if (this.running) { 
          ++this.globalTimer;
          if (this.activeField!==-1) {
            if (this.round===1) {
              ++this.processTime1[this.activeField];
              if (!this.beginTime1[this.activeField]) {
                this.beginTime1[this.activeField] = this.globalTimer;
              }
            } else {
              //Acá el round 2
            }

          }
        }
      }
     ) 
    
  }

  ngOnDestroy(){
    this.countDown = null;
  }

  start() {
    this.running = true;
  }

  finish() {
    this.running = false;
  }

  onFocus(value: number) {
      this.activeField = value;
  }

  onBlur() {
    this.activeField = -1;
  }

  markAsFinished(event: any , field: number) {
    if (event) {
      this.endTime1[field] = this.globalTimer;
      this.leadTime1[field] = this.endTime1[field] - this.beginTime1[field];
      this.eficiency1[field] = this.processTime1[field] / this.leadTime1[field] * 100 ;
      this.fields1[field] = true;
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

  constructor() { 
    
  }

}