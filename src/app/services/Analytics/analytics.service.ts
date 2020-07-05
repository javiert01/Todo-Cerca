import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncrementWhatsAppClicksResponse } from './analytics.service.types';
import { HOST } from '../../shared/var.constants';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly _model = '/analytics';
  private _method: string;

  constructor(private _http: HttpClient) { }

  incrementWhatsAppClicks(fromCommercesList: boolean, fromCommercesMap: boolean, countryCode: string) {
    this._method = '/whatsappclick';
    const body = { fromCommercesList, fromCommercesMap, countryCode };
    return this._http.post<IncrementWhatsAppClicksResponse>(`${HOST}${this._model}${this._method}`, body);
  }
}
