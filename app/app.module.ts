import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import {DialogContent} from "./pages/login/dialog/choose-autopark.component";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
import {AuthGuard} from "./shared/guards/auth.guard";
import {InterceptedHttp} from "./shared/interceptedHttp.service";

var localStorage = require('nativescript-localstorage');

import {XHRBackend, Http, RequestOptions} from "@angular/http";

elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}


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
  bootstrap: [AppComponent],
  providers: [
      {
          provide: Http,
          useFactory: httpFactory,
          deps: [XHRBackend, RequestOptions]
      },
      AuthGuard]
})
export class AppModule {}
