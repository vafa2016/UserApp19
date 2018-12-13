import { Component,ViewChild,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Content } from 'ionic-angular';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-playerstatdetails',
  templateUrl: 'playerstatdetails.html',
})
export class PlayerstatdetailsPage {
  @ViewChild(Content) content: Content;
 
  path: any = 'http://vafalive.com.au';
  player_id:any='';
  resData:any='';
  showhide: any;
  lastName1:any='';
  playerStatDetailsData:any=[];
  playerDetail:any=[];
  firstName:any='';
  lastName:any='';
  playerstats:any=[];
  playerstatsData=[];
  advertisementHeader:any=[];
  advertisementFooter:any=[];
  hideHeader:boolean=false;

  constructor(public navCtrl: NavController,
    public ajax: AjaxProvider,
    public events: Events,
    public zone:NgZone,
    private inapp: InAppBrowser,
    public plt:Platform,
    public ga:GoogleAnalytics,
    public cmfn: CommomfunctionProvider,
     public navParams: NavParams) {
    this.player_id= navParams.get('player_id');

    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
    //  this.ga.trackEvent('Advertisement', 'Viewed', 'PlayerStatDetails Page', 1);
     this.ga.trackTiming('Player Stats Individual - Season', 1000, 'Duration', 'Time');
        this.ga.trackView('Player Stats Individual - Season');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidLoad() {
    this.showhide=0;
  console.log('ionViewDidLoad PlayerstatdetailsPage');
//getStatDetailsByPlayerId          
     this.cmfn.showLoading('Please Wait..');
     this.ajax.datalist('get-player-stats-detail', {
       accessKey: "QzEnDyPAHT12asHb4On6HH2016",
       player_id: this.player_id
     }).subscribe((res) => {
       this.cmfn.HideLoading();
       console.log(res);
       this.resData = res;
       if (this.resData.code == 2 || this.resData.code == 3) {
         return false;
       } else {
         this.GetStatDetailsByPlayerId(this.resData);
       }
 
     }, error => {
       this.cmfn.HideLoading();
     })
  }

  onScroll()
  {	
    var moveData =this.content.scrollTop;
    if(moveData >= 80)
    { 
      this.zone.run(() => {
        this.hideHeader=true;
      });  			
    }				
    else
      {
        this.zone.run(() => {
          this.hideHeader=false;
        });
      }
    }


  GetStatDetailsByPlayerId(data){
    console.log(data.player.player);		
		this.playerDetail=data.player.player;
		console.log(this.playerDetail.player_name);
    var playerFullName = this.playerDetail.player_name.split(' ');
		this.firstName = playerFullName[0];
    this.lastName = playerFullName[1];
    console.log(this.firstName);
    console.log(this.lastName);
    this.playerstats=data.player.playerstat; 
    this.playerstatsData=data.player.playerstat;
    console.log(this.playerstatsData);		
    // .forEach(item => {
    //   this.playerStatDetailsData.push(item);
    // });
   this.playerstatsData.forEach((item,key) => {
      this.playerStatDetailsData.push(item);
      // console.log(key);
    });
		//Advertisement::
		this.advertisementHeader=data.headerAdv;
    console.log(this.advertisementHeader[0].ad_image);
    this.advertisementFooter=data.footerAdv;

  }

  ionViewWillLeave() {
    this.showhide = 1;
  }

  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Player Stats Individual - Season', 1);
    const browser = this.inapp.create(ad_url);
  }

}
