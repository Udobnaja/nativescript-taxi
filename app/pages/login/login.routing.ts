import { ModuleWithProviders } from "@angular/core";
import { Routes,  RouterModule} from "@angular/router";
import { LoginComponent } from "./login.component";
import { AgreementComponent } from "../agreement/agreement.component";
import { AuthGuard } from "../../shared/guards/auth.guard";

const loginRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "agreement", component: AgreementComponent, canActivate: [AuthGuard] }
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);


