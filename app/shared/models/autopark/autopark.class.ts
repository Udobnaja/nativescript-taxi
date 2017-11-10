import { IAutopark } from "./autopark.model";

export class Autopark implements  IAutopark {
    constructor(public city, public name, public title) {
    }
}
