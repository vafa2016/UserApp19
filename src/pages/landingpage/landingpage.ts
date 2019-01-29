import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController, NavParams, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { HomePage } from '../../pages/home/home';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { ProductListProvider } from '../../providers/product-list/product-list';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';


const proId0 = '2018_premium_william_buck_premier_womens_caulfield_grammarians';
const proId1 = '2018_premium_william_buck_womens_fitzroy_acu';
const proId2 = '2018_premium_william_buck_premier_womens_kew_fc';
const proId3 = '2018_premium_william_buck_premier_womens_marcellin';
const proId4 = '2018_premium_william_buck_premier_womens_melbourne_uni';
const proId5 = '2018_premium_william_buck_premier_womens_old_trinity';
const proId6 = '2018_premium_william_buck_premier_womens_old_xaverians';
const proId7 = '2018_premium_william_buck_premier_womens_skob_saints';
const PremiumPlus = '2018_premium_william_buck_premier_womens_all_teams';

// const proId1 = 'vafa_premium0001';
// const proId2 = 'vafa_premium_plus0002';

const PPLink = 'https://www.completesportsmanagement.com.au/privacy';
const TermsLink = 'http://vafalive.com.au/termsconds';

@IonicPage()
@Component({
  selector: 'page-landingpage',
  templateUrl: 'landingpage.html',
})
export class LandingpagePage {

  isLogin: boolean = false;
  tempdata: any = [];
  higherproductid: any = '';

  User: any = {
    device_id: '',
    competition_id: '',
    team_id: '',
    product_id: '',
    transaction_id: ''
  }

  lowerproduct: any = '';
  lowerproductid: any = '';
  higherproduct: any = '';
  higherpurchasedate: any = '';
  userData: any;
  c_productid: any = '';
  c_product: any = '';
  c_purchasedate: any = '';

  resData: any;
  responseData: any;
  Dataresponse: any;
  paymentname: any = 'vafa_premium_plus';

  UserTeamData: any = {
    selectedcompetition: '',
    selectedteam: '',
    yearcheck: ''
  }

  ProductDetails: any = [];
  competitionlist: any = [];
  teamlist: any = [];
  selectedteam: any = '';
  selectedcompetition: any = '';
  list: any = '';
  type: any = '';
  yearcheck: any = '';
  deviceId: any;
  UserDeviceData: any = [];
  pamentshow: boolean = false; MyFavTeam: any;
  LocalUserDevice: any = [];

  constructor(private storage: Storage,
    private plt: Platform,
    private iap: InAppPurchase,
    public events: Events,
    private ga: GoogleAnalytics,
    private uniqueDeviceID: UniqueDeviceID,
    public processproduct: ProductListProvider,
    public inapp: InAppBrowser,
    public localData: LocalDataProvider,
    private streamingMedia: StreamingMedia,
    public cmnfun: CommomfunctionProvider,
    public ajax: AjaxProvider, public navCtrl: NavController, public viewCtrl: ViewController, private modalCtrl: ModalController, public navParams: NavParams) {
    // get device id
    this.deviceId = this.localData.GetDevice();
    // this.User.device_id=this.deviceId;
    console.log(this.deviceId)
    //
    this.storage.get('userData').then((val) => {
      if (val) {
        this.isLogin = true;
      }
    });
    //

    this.LocalUserDevice = this.localData.GetUserDeviceData();
    if (this.LocalUserDevice) {
      // get user team and competition
      // details from server
      this.UserDeviceData = this.LocalUserDevice.devicedata;
      // alert(JSON.stringify(this.UserDeviceData))
      // details from server
      if (this.LocalUserDevice.devicedata.payment_status == 1) {
        let product = this.processproduct.GetProductType(this.LocalUserDevice.devicedata.product);
        console.log(product)
        this.paymentname = product;
      }
      //
      this.User.device_id = this.deviceId;
      console.log(this.LocalUserDevice)
      if (this.LocalUserDevice.webuserteam !== null || this.LocalUserDevice.webuserteam == false) {
        this.selectedteam = this.LocalUserDevice.webuserteam;
      }
      if (this.LocalUserDevice.webusercompetition !== null) {
        this.selectedcompetition = this.LocalUserDevice.webusercompetition;
      }
      if (this.selectedcompetition != '' && this.selectedteam != '') {
        // get product_id
        this.processproduct.SetUserProduct(this.selectedteam, this.selectedcompetition);
      } else {
        // show from local storage
        this.storage.get('UserTeamData').then((val) => {
          if (val) {
            console.log(val)
            this.selectedteam = val.selectedteam;
            this.selectedcompetition = val.selectedcompetition;
            this.yearcheck = val.yearcheck;
            this.processproduct.SetUserProduct(this.selectedteam, this.selectedcompetition);
          }
        });
      }
    }
    //

    this.plt.ready().then(() => {
      this.iap.getProducts([proId0, proId1, proId2, proId3, proId4, proId5, proId6, proId7, PremiumPlus])
        .then((products) => {
        })
        .catch((err) => {
          console.log(err);
        });
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackTiming('Onboarding', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
  }

  ionViewDidLoad() {
    // get all competition and teams
    this.ajax.postMethodct('get-all-competitions').subscribe((res) => {
      this.competitionlist = res;
      console.log(this.competitionlist);
    })
    this.ajax.postMethodct('get-all-teams').subscribe((res) => {
      this.teamlist = res;
      console.log(this.teamlist);
    })

    // load stored team and competition
    this.storage.get('UserTeamData').then((val) => {
      if (val) {
        console.log(val)
        if (val.selectedcompetition != '' && val.selectedteam != '') {
          this.selectedteam = val.selectedteam;
          this.selectedcompetition = val.selectedcompetition;
          this.yearcheck = val.yearcheck;
          this.processproduct.SetUserProduct(this.selectedteam, this.selectedcompetition);
          this.pamentshow = true;
        }else if(val.selectedcompetition != ''){
          this.selectedcompetition = val.selectedcompetition;
        }
      }
    });
  }


  DemoVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Finished Video') },
      errorCallback: (e) => { console.log('Error: ', e) },
      orientation: 'portrait'
    };
    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4', options);
  }


  yearset(item) {
    this.ga.trackView('Onboarding – Age Selection');
    this.yearcheck = item;
    if (item == 'yes') {
      this.UserTeamData.yearcheck = '18 or above';
      this.localData.LocalUserData('user_age', '18 or above');
    } else {
      this.UserTeamData.yearcheck = 'Under 18';
      this.localData.LocalUserData('user_age', 'Under 18');
    }
  }

  gotopage() {

    let modal = this.modalCtrl.create('CompetitionTeamPage', { list: this.list, type: this.type });
    let me = this;
    modal.onDidDismiss(data => {
      if (data) {
        if (data.type == 'competitions') {
          this.ga.trackView('Onboarding – Competition Selection');
          this.ga.trackEvent('Onboarding – Competition Selection', 'Selected', 'Onboarding – Competition Selection', 1);
          this.deviceId = this.localData.GetDevice();
          // this.cmnfun.showLoading('Please wait...');
          this.selectedcompetition = data.value;
          console.log(this.selectedcompetition);
          if (this.isLogin == true) {
            let update = {
              id: this.UserDeviceData.id,
              field: 'favourite_competition_id',
              data: this.selectedcompetition.competition_id
            }
            this.cmnfun.Loading('Updating..');
            this.ajax.EditUserData(update).subscribe((res) => {
              this.cmnfun.HideLoading();
              console.log(res);
              this.Dataresponse = res;
              this.localData.StoreData(this.Dataresponse.webuser);
              // this.localData.StoreUserFav(this.Dataresponse);
              // this.storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
              // this.storage.set('FullData', this.Dataresponse);
            });
          }
        }
        else {
          this.ga.trackView('Onboarding – Team Selection');
          this.ga.trackEvent('Onboarding – Team Selection', 'Selected', 'Onboarding – Team Selection', 1);
          this.deviceId = this.localData.GetDevice();
          this.selectedteam = data.value;
          this.processproduct.SetUserProduct(this.selectedteam, this.selectedcompetition);
          if (this.isLogin == true) {
            let update = {
              id: this.UserDeviceData.id,
              field: 'favourite_team_id',
              data: this.selectedteam.team_id
            }
            this.cmnfun.Loading('Updating..');
            this.ajax.EditUserData(update).subscribe((res) => {
              this.cmnfun.HideLoading();
              console.log(res);
              this.Dataresponse = res;
              this.localData.StoreData(this.Dataresponse.webuser);
              this.localData.StoreUserFav(this.Dataresponse);
              // this.storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
              // this.storage.set('FullData', this.Dataresponse);
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          }
        }
      }
    });
    modal.present();
  }
  gotocheckcompetitionteam(item) {
    if (item == 'competitions') {
      this.ga.trackEvent('Onboarding – Competition Selection', 'Selected', 'Onboarding – Competition Selection', 1);
      this.list = this.competitionlist.competition;
      this.type = 'competitions';
      this.gotopage();
    }
    else {
      if (this.selectedcompetition != '') {
        this.list = this.teamlist.teams;
        this.type = 'teams'
        this.gotopage();
      }
      else {
        alert("please choose competition")
      }
    }
  }


  gotohome() {
    if (this.selectedcompetition == '' && this.selectedteam == '') {
      this.ga.trackEvent("Onboarding – Competition Selection Skip", "Skip", "Onboarding - Competition Selection", 1);
    } else if (this.selectedcompetition != '' && this.selectedteam == '') {
      this.ga.trackEvent("Onboarding – Team Selection Skip", "Skip", "Onboarding - Team Selection", 1);
    } else if (this.selectedteam != '' && this.selectedcompetition != '' && this.yearcheck == '') {
      this.ga.trackEvent("Onboarding – Age Selection Skip", "Skip", "Onboarding – Age Selection", 1);
    } else if (this.pamentshow == true) {
      this.ga.trackEvent("Premium Pass Skip", "Skip", "Premium Pass", 1);
    }
    if (this.selectedcompetition != '' && this.selectedteam != '') {
      this.UserTeamData.selectedcompetition = this.selectedcompetition;
      this.UserTeamData.selectedteam = this.selectedteam;
      this.storage.set('UserTeamData', this.UserTeamData);
    }
    this.ga.trackEvent("Upgrade", "Skipped", "Onboarding", 1);
    this.ga.trackEvent("Onboarding – No Thanks", "Selected", "Onboarding", 1);
    this.events.publish('menuchange2:changed', 'HomePage');
    this.navCtrl.setRoot(HomePage);
  }


  Terms() {
    this.ga.trackView('Onboarding – Terms and Conditions');
    this.navCtrl.push('CustomBrowserPage');
  }

  privacy() {
    this.ga.trackView(' Onboarding – Privacy Policy');
    this.navCtrl.push('CustomPrivacyPage');
  }


  gotopament() {
    if (this.isLogin == true) {
      this.ga.trackView('Onboarding – Age Selection');
      this.ga.trackView('Premium Pass - Purchase');
      this.ga.trackEvent("Onboarding – Buy a Premium Pass", "Selected", "Onboarding", 1);
      this.UserTeamData.selectedcompetition = this.selectedcompetition;
      this.UserTeamData.selectedteam = this.selectedteam;
      this.UserTeamData.yearcheck = this.yearcheck;
      console.log(this.UserTeamData)
      this.storage.set('UserTeamData', this.UserTeamData);
      this.pamentshow = true;
    } else {
      this.UserTeamData.selectedcompetition = this.selectedcompetition;
      this.UserTeamData.selectedteam = this.selectedteam;
      this.UserTeamData.yearcheck = this.yearcheck;
      console.log(this.UserTeamData)
      this.storage.set('UserTeamData', this.UserTeamData);
      this.localData.LoginState('LandingpagePage', '');
      this.navCtrl.push('LoginPage', { iap: 'true' });
    }
  }



  paymentBuy(val) {
    let product_id;
    if (val == 1) {
      this.ga.trackEvent("Premium Pass", "Selected", "PREMIUM", 1);
      product_id = this.processproduct.GetUserProduct();
    } else if (val == 2) {
      this.ga.trackEvent("Premium Pass", "Selected", "PREMIUM PLUS", 1);
      product_id = PremiumPlus;
    }
    this.User.product_id = product_id;
    console.log(this.User)
    let paidstatus = 1;
    this.cmnfun.Loading('Please wait processing payment.');
    this.iap.restorePurchases().then(purchases => {
      if (purchases != []) {
        purchases.forEach(element => {
          if (element.productId == proId0 && this.User.product_id == proId0) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          } else if (element.productId == proId1 && this.User.product_id == proId1) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          } else if (element.productId == proId2 && this.User.product_id == proId2) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          } else if (element.productId == proId3 && this.User.product_id == proId3) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          } else if (element.productId == proId4 && this.User.product_id == proId4) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          } else if (element.productId == proId5 && this.User.product_id == proId5) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          } else if (element.productId == proId6 && this.User.product_id == proId6) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          } else if (element.productId == proId7 && this.User.product_id == proId7) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          } else if (element.productId == PremiumPlus && this.User.product_id == PremiumPlus) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;

          }
        });
        if (paidstatus == 1) {
          this.Buy();
        } else {
          this.AlreadyPurchased();
        }
      } else {
        this.Buy();
      }
    })
      .catch((err) => {
        this.cmnfun.HideLoading();
        this.cmnfun.showToast(err.errorMessage);
      });
  }


  //  In-App Purchase functionalities //
  Restore() {
    console.log(this.User);
    let product1 = 0;
    let product2 = 0;
    this.cmnfun.Loading('Please wait processing payment.');
    this.iap.restorePurchases().then(purchases => {
      if (purchases != []) {
        // this.processproduct.IapRestorePurchase(purchases); // store purchase history
        purchases.forEach(element => {
          if (element.productId == proId0 || element.productId == proId1 || element.productId == proId2 || element.productId == proId3 || element.productId == proId4 || element.productId == proId5 || element.productId == proId6 || element.productId == proId7) {
            product1 = 1;
            this.processproduct.RestoreTeam(element.productId);
            this.c_product = element.transactionId;
            this.c_productid = element.productId;
            this.c_purchasedate = element.date;
          } else if (element.productId == PremiumPlus) {
            product2 = 1;
            this.processproduct.RestoreTeam(element.productId);
            this.c_purchasedate = element.date;
            this.c_product = element.transactionId;
            this.c_productid = element.productId;
            this.higherproduct = element.transactionId;
            this.higherproductid = element.productId;
            this.higherpurchasedate = element.date;
          }
        });
        if (product1 == 1 && product2 == 0) {
          this.User.transaction_id = this.c_product;
          this.User.product_id = this.c_productid;

          this.AlreadyPurchased();
        } else if (product2 == 1 && product1 == 0) {
          this.User.transaction_id = this.c_product;
          this.User.product_id = this.c_productid;

          this.AlreadyPurchased();
        } else if (product1 == 1 && product2 == 1) {
          this.User.transaction_id = this.higherproduct;
          this.User.product_id = this.higherproductid;

          this.AlreadyPurchased();
        } else {
          this.cmnfun.HideLoading();
          this.cmnfun.showToast('Premium pass not purchased,cannot be restored');
        }
      } else {
        this.cmnfun.HideLoading();
        this.cmnfun.showToast('Premium pass cannot be restored');
      }

    })
      .catch((err) => {
        this.cmnfun.HideLoading();
        this.cmnfun.showToast(err.errorMessage);
      });
  }

  AlreadyPurchased() {
    this.User.competition_id = this.processproduct.GetCompetitionid();
    this.User.team_id = this.processproduct.GetTeamid();
    console.log(this.User)
    this.ajax.PaymentpostApi(this.User).subscribe((res) => {
      this.cmnfun.HideLoading();
      console.log(res);
      this.resData = res;
      this.localData.StoreUserDeviceData(this.resData);
      this.storage.set("UserDeviceData", this.resData);
      this.localData.StoreUserFav(this.resData);
      this.processproduct.InsertPurchase(this.resData);
      this.events.publish('changebanner:changed', true);
      this.events.publish('menuchange2:changed', 'HomePage');
      this.ga.trackEvent("Payment", "Done", "Payment", 1);
      if (this.isLogin == true) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.localData.LoginState('', '');
        this.navCtrl.push('LoginPage', { iap: 'true1' });
      }
    }, error => {
      this.cmnfun.HideLoading();
      this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }

  Buy() {
    this.User.competition_id = this.processproduct.GetCompetitionid();
    this.User.team_id = this.processproduct.GetTeamid();
    console.log(this.User)
    this.iap
      .buy(this.User.product_id)
      .then((data) => {
        if (data) {
          this.User.transaction_id = data.transactionId;
          this.ajax.PaymentpostApi(this.User).subscribe((res) => {
            this.cmnfun.HideLoading();
            console.log(res);
            this.resData = res;
            this.localData.StoreUserDeviceData(this.resData);
            this.storage.set("UserDeviceData", this.resData);
            this.localData.StoreUserFav(this.resData);
            this.processproduct.InsertPurchase(this.resData);
            this.events.publish('changebanner:changed', true);
            this.events.publish('menuchange2:changed', 'HomePage');
            this.ga.trackEvent("Payment", "Done", "Payment", 1);
            if (this.isLogin == true) {
              this.navCtrl.setRoot(HomePage);
            } else {
              this.localData.LoginState('', '');
              this.navCtrl.push('LoginPage', { iap: 'true1' });
            }
          }, error => {
            this.cmnfun.HideLoading();
            this.cmnfun.showToast('Some thing Unexpected happen please try again');
          })
        }
      })
      .catch((err) => {
        this.cmnfun.HideLoading();
        console.log(err);
        this.cmnfun.showToast(err.errorMessage);
      });
  }

}
