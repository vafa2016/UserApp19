import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable()
export class ProductListProvider {

  product: any = '';
  competition: any = '';
  team: any = '';

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
    PremiumPlus: '2018_premium_william_buck_premier_womens_all_teams'
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

    } else {
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


  SetUserProduct(team, competition) {
    this.team = team;
    this.competition = competition;
    if (team.team_id == 512 && competition.competition_id == 65) {
      this.product = this.ProductList["512"];
    } else if (team.team_id == 513 && competition.competition_id == 65) {
      this.product = this.ProductList["513"];
    } else if (team.team_id == 514 && competition.competition_id == 65) {
      this.product = this.ProductList["514"];
    } else if (team.team_id == 515 && competition.competition_id == 65) {
      this.product = this.ProductList["515"];
    } else if (team.team_id == 516 && competition.competition_id == 65) {
      this.product = this.ProductList["516"];
    } else if (team.team_id == 517 && competition.competition_id == 65) {
      this.product = this.ProductList["517"];
    } else if (team.team_id == 518 && competition.competition_id == 65) {
      this.product = this.ProductList["518"];
    } else if (team.team_id == 519 && competition.competition_id == 65) {
      this.product = this.ProductList["519"];
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
      if (product == this.ProductList["512"] || product == this.ProductList["513"] || product == this.ProductList["514"] || product == this.ProductList["515"] || product == this.ProductList["516"] || product == this.ProductList["517"] || product == this.ProductList["518"] || product == this.ProductList["519"] || product == "vafa_premium" || product == "vafa_premium0001") {
        let ProductType = 'Premium';
        return ProductType;
      } else if (product == this.ProductList.PremiumPlus || product == "vafa_premium_plus" || product == "vafa_premium_plus0002") {
        let ProductType = 'Premium Plus';
        return ProductType;
      }
    } else {
      return false;
    }
  }

  // Local database functions

  // insert purchase details on buy iap.
  InsertPurchase(data) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
        db.executeSql('INSERT INTO PurchaseHistory VALUES (NULL,?,?,?,?,?,?)', [
          data.payment.device_id,
          data.webusercompetition.competitions_name,
          data.webuserteam.team_name,
          data.payment.product_id,
          data.payment.created_at,
          data.payment.transaction_id
        ])
          .then(res => {
            // alert('sucess')
          }).catch(e => {
            // alert(JSON.stringify(e))
          })
      })
      .catch(e => console.log(e));
  }

  // insert purchase details on restore from appstore iap.
  IapRestorePurchase(purchases) {
    let teamname = '';
    let compname = '';
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
        .then(() => console.log('Success'))
        .catch(e => console.log(e));
      purchases.forEach(element => {
        if (element.productId == this.ProductList["512"] || element.productId == this.ProductList["513"] || element.productId == this.ProductList["514"] || element.productId == this.ProductList["515"] || element.productId == this.ProductList["516"] || element.productId == this.ProductList["517"] || element.productId == this.ProductList["518"] || element.productId == this.ProductList["519"]) {
          this.GetTeamComp(element.productId);
          teamname = this.getrteam();
          compname = this.getrcomp();
          db.executeSql('INSERT INTO PurchaseHistory VALUES (NULL,?,?,?,?,?,?)', [
            'appstore',
            teamname,
            compname,
            element.productId,
            element.date,
            element.transactionId
          ])
            .then(res => {
            }).catch(e => {
            })
        } else if (element.productId == this.ProductList.PremiumPlus) {
          this.GetTeamComp(element.productId);
          teamname = this.getrteam();
          compname = this.getrcomp();
          db.executeSql('INSERT INTO PurchaseHistory VALUES (NULL,?,?,?,?,?,?)', [
            'appstore',
            teamname,
            compname,
            element.productId,
            element.date,
            element.transactionId
          ])
            .then(res => {
            }).catch(e => {
            })
        }
      });
    }).catch(e => console.log(e));
    // });
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
    }
  }

  gettname() {
    return this.team_name;
  }
  getcompname() {
    return this.comp_name;
  }

  // localdb processing competiion and team
  GetTeamComp(product) {
    if (product == this.ProductList["512"]) {

      this.rteam = { team_id: "512", competition_id: "65", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["513"]) {

      this.rteam = { team_id: "513", competition_id: "65", team_name: "Fitzroy-ACU", team_abbrevation: "Fitzroy", image_value: "/web/uploads/teams/513/1523276289_logo.png" };
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["514"]) {

      this.rteam = { team_id: "514", competition_id: "65", team_name: "Kew FC", team_abbrevation: "Kew", image_value: "/web/uploads/teams/514/1521540327_logo.png" }
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["515"]) {

      this.rteam = { team_id: "515", competition_id: "65", team_name: "Marcellin", team_abbrevation: "Marcellin", image_value: "/web/uploads/teams/515/1521540397_logo.png" };
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["516"]) {

      this.rteam = { team_id: "516", competition_id: "65", team_name: "Melbourne Uni", team_abbrevation: "Melb", image_value: "/web/uploads/teams/516/1521540447_logo.png" };
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["517"]) {

      this.rteam = { team_id: "517", competition_id: "65", team_name: "Old Trinity", team_abbrevation: "Trinity", image_value: "/web/uploads/teams/517/1523279049_logo.png" };
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["518"]) {

      this.rteam = { team_id: "518", competition_id: "65", team_name: "Old Xaverians", team_abbrevation: "Xavs", image_value: "/web/uploads/teams/518/1521540523_logo.png" };
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["519"]) {

      this.rteam = { team_id: "519", competition_id: "65", team_name: "SKOB Saints", team_abbrevation: "SKOB", image_value: "/web/uploads/teams/519/1521540559_logo.png" };
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };

    } else {
      this.rteam = { team_id: "512", competition_id: "65", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
      this.rcompetition = { competition_id: "65", competitions_name: "William Buck Premier", competitions_abbrivation: "Women's Premier" };
    }
  }

  getrteam() {
    return this.rteam.team_name;
  }

  getrcomp() {
    return this.rcompetition.competitions_name;
  }
}