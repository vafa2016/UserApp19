import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductListProvider } from '../../providers/product-list/product-list';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';



@IonicPage()
@Component({
  selector: 'page-purchasehistory',
  templateUrl: 'purchasehistory.html',
})
export class PurchasehistoryPage {

  PurchaseDetails:any=[];
  fixturedata:any;

  constructor(public navCtrl: NavController,
    public prolist:ProductListProvider,
    public ajax: AjaxProvider,
    public Storage:Storage,
    public navParams: NavParams) {

  //  local purchases from Storage
  this.Storage.get('UserDeviceData').then((data) => {
    if (data) {
      this.ListPurchase(data.payment);
    }
  });

  // load purchases from local database
  // this.PurchaseDetails=this.prolist.GetPurchase();
  }

  ListPurchase(payment){
    payment.forEach(element => {
      this.prolist.Analyse(element.team_id, element.competition_id);
      let team = this.prolist.gettname();
      let comp = this.prolist.getcompname();
      if(element.fixture_id == 0){
        let data = {
          competition : comp,
          team : team,
          fixture_id : element.fixture_id,
          product : element.product_id,
          transactionid : element.transaction_id,
          purchase_date : element.created_at,
        }
        this.PurchaseDetails.push(data);
      }else if(element.fixture_id != 0){
        this.ajax.FixtureDataApi({fixtureId : element.fixture_id}).subscribe((res)=> {
          this.fixturedata = res;
           this.SetFixture(this.fixturedata.fixture, element);
         },
          error =>{

          });
      }
    });
  }

  SetFixture(fixture, element){
      let data = {
      competition : '',
      team : '',
      fixture_id : element.fixture_id,
      product : element.product_id,
      transactionid : element.transaction_id,
      purchase_date : element.created_at,
      gamepass : 'Game Pass - '+ fixture.home_team +' '+ 'V' +' '+ fixture.away_team +' '+ 'Rnd ' +fixture.round+' '+ fixture.Competition +' '+ '2019'
    }
    this.PurchaseDetails.push(data);
  }

  // Get product type
  ProductType(product){
   if(product.product && product.fixture_id == 0){
     if(this.prolist.GetProductType(product.product) == 'Premium 2019'){
       return 'Team Pass - ' + product.team+' '+product.competition+' '+'2019';
     } else if(this.prolist.GetProductType(product.product) == 'Premium'){
       return 'Team Pass -' + product.team+' '+product.competition+' '+'2018';
     } else if(this.prolist.GetProductType(product.product) == 'Premium Plus 2019'){
       return 'Competition Pass - ' + product.competition+' '+'2019';
     } else if(this.prolist.GetProductType(product.product) == 'Premium Plus'){
       return 'Competition Pass - ' + product.competition+' '+'2018';
     }else {
       return this.prolist.GetProductType(product.product)
     }
   }
  }




}
