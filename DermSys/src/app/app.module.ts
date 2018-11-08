import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { QuestPage } from '../pages/quest/quest';
import { AnswPage } from '../pages/answ/answ';

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
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Camera]
})
export class AppModule {}
