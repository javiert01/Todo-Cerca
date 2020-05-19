import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class StatsService {
  isHomeVisited = false;
  isHomeVisitedChanged = new Subject<any>();
  constructor() {}

  getIsHomeVisited() {
    return this.isHomeVisited;
  }

  setIsHomeVisited(flag) {
    this.isHomeVisited = flag;
    this.isHomeVisitedChanged.next(this.isHomeVisited);
  }
}
