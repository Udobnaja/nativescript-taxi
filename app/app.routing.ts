import { AuthGuard } from "./shared/guards/auth.guard";
import { AcceptedGuard } from "./shared/guards/accept.guard";

export const authProviders = [
    AuthGuard,
    AcceptedGuard
];

export const routes = [
    { path: "", redirectTo: "/login", pathMatch: "full"},
];
