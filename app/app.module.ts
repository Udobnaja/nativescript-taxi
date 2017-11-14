import { NgModule, Injector, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { XHRBackend, Http, RequestOptions, HttpModule } from "@angular/http";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

require("nativescript-localstorage");

import { InterceptedHttp } from "./modules/core/services/http.service";
import { reducers } from "./modules/ngrx/index";
import { UserInitialState } from "./modules/state-managment/states/user.state";
import { UserEffects } from "./modules/state-managment/effects/user.effect";

import { UserService } from "./shared/services/user/user.service";
import { AccountService } from "./shared/services/account/account.service";

import { LoginModule } from "./pages/login/login.module";
import { CardModule } from "./pages/card/card.module";

import { AppComponent } from "./app.component";
import {routes, authProviders} from "./app.routing";


export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}

@NgModule({
    providers: [
        authProviders,
        UserService,
        AccountService,
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        },
    ],
  imports: [
      NativeScriptModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forRoot(routes),
      NativeScriptHttpModule,
      StoreModule.forRoot(reducers, {
          initialState: {
              user: UserInitialState
          }
      }),
      EffectsModule.forRoot([
          UserEffects
      ]),
      LoginModule,
      CardModule,
      HttpModule],
  declarations: [
      AppComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]

})
export class AppModule {
    static injector: Injector;

    constructor(injector: Injector) {
        AppModule.injector = injector;
    }
}
