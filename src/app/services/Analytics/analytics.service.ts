import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncrementWhatsAppClicksResponse } from './analytics.service.types';
import { DinamicUrlService } from '../dinamic-url.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly _model = '/analytics';
  private _method: string;

  constructor(private _http: HttpClient, private _dynamicUrlService: DinamicUrlService) { }

  countWhatsAppClicksByCountry(countryCode: string) {
    this._method = '/countwhatsappclicks';
    const url = `${this._dynamicUrlService.url_backend_fija}${this._model}${this._method}/${countryCode.toUpperCase()}`;
    return this._http.get<IncrementWhatsAppClicksResponse>(url);
  }
}
