import { Component,ViewChild,NgZone } from '@angular/core';
import { IonicPage, NavController,Slides, ModalController,NavParams,Content,Platform} from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the MatchreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matchreport',
  templateUrl: 'matchreport.html',
})
export class MatchreportPage {
   @ViewChild(Slides) slides: Slides;
    @ViewChild(Content) content: Content;
   scrollTop:any;
    advDisplay:any='show';
 comptitionlists:any=[];
 competition_id:any;
 selectables:any=[];
 MatchreportData:any=[];report:any=[];
 headerAdv:any;
 footerAdv:any;
 headerimage:any='';
 headerurl:any;
//  path:any='http://vafalive.com.au';
//  path: any = 'http://54.244.98.247';
 path: any = 'https://s3.us-west-2.amazonaws.com/vafas3';
  constructor(private zone: NgZone,private inapp: InAppBrowser,public plt:Platform,public ga:GoogleAnalytics,public ajax:AjaxProvider, public cmnfun: CommomfunctionProvider,private modalCtrl:ModalController,public events: Events,public navCtrl: NavController, public navParams: NavParams) {
     this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Match Report');
        // this.ga.trackEvent('Advertisement', 'Viewed', 'Match Report Page', 1);
        this.ga.trackTiming('Match Report', 1000, 'Duration', 'Time');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
   ionViewDidEnter() {
    if(this.MatchreportData.length!=0)
      {
    this.slides.startAutoplay();
      }
  }
     onScroll(){
    //   this.content.ionScrollEnd.subscribe((data)=>{
      this.scrollTop = this.content.scrollTop;
      let storeData = this.scrollTop;
		if(storeData >= 250)
        {   console.log("80");
           this.zone.run(() => {
            this.advDisplay='hide';
            });
				}
				else
					{
            this.zone.run(() => {
             this.advDisplay='show';
            });

          }
      }
 ionViewWillLeave()
   {
      this.events.unsubscribe('competitionlistmatchreport:changed');
      this.slides.stopAutoplay();
     }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostmatchPage');
    this.cmnfun.showLoading('Please wait...');
    this.ajax.getcompetionlist('get-all-competitions-matchreportwise',{
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
                  },'matchreport')
  }
    slideChanged()
    {
       this.slides.startAutoplay();
    }



    // path reset function
    cutPath(url){
      if(url)
      return url.substring(12);
    }


  ionViewWillEnter()
  {
    console.log("res");
      this.events.subscribe('competitionlistmatchreport:changed', res => {
          if(res !== undefined && res !== ""){
          this.comptitionlists=res.competition;
          if(this.comptitionlists.length!=0)
            {
          this.selectables=this.comptitionlists[0].competitions_name
          this.competition_id=this.comptitionlists[0].competition_id
            }
          this.ajax.postMethod('get-compition-fixture-match-report',{
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  competition_id:this.competition_id
                }).subscribe((res) => {
            this.cmnfun.HideLoading();
            this.MatchreportData =res;
            console.log(this.MatchreportData);
            if(this.MatchreportData.code==2){
              this.cmnfun.showLoading('Match Report Not Found!');
						}else{

						// 	angular.forEach( this.postMatchData.potmatch,function(v,k){
						// 	var cDate = v.pm_date;
						// 	$scope.pmdate = cDate.split(" ");
						// 	$scope.pmTime = $scope.pmdate[1].split(":");
						//  });
						      if(this.MatchreportData.match_report){
									this.headerAdv=this.MatchreportData.headerAdv;
                  this.footerAdv=this.MatchreportData.footerAdv;
                  this.headerimage=this.MatchreportData.headerAdv[0].ad_image;
                  this.headerurl=this.MatchreportData.headerAdv[0].ad_url;
                  }
									//  $timeout(function(){
									// 	 $ionicSlideBoxDelegate.update();
									//  }, 100);
						}
            }, error => {
              this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
            // this.cmnfun.showLoading('Please wait...');
          }
     })
  }
    goToMatchReportDetail(reportId){
			this.navCtrl.push('MatchreportdetailsPage',{repordid:reportId});
      }
    gotomodel()
    {
       let modal = this.modalCtrl.create('CommommodelPage', {items:this.comptitionlists});
            let me = this;
            modal.onDidDismiss(data => {
              if(data){
               this.MatchreportData = [];
      this.cmnfun.showLoading('Please wait...');
      this.slides.update();
              this.selectables=data.competitions_name
              this.competition_id=data.competition_id
              this.ajax.postMethod('get-compition-fixture-match-report',{
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  competition_id:this.competition_id
                }).subscribe((res) => {

                    this.cmnfun.HideLoading();
                    this.MatchreportData =res;
                    console.log(this.MatchreportData);
                    this.scrollToTop();
                    if(this.MatchreportData.code==2){
                      this.cmnfun.showLoading('Match Report Not Found!');
                    }else{
                          this.headerAdv=this.MatchreportData.headerAdv;
                          this.footerAdv=this.MatchreportData.footerAdv;
                          this.headerimage=this.MatchreportData.headerAdv[0].ad_image;
                          this.headerurl=this.MatchreportData.headerAdv[0].ad_url;
                    }
                }, error => {
                  this.cmnfun.showToast('Some thing Unexpected happen please try again');
                })
              }
            });
      modal.present();
    }
     goToAddSite(ad_url){
      this.ga.trackEvent('Advertisement', 'Viewed', 'Match Report', 1);
		  const browser = this.inapp.create(ad_url);
	  }


}
