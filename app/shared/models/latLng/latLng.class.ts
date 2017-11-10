import { ILatLng } from "./latLng.model";

export class LatLng implements ILatLng {
    constructor(public latitude, public longitude) {}
}
