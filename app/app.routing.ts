import { LoginComponent } from "./pages/login/login.component";
import {CardInfoComponent} from "./pages/card-info/card-info.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {WithdrawalComponent} from "./pages/withdrawal/withdrawal.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {WebViewComponent} from "./pages/web-view/web-view.component";

export const routes = [
    { path: "login", component: LoginComponent },
    { path: "", component: CardInfoComponent, canActivate: [AuthGuard]},
    { path: "settings", component: SettingsComponent},
    { path: "withdrawal", component: WithdrawalComponent },
    { path: "webview", component: WebViewComponent }

];

export const navigatableComponents = [
    LoginComponent,
    CardInfoComponent,
    SettingsComponent,
    WithdrawalComponent,
    WebViewComponent
];