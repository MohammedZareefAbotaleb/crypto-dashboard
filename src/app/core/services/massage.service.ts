import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MassageService {

  private messageSource = new BehaviorSubject<string>('');
  public message$ = this.messageSource.asObservable();

  setMessage(message: string) {
    this.messageSource.next(message);
  }
}
