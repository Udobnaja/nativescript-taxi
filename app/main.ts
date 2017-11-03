import { platformNativeScriptDynamic } from "nativescript-angular/platform";
require("./helpers");

import { AppModule } from "./app.module";

platformNativeScriptDynamic().bootstrapModule(AppModule);
