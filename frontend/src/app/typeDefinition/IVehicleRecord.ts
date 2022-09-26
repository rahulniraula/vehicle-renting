
export interface IVehicleRecord{
    _id:string,
    vehicleType:string,
    prices?:[{date:string,price:number}],
    images?:string,
    vehicleBrand:string,
    vehicleTransmission:string,
    availability:string[],
    description:string,
    todaysRate?:number,
    latitude:number,
    longitude:number,
    useCurrentLocation?:boolean
  }