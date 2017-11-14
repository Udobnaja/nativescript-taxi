import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { cardRouting, cardDeclaration } from "./card.routing";
import { APP_INITIALIZER } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import * as elementRegistryModule from "nativescript-angular/element-registry";
import { ConfigBackend } from "../../modules/core/services/config.service";

import { ScheduleService } from "../../shared/services/schedule/schedule.service";
import { GPSService } from "../../shared/services/gps/gps.service";

elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

export function configFactory(config: ConfigBackend) {
    return () => config.load();
}

@NgModule({
    providers: [
        ConfigBackend,
        {
            provide: APP_INITIALIZER,
            useFactory: configFactory,
            deps: [ConfigBackend],
            multi: true
        },
        ScheduleService, GPSService
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        cardRouting,
    ],
    declarations: [
        ...cardDeclaration
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CardModule { }