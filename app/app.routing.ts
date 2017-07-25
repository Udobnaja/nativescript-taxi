import { LoginComponent } from "./pages/login/login.component";
import {CardInfoComponent} from "./pages/card-info/card-info.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {WithdrawalComponent} from "./pages/withdrawal/withdrawal.component";
import {AuthGuard} from "./shared/guards/auth.guard";

export const routes = [
    { path: "login", component: LoginComponent },
    { path: "", component: CardInfoComponent, canActivate: [AuthGuard]},
    { path: "settings", component: SettingsComponent},
    { path: "withdrawal", component: WithdrawalComponent }

];

export const navigatableComponents = [
    LoginComponent,
    CardInfoComponent,
    SettingsComponent,
    WithdrawalComponent
];