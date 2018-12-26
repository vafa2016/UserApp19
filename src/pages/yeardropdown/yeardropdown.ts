import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-yeardropdown',
  template : `
  <ion-list no-lines class='jd-custom-drop'>
    <button *ngFor="let year of YearList" ion-item text-center (click)="dismiss(year)">{{year}}</button>
  </ion-list>
`
})

export class YeardropdownPage {

  YearList: any = ['2017','2018','2019'];

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YeardropdownPage');
  }

  dismiss(val){
    this.viewCtrl.dismiss(val);
  }

}
