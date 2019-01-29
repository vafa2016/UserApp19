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
  arraySize: any;
  advertisementHeader: any;
  advertisementFooter: any;
  headerimage: any = '';
  headerurl: any;
  ladderDataa: any = [];
  // path: any = 'http://vafalive.com.au';
  path: any = 'http://54.244.98.247';


  constructor(private inapp: InAppBrowser,public plt:Platform,public ga:GoogleAnalytics, public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, private modalCtrl: ModalController, public events: Events, public navCtrl: NavController, public navParams: NavParams) {

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
        this.selectables = this.comptitionlists[0].competitions_name;
        this.competition_id = this.comptitionlists[0].competition_id;
        this.ajax.datalist('team-ladder-competitionwise', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.competition_id,
        }).subscribe((res) => {
          this.teamladdercompetitionwise(res);
        }, error => {
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
      }
    });

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
        scrollY: windowHeight,
        // scrollY: 150,
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        info: false,
        "bPaginate": false,
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
      this.cmnfun.HideLoading();

    }, 1500);


  };
  gotomodel() {
    this.ladderDataa = [];
    $('#LadderTable').dataTable().fnDestroy();
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
    let me = this;
    modal.onDidDismiss(data => {
      this.cmnfun.showLoading('Please wait...');
      this.selectables = data.competitions_name
      this.competition_id = data.competition_id;
      this.ajax.datalist('team-ladder-competitionwise', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        competition_id: this.competition_id,
      }).subscribe((res) => {
        this.teamladdercompetitionwise(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
    });
    modal.present();
  }


}
