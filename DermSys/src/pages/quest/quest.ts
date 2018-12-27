import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController, Platform } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-quest',
  templateUrl: 'quest.html'
})
export class QuestPage {

  public base64Image: string;
  public fileParameter: string;
  private latitude;
  private longitude;
  private spinner;
  userdata: any;
  constructor(public plt: Platform, private toast: Toast, public loadingCtrl: LoadingController, private geolocation: Geolocation, public navCtrl: NavController, private camera: Camera, private http: Http, public datepipe: DatePipe) {
    this.getGeolocation();
    this.spinner = this.loadingCtrl.create({
      content: 'Proszę czekać...'
    });
  }

  /**
   * Funkcja wywołująca plugin camera obsługujący aparat wbudowany w telefon
   * */
  takePic() {
    this.plt.ready().then((data) => {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
      }).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.fileParameter = imageData;
        console.log(this.base64Image);
      }, (err) => {
        console.log(err);
      });
    }, (error) => {
      console.log(error)
    });
    
  }

  /**
   * Funkcja wywołująca plugin Geolocation obsługujący geolokalizację na urządzeniach mobilnych oraz przeglądarkach
   * */
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /**
   * Funkcja wywołująca wyświetlenie spinnera ładowania
   * */
  loading() {    
    this.spinner.present();
  }
  /**
   * Funkcja wywołująca ukrycie spinnera ładowania
   * */
  stopLoading() {
    this.spinner.dismiss();
  }

  /**
   * Funkcja wywołująca wyświetlenie komunikatu typu toast z tekstem
   * */
  showToast(text) {
    this.toast.show(text, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  /**
   * Funkcja wywołująca wysłanie zapytania typu POST do serwisu 
   * */
  send(userdata) {
    this.getGeolocation();
    this.loading();
    var date = new Date();
    let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    var body;
    if (this.base64Image == undefined) {
      console.log(undefined)
      body = {
        "date": latest_date,
        "objawy": userdata,
        "file": "focia",
        "latitude": this.latitude,
        "longitude": this.longitude
      }
    } else {
      body = {
        "date": latest_date,
        "objawy": userdata,
        "file": this.fileParameter.toString(),
        "latitude": this.latitude,
        "longitude":this.longitude
      }
    }
    console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: false });
    var url = "http://89.68.16.224:8090/zapisz";
    this.http.post(url, body, options).subscribe((success) => {
      this.stopLoading();
      console.log(success)
      this.showToast("Wysłano zapytanie")
      this.userdata = "";
    }, (error) => {
      console.log(error)
      this.stopLoading();
      this.showToast("Wystąpił błąd wysyłania")
      this.userdata = "";
    })

  }
  
}
