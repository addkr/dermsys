import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';
import { QuestPage } from '../quest/quest';
import { AnswPage } from '../answ/answ';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public base64Image: string;

  constructor(public navCtrl: NavController, private camera: Camera) {
    
  }


  ask() {
    this.navCtrl.push(QuestPage);
  }

  check() {
    this.navCtrl.push(AnswPage);
  }

  takePic() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      console.log(this.base64Image);
    }, (err) => {
      console.log(err);
    });
  }
 
}
