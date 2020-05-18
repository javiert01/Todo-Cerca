export class Commerce {
  ownerName: "string";
  ownerLastName: "string";
  phone: "string";
  commerceName: "string";
  commercePhoto: "string";
  frequency: "string";
  hourOpen: "string";
  hourClose: "string";
  province: "string";
  city: "string";
  neighborhood: "string";
  address: "string";
  location: any;
  reference: "string";
  commerceDescription: "string";
  ownerEmail: "string";
  category: "string";

  constructor(
    ownerName,
    ownerLastName,
    phone,
    commerceName,
    commercePhoto,
    frequency,
    hourOpen,
    hourClose,
    province,
    city,
    neighborhood,
    address,
    location,
    reference,
    commerceDescription,
    ownerEmail,
    category
  ) {
    this.ownerName = ownerName;
    this.phone = phone;
    this.ownerLastName = ownerLastName;
    this.commerceName = commerceName;
    this.commercePhoto = commercePhoto;
    this.frequency = frequency;
    this.hourOpen = hourOpen;
    this.hourClose = hourClose;
    this.province = province;
    this.city = city;
    this.neighborhood = neighborhood;
    this.address = address;
    this.location = location;
    this.reference = reference;
    this.commerceDescription = commerceDescription;
    this.ownerEmail = ownerEmail;
    this.category = category;
  }
}
