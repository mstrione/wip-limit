import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  countDown: Subscription | any;
  timer = 0;
  round = 1;
  timer1 = [0,0,0,0,0,0];
  timer2 = [0,0,0,0,0,0];
  activeField = -1;
  tick = 10;
  running = false;


  ngOnInit() {
    this.countDown = timer(0, this.tick).subscribe(() => {
        if (this.running) { 
          ++this.timer;
          if (this.activeField!==-1) {
            if (this.round===1) {
              ++this.timer1[this.activeField];
            } else {
              ++this.timer2[this.activeField];
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

  constructor() { 
    
  }

}