import {Injectable} from '@angular/core';
import {EsriMapComponent} from './esri-map.component';
import {EsriService} from './esri.service';
import {AbstractMapService} from './esri-map.abstract.service';

@Injectable()
export class DonorMapService extends AbstractMapService {

    setup(mapComponent: EsriMapComponent) {
        mapComponent.map = new mapComponent.esriService.Map({basemap: 'streets'});

        this.addMapView(mapComponent);

        this.addLocator(mapComponent);
        this.addMapWidgets(mapComponent);
        this.addLocatePopupTemplate(mapComponent);
    }

    addLocator(mapComponent: EsriMapComponent) {
        mapComponent.locator = new mapComponent.esriService.tasks.Locator({
            url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
        });
    }

    addLocatePopupTemplate(mapComponent: EsriMapComponent) {
        const locationDetails = {mapPoint: null};

        mapComponent.mapView.on('click', ({mapPoint}) => {
            mapComponent.locator.locationToAddress(mapPoint)
                .then((response) => {
                    mapComponent.mapView.popup.open({
                        title: 'Set current location',
                        location: mapPoint,
                        content: response.address.Match_addr
                    });
                    mapComponent.onMapEvent.emit({eventType: 'click', address: response.address, mapPoint});
                    locationDetails.mapPoint = mapPoint;
                })
                .otherwise(() => {
                    mapComponent.mapView.popup.open({
                        title: `Set current location to [Lon: ${mapPoint.longitude}, Lat: ${mapPoint.latitude}]`,
                        location: mapPoint,
                        content: 'No address was found for this location'
                    });
                    locationDetails.mapPoint = mapPoint;
                    mapComponent.onMapEvent.emit({eventType: 'click', mapPoint});
                });
        });

        const registerAction = {
            title: 'Register',
            id: 'register',
            className: 'esri-icon-authorize'
        };

        mapComponent.mapView.popup.actions.push(registerAction);

        mapComponent.mapView.popup.on('trigger-action', (event) => {
            if (event.action.id === 'register') {
                mapComponent.onMapEvent.emit({
                    eventType: event.action.id,
                    mapPoint: locationDetails.mapPoint
                });
            }
        });
    }
}
