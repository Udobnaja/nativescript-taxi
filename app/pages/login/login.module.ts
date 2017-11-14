import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { loginRouting } from "./login.routing";
import { LoginComponent } from "./login.component";
import { DialogContent } from "./dialog/choose-autopark.component";
import { AgreementComponent } from "../agreement/agreement.component";

@NgModule({
    providers: [

    ],
    imports: [
        NativeScriptFormsModule,
        NativeScriptModule,
        loginRouting
    ],
    declarations: [
        LoginComponent,
        DialogContent,
        AgreementComponent
    ],
    entryComponents: [DialogContent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }