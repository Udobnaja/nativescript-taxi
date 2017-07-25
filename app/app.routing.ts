import { LoginComponent } from "./pages/login/login.component";
import {CardInfoComponent} from "./pages/card-info/card-info.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {WithdrawalComponent} from "./pages/withdrawal/withdrawal.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {PrivacyPolicyComponent} from "./pages/privacy-policy/privacy-policy.component";
import {TermOfUseComponent} from "./pages/term-of-use/term-of-use.component";

export const routes = [
    { path: "login", component: LoginComponent },
    { path: "", component: CardInfoComponent, canActivate: [AuthGuard]},
    { path: "settings", component: SettingsComponent},
    { path: "withdrawal", component: WithdrawalComponent },
    { path: "privacyPolicy", component: PrivacyPolicyComponent },
    { path: "termOfUse", component: TermOfUseComponent}

];

export const navigatableComponents = [
    LoginComponent,
    CardInfoComponent,
    SettingsComponent,
    WithdrawalComponent,
    PrivacyPolicyComponent,
    TermOfUseComponent
];