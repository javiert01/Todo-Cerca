import { AfterViewInit, Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { Map, Marker, TileLayer, LeafletMouseEvent, LatLng } from "leaflet";

@Component({
  selector: "app-map-os",
  templateUrl: "./map-os.component.html",
  styleUrls: ["./map-os.component.css"],
})
export class MapOSComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() center = new LatLng(-0.1840506, -78.503374);
  @Input() zoom = 18;
  @Output() latlng = new EventEmitter<LatLng>();
  private _map: Map;
  private _marker: Marker;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this._handlePropChanges(changes);
  }

  ngOnInit() {}

  ngAfterViewInit() {
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

  private _handlePropChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      switch (propName) {
        case "center":
          this._handleCenterChanges(change);
          break;
        default:
          break;
      }
    }
  }

  private _handleCenterChanges(change: SimpleChange) {
    const { currentValue, previousValue } = change;
    if (!change.isFirstChange() && currentValue !== previousValue) {
      this._map.setView(currentValue, this.zoom);
      this._marker.setLatLng(currentValue);
    }
  }
}
