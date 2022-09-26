
export interface IVehicleRecord{
    _id:string,
    vehicleType:string,
    prices?:[{date:string,price:number}],
    vehicleBrand:string,
    vehicleTransmission:string,
    availability:string[],
    latitude:number,
    longitude:number,
    useCurrentLocation?:boolean
  }