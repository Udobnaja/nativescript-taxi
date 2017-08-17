import { platformNativeScriptDynamic } from "nativescript-angular/platform";
require("./helpers");

import { AppModule } from "./app.module";
// import { setStatusBarColors } from "./utils/status-bar-util";
// setStatusBarColors();

platformNativeScriptDynamic().bootstrapModule(AppModule);
