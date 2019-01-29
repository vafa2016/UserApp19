import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events,Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  newsData: any = [];
  comptitionlists: any = [];
  headerimage: any = '';
  headerurl: any;
  // path: any = 'http://vafalive.com.au';
  path: any = 'http://54.244.98.247';
  constructor(private inapp: InAppBrowser,public plt:Platform,public ga:GoogleAnalytics, public events: Events, public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, public navCtrl: NavController) {

   this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('News');
        // this.ga.trackEvent('Advertisement', 'Viewed', 'News Page', 1);
        this.ga.trackTiming('News', 1000, 'Duration', 'Time');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }
  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }
  ionViewDidEnter() {
    if (this.newsData.length != 0) {
      this.slides.startAutoplay();
    }
  }
  doRefresh(refresher) { refresher.complete(); }
  slideChanged() {
    this.slides.startAutoplay();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
    //  this.events.subscribe('competitionlist:changed', res => {
    //    console.log(res);
    //   if(res !== undefined && res !== ""){
    // this.comptitionlists=res.competition;
    // get-all-competition-news
    // competition_id:this.comptitionlists[0].competition_id
    // console.log(this.comptitionlists[0].competition_id);
    // alert('');
    this.cmnfun.showLoading('Please wait...');
    this.ajax.postMethod('get-all-news', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
    }).subscribe((res) => {
      this.cmnfun.HideLoading();

      this.newsData = res;
      if(this.newsData.code==1)
        {
          console.log(this.newsData);
          this.headerimage = this.newsData.headerAdv[0].ad_image;
          this.headerurl = this.newsData.headerAdv[0].ad_url;
        }

    }, error => {
      this.cmnfun.HideLoading();
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
    //   }
    //  })
  }
  openpage(item) {
    this.navCtrl.push('NewsDetailsPage', { newdetails: item });
  }
  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'News', 1);
    const browser = this.inapp.create(ad_url);
  }

}
