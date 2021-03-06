import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {SocketService} from './shared/socket.service';
import {ModelService} from './shared/model.service';
import {DonorService} from './shared/donor.service';

import {PatientComponent} from './patient/patient.component';
import {DonorComponent} from './donor/donor.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {EsriMapModule} from './esri-map/esri-map.module';
import {DonorRegisterComponent} from './donor-register/donor-register.component';
import {UserTypeToggleComponent} from './user-type-toggle/user-type-toggle.component';
import {DonorEditComponent} from './donor-edit/donor-edit.component';
import {DonorEditResolver} from './donor-edit/donor-edit.resolver';
import {DonorViewComponent} from './donor-view/donor-view.component';
import {DonorFormService} from './donor/donor-form.service';
import {DonorUpdatedComponent} from './donor-edit/donor-updated.component';
import {DonorDeletedComponent} from './donor-edit/donor-deleted.component';
import {DonorConfirmDeleteComponent} from './donor-edit/donor-confirm-delete.component';


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        UserTypeToggleComponent,
        DashboardComponent,
        PatientComponent,
        DonorComponent,
        DonorRegisterComponent,
        DonorViewComponent,
        DonorEditComponent,
        DonorUpdatedComponent,
        DonorConfirmDeleteComponent,
        DonorDeletedComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        EsriMapModule
    ],
    providers: [
        SocketService,
        ModelService,
        DonorService,
        DonorFormService,
        DonorEditResolver
    ],
    exports: [
        MaterialModule
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        UserTypeToggleComponent,
        DonorViewComponent,
        DonorUpdatedComponent,
        DonorConfirmDeleteComponent,
        DonorDeletedComponent
    ]
})
export class AppModule {
}
