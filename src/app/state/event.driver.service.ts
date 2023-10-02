import { Injectable } from '@angular/core';
import { ActionEvent } from './product.state';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: "root"})
export class EventDriverService {

    sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
    sourceEventObservable: Observable<ActionEvent> =  this.sourceEventSubject.asObservable();

    publishEvent(event: ActionEvent) {
        this.sourceEventSubject.next(event);
    }

}