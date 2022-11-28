import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat'

//Import para libreria de las peticiones HTTP:
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule,
  IonicModule.forRoot(), 
  AppRoutingModule, 
  IonicStorageModule.forRoot(), 
  AngularFireModule.initializeApp(environment.firebaseConfig),
  HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
