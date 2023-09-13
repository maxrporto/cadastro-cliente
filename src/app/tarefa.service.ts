import { EventEmitter, Injectable } from "@angular/core";
import { BaseService } from "./service/base.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TarefaService extends BaseService {

  private textSubject = new BehaviorSubject<string>('');

  setText(text: string) {
    this.textSubject.next(text);
  }

  getText() {
    return this.textSubject.asObservable();
  }
}
