import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as L from "leaflet";
import { tileLayer, latLng, marker } from "leaflet";
import { PlaceService } from '../services/place.service';

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;
  lat = -0.1840506;
  lng = -78.503374;
  options;
  layersControl;
  layers;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.options = {
      layers: [
        tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "...",
        }),
      ],
      zoom: 18,
      center: latLng(this.lat, this.lng),
    };
    this.layersControl = {
      baseLayers: {
        "Open Street Map": tileLayer(
          "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          { maxZoom: 18, attribution: "..." }
        ),
      },
    };
    this.layers = [marker([this.lat, this.lng])];
  }

  ngAfterViewInit(): void {}

  onMapClick(e) {
    console.log(e);
    this.lat = e.latlng.lat;
    this.lng = e.latlng.lng;
    this.layers = [];
    this.layers.push(marker([this.lat, this.lng]));
    this.placeService.getReverseGeocode(this.lat, this.lng).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async getCurrentLocation() {
    const pos = await this.placeService.getCurrentLocation();
    console.log(pos);
  }
}
