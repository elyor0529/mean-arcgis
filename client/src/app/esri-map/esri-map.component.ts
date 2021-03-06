import {Component, OnInit, EventEmitter, ViewChild, ElementRef, Output, Input} from '@angular/core';

import {EsriService} from './esri.service';
import {PatientMapService} from './esri-map.patient.service';
import {DonorMapService} from './esri-map.donor.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('map') mapEl: ElementRef;

  @Input() userType: string;
  @Input() goTo;
  @Output() onMapEvent = new EventEmitter<any>();

  mapView: __esri.MapView;
  map: __esri.Map;
  locator: __esri.Locator;
  mapService;

  constructor(public esriService: EsriService,
              private patientMapService: PatientMapService,
              private donorMapService: DonorMapService) {
  }

  ngOnInit() {
    return this.esriService.isLoaded.then(() => {
      const mapServiceForUserType = {
        donor: this.donorMapService,
        patient: this.patientMapService
      };

      this.mapService = mapServiceForUserType[this.userType];
      this.mapService.setup(this);
    });
  }

  reload() {
    this.mapService.reload(this);
  }
}
