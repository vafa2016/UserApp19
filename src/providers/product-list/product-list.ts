import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable()
export class ProductListProvider {

  product: any = '';
  plusproduct: any = '';
  yr : any;
  competition: any = '';
  team: any = '';
  matchcenterCompId : any;

  rteam: any = '';
  rcompetition: any = '';

  PurchaseDetails: any = [];

  team_name: any = "";
  comp_name: any = "";


  ProductList = {
    512: '2018_premium_william_buck_premier_womens_caulfield_grammarians',
    513: '2018_premium_william_buck_womens_fitzroy_acu',
    514: '2018_premium_william_buck_premier_womens_kew_fc',
    515: '2018_premium_william_buck_premier_womens_marcellin',
    516: '2018_premium_william_buck_premier_womens_melbourne_uni',
    517: '2018_premium_william_buck_premier_womens_old_trinity',
    518: '2018_premium_william_buck_premier_womens_old_xaverians',
    519: '2018_premium_william_buck_premier_womens_skob_saints',
    PremiumPlus: '2018_premium_william_buck_premier_womens_all_teams',
    565: '2019_premium_william_buck_premier_womens_caulfield_grammarians',
    566: '2019_premium_william_buck_womens_fitzroy_acu',
    567: '2019_premium_william_buck_premier_womens_kew_fc',
    568: '2019_premium_william_buck_premier_womens_marcellin',
    569: '2019_premium_william_buck_premier_womens_melbourne_uni',
    570: '2019_premium_william_buck_premier_womens_old_trinity',
    571: '2019_premium_william_buck_premier_womens_old_xaverians',
    572: '2019_premium_william_buck_premier_womens_skob_saints',
    PremiumPlus2019: '2019_premium_william_buck_premier_womens_all_teams',
    GamePass : 'game_pass',
    VafaPass  : 'vafa_pass',
    612:'2019_test_sydney_seniors',
    613:'2019_test_adelaide_seniors',
    616:'2019_test_hawthorn_seniors',
    617:'2019_test_richmond_seniors',
    604:'2018_test_sydney_seniors',
    606:'2018_test_adelaide_seniors',
    610:'2018_test_hawthorn_seniors',
    611:'2018_test_richmond_seniors',
    Interstate2018:'2018_premiumplus_interstate',
    Victoria2018:'2018_premiumplus_victorian',
    Interstate2019:'2019_premiumplus_interstate',
    Victoria2019:'2019_premiumplus_victorian'
  }

  constructor(public http: HttpClient,
    private sqlite: SQLite,
    public storage: Storage) {
    // open local database to store purchase data
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  ionViewWillEnter() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }


  RestoreTeam(product) {
    if (product == this.ProductList["512"]) {

      this.team = { team_id: "512", competition_id: "65", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["513"]) {

      this.team = { team_id: "513", competition_id: "65", team_name: "Fitzroy-ACU", team_abbrevation: "Fitzroy", image_value: "/web/uploads/teams/513/1523276289_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["514"]) {

      this.team = { team_id: "514", competition_id: "65", team_name: "Kew FC", team_abbrevation: "Kew", image_value: "/web/uploads/teams/514/1521540327_logo.png" }
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["515"]) {

      this.team = { team_id: "515", competition_id: "65", team_name: "Marcellin", team_abbrevation: "Marcellin", image_value: "/web/uploads/teams/515/1521540397_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["516"]) {

      this.team = { team_id: "516", competition_id: "65", team_name: "Melbourne Uni", team_abbrevation: "Melb", image_value: "/web/uploads/teams/516/1521540447_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["517"]) {

      this.team = { team_id: "517", competition_id: "65", team_name: "Old Trinity", team_abbrevation: "Trinity", image_value: "/web/uploads/teams/517/1523279049_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["518"]) {

      this.team = { team_id: "518", competition_id: "65", team_name: "Old Xaverians", team_abbrevation: "Xavs", image_value: "/web/uploads/teams/518/1521540523_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["519"]) {

      this.team = { team_id: "519", competition_id: "65", team_name: "SKOB Saints", team_abbrevation: "SKOB", image_value: "/web/uploads/teams/519/1521540559_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["565"]) {

      this.team = { team_id: "565", competition_id: "92", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["566"]) {

      this.team = { team_id: "566", competition_id: "92", team_name: "Fitzroy-ACU", team_abbrevation: "Fitzroy", image_value: "/web/uploads/teams/513/1523276289_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["567"]) {

      this.team = { team_id: "567", competition_id: "92", team_name: "Kew FC", team_abbrevation: "Kew", image_value: "/web/uploads/teams/514/1521540327_logo.png" }
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["568"]) {

      this.team = { team_id: "568", competition_id: "92", team_name: "Marcellin", team_abbrevation: "Marcellin", image_value: "/web/uploads/teams/515/1521540397_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["569"]) {

      this.team = { team_id: "569", competition_id: "92", team_name: "Melbourne Uni", team_abbrevation: "Melb", image_value: "/web/uploads/teams/516/1521540447_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["570"]) {

      this.team = { team_id: "570", competition_id: "92", team_name: "Old Trinity", team_abbrevation: "Trinity", image_value: "/web/uploads/teams/517/1523279049_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["571"]) {

      this.team = { team_id: "571", competition_id: "92", team_name: "Old Xaverians", team_abbrevation: "Xavs", image_value: "/web/uploads/teams/518/1521540523_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["572"]) {

      this.team = { team_id: "572", competition_id: "92", team_name: "SKOB Saints", team_abbrevation: "SKOB", image_value: "/web/uploads/teams/519/1521540559_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList['PremiumPlus2019']){
      this.team = { team_id: "565", competition_id: "92", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };
    } else if (product == this.ProductList['VafaPass']) {
      this.team = { team_id: "565", competition_id: "92", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
      this.competition = { competition_id: "92", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };
    }else if (product == this.ProductList['612']) {
      this.team = { competition_id: "104",image_value: "/web/uploads/teams/20/1551481795_logo.png",team_abbrevation: "Swans",team_id: "612",team_name: "Sydney Seniors" };
      this.competition = {competition_id: "104", competition_year: "2019",competitions_abbrivation: "Inter Test Comp", competitions_name: "Interstate Test Competition"};
    }else if(product == this.ProductList['613']){
      this.team = {team_id: "613", competition_id: "104", team_name: "Adelaide Seniors", team_abbrevation: "Crows",image_value: "/web/uploads/teams/29/1551482211_logo.png"};
      this.competition = {competition_id: "104", competition_year: "2019",competitions_abbrivation: "Inter Test Comp", competitions_name: "Interstate Test Competition"};
    }else if(product == this.ProductList['617']){
      this.team = {competition_id: "103",image_value: "/web/uploads/teams/27/1551482086_logo.png",team_abbrevation: "Tigers",team_id: "617",team_name: "Richmond Seniors"};
      this.competition = {competition_id: "103", competition_year: "2019", competitions_name: "Victorian Test Competition", competitions_abbrivation: "Vic Test Comp"};
    }else if(product == this.ProductList['616']){
      this.team = {competition_id: "103", image_value: "/web/uploads/teams/26/1551481959_logo.png", team_abbrevation: "Hawks", team_id: "616",team_name: "Hawthorn Seniors"};
      this.competition = {competition_id: "103", competition_year: "2019", competitions_name: "Victorian Test Competition", competitions_abbrivation: "Vic Test Comp"};
    }else if (product == this.ProductList['604']) {
      this.team = { competition_id: "102",image_value: "/web/uploads/teams/20/1551481795_logo.png",team_abbrevation: "Swans",team_id: "604",team_name: "Sydney Seniors" };
      this.competition = {competition_id: "102", competition_year: "2018",competitions_abbrivation: "Inter Test Comp", competitions_name: "Interstate Test Competition"};
    }else if(product == this.ProductList['606']){
      this.team = {team_id: "606", competition_id: "102", team_name: "Adelaide Seniors", team_abbrevation: "Crows",image_value: "/web/uploads/teams/29/1551482211_logo.png"};
      this.competition = {competition_id: "102", competition_year: "2018",competitions_abbrivation: "Inter Test Comp", competitions_name: "Interstate Test Competition"};
    }else if(product == this.ProductList['611']){
      this.team = {competition_id: "101",image_value: "/web/uploads/teams/27/1551482086_logo.png",team_abbrevation: "Tigers",team_id: "611",team_name: "Richmond Seniors"};
      this.competition = {competition_id: "101", competition_year: "2018", competitions_name: "Victorian Test Competition", competitions_abbrivation: "Vic Test Comp"};
    }else if(product == this.ProductList['610']){
      this.team = {competition_id: "101", image_value: "/web/uploads/teams/26/1551481959_logo.png", team_abbrevation: "Hawks", team_id: "610",team_name: "Hawthorn Seniors"};
      this.competition = {competition_id: "101", competition_year: "2018", competitions_name: "Victorian Test Competition", competitions_abbrivation: "Vic Test Comp"};
    }else if(product == this.ProductList['Interstate2018']){
      this.team = {team_id: "606", competition_id: "102", team_name: "Adelaide Seniors", team_abbrevation: "Crows",image_value: "/web/uploads/teams/29/1551482211_logo.png"};
      this.competition = {competition_id: "102", competition_year: "2018",competitions_abbrivation: "Inter Test Comp", competitions_name: "Interstate Test Competition"};
    }else if(product == this.ProductList['Interstate2019']){
      this.team = {team_id: "613", competition_id: "104", team_name: "Adelaide Seniors", team_abbrevation: "Crows",image_value: "/web/uploads/teams/29/1551482211_logo.png"};
      this.competition = {competition_id: "104", competition_year: "2019",competitions_abbrivation: "Inter Test Comp", competitions_name: "Interstate Test Competition"};
    }else if(product == this.ProductList['Victoria2018']){
      this.team = {competition_id: "101", image_value: "/web/uploads/teams/26/1551481959_logo.png", team_abbrevation: "Hawks", team_id: "610",team_name: "Hawthorn Seniors"};
      this.competition = {competition_id: "101", competition_year: "2018", competitions_name: "Victorian Test Competition", competitions_abbrivation: "Vic Test Comp"};
    }else if(product == this.ProductList['Victoria2019']){
      this.team = {competition_id: "103",image_value: "/web/uploads/teams/27/1551482086_logo.png",team_abbrevation: "Tigers",team_id: "617",team_name: "Richmond Seniors"};
      this.competition = {competition_id: "103", competition_year: "2019", competitions_name: "Victorian Test Competition", competitions_abbrivation: "Vic Test Comp"};
    }
     else if(product == this.ProductList['PremiumPlus']) {
      this.storage.get('UserTeamData').then((val) => {
        if (val) {
          console.log(val)
          this.team = val.selectedteam;
          this.competition = val.selectedcompetition;
        } else {
          this.team = { team_id: "512", competition_id: "65", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
          this.competition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };
        }
      });
    }
  }

  // setpremiumpluspass

  setplusproduct(comp) {
    if(comp == 65){
      this.plusproduct = this.ProductList['PremiumPlus'];
    }else if(comp == 92){
      this.plusproduct = this.ProductList['PremiumPlus2019'];
    }else if(comp == 104){
      this.plusproduct = this.ProductList['Interstate2019'];
    }else if(comp == 103){
      this.plusproduct = this.ProductList['Victoria2019'];
    }else if(comp == 101){
      this.plusproduct = this.ProductList['Victoria2018'];
    }else if(comp == 102){
      this.plusproduct = this.ProductList['Interstate2018'];
    }
  }

  getplusproduct(){
    if(this.plusproduct != ''){
      return this.plusproduct;
    }
  }


  SetUserProduct(team, competition, year) {
   console.log(team)
   console.log(year)
   console.log(competition)
    this.team = team;
    this.competition = competition;
    if (team.team_id == 512 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["512"];
    } else if (team.team_id == 513 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["513"];
    } else if (team.team_id == 514 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["514"];
    } else if (team.team_id == 515 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["515"];
    } else if (team.team_id == 516 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["516"];
    } else if (team.team_id == 517 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["517"];
    } else if (team.team_id == 518 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["518"];
    } else if (team.team_id == 519 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["519"];
    } else if (team.team_id == 565 && competition.competition_id == 92 && year == 2019){
      this.product = this.ProductList["565"];
    } else if (team.team_id == 566 && competition.competition_id == 92 && year == 2019) {
      this.product = this.ProductList["566"];
    } else if (team.team_id == 567 && competition.competition_id == 92 && year == 2019) {
      this.product = this.ProductList["567"];
    } else if (team.team_id == 568 && competition.competition_id == 92 && year == 2019) {
      this.product = this.ProductList["568"];
    } else if (team.team_id == 569 && competition.competition_id == 92 && year == 2019) {
      this.product = this.ProductList["569"];
    } else if (team.team_id == 570 && competition.competition_id == 92 && year == 2019) {
      this.product = this.ProductList["570"];
    } else if (team.team_id == 571 && competition.competition_id == 92 && year == 2019) {
      this.product = this.ProductList["571"];
    } else if (team.team_id == 572 && competition.competition_id == 92 && year == 2019) {
      this.product = this.ProductList["572"];
    } else if (team.team_id == 612 && competition.competition_id == 104 && year == 2019) {
      this.product = this.ProductList["612"];
    }else if (team.team_id == 613 && competition.competition_id == 104 && year == 2019) {
      this.product = this.ProductList["613"];
    }else if (team.team_id == 616 && competition.competition_id == 103 && year == 2019) {
      this.product = this.ProductList["616"];
    }else if (team.team_id == 617 && competition.competition_id == 103 && year == 2019) {
      this.product = this.ProductList["617"];
    }else if (team.team_id == 604 && competition.competition_id == 102 && year == 2018) {
      this.product = this.ProductList["604"];
    }else if (team.team_id == 616 && competition.competition_id == 102 && year == 2018) {
      this.product = this.ProductList["606"];
    }else if (team.team_id == 610 && competition.competition_id == 101 && year == 2018) {
      this.product = this.ProductList["610"];
    }else if (team.team_id == 611 && competition.competition_id == 101 && year == 2018) {
      this.product = this.ProductList["611"];
    }
  }


  GetUserProduct() {
    if (this.product != '') {
      return this.product;
    }
  }

  GetTeamid() {
    return this.team.team_id;
  }

  GetCompetitionid() {
    return this.competition.competition_id;
  }

  GetProductType(product) {
    if (product) {
      if (product == this.ProductList['611'] || product == this.ProductList['610'] || product == this.ProductList['606'] || product == this.ProductList['604'] || product == this.ProductList["512"] || product == this.ProductList["513"] || product == this.ProductList["514"] || product == this.ProductList["515"] || product == this.ProductList["516"] || product == this.ProductList["517"] || product == this.ProductList["518"] || product == this.ProductList["519"] || product == "vafa_premium" || product == "vafa_premium0001") {
        let ProductType = 'Premium';
        return ProductType;
      } else if (product == this.ProductList['Victoria2018'] ||product == this.ProductList['Interstate2018'] || product == this.ProductList.PremiumPlus || product == "vafa_premium_plus" || product == "vafa_premium_plus0002") {
        let ProductType = 'Premium Plus';
        return ProductType;
      } else if (product == this.ProductList["617"] ||product == this.ProductList["616"] ||product == this.ProductList["613"] ||product == this.ProductList["612"] || product == this.ProductList["565"] || product == this.ProductList["566"] || product == this.ProductList["567"] || product == this.ProductList["568"] || product == this.ProductList["569"] || product == this.ProductList["570"] || product == this.ProductList["571"] || product == this.ProductList["572"]) {
        let ProductType = 'Premium 2019';
        return ProductType;
      } else if (product == this.ProductList['Victoria2019'] || product == this.ProductList['Interstate2019'] || product == this.ProductList.PremiumPlus2019) {
        let ProductType = 'Premium Plus 2019';
        return ProductType;
      } else if (product == this.ProductList.GamePass) {
        let ProductType = 'GAME PASS';
        return ProductType;
      } else if (product == this.ProductList.VafaPass ) {
        let ProductType = 'VAFA PASS';
        return ProductType;
      }
    } else {
      return false;
    }
  }

  // Local database functions

  // insert purchase details on buy iap.
  InsertPurchase(data) {
    let purchasedPack = data.payment;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
          // add foreach here
          purchasedPack.forEach(element => {
            this.Analyse(element.team_id, element.competition_id);
            let team = this.gettname();
            let comp = this.getcompname();
            db.executeSql('INSERT INTO PurchaseHistory VALUES (NULL,?,?,?,?,?,?)', [
              element.device_id,
              comp,
              team,
              // element.fixture_id,
              element.product_id,
              element.created_at,
              element.transaction_id
            ])
              .then(res => {
                // alert('sucess')
              }).catch(e => {
                // alert(JSON.stringify(e))
              })
          });
      })
      .catch(e => console.log(e));
  }



  // restore purchase details from server to local storage; ie only one time executed function.
  RestorePurchase(data) {
    let PurchaseList = data;
    console.log(PurchaseList)
    // alert(JSON.stringify(data))
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
        PurchaseList.forEach(element => {
          this.Analyse(element.team_id, element.competition_id);
          let team = this.gettname();
          let comp = this.getcompname();
          db.executeSql('INSERT INTO PurchaseHistory VALUES (NULL,?,?,?,?,?,?)', [
            element.device_id,
            comp,
            team,
            // element.fixture_id,
            element.product_id,
            element.created_at,
            element.transaction_id
          ])
            .then(res => {
              // alert('sucess')
            }).catch(e => {
              // alert(JSON.stringify(e))
            })
        });
      })
      .catch(e => console.log(e));
  }
  // get purchase details.

  GetPurchase() {
    this.PurchaseDetails = [];
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM PurchaseHistory', []).then((data) => {
          // alert(JSON.stringify(data))
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              this.PurchaseDetails.push(data.rows.item(i));
              // alert(JSON.stringify(this.PurchaseDetails))
            }
          }
        }).catch(e => {
          console.log(e)
        })
      });
    return this.PurchaseDetails;
  }

  // Analyse team_name and competition_name
  Analyse(tid, compid) {
    if (tid == 512 && compid == 65) {
      this.team_name = "Caulfield Grammarians";
      this.comp_name = "William Buck Premier";
    } else if (tid == 513 && compid == 65) {
      this.team_name = "Fitzroy-ACU";
      this.comp_name = "William Buck Premier";
    } else if (tid == 514 && compid == 65) {
      this.team_name = "Kew FC";
      this.comp_name = "William Buck Premier";
    } else if (tid == 515 && compid == 65) {
      this.team_name = "Marcellin";
      this.comp_name = "William Buck Premier";
    } else if (tid == 516 && compid == 65) {
      this.team_name = "Melbourne Uni";
      this.comp_name = "William Buck Premier";
    } else if (tid == 517 && compid == 65) {
      this.team_name = "Old Trinity";
      this.comp_name = "William Buck Premier";
    } else if (tid == 518 && compid == 65) {
      this.team_name = "Old Xaverians";
      this.comp_name = "William Buck Premier";
    } else if (tid == 519 && compid == 65) {
      this.team_name = "SKOB Saints";
      this.comp_name = "William Buck Premier";
    } else if (tid == 565 && compid == 92) {
      this.team_name = "Caulfield Grammarians";
      this.comp_name = "William Buck Premier";
    } else if (tid == 566 && compid == 92) {
      this.team_name = "Fitzroy-ACU";
      this.comp_name = "William Buck Premier";
    } else if (tid == 567 && compid == 92) {
      this.team_name = "Kew FC";
      this.comp_name = "William Buck Premier";
    } else if (tid == 568 && compid == 92) {
      this.team_name = "Marcellin";
      this.comp_name = "William Buck Premier";
    } else if (tid == 569 && compid == 92) {
      this.team_name = "Melbourne Uni";
      this.comp_name = "William Buck Premier";
    } else if (tid == 570 && compid == 92) {
      this.team_name = "Old Trinity";
      this.comp_name = "William Buck Premier";
    } else if (tid == 571 && compid == 92) {
      this.team_name = "Old Xaverians";
      this.comp_name = "William Buck Premier";
    } else if (tid == 572 && compid == 92) {
      this.team_name = "SKOB Saints";
      this.comp_name = "William Buck Premier";
    }
    // test team and comp 2019
    else if(tid == 612 && compid == 104){
      this.team_name = "Sydney Seniors";
      this.comp_name = "Interstate Test Competition";
    }else if(tid == 613 && compid == 104){
      this.team_name = "Adelaide Seniors";
      this.comp_name = "Interstate Test Competition";
    } else if(tid == 616 && compid == 103){
      this.team_name = "Hawthorn Seniors";
      this.comp_name = "Victorian Test Competition";
    }else if(tid == 617 && compid == 103){
      this.team_name = "Richmond Seniors";
      this.comp_name = "Victorian Test Competition";
    } else if(tid == 604 && compid == 102){
      this.team_name = "Sydney Seniors";
      this.comp_name = "Interstate Test Competition";
    }else if(tid == 606 && compid == 102){
      this.team_name = "Adelaide Seniors";
      this.comp_name = "Interstate Test Competition";
    } else if(tid == 610 && compid == 101){
      this.team_name = "Hawthorn Seniors";
      this.comp_name = "Victorian Test Competition";
    }else if(tid == 611 && compid == 101){
      this.team_name = "Richmond Seniors";
      this.comp_name = "Victorian Test Competition";
    }
  }

  gettname() {
    return this.team_name;
  }
  getcompname() {
    return this.comp_name;
  }


  SetMatchcenterCompId(compid){
    console.log(compid)
    this.matchcenterCompId = compid;
  }

  getMatchcenterCompId (){
    return this.matchcenterCompId;
  }

}
