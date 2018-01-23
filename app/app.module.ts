import { NgModule, Injector, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
// import { RequestOptions } from "@angular/http";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'

import { EffectsModule } from "@ngrx/effects";
// import { StoreModule } from "@ngrx/store";

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
import { routes, authProviders } from "./app.routing";

@NgModule({
    providers: [
        authProviders,
        UserService,
        AccountService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptedHttp,
            multi: true,
        }
    ],
  imports: [
      NativeScriptModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forRoot(routes),
      NativeScriptHttpModule,
      // StoreModule.forRoot(reducers, {
      //     initialState: {
      //         user: UserInitialState
      //     }
      // }),
      // EffectsModule.forRoot([
      //     UserEffects
      // ]),
      CardModule,
      LoginModule,
      HttpClientModule],
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
