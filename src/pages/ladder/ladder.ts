import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import 'datatables.net-fixedheader';
import { PopoverController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Generated class for the LadderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ladder',
  templateUrl: 'ladder.html',
})
export class LadderPage {
  comptitionlists: any = [];
  competition_id: any;
  selectables: any = [];
  WeblinkAd:any;
  arraySize: any;
  advertisementHeader: any;
  advertisementFooter: any;
  headerimage: any = '';
  headerurl: any;
  ladderDataa: any = [];
  selectd_yr:any;
  YearList:any;
  weblink : boolean = false;
  safeURL : any;
  // path: any = 'http://vafalive.com.au';
  path1: any = 'http://54.244.98.247';
  path: any = 'https://s3.us-west-2.amazonaws.com/vafas3';


  constructor(private sanitizer: DomSanitizer,private inapp: InAppBrowser,public popoverCtrl: PopoverController,
    public plt:Platform,public ga:GoogleAnalytics, public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, private modalCtrl: ModalController, public events: Events, public navCtrl: NavController, public navParams: NavParams) {

    // $.plot($("#placeholder"), [ [[0, 0], [1, 1]] ], { yaxis: { max: 1 } });
     this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Ladder');
        this.ga.trackTiming('Ladder', 1000, 'Duration', 'Time');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidLeave(){
    $('#LadderTable').dataTable().fnDestroy();
  }


    // path reset function
    cutPath(url){
      if(url)
      return url.substring(12);
    }

  ionViewDidLoad() {
    this.cmnfun.showLoading('Please wait...');
    console.log('ionViewDidLoad LadderPage');
    this.ajax.getcompetionlist('get-all-competitions', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
    }, 'ladder');
    this.events.subscribe('competitionlistladder:changed', res => {
      console.log(res);
      if (res !== undefined && res !== "") {
        this.comptitionlists = res.competition;
        this.YearList =this.comptitionlists[0].seasons;
        this.selectd_yr = this.YearList[0].competition_year;
        this.selectables = this.comptitionlists[0].competitions_name;
        this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
        this.ajax.datalist('team-ladder-competitionwise', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.competition_id
        }).subscribe((res) => {
          this.teamladdercompetitionwise(res);
        }, error => {
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
      }
    });


        // weblink add fetching api
  this.ajax.postMethod('get-weblink-advertisements',{ page_title : 'Ladder(Weblink)'}).subscribe((res : any) =>{
    this.WeblinkAd = res.footerAdv.ad_image;
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
     console.log(data);
    if(data != null){
      this.selectd_yr = data.competition_year;
      this.competition_id = data.competition_id;
      // get ladder by year
      this.cmnfun.showLoading('Please wait...');
      this.ajax.datalist('team-ladder-competitionwise', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        competition_id: this.competition_id
      }).subscribe((res) => {
        this.teamladdercompetitionwise(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
    }
  })
}



  teamladdercompetitionwise(res) {
    $('#LadderTable').dataTable().fnDestroy();
    this.ladderDataa = res.ladder;
    this.arraySize = this.ladderDataa.length;
    this.advertisementHeader = res.headerAdv;
    console.log(this.advertisementHeader[0].ad_image);
    this.advertisementFooter = res.footerAdv;
    console.log(res);

    setTimeout(() => {
      let windowWidth = (window.innerWidth);
      let windowHeight = (window.innerHeight) - 150;
      var table = $('#LadderTable').DataTable({
        // scrollY: windowHeight,
        // scrollY: 150,
        scrollY: true,
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        info: false,
        "bPaginate": false,
        "bDestroy": true,
        "bFilter": false,
        "bInfo": false,
        "bSortable": false,
        "ordering": true,
        "order": [[4, "desc"], [14, "desc"], [5, "desc"]],
        "aoColumnDefs": [
          {
            "targets": [3],
            "orderable": false,
            "bSortable": false,
            "searchable": false,
            "render": function (data, type, full, meta) {
              return parseInt(full[6]) + parseInt(full[7]) + parseInt(full[8]) + parseInt(full[9]) + parseInt(full[12]) + parseInt(full[13]);
            }
          }],

        fixedColumns: {
          leftColumns: 2,
          rightColumns: 0
        },
        fixedHeader: {
          header: true,
          footer: true
        }
      });
      table.on("order.dt search.dt", function () {
        table.column(0, { search: "applied", order: "applied" }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
      }).draw();
    //   table.row.add( [
    //     '<img class="full-image" src="assets/imgs/CSM_-_More_Footy_Less_Admin_(white).gif">'
    // ] ).draw( false );
      // $('#LadderTable').wrap('<img src="https://s3.us-west-2.amazonaws.com/vafas3/publish/339/1522912681_stats_guru.gif">');
      this.cmnfun.HideLoading();
    }, 1500);


  };
  gotomodel() {
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
    let me = this;
    modal.onDidDismiss(data => {
      if(data){
        if(data.seasons[0].manual_score_recording == "2"){
          this.selectables = data.competitions_name;
          var htmlvalue = '<iframe src='+data.seasons[0].weblink_ladder+' seamless   sandbox="allow-popups allow-same-origin allow-forms allow-scripts"></iframe>';
          this.safeURL =this.sanitizer.bypassSecurityTrustHtml(htmlvalue);
          // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.seasons[0].weblink_ladder);
          this.weblink = true;
        }else{
          this.weblink = false;
        this.ladderDataa = [];
        $('#LadderTable').dataTable().fnDestroy();
      console.log(data);
      this.cmnfun.showLoading('Please wait...');
      this.selectables = data.competitions_name;
      this.YearList =data.seasons;
      this.selectd_yr = this.YearList[0].competition_year;
      this.competition_id = data.seasons[0].competition_id;
      this.ajax.datalist('team-ladder-competitionwise', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        competition_id: this.competition_id,
      }).subscribe((res) => {
        this.teamladdercompetitionwise(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
    }
    }
    });
    modal.present();
  }


}
