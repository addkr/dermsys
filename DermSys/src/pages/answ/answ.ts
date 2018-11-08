import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-answ',
  templateUrl: 'answ.html'
})
export class AnswPage {

  public base64Image: string;

  constructor(public navCtrl: NavController, private camera: Camera) {
    
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

  send() {

  }
 
}
