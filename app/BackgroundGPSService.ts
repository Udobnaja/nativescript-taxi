import { GPSService } from './shared/services/gps/gps.service';
declare var com: any;
declare var android: any;

import { Accuracy } from 'tns-core-modules/ui/enums';
import { watchLocation, clearWatch, isEnabled } from 'nativescript-geolocation';

import { LatLng } from './shared/models/latLng/latLng.class';
import { ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs';

import { on as applicationOn,
    exitEvent,
    ApplicationEventData
} from "application";

@JavaProxy("com.tns.BackgroundGPSService")
export class BackgroundGPSService extends com.pip3r4o.android.app.IntentService {

    private watchId;
    private gpsService;
    public permission$: Observable<boolean>;

    private injectGPSService(){

        if (this.gpsService) return;

        let injector = ReflectiveInjector.resolveAndCreate([
            GPSService
        ]);

        this.gpsService = injector.get(GPSService);
    }

    public BackgroundGPSService(){
        this.super('BackgroundGPSService');
    }

    public startWatchingLocation(){

        if (this.watchId) return;

        const OPTIONS = {
            desiredAccuracy: Accuracy.high,
            updateTime: 1000 * 60,
            minimumUpdateTime : 1000 * 20
        };

        this.watchId = watchLocation(response => {
            if (response) {

                let { latitude, longitude } = response;
                let location = new LatLng(latitude, longitude);

                this.gpsService.sendLocation(location).subscribe(() => {

                }, (e) => {
                    console.log("Error in send Location: " + (e.message || e))
                    this.StopWatchingLocation();
                });
            }
        }, (e) => {
            console.log("Error in watch Location: " + (e.message || e));
            this.StopWatchingLocation();
        }, OPTIONS);
    }


    public StopWatchingLocation(){
        if(this.watchId) {
            clearWatch(this.watchId);
            this.watchId = null;
        }
    }

    protected onHandleIntent(intent): void {

        const INTERVAL = 5000;
        let __this = this;

        this.injectGPSService();

        this.permission$ = Observable.interval(INTERVAL).flatMap(() => Observable.fromPromise(isEnabled()));

        this.permission$.subscribe(hasPermission => {
            if (hasPermission === true) {
                this.startWatchingLocation();
            } else {
                this.StopWatchingLocation();
            }
        }, (e) => {
            console.log("Error subscribe: " + (e.message || e));
            this.StopWatchingLocation();
        }, () => {
            console.log('Complete Permission Subscribe');
            this.StopWatchingLocation();
        });

        applicationOn(exitEvent, function (args: ApplicationEventData) {
            if (args.android) {
                __this.StopWatchingLocation();
            }
        });
    }

}
