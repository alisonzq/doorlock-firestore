import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doorlock';

  constructor(private data : DataService) {}
  
  ngOnInit(): void {
    this.data.deleteOldData();
  }
}
