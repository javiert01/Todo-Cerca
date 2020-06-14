import { AfterViewInit, Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Map, Marker, TileLayer, LeafletMouseEvent, LatLng } from "leaflet";

@Component({
  selector: "app-map-os",
  templateUrl: "./map-os.component.html",
  styleUrls: ["./map-os.component.css"],
})
export class MapOSComponent implements AfterViewInit, OnInit {
  @Input() center = new LatLng(-0.1840506, -78.503374);
  @Input() zoom = 18;
  @Output() latlng = new EventEmitter<LatLng>();
  private _map: Map;
  private _marker: Marker;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._initMap();
  }

  private _initMap() {
    this._map = new Map("map", {
      center: this.center,
      zoom: this.zoom,
    });
    this._map.on({ click: this._onMapClick });
    const tiles = new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      minZoom: 3,
      maxZoom: 19,
    });
    tiles.addTo(this._map);
    this._marker = new Marker(this.center);
    this._marker.addTo(this._map);
  }

  private _onMapClick: (e: LeafletMouseEvent) => void = ({ latlng }) => {
    this._marker.setLatLng(latlng);
    this.latlng.emit(latlng);
  };
}
