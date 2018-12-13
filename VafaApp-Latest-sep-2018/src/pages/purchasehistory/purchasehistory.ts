import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductListProvider } from '../../providers/product-list/product-list';



@IonicPage()
@Component({
  selector: 'page-purchasehistory',
  templateUrl: 'purchasehistory.html',
})
export class PurchasehistoryPage {

  PurchaseDetails:any=[];
  PremiumPlus:any = '2018_premium_william_buck_premier_womens_all_teams';  

  constructor(public navCtrl: NavController,
    public prolist:ProductListProvider,
    public navParams: NavParams) {
  // load purchases from local database
  this.PurchaseDetails=this.prolist.GetPurchase();
  }

 
  
}
