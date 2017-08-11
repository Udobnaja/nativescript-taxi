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

import { StoreModule } from '@ngrx/store';
import {reducers} from "./modules/ngrx/index";
import {UserInitialState} from "./modules/state-managment/states/user.state";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./modules/state-managment/effects/user.effect";
import {UserService} from "./shared/user/user.service";
import {AccountService} from "./shared/account/account.service";

function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}


@NgModule({
  imports: [
      NativeScriptModule,
      NativeScriptFormsModule,
      NativeScriptHttpModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forRoot(routes),
      StoreModule.forRoot(reducers, {
          initialState: {
              user: null
          }
      }),
      EffectsModule.forRoot([
          UserEffects
      ])],
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
      AuthGuard, UserService, AccountService]
})
export class AppModule {}
