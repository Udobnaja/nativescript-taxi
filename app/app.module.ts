import {NgModule, Injector} from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import {DialogContent} from "./pages/login/dialog/choose-autopark.component";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
import {AuthGuard} from "./shared/guards/auth.guard";
import {InterceptedHttp} from "./modules/core/services/http.service";

var localStorage = require('nativescript-localstorage');

import {XHRBackend, Http, RequestOptions, HttpModule} from "@angular/http";

elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

import { StoreModule } from '@ngrx/store';
import {reducers} from "./modules/ngrx/index";
import {UserInitialState} from "./modules/state-managment/states/user.state";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./modules/state-managment/effects/user.effect";
import {UserService} from "./shared/services/user/user.service";
import {AccountService} from "./shared/services/account/account.service";

import { APP_INITIALIZER } from '@angular/core';
import {ConfigBackend} from "./modules/core/services/config.service";
import {ScheduleService} from "./shared/services/schedule/schedule.service";
import {AcceptedGuard} from "./shared/guards/accept.guard";
import {GPSService} from "./shared/services/gps/gps.service";

function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}


@NgModule({
  imports: [
      NativeScriptModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forRoot(routes),
      NativeScriptFormsModule,
      NativeScriptHttpModule,
      StoreModule.forRoot(reducers, {
          initialState: {
              user: UserInitialState
          }
      }),
      EffectsModule.forRoot([
          UserEffects
      ]),
      HttpModule],
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
      ConfigBackend,
      { provide: APP_INITIALIZER, useFactory: (config: ConfigBackend) => () => config.load(), deps: [ConfigBackend], multi: true },
      AuthGuard, AcceptedGuard, UserService, AccountService, ScheduleService, GPSService]
})
export class AppModule {
    static injector: Injector;

    constructor(injector: Injector) {
        AppModule.injector = injector;
    }
}
