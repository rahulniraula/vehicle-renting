
export interface IVehicleRecord{
    _id:string,
    vehicleType:string,
    vehicleBrand:string,
    vehicleTransmission:string,
    availability:string[],
    latitude:number,
    longitude:number,
    useCurrentLocation?:boolean
  }