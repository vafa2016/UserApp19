import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Content,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { KeysPipe } from '../../pipes/keys/keys';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ReversePipe } from '../../pipes/reverse/reverse';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { PopoverController } from 'ionic-angular';
import {YeardropdownPage} from '../yeardropdown/yeardropdown';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
/**
 * Generated class for the FixturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fixture',
  templateUrl: 'fixture.html',
  //  pipes: [ReversePipe]
})
export class FixturePage {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild(Content) content: Content;
  totalround: any = [];
  totalClub: any = [];
  clubScores: any = [];
  Current_rd:any;
  totalRoundsData: any;
  roundScores: any;
  roundNo: any = '0_0';
  team_id: any = '0_0';
  // path: any = 'http://vafalive.com.au';
  // path: any = 'http://54.244.98.247';
  path: any = 'https://s3.us-west-2.amazonaws.com/vafas3';
  competition_id: any;
  comptitionlists: any = [];
  selectables: any = []
  teamRoundDetail: any = [];
  headerAdv: any = [];
  footerAdv: any;
  roundScoresNew: any = [];
  roundkey: any = [];
  clubScoresNew: any = [];
  oldDate: any;
  newDate: any;
  newArray: any;
  result: any = [];
  itemno: any;
  type: any = 'Round';
  advDisplay: any = 'show';
  scrollTop: any;
  fisttime: number = 0;
  test: number = 0;

  YearList: any = [];
  selectd_yr: any = '';
  safeURL : any;
  weblink:boolean = false;
  WeblinkAd: any;

  constructor(private zone: NgZone,
    public plt:Platform,
    public ga:GoogleAnalytics,
    public popoverCtrl: PopoverController,
    private inapp: InAppBrowser,
    public ajax: AjaxProvider,
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController,
    public events: Events,
    public cmnfun: CommomfunctionProvider,
    public navCtrl: NavController, public navParams: NavParams) {
     this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
      .then(() => {
     console.log('Google analytics is ready now');
     this.ga.trackView('Fixture - Round');
        this.ga.trackEvent('Advertisement', 'Viewed', 'Fixture - Round', 1);
        this.ga.trackTiming('Fixture', 3000, 'Duration', 'Time');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })

  }

    // year_dropdown
    presentPopover(myEvent) {
      let data = this.YearList;
      let popover = this.popoverCtrl.create("YeardropdownPage",{ yearData : data });
      popover.present({
        ev: myEvent
      });

      popover.onDidDismiss(data =>{
        if(data != null){
          console.log(data);
          this.selectd_yr = data.competition_year;
          this.competition_id = data.competition_id;
          this.cmnfun.showLoading('Please wait...');
          if (this.type == 'Round') {
            this.roundNo = '0_0';
            this.ajax.datalist('get-round-competition-fixture', {
              accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
              competition_id: this.competition_id,
              round: this.roundNo
            }).subscribe((res) => {
              this.getroundcompetitionfixture(res);
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })

          }
          else {
            this.team_id = '0_0'
            this.ajax.datalist('get-competition-clubs', {
              accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
              compition_id: this.competition_id,
              team_id: this.team_id
            }).subscribe((res) => {
              this.getcompetitionclubs(res);
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          }

        }
      })
    }


  // path reset function
  cutPath(url){
    if(url)
    return url.substring(12);
  }


  onScroll() {
    //   this.content.ionScrollEnd.subscribe((data)=>{
    this.scrollTop = this.content.scrollTop;
    let storeData = this.scrollTop;
    if (storeData >= 210) {
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
  // gotochecked(i)
  // {
  //   if(i==1 && this.count==0)
  //     {
  //       this.count=1;
  //       this.
  //     }
  // }
  // scrollToBottom(): void {
  //   setTimeout(() => {
  //     this.myScrollContainer.nativeElement.scrollLeft = this.myScrollContainer.nativeElement.scrollWidth;
  //   }, 100);
  // }

  scrolround(num){
    console.log(num);
        var el = document.getElementById('id'+num);
        el.scrollIntoView({ behavior: "smooth" });
      }

  ionViewDidLoad() {

    console.log('ionViewDidLoad FixturePage');
    this.cmnfun.showLoading('Please wait...');
    this.ajax.postMethod('get-rounds', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
    }).subscribe((res) => {
      this.result = res
      // this.totalround = this.result.totalRounds;
      this.teamRoundDetail = this.result.fixture;
      this.ajax.getcompetionlist('get-all-competitions', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
      }, 'fixtures')
      //   setTimeout(() => {
      //     this.content.scrollToTop();
      // },1000);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })


    this.events.subscribe('competitionlistfixtures:changed', res => {

      this.comptitionlists = res.competition;
      this.YearList = this.comptitionlists[0].seasons;
      this.selectd_yr = this.YearList[0].competition_year;
      this.selectables = this.comptitionlists[0].competitions_name;
      this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
      this.ajax.datalist('get-round-competition-fixture', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        competition_id: this.competition_id,
        round: this.roundNo
      }).subscribe((res) => {
        this.getroundcompetitionfixture(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })

    })

// weblink add fetching api
  this.ajax.postMethod('get-weblink-advertisements',{ page_title : 'Fixture(Weblink)'}).subscribe((res : any) =>{
    this.WeblinkAd = res.footerAdv.ad_image;
    console.log(this.WeblinkAd);
  })
  }
  getroundcompetitionfixture(res) {
    console.log(res);
    this.teamRoundDetail = res.fixture;
    this.totalround = res.totalRounds;
    console.log(this.totalround);
    console.log(res.fixture);
    //ADVERTISEMENT:
    this.headerAdv = res.headerAdv;
    this.footerAdv = res.footerAdv;
    //current_round start
    this.roundNo = res.current_round;
    this.Current_rd=res.current_round;
    setTimeout(() => {
      this.scrolround(this.Current_rd);
    }, 200);
    console.log(res.current_round);
    this.roundScores = res.roundScores;
    this.ajax.datalist('get-round-wise-fixture', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      competition_id: this.competition_id,
      round: this.roundNo
    }).subscribe((res) => {
      this.getroundwisefixture(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }
  getroundwisefixture(res) {
    console.log(res);
    if (res.message != 'No Data Found') {
      this.teamRoundDetail = res.fixture;
      this.headerAdv = res.headerAdv;
      this.footerAdv = res.footerAdv;
      this.roundScores = res.roundScores;
      // this.roundkey=[];
      // this.roundScores.forEach((element,key) => {
      //   this.roundkey.push(key);
      //   // this.roundScoresNew.push(key);
      // });
      console.log(this.roundScores);
    }
    this.cmnfun.HideLoading();
    this.ajax.datalist('get-competition-clubs', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      compition_id: this.competition_id,
      team_id: this.team_id
    }).subscribe((res) => {
      this.getcompetitionclubs(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  };

  getcompetitionclubs(res) {
    this.totalClub = res.club;
    this.totalClub.sort(function (a, b) {
      var textA = a.team_name.toUpperCase();
      var textB = b.team_name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    if (this.team_id == '0_0') {
      this.team_id = this.totalClub[0].team_id;
    }
    console.log(this.totalClub);
    this.clubScores = res.roundScores;
    console.log(this.clubScores);
    this.oldDate = '';
    this.clubScoresNew = [];
    if (this.totalClub == '' || this.totalClub == null) {
      this.team_id = '0_0';
      this.ajax.datalist('get-competition-clubs', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        compition_id: this.competition_id,
        team_id: this.team_id
      }).subscribe((res) => {
        this.getcompetitionclubs(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
    } else {
      for (var key in this.clubScores) {
        this.newArray = this.clubScores[key];
        this.oldDate = key;
        this.newArray.forEach(eachObj => {
          this.newDate = eachObj.planned_date;
          if (this.oldDate == this.newDate) {
            this.clubScoresNew.push(eachObj);
          }
        });

      }
    }

    this.cmnfun.HideLoading();
    if (this.fisttime == 0) {
      // this.scrollToBottom();
      this.fisttime++;
    }
    //alert(JSON.stringify($scope.roundScoresNew))
  };
  ionViewWillLeave() {
    this.events.unsubscribe('competitionlistfixtures:changed');
    // this.events.unsubscribe('datalist_get-round-competition-fixture:changed');
    // this.events.unsubscribe('datalist_get-round-wise-fixture:changed:changed');
    // this.events.unsubscribe('datalist_get-competition-clubs:changed');
    // this.events.unsubscribe('datalist_get-club-wise-fixture:changed');
  }

  // round display
  ShowRound (round){
    if(round.round == 25){
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


  selectedCompetitionName = function (competition_id) {
    //alert(competition_id);
    this.competition_id = competition_id;
    if (this.fixtureType == 'Round') {
      this.ajax.datalist('get-round-competition-fixture', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        competition_id: this.competition_id,
        round: this.roundNo
      }).subscribe((res) => {
        this.getroundcompetitionfixture(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
    } else {
      // UserManagement. fixtureClubData();

      this.ajax.datalist('get-competition-clubs', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        compition_id: this.competition_id,
        team_id: this.team_id
      }).subscribe((res) => {
        this.getcompetitionclubs(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })

    }


  }
  getclubwisefixture(res) {

    this.clubScores = res.roundScores;
    console.log(this.clubScores);
    this.oldDate = '';
    this.clubScoresNew = [];
    for (var key in this.clubScores) {
      this.newArray = this.clubScores[key];
      this.oldDate = key;
      this.newArray.forEach(eachObj => {
        this.newDate = eachObj.planned_date;
        if (this.oldDate == this.newDate) {
          this.clubScoresNew.push(eachObj);
        }
      });

    }
    this.cmnfun.HideLoading();
    //alert(JSON.stringify($scope.roundScoresNew))
  };
  selecteClub = function (teamIdd, competition_id) {
    this.cmnfun.showLoading('Please wait...');
    this.team_id = teamIdd;

    this.ajax.datalist('get-club-wise-fixture', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      team_id: this.team_id,
      competition_id: competition_id
    }).subscribe((res) => {
      this.getclubwisefixture(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })

  }
  selectRound(round, competitionid) {
    this.roundNo = round;
    this.cmnfun.showLoading('Please wait...');
    this.ajax.datalist('get-round-wise-fixture', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      competition_id: competitionid,
      round: round
    }).subscribe((res) => {
      this.getroundwisefixture(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }

  selectedFixtureType(type) {
    if (type == 'Round') {
      this.roundNo = '0_0';
      this.ajax.datalist('get-round-competition-fixture', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        competition_id: this.competition_id,
        round: this.roundNo
      }).subscribe((res) => {
        this.getroundcompetitionfixture(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
      // this.cmnfun.showLoading('Please wait...');
      this.type = 'Round';
      // setTimeout(() => {
      //   this.scrolround(this.Current_rd);
      // }, 100);

        this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Fixture - Round');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
      // this.fisttime=0;
      //   this.ajax.datalist('get-round-competition-fixture',{
      //         accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      //         competition_id:this.competition_id,
      //         round:this.roundNo
      //        }).subscribe((res) => {
      //         this.getroundcompetitionfixture(res);
      //     }, error => {
      //       // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      //     })
    }
    else {
      this.type = 'Club';
      this.team_id = '0_0'
      this.ajax.datalist('get-competition-clubs', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        compition_id: this.competition_id,
        team_id: this.team_id
      }).subscribe((res) => {
        this.getcompetitionclubs(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })

        this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Fixture - Club');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
    }
  }
  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Fixture - Club', 1);
    const browser = this.inapp.create(ad_url);
  }
  openMap(ad_url) {
    const browser = this.inapp.create('http://maps.google.com/maps?q=' + ad_url);
  }
  gotomodel() {
    this.fisttime = 0;
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
    let me = this;
    modal.onDidDismiss(data => {
      if(data){
      console.log(data);
      if(data.seasons[0].manual_score_recording == "2"){
        this.selectables = data.competitions_name;
        var htmlvalue = '<iframe src='+data.seasons[0].weblink_fixture+' seamless   sandbox="allow-popups allow-same-origin allow-forms allow-scripts"></iframe>';
        this.safeURL =this.sanitizer.bypassSecurityTrustHtml(htmlvalue);
        // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.seasons[0].weblink_fixture);
        this.weblink = true;
      }else {
        this.weblink = false;
      this.YearList = data.seasons;
      this.selectd_yr = this.YearList[0].competition_year;
      this.selectables = data.competitions_name
      this.competition_id = data.seasons[0].competition_id;
      this.cmnfun.showLoading('Please wait...');
      if (this.type == 'Round') {
        this.roundNo = '0_0';
        this.ajax.datalist('get-round-competition-fixture', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.competition_id,
          round: this.roundNo
        }).subscribe((res) => {
          this.getroundcompetitionfixture(res);
        }, error => {
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })

      }
      else {
        this.team_id = '0_0'
        this.ajax.datalist('get-competition-clubs', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          compition_id: this.competition_id,
          team_id: this.team_id
        }).subscribe((res) => {
          this.getcompetitionclubs(res);
        }, error => {
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
      }
    }
    }
    });
    modal.present();
  }
}
