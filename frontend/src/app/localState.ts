import { BehaviorSubject } from "rxjs";
import { IConfigResponse } from "./admin/dashboard/search.component";

export const tokenSubject = new BehaviorSubject("");
export const vehicleTypesSubject = new BehaviorSubject<IConfigResponse>({
    status: 1, data: {
        vehicleTypes: [""],
        transmissionTypes:[""],
        vehicleBrands:[""]
    }
});
