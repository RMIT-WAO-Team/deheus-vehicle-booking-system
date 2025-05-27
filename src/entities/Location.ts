import {BaseLocation, LocationSource} from "./BaseLocation";
import {ChildEntity} from "typeorm";

@ChildEntity(LocationSource.CUSTOM)
export class Location extends BaseLocation {

}