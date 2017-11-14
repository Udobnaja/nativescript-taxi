import { ModuleWithProviders } from "@angular/core";
import { Routes,  RouterModule} from "@angular/router";
import { SettingsComponent } from "../settings/settings.component";
import { WithdrawalComponent } from "./withdrawal/withdrawal.component";
import { WebViewComponent } from "../web-view/web-view.component";
import { EditRequisitesComponent } from "./withdrawal/edit-requisites/edit-requisites.component";
import { CardInfoComponent } from "./card.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { AcceptedGuard } from "../../shared/guards/accept.guard";

const cardRoutes: Routes = [
    { path: "card", component: CardInfoComponent, canActivate: [AcceptedGuard, AuthGuard] },
    { path: "settings", component: SettingsComponent },
    { path: "withdrawal", component: WithdrawalComponent },
    { path: "webview", component: WebViewComponent },
    { path: "edit-requisites", component: EditRequisitesComponent }
];

export const cardDeclaration = [
    CardInfoComponent,
    SettingsComponent,
    WithdrawalComponent,
    WebViewComponent,
    EditRequisitesComponent
];

export const cardRouting: ModuleWithProviders = RouterModule.forChild(cardRoutes);
