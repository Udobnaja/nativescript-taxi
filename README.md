# App for taxi drivers (Android platform)

### Nativescript, typescript, Angular 4.+

###### Run Application on emulator
``` 
"start-android-bundle": "npm run ns-bundle --android --run-app"
```
###### Build Application
```
"build-android-bundle": "npm run ns-bundle --android --build-app"
```
Available flags with commands above 
```
--uglify --snapshot
```
Flags for release 
```
--release --keyStorePath ~/path/to/keystore --keyStorePassword your-pass --keyStoreAlias your-alias --keyStoreAliasPassword your-alias-pass
```
Read more [here](https://docs.nativescript.org/angular/best-practices/bundling-with-webpack)

###### Use tslint
```
"tslint": "tslint --project tsconfig.json --config tslint.json"
```
