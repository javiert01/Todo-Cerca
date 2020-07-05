import { AfterViewInit, Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { Map, Marker, TileLayer, LeafletMouseEvent, LatLng, Icon, MarkerOptions, Tooltip, Popup } from "leaflet";
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
  @Input() commerces: any[] = [];
  @Input() allowMapClick = true;
  @Input() showAlwaysTooltip = false;
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
    if (this.showAlwaysTooltip) {
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
    this.commerces.forEach((commerce) => {
      const [lng, lat] = commerce.location.coordinates;
      const commerceMarker = new Marker(new LatLng(lat, lng), { icon: this._commerceIcon });
      this._commercesMarkers.push(commerceMarker);
      commerceMarker.on({ mouseover: (event) => this._onCommerceMarkeHover(event, commerce) });
      commerceMarker.addTo(this._map);
    });
  }

  private _initCommerceIcon() {
    this._commerceIcon = new Icon({
      iconUrl: "assets/iconorojo-01.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 50], // point of the icon which will correspond to marker's location
      popupAnchor: [-10, -50],
    });
  }

  private _onMapClick: (e: LeafletMouseEvent) => void = ({ latlng }) => {
    if (this.allowMapClick) {
      this._marker.setLatLng(latlng);
      this.mapClick.emit(latlng);
    }
  };

  private _onCommerceMarkeHover(event: LeafletMouseEvent, commerce: any) {
    const { latlng, sourceTarget } = event;
    const popup = new Popup();
    popup.setLatLng(latlng).setContent(this._getCommercePopupView(commerce));
    sourceTarget.bindPopup(popup).openPopup();
  }

  private _getCommercePopupView(commerce) {
    const { commercePhoto, category, commerceName, idAux, dist, phone } = commerce;
    const [firsCategory] = category;
    const { commerceCategory } = firsCategory;
    return /*html*/ `
      <div class="bubble-container">
        <div id="local-container" class="col-2">
          <div class="col col-left only-desktop">
            <div class="img-container foto-local">
              <img src="${commercePhoto}" class="img-center" alt="">
            </div>
          </div>
          <div class="col col-right">
            <p class="color4 tipo-negocio">
                ${commerceCategory}
            </p>
            <h5 class="color1 titulo-comercio">
                ${commerceName}
            </h5>
            <span id="id-negocio" class="color3">
              Id: ${idAux}
            </span>
            <p class="color3 distancia">
                <span class="bold">Distancia: </span>${dist.calculated.toFixed(2)}m
            </p>
            <a href="${this._getWhatsappURL(phone)}" class="button whatsapp-button background-color2" target="_blank">
              <div class="col-left center">
                  <i class="fab fa-whatsapp white"></i>
                </div>
                <div class="col-right">
                  <p class="white">
                      CONTÁCTATE POR
                  </p>
                  <h6 class="white">
                      WhatsApp
                    </h6>
                </div>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  private _getWhatsappURL(phone: string) {
    const newPhone = `593${phone.slice(1)}`;
    if (window.innerWidth < 551) {
      return `http://api.whatsapp.com/send?phone=${newPhone}&text=Buenos%20días,%20encontré%20tu%20negocio%20en%20todosmascerca.com%20y%20quisiera%20hacerte%20un%20pedido.`;
    }
    return `http://web.whatsapp.com/send?phone=${newPhone}&text=Buenos%20días,%20encontré%20tu%20negocio%20en%20todosmascerca.com%20y%20quisiera%20hacerte%20un%20pedido.`;
  }

  private _handlePropChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      switch (propName) {
        case "center":
          this._handleCenterChanges(change);
          break;
        case "commerces":
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
