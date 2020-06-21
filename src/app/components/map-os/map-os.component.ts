import { AfterViewInit, Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { Map, Marker, TileLayer, LeafletMouseEvent, LatLng, Icon, MarkerOptions, Tooltip } from "leaflet";
import GestureHandling from "leaflet-gesture-handling";
Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

@Component({
  selector: "app-map-os",
  templateUrl: "./map-os.component.html",
  styleUrls: ["./map-os.component.css"],
})
export class MapOSComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() center = new LatLng(-0.1840506, -78.503374);
  @Input() zoom = 18;
  @Input() customIcon = false;
  @Input() extraCoordinates: LatLng[] = [];
  @Input() allowMapClick = true;
  @Output() mapClick = new EventEmitter<LatLng>();
  private _map: Map;
  private _marker: Marker;
  private _commerceIcon: Icon;
  private _commercesMarkers: Marker[] = [];

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
      gestureHandling: true,
    } as any);
    this._map.on({ click: this._onMapClick });
    const tiles = new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      minZoom: 3,
      maxZoom: 19,
    });
    tiles.addTo(this._map);
    const markerOptions: MarkerOptions = {};
    if (this.customIcon) {
      const icon = new Icon({
        iconUrl: "assets/iconoverde-01.svg",
        iconSize: [40, 50],
        iconAnchor: [20, 50], // point of the icon which will correspond to marker's location
      });
      markerOptions.icon = icon;
    }
    this._marker = new Marker(this.center, markerOptions);
    if (this.customIcon) {
      const tooltip = new Tooltip({ permanent: true });
      this._marker.bindTooltip(tooltip).setTooltipContent("Tú estás aquí").openTooltip();
    }
    this._marker.addTo(this._map);
    this._initCommercesMarkers();
  }

  private _initCommercesMarkers() {
    if (this._commercesMarkers.length) {
      this._commercesMarkers.forEach((marker) => {
        this._map.removeLayer(marker);
      });
      this._commercesMarkers.length = 0;
    }
    this.extraCoordinates.forEach((coordinate) => {
      let commerceMarker = new Marker(coordinate, { icon: this._commerceIcon });
      this._commercesMarkers.push(commerceMarker);
      commerceMarker.addTo(this._map);
    });
  }

  private _initCommerceIcon() {
    this._commerceIcon = new Icon({
      iconUrl: "assets/iconorojo-01.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 50], // point of the icon which will correspond to marker's location
    });
  }

  private _onMapClick: (e: LeafletMouseEvent) => void = ({ latlng }) => {
    if (this.allowMapClick) {
      this._marker.setLatLng(latlng);
      this.mapClick.emit(latlng);
    }
  };

  private _handlePropChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      switch (propName) {
        case "center":
          this._handleCenterChanges(change);
          break;
        case "extraCoordinates":
          this._handleExtraCoordinatesChanges(change);
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

  private _handleExtraCoordinatesChanges(change: SimpleChange) {
    const { currentValue, previousValue } = change;
    if (change.isFirstChange()) {
      this._initCommerceIcon();
    }
    if (!change.isFirstChange() && currentValue !== previousValue) {
      this._initCommercesMarkers();
    }
  }
}
