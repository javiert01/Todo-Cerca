export class Commerce {
  ownerName: "string";
  ownerLastName: "string";
  phone: "string";
  commerceName: "string";
  commercePhoto: "string";
  hourOpen: "string";
  hourClose: "string";
  province: "string";
  city: "string";
  neighborhood: "string";
  address: "string";
  location: "string";
  reference: "string";
  commerceDescription: "string";
  category: "string";

  constructor(
    ownerName,
    ownerLastName,
    phone,
    commerceName,
    commercePhoto,
    hourOpen,
    hourClose,
    province,
    city,
    neighborhood,
    address,
    location,
    reference,
    commerceDescription,
    category
  ) {
    this.ownerName = ownerName;
    this.phone = phone;
    this.ownerLastName = ownerLastName;
    this.commerceName = commerceName;
    this.commercePhoto = commercePhoto;
    this.hourOpen = hourOpen;
    this.hourClose = hourClose;
    this.province = province;
    this.city = city;
    this.neighborhood = neighborhood;
    this.address = address;
    this.location = location;
    this.reference = reference;
    this.commerceDescription = commerceDescription;
    this.category = category;
  }
}
