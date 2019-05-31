import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, Content,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the PostmatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-postmatch',
  templateUrl: 'postmatch.html',
})
export class PostmatchPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  comptitionlists: any = [];
  competition_id: any;
  selectables: any = [];
  postMatchData: any = [];
  headerAdv: any;
  footerAdv: any;
  headerimage: any = '';
  advDisplay: any = 'show';
  headerurl: any;
  // path: any = 'http://vafalive.com.au';
  // path: any = 'http://54.244.98.247';
  path: any = 'https://s3.us-west-2.amazonaws.com/vafas3';
  scrollTop: any;
  constructor(private zone: NgZone, private inapp: InAppBrowser, public events: Events,public plt:Platform,public ga:GoogleAnalytics, private youtube: YoutubeVideoPlayer, private modalCtrl: ModalController, public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Post Match');
        this.ga.trackTiming('Post Match', 1000, 'Duration', 'Time');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostmatchPage');
    this.cmnfun.showLoading('Please wait...');
    this.ajax.getcompetionlist('get-all-competitions-postmatchwise', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
    }, 'postmatch')
  }
  onScroll() {
    //   this.content.ionScrollEnd.subscribe((data)=>{
    this.scrollTop = this.content.scrollTop;
    let storeData = this.scrollTop;
    if (storeData >= 250) {
      console.log("80");
      this.zone.run(() => {
        this.advDisplay = 'hide';
      });
    }
    else {
      this.zone.run(() => {
        this.advDisplay = 'show';
      });

    }
  }

    // path reset function
    cutPath(url){
      if(url)
      return url.substring(12);
    }


  ionViewDidEnter() {
    if (this.postMatchData.length != 0) {
      this.slides.startAutoplay();
    }
  }
  slideChanged() {
    this.slides.startAutoplay();
  }

  ionViewWillLeave() {
    this.events.unsubscribe('competitionlistpostmatch:changed');
    this.slides.stopAutoplay();
  }
  ionViewWillEnter() {
    console.log("res");
    this.events.subscribe('competitionlistpostmatch:changed', res => {
      if (res !== undefined && res !== "") {
        this.comptitionlists = res.competition;
        this.selectables = this.comptitionlists[0].competitions_name
        this.competition_id = this.comptitionlists[0].competition_id
        this.ajax.postMethod('get-compition-post-match', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.competition_id
        }).subscribe((res) => {

          this.postMatchData = res;
          console.log(this.postMatchData);
          if (this.postMatchData.code == 2) {
            this.cmnfun.HideLoading();
            this.cmnfun.showLoading('Post Match Not Found!');
          } else {
            // 	angular.forEach( this.postMatchData.potmatch,function(v,k){
            // 	var cDate = v.pm_date;
            // 	$scope.pmdate = cDate.split(" ");
            // 	$scope.pmTime = $scope.pmdate[1].split(":");
            //  });

            this.headerAdv = this.postMatchData.headerAdv;
            this.footerAdv = this.postMatchData.footerAdv;
            this.headerimage = this.postMatchData.headerAdv[0].ad_image;
            this.headerurl = this.postMatchData.headerAdv[0].ad_url;
            //  $timeout(function(){
            // 	 $ionicSlideBoxDelegate.update();
            //  }, 100);
            this.cmnfun.HideLoading();
          }
        }, error => {
          this.cmnfun.showToast('Some thing Unexpected happen please try again');
          this.cmnfun.HideLoading();
        })
        // this.cmnfun.showLoading('Please wait...');
      }
    })
  }
  youtubepage(item) {
    var filename = item.video.substring(item.video.lastIndexOf('/') + 1);
    this.youtube.openVideo(filename);

  }
  gotomodel() {
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
    let me = this;
    modal.onDidDismiss(data => {
      if(data){
      this.postMatchData = [];
      this.cmnfun.showLoading('Please wait...');
      this.slides.update();
      this.selectables = data.competitions_name
      this.competition_id = data.competition_id
      this.ajax.postMethod('get-compition-post-match', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        competition_id: this.competition_id
      }).subscribe((res) => {
        this.postMatchData = res;
        console.log(this.postMatchData);
        this.scrollToTop();
        if (this.postMatchData.code == 2) {
          this.cmnfun.HideLoading();
          this.cmnfun.showLoading('Post Match Not Found!');
        } else {
          this.headerAdv = this.postMatchData.headerAdv;
          this.footerAdv = this.postMatchData.footerAdv;
          this.headerimage = this.postMatchData.headerAdv[0].ad_image;
          this.headerurl = this.postMatchData.headerAdv[0].ad_url;
          this.cmnfun.HideLoading();
        }
      }, error => {
        this.cmnfun.showToast('Some thing Unexpected happen please try again');
        this.cmnfun.HideLoading();
      })
    }
    });
    modal.present();
  }
  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Post Match', 1);
    const browser = this.inapp.create(ad_url);
  }

}
