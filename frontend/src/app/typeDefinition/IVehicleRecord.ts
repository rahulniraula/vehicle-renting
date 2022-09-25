
export interface IVehicleRecord{
    vehicleType:string,
    vehicleBrand:string,
    vehicleTransmission:string,
    availability:string[],
    latitude:number,
    longitude:number,
    useCurrentLocation?:boolean
  }