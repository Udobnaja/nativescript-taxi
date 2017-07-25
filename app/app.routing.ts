import { LoginComponent } from "./pages/login/login.component";
import {CardInfoComponent} from "./pages/card-info/card-info.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {WithdrawalComponent} from "./pages/withdrawal/withdrawal.component";

export const routes = [
    { path: "", component: LoginComponent },
    { path: "card", component: CardInfoComponent },
    { path: "settings", component: SettingsComponent },
    { path: "withdrawal", component: WithdrawalComponent }

];

export const navigatableComponents = [
    LoginComponent,
    CardInfoComponent,
    SettingsComponent,
    WithdrawalComponent
];