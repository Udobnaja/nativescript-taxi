import { LoginComponent } from "./pages/login/login.component";
import {CardInfoComponent} from "./pages/card-info/card-info.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {WithdrawalComponent} from "./pages/withdrawal/withdrawal.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {WebViewComponent} from "./pages/web-view/web-view.component";
import {AgreementComponent} from "./pages/agreement/agreement.component";
import {AcceptedGuard} from "./shared/guards/accept.guard";

export const routes = [
    { path: "login", component: LoginComponent },
    { path: "card-info", component: CardInfoComponent, canActivate: [AuthGuard, AcceptedGuard]},
    { path: "", redirectTo: 'card-info', pathMatch: 'full'}, /* @TODO: create guard for redirecting to card-info if user is already accepted */
    { path: "agreement", component: AgreementComponent, canActivate: [AuthGuard]},
    { path: "settings", component: SettingsComponent},
    { path: "withdrawal", component: WithdrawalComponent },
    { path: "webview", component: WebViewComponent }
];

export const navigatableComponents = [
    LoginComponent,
    CardInfoComponent,
    SettingsComponent,
    WithdrawalComponent,
    WebViewComponent,
    AgreementComponent
];