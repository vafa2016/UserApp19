import { Component,Input, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events,Platform } from 'ionic-angular';
import { KeysPipe } from '../../pipes/keys/keys';
import { SafePipe } from '../../pipes/safe/safe';
import { ReversePipe } from '../../pipes/reverse/reverse';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Content } from 'ionic-angular';
import * as moment from 'moment';
import { PopoverController } from 'ionic-angular';
import {YeardropdownPage} from '../yeardropdown/yeardropdown';
import { ProductListProvider } from '../../providers/product-list/product-list';
import { LocalDataProvider } from './../../providers/local-data/local-data';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Generated class for the MatchcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matchcenter',
  templateUrl: 'matchcenter.html',
  // pipes: [ReversePipe]
  //  pipes: [SafePipe]
})
export class MatchcenterPage {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild(Content) content: Content;

  statusCounter:any = 0;
  UpcomeCount:any = 0;
  Interval1:any;
  Interval2:any;

  safeURL:any;

  AdShown: boolean = true;

  objectKeys = Object.keys
  totalround: any = [];
  totalRoundsData: any;
  roundScores: any = [];
  roundNo: any = '';
  // path: any = 'http://vafalive.com.au';
  // path: any = 'http://54.244.98.247';
  path: any = 'https://s3.us-west-2.amazonaws.com/vafas3';
  competition_id: any;
  comptitionlists: any = [];
  selectables: any = [];
  roundName: any;
  matchStatus: any;
  SeverMatchDate: any;
  serverDatee: any;
  serverMonth: any;
  serverYear: any;
  mobWidth:any;
  ddMMMMyyyy: any;
  sysDatee: any;
  sysMonth: any;
  sysYear: any;
  secondround:any={};

  YearList: any = [];

  weblink:boolean = false;

  Entered:boolean = false;
  WeblinkAd:any;
  selectd_yr: any = '';
  constructor(private inapp: InAppBrowser,
    public plt:Platform,
    public ga:GoogleAnalytics,
    public localData: LocalDataProvider,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public ajax: AjaxProvider,
    public prolist : ProductListProvider,
    private modalCtrl: ModalController,
    public events: Events,
    private sanitizer: DomSanitizer,
    public cmnfun: CommomfunctionProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
     this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Match Centre');
        this.ga.trackTiming('Match Centre', 1000, 'Duration', 'Time');
        // this.ga.trackEvent('Advertisement', 'Viewed', 'Match Page', 1);
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })

			this.mobWidth = (window.screen.width) + "px";
  }

  // year_dropdown
  presentPopover(myEvent) {
    let data = this.YearList;
    let popover = this.popoverCtrl.create("YeardropdownPage",{ yearData : data },{cssClass: 'yearlist'});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data =>{
      console.log(data);
      if(data != null){
        this.selectd_yr = data.competition_year;
        this.competition_id = data.competition_id;
        // get matches by year
          this.roundNo = '';
          this.GetMatchesByYear(data.competition_year, data.competition_id)
      }
    })
  }

  RefreshScore2(){
    if(this.navCtrl.last().name != 'PlayerstatindividualPage'){
    this.selectRound(this.roundNo, this.competition_id);
    }
  }

  RefreshScore() {
    if(this.navCtrl.last().name == 'InnermatchcenterPage'){
      this.selectRound(this.roundNo, this.competition_id);
    }
  }


  // path reset function
  cutPath(url){
    if(url)
    return url.substring(12);
  }


  load(status){
    // console.log(this.statusCounter);
    // if(status == 'COMPLETE' || status == 'UPCOMING'){
    //   this.statusCounter++;
    //   this.UpcomeCount++;
    //   if(this.statusCounter > 3 && this.UpcomeCount > 3){
    //       clearInterval(this.Interval1);
    //       clearInterval(this.Interval2);
    //   }
    // }else if(status == 'LIVE'){
    //   this.statusCounter++;
    // }
    // if(this.statusCounter == 4){
    //   console.log('hide');
    //   this.cmnfun.HideLoading();
    // }
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  // scrollToBottom(): void {
  //   setTimeout(() => {
  //     this.myScrollContainer.nativeElement.scrollLeft = this.myScrollContainer.nativeElement.scrollWidth;
  //   }, 100);
  // }
  ionViewDidLoad() {
    this.Entered = true;

  //  else{
      // this.cmnfun.HideLoading();
    // }
    // var date = new Date();
    this.ddMMMMyyyy = moment(new Date()).format("DD MM YYYY");
    console.log(this.ddMMMMyyyy);
    var ddMMMMyyyy = this.ddMMMMyyyy.split('');
    this.sysDatee = ddMMMMyyyy[0];
    this.sysMonth = ddMMMMyyyy[1];
    this.sysYear = ddMMMMyyyy[2];

      this.cmnfun.showLoading('Please wait...');
      this.ajax.getcompetionlist('get-all-competitions', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      }, 'matchcenter')


    this.events.subscribe('competitionlistmatchcenter:changed', res => {

      this.comptitionlists = res.competition;
      this.prolist.SetMatchcenterCompId(this.comptitionlists[0].competition_id);
      console.log(this.comptitionlists[0].competition_id);
      console.log(this.comptitionlists[0].seasons[0].competition_id);
      this.selectables = this.comptitionlists[0].competitions_name;
      this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
      let compId = this.comptitionlists[0].seasons[0].competition_id;
      // year listing
      this.YearList =this.comptitionlists[0].seasons;
      this.selectd_yr = this.YearList[0].competition_year;
     //  get matches
     this.GetMatchesByYear(this.selectd_yr,compId);
     //
      if (this.roundNo == '') {
        // console.log(this.competition_id +'called');
        // this.ajax.datalist('get-competition-wise-match-score', {
        //   accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        //   competition_id: this.competition_id
        // }).subscribe((res) => {
        //   this.getroundwise(res);
        //   if(this.Interval2){clearInterval(this.Interval2)}
        //   this.Interval1=setInterval(()=>{
        //     console.log('interval1')
        //     this.getroundwise(res);
        //   },5000)
        // }, error => {
        //   // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        // })

      }
      else {
        console.log(" this.roundNo")
        this.selectRound(this.roundNo, this.competition_id);
      }

    })

    // weblink add fetching api
  this.ajax.postMethod('get-weblink-advertisements',{ page_title : 'Match Centre(Weblink)'}).subscribe((res : any) =>{
    this.WeblinkAd = res.footerAdv.ad_image;
  })
  }
  getroundwise(res) {
    console.log(res);
    if(res.message=='No Data Found')
      { if(this.Interval1){clearInterval(this.Interval1);}
      if(this.Interval2){clearInterval(this.Interval2);}
        this.cmnfun.HideLoading();
        this.totalRoundsData=[];
        this.roundNo = '';
        this.totalround = [];
        this.roundScores = [];
         this.cmnfun.showToast('No data');
        //  this.ajax.datalist('get-all-round-and-score', {
        //   accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        //   competition_id: '-'
        // }).subscribe((res) => {
        //   this.secondround=res;
        //   if (this.roundNo == '') {
        //       this.roundNo = this.secondround.current_round;
        //       this.totalround = this.secondround.totalRounds;
        //       // this.scrollToBottom();
        //       setTimeout(() => {
        //         this.scrolround(this.roundNo);
        //       }, 100);
        //     }
        //     console.log(this.totalround);
        //     this.totalRoundsData = this.secondround.footerAdv;
        //     // console.log("add" + this.totalRoundsData[0].ad_image);
        //     this.roundScores = this.secondround.roundScores;
        //     console.log(this.roundScores);
        //     console.log(this.roundNo);
        // }, error => {
        //   // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        // })
      }
      else{


          if (this.roundNo == '') {
            this.roundNo = res.current_round;
            this.totalround = res.totalRounds;
            // this.scrollToBottom();
            setTimeout(() => {
              this.scrolround(this.roundNo);
            }, 100);
          }
          console.log(this.totalround);
          this.totalRoundsData = res.footerAdv;
          // console.log("add" + this.totalRoundsData[0].ad_image);
          this.roundScores = res.roundScores;
          // console.log(this.roundScores[this.roundNo]);
          console.log(this.roundNo);
          // if(this.roundScores.length > 0){
            this.cmnfun.HideLoading();
          // }

      }
  };


  ionViewWillLeave() {
    console.log('leave match center');
    clearInterval(this.Interval1);
    clearInterval(this.Interval2);
    this.events.unsubscribe('competitionlistmatchcenter:changed');
    this.events.unsubscribe('datalist:changed');
  }
  ionViewDidLeave(){
    clearInterval(this.Interval2);
  }
  scrolround(num){
    console.log(num);
        var el = document.getElementById('id'+num);
        el.scrollIntoView({ behavior: "smooth" });
      }
  changeWinning = function (str) {
    return str.replace("Winning", "Up");
  }

  selectRound = function (roundNo, competitionNo) {
    const loaderCount = 0;
    this.statusCounter = 0;
    this.UpcomeCount = 0;
    console.log(roundNo);
    console.log(competitionNo);
    this.cmnfun.showLoader('Please wait...');
    this.roundNo = roundNo;
    this.competition_id = competitionNo;

    if(this.Interval1){ clearInterval(this.Interval1);}
    if(this.Interval2){ clearInterval(this.Interval2);}

  this.Interval2=setInterval(()=>{
    console.log('interval2')
    this.ajax.datalist('get-round-wise-match-score-by-year', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      round: this.roundNo,
      year :  this.selectd_yr,
      competition_id:  this.competition_id
    }).subscribe((res) => {
      if(loaderCount===0){
        this.cmnfun.hideLoader();
        loaderCount++;
      }
      if(res.message != 'round value is empty' || res.message != 'No Data Found'){
        this.getroundwise(res);
      }
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  },3000)

  }

  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Match Centre', 1);
    const browser = this.inapp.create(ad_url);
  }
  gotomodel() {
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
    let me = this;
    modal.onDidDismiss(data => {
      if(data){
      if(data.seasons[0].manual_score_recording == "2"){
        this.selectables = data.competitions_name;
        var htmlvalue = '<iframe src='+data.seasons[0].weblink_match_centre+' sandbox="allow-pointer-lock allow-popups allow-same-origin allow-forms allow-scripts"></iframe>';
        this.safeURL =this.sanitizer.bypassSecurityTrustHtml(htmlvalue);
        if(this.Interval1){clearInterval(this.Interval1)}
        if(this.Interval2){clearInterval(this.Interval2)}
        this.weblink = true;
      } else {
      this.weblink = false;
      this.cmnfun.showLoading('Please wait...');
      console.log(data);
      this.selectables = data.competitions_name
      this.prolist.SetMatchcenterCompId(data.competition_id);
      this.competition_id =data.seasons[0].competition_id;
      this.YearList =data.seasons;
      this.selectd_yr = this.YearList[0].competition_year;
      //
      this.roundNo = '';
      if(this.Interval1){clearInterval(this.Interval1)}
      if(this.Interval2){clearInterval(this.Interval2)}
      this.ajax.datalist('get-competition-wise-match-score-by-year', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        competition_id: data.seasons[0].competition_id,
        year : this.selectd_yr
      }).subscribe((res:any) => {
        setTimeout(() => {
          this.scrolround(res.current_round);
        }, 100);
        this.getroundwise(res);
        if(this.Interval1){clearInterval(this.Interval1)}
        if(this.Interval2){clearInterval(this.Interval2)}
        if(res.message!='No Data Found'){
          this.Interval1=setInterval(()=>{
            console.log('interval1')
            this.getroundwise(res);
          },3000)
         }

      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
    }
    }
    });
    modal.present();
  }
  selectedTeamScore(fictureId, round, matchStatus, status, manual_score_recording, roundName,awateamid,hometeamid,competionid) {
    this.roundName = roundName;
    this.matchStatus = status;
    var date = matchStatus.split(',');
    this.SeverMatchDate = date[1];
    var getServerDate = date[1].split(' ');
    this.serverDatee = getServerDate[1];
    this.serverMonth = getServerDate[2];
    this.serverYear = getServerDate[3];

    if (status == 'UPCOMING') {
      if ((this.serverDatee == this.sysDatee || this.serverMonth == this.sysMonth || this.serverYear == this.sysYear) && (manual_score_recording == 0 || manual_score_recording == 1)) {
        clearInterval(this.Interval1);
        clearInterval(this.Interval2);
        this.navCtrl.push('InnermatchcenterPage', { details: { fixture_id: fictureId, roundNo: this.roundNo, match_status: this.matchStatus, manual_score_recording: manual_score_recording, roundName: this.roundName,awateam_id:awateamid,hometeam_id:hometeamid,competion_id:competionid },year : this.selectd_yr, "parentPage": this  })
        // $state.go('app.score',);
      } else if ((this.serverDatee != this.sysDatee || this.serverMonth != this.sysMonth || this.serverYear != this.sysYear) && (manual_score_recording == 1)) {
        clearInterval(this.Interval1);
        clearInterval(this.Interval2);
        this.navCtrl.push('InnermatchcenterPage', { details: { fixture_id: fictureId, roundNo: this.roundNo, match_status: this.matchStatus, manual_score_recording: manual_score_recording, roundName: this.roundName ,awateam_id:awateamid,hometeam_id:hometeamid,competion_id:competionid}, year : this.selectd_yr ,"parentPage": this })
        //  $state.go('app.score',{);
      } else if ((this.serverDatee != this.sysDatee || this.serverMonth != this.sysMonth || this.serverYear != this.sysYear) && (manual_score_recording == 0)) {
        //  $ionicPopup.alert({
        //   title: '',
        //   template: '<p style="text-align:center;">Check back again when this game is Live or Completed</p>'
        // });
        let alert = this.alertCtrl.create({
          subTitle: 'Check back again when this game is Live or Completed',
          buttons: ['Ok'],
          cssClass: 'jb-alert'
        });
        alert.present();
      }

    } else {
      clearInterval(this.Interval1);
      clearInterval(this.Interval2);
      this.navCtrl.push('InnermatchcenterPage', { details: { fixture_id: fictureId, roundNo: this.roundNo, match_status: this.matchStatus, manual_score_recording: manual_score_recording, roundName: this.roundName ,awateam_id:awateamid,hometeam_id:hometeamid,competion_id:competionid}, year : this.selectd_yr,"parentPage": this  })
      //  $state.go('app.score',);
    }

  }

  ShowRound (round){
    if(round.round == 24){
       return round.name;
    }else if(round.round == 25){
      return round.name;
    }else if(round.round == 38){
      return round.name;
    }else if(round.round == 41){
      return round.name;
    }else{
      return round.round;
    }
  }

  //
  getLength(){
    return true;
  }


  // get matches by year function
  GetMatchesByYear(year, competitionid) {
    this.statusCounter = 0;
    this.UpcomeCount = 0;
    if(this.Interval1){clearInterval(this.Interval1);}
    if(this.Interval2){clearInterval(this.Interval2);}
    this.roundNo = '';
    this.ajax.datalist('get-competition-wise-match-score-by-year', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      competition_id: competitionid,
      year : year
    }).subscribe((res) => {
       this.roundNo = '';
      this.getroundwise(res);
      if(this.Interval2){clearInterval(this.Interval2)}
      if(res.message != 'No Data Found'){
        this.Interval1=setInterval(()=>{
          console.log('interval1')
          this.getroundwise(res);
        },3000)
      }
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }
}
