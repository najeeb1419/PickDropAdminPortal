import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private childClickedEvent = new BehaviorSubject<boolean>(false);

  emitChildEvent(isCreated: boolean) {
    this.childClickedEvent.next(isCreated)
  }

  childEventListner() {
    return this.childClickedEvent.asObservable();
  }

  }
