import {AutoparkInterface} from "./autopark.model";

export class Autopark implements  AutoparkInterface{
    constructor(public city, public name, public title){
    }
}