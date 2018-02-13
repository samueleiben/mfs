import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RootsPage } from '../pages/roots/roots';
import { UnitcirclePage } from '../pages/unitcircle/unitcircle';
import { QuadraticFormulaPage } from '../pages/quadraticformula/quadraticformula';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Clipboard } from '@ionic-native/clipboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RootsPage,
    UnitcirclePage,
    QuadraticFormulaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RootsPage,
    UnitcirclePage,
    QuadraticFormulaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
