import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Content,Keyboard,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { KeysPipe } from '../../pipes/keys/keys';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Searchbar } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { PopoverController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
/**
 * Generated class for the GoalkickersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goalkickers',
  templateUrl: 'goalkickers.html',
})
export class GoalkickersPage {
  @ViewChild('searchbar') searchbar: Searchbar;
  @ViewChild(Content) content: Content;
  scrollTop: any;
  advDisplay: any = 'show';
  toggled: boolean;
  searchTerm: String = '';
  items: any = [];
  // path: any = 'http://vafalive.com.au';
  path1: any = 'http://54.244.98.247';
  // path1: any = 'http://52.89.30.220';
  path: any = 'https://s3.us-west-2.amazonaws.com/vafas3';
  competition_id: any;
  comptitionlists: any = [];
  selectables: any = [];
  getAllTeams: any = [];
  allTeamData: any = [];
  goalKickers: any = [];
  selectablesTeam: any;
  team_id: any;
  YearList : any = [];
  headerAdv: any = [];
  footerAdv: any = [];
  WeblinkAd:any;

  weblink: boolean = false;
  safeURL: any;

  selectd_yr: any = '';
  constructor(private zone: NgZone,public plt:Platform,
    public ga:GoogleAnalytics, public keyboard: Keyboard,
     private inapp: InAppBrowser, public ajax: AjaxProvider,
     private sanitizer: DomSanitizer,
      private modalCtrl: ModalController, public events: Events,
       public cmnfun: CommomfunctionProvider, public navCtrl: NavController,
       public popoverCtrl: PopoverController,  public navParams: NavParams) {
     this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Goal Kickers');
        // this.ga.trackEvent('Advertisement', 'Viewed', 'Goal Kickers Page', 1);
        this.ga.trackTiming('Goal Kickers', 1000, 'Duration', 'Time');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }
  toggleSearch() {
    this.searchTerm='';
    this.toggled = this.toggled ? false : true;
    this.items = this.goalKickers;
    if (this.toggled == true) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 150);
    }
  }
  toggleSearchcancel()
  {
    this.toggled = this.toggled ? false : true;
    if (this.toggled == true) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 150);
    }
  }

    // path reset function
    cutPath(url){
      if(url)
      return url.substring(12);
    }

  identify(index, value) {
        return value.player_id;
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  initializeItems() {
    this.items = this.goalKickers;
  }
  submitSearch()
  {
    this.keyboard.close();
    this.toggled = this.toggled ? false : true;
    this.searchTerm='';
    // this.items = this.goalKickers;
  }
  triggerInput(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = [];
      this.goalKickers.forEach((item, keys) => {
        if (item.player_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          this.items.push(item);
        }
      })
    }
    else {
      this.items = this.goalKickers;
    }
  }
  getallteamsbycompetitions(res) {
    console.log(res);
    this.getAllTeams = res.teams;
    this.allTeamData = res.teams;
    this.selectablesTeam = this.allTeamData[0].team_name;
    this.team_id = this.allTeamData[0].team_id;


    this.ajax.datalist('get-team-players-goal-kickers-filter', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      team_id: this.team_id,
      compition_id: this.competition_id
    }).subscribe((res) => {
      this.getteamplayersgoalkickersfilter(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })

  };
  getallcompetitions(res) {
    console.log(res);
    this.comptitionlists = res.competition;
    this.selectables = this.comptitionlists[0].competitions_name;
    this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
    this.YearList = this.comptitionlists[0].seasons;
     // default year selection
     this.selectd_yr = this.comptitionlists[0].seasons[0].competition_year;

    this.ajax.datalist('get-all-teams-by-competitions', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      competition_id: this.competition_id,
    }).subscribe((res) => {
      this.getallteamsbycompetitions(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }
  getteamplayersgoalkickersfilter(res) {
    console.log(res);
    if(res.message == 'No Data Found'){
      this.cmnfun.HideLoading();
      this.headerAdv = [];
      this.footerAdv = [];
      this.goalKickers = [];
      this.items = this.goalKickers;
      this.cmnfun.showToast('No data');
    }else{
    this.headerAdv = res.headerAdv;
    this.footerAdv = res.footerAdv;
    this.goalKickers = res.playerGoal;
    this.items = this.goalKickers;
    this.cmnfun.HideLoading();
    }
  };
  ionViewDidLoad() {

    console.log('ionViewDidLoad GoalkickersPage');
    this.cmnfun.showLoading('Please wait...');
    this.ajax.datalist('get-all-competitions', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
    }).subscribe((res) => {
      this.getallcompetitions(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })

    // weblink add fetching api
  this.ajax.postMethod('get-weblink-advertisements',{ page_title : 'Goal Kickers(Weblink)'}).subscribe((res : any) =>{
    this.WeblinkAd = res.footerAdv.ad_image;
  })
  }
  onScroll() {
    //   this.content.ionScrollEnd.subscribe((data)=>{
    this.scrollTop = this.content.scrollTop;
    let storeData = this.scrollTop;
    if (storeData >= 180) {
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
  ionViewWillLeave() {
    // this.events.unsubscribe('datalist_get-team-players-goal-kickers-filter:changed');
    // this.events.unsubscribe('datalist_get-all-teams-by-competitions:changed');
    // this.events.unsubscribe('competitionlistgoalkickers:changed');
  }
  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Goal Kickers', 1);
    const browser = this.inapp.create(ad_url);
  }
  goToGoalKickerDetailsPage(player_id, team_id, pName, pNo, teamName, pImage, pGoals) {
    this.navCtrl.push('GoalkickerdetailsPage', { details: { player_id: player_id, team_id: team_id, pName: pName, pNo: pNo, teamName: teamName, pImage: pImage, pGoals: pGoals } });
  }
  selectedType(type) {
    if (type == 'competion') {
      let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
      let me = this;
      modal.onDidDismiss(data => {
         if(data){
           if(data.seasons[0].manual_score_recording == "2"){
            this.selectables = data.competitions_name;
            var htmlvalue = '<iframe src='+data.seasons[0].weblink_goal_kickers+' seamless   sandbox="allow-popups allow-same-origin allow-forms allow-scripts"></iframe>';
            this.safeURL =this.sanitizer.bypassSecurityTrustHtml(htmlvalue);
            // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.seasons[0].weblink_goal_kickers);
            this.weblink = true;
           }else {
            this.weblink = false;
        console.log(data);
        this.competition_id = data.seasons[0].competition_id;
        this.YearList = data.seasons;
         // default year selection
         this.selectd_yr = data.seasons[0].competition_year;

        this.selectables = data.competitions_name
        // this.competition_id = data.competition_id;
        this.cmnfun.showLoading('Please wait...');
        this.ajax.datalist('get-all-teams-by-competitions', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.competition_id,
        }).subscribe((res) => {
          this.scrollToTop();
          this.getallteamsbycompetitions(res);
        }, error => {
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
      }
      }
      });
      modal.present();
    } else if(type == 'year') {
      // year selection dropdown.
      let data = this.YearList;
      let popover = this.popoverCtrl.create("YeardropdownPage",{ yearData : data },{cssClass: 'year-popover'});
      popover.present();

      popover.onDidDismiss(data =>{
        if(data != null){
          this.selectd_yr = data.competition_year;
          this.competition_id = data.competition_id;
          // get team by year
          this.cmnfun.showLoading('Please wait...');
          this.ajax.datalist('get-all-teams-by-competitions', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            competition_id: this.competition_id,
          }).subscribe((res) => {
            this.scrollToTop();
            this.getallteamsbycompetitions(res);
          }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
          })
        }
      });

    } else {
      let modal = this.modalCtrl.create('TeamlistPage', { items: this.allTeamData });
      let me = this;
      modal.onDidDismiss(data => {
        if(data){
        console.log(data);
        this.selectablesTeam = data.team_name;
        this.team_id = data.team_id;
        this.cmnfun.showLoading('Please wait...');
        this.ajax.datalist('get-team-players-goal-kickers-filter', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          team_id: this.team_id,
          compition_id: this.competition_id
        }).subscribe((res) => {
          this.scrollToTop()
          this.getteamplayersgoalkickersfilter(res);
        }, error => {
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
      }
      });
      modal.present();
    }
  }
}
