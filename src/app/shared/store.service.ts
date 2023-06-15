import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private token = new BehaviorSubject<string>("");


  constructor() { }

  setStoreToken(value: string) {
    this.token.next(value);
  }

  getStoreToken() {
    return this.token.asObservable();
  }
}
