import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatsService {
  private _isHomeVisited = false;
  constructor() {}

  getIsHomeVisited(): Observable<boolean> {
    return of(this._isHomeVisited);
  }

  setIsHomeVisited(isHomeVisited: boolean) {
    this._isHomeVisited = isHomeVisited;
  }
}
