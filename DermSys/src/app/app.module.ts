import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { QuestPage } from '../pages/quest/quest';
import { AnswPage } from '../pages/answ/answ';
import { DatePipe } from '@angular/common';
import { LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuestPage,
    AnswPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuestPage,
    AnswPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Camera, DatePipe, LoadingController, Geolocation, Toast]
})
export class AppModule {}
