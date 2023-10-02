import { EventDriverService } from './../../state/event.driver.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  counter: number = 0;

  constructor(private eventDriverService:  EventDriverService) {
    this.eventDriverService.sourceEventObservable.subscribe(data => {
      ++this.counter;
    });
  }
}
