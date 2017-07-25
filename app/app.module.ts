import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import {DialogContent} from "./pages/login/dialog/choose-autopark.component";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

@NgModule({
  imports: [
      NativeScriptModule,
      NativeScriptFormsModule,
      NativeScriptHttpModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forRoot(routes)],
  entryComponents: [DialogContent],
  declarations: [
      AppComponent,
      DialogContent,
      ...navigatableComponents],
  bootstrap: [AppComponent]
})
export class AppModule {}
