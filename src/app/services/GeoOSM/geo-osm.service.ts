import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GeoOSMResponse, GeoOSMOutputFormat } from "./geo-osm.service.types";
import { Observable, of as observableOf } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { LatLng } from "leaflet";

@Injectable({
  providedIn: "root",
})
export class GeoOSMService {
  private readonly _mainUrl = "https://nominatim.openstreetmap.org/";
  private readonly _reverseUrl = `${this._mainUrl}reverse?format=${GeoOSMOutputFormat.GEOJSON}`;
  private readonly _forwardUrl = `${this._mainUrl}search?format=${GeoOSMOutputFormat.GEOJSON}`;

  constructor(private _http: HttpClient) {}

  getGeoAddress(lat: number, lng: number): Observable<string> {
    return this._http.get<GeoOSMResponse>(`${this._reverseUrl}&lat=${lat}&lon=${lng}`).pipe(
      switchMap((res) => {
        const { features = [] } = res;
        const [firstFeature = {}] = features;
        const { properties = {} } = firstFeature;
        const { address = {} } = properties;
        const { road = null, house_number = null, postcode = null, country = null, county = null } = address;
        let { city = null } = address;

        if (!city) {
          city = county;
        }

        if (road && city && postcode && country) {
          return observableOf(`${road}${house_number ? " " + house_number : ""}, ${city} ${postcode}, ${country}`);
        } else {
          return observableOf("");
        }
      }),
      catchError(this._handleError<string>("getGeoAddress", ""))
    );
  }

  getGeoCoordinates(city: string, countryCode: string) {
    return this._http.get<GeoOSMResponse>(`${this._forwardUrl}&city=${city}&country=${countryCode}`).pipe(
      switchMap((res) => {
        const { features = [] } = res;
        const [firstFeature = {}] = features;
        const { geometry = {} } = firstFeature;
        const { coordinates = [] } = geometry;
        const [lng, lat] = coordinates;
        if (lat && lng) {
          return observableOf(new LatLng(lat, lng));
        } else {
          return observableOf<null>(null);
        }
      }),
      catchError(this._handleError<null>("getGeoCoordinates", null))
    );
  }

  private _handleError<T>(_: string, result?: T) {
    return (_: any) => observableOf(result as T);
  }
}
