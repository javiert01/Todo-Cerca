// GeoOSMService types

export enum GeoOSMOutputFormat {
  HTML = "html",
  XML = "xml",
  JSON = "json",
  JSONV2 = "jsonv2",
  GEOJSON = "geojson",
  GEOCODEJSON = "geocodejson",
}

export interface GeoOSMResponse {
  features?: GeoOSMFeature[];
}

export interface GeoOSMFeature {
  bbox?: number[];
  geometry?: GeoOSMGeometry;
  properties?: GeoOSMProperties;
  type?: string;
}

export interface GeoOSMGeometry {
  coordinates?: number[];
  type?: string;
}

export interface GeoOSMProperties {
  address?: GeoOSMAddress;
  addresstype?: string;
  category?: string;
  display_name?: string;
  icon?: string;
  importance?: number;
  name?: string;
  osm_id?: number;
  osm_type?: string;
  place_id?: number;
  place_rank?: number;
  type?: string;
}

// https://nominatim.org/release-docs/develop/api/Output/#addressdetails
export interface GeoOSMAddress {
  aerialway?: any;
  aeroway?: any;
  allotments?: any;
  amenity?: string;
  borough?: any;
  boundary?: any;
  bridge?: any;
  city?: string;
  city_block?: any;
  city_district?: string;
  club?: any;
  commercial?: any;
  continent?: any;
  country?: string;
  country_code?: string;
  county?: string;
  craft?: any;
  croft?: any;
  district?: any;
  emergency?: any;
  farm?: any;
  farmyard?: any;
  hamlet?: any;
  historic?: any;
  house_name?: any;
  house_number?: string;
  industrial?: any;
  isolated_dwelling?: any;
  landuse?: any;
  leisure?: any;
  man_made?: any;
  military?: any;
  mountain_pass?: any;
  municipality?: any;
  natural?: any;
  neighbourhood?: string;
  office?: any;
  place?: any;
  postcode?: string;
  quarter?: any;
  railway?: any;
  region?: any;
  residental?: any;
  retail?: any;
  road?: string;
  shop?: any;
  state?: string;
  state_district?: any;
  subdivision?: any;
  suburb?: any;
  tourism?: any;
  town?: any;
  tunnel?: any;
  village?: any;
  waterway?: any;
}
