import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { listOfLock } from '../lock';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.css'],
  animations: [
    trigger('changeColor', [
      state('red', style({
        backgroundColor: 'red',
        color: '#ffffff'
      })),
      state('green', style({
        backgroundColor: 'green',
        color: '#ffffff'
      })),
      transition('red => green', [
        animate('1s')
      ]),
      transition('green => red', [
        animate('1s')
      ])
    ])
  ]
})
export class UnlockComponent {
  lockObj : listOfLock = {
    id : '',
    lock: 0,
    dateAndTime: new Date,
  }
  id : string = '';
  clicked : number = 0;
  date: string = '';
  bgColor = 'red';
  fontColor = '#ffffff';
  buttonText = 'LOCKED';

  constructor(private data : DataService) {}

  addPass() {
    const timestamp: Date = new Date();
    this.lockObj.id = '';
    this.clicked ++
    if(this.clicked%2 == 0) {
      this.lockObj.lock = 0;
      this.lockObj.dateAndTime = timestamp;
      this.bgColor = 'red';
      this.buttonText = 'LOCKED';
    } else {
      this.lockObj.lock = 1;
      this.bgColor = 'green';
      this.buttonText = 'UNLOCKED';
      this.lockObj.dateAndTime = timestamp;
    }

    

    this.data.addUnlock(this.lockObj);
  }


}
