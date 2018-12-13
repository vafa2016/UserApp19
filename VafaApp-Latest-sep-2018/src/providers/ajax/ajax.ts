import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Events } from 'ionic-angular';
/*
  Generated class for the AjaxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AjaxProvider {

  constructor(public http: HttpClient, public events: Events, ) {
    console.log('Hello AjaxProvider Provider');

  }
  postMethod(category, params) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post('http://vafalive.com.au/score/default/' + category,
      params, config)
      .map(res => res)
      .catch(error => error)
  }
    
  post(category, params) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post('http://vafalive.com.au/score/' + category,
      params, config)
      .map(res => res)
      .catch(error => error)
  }
  getcompetionlist(category, params, key) {
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    this.http
      .post('http://vafalive.com.au/score/default/' + category,
      params, config)
      .subscribe((res) => {
        console.log(res);
        this.events.publish('competitionlist' + key + ':changed', res);
        // console.log(this.newsData);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
  }
  data(category, params) {
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    this.http
      .post('http://vafalive.com.au/score/default/' + category,
      params, config)
      .subscribe((res) => {
        console.log(res);
        this.events.publish('datalist:changed', res);
        // console.log(this.newsData);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
  }
  datalist(category, params) {
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post('http://vafalive.com.au/score/default/' + category,
      params, config)
      .map(res => res)
      .catch(error => error) 
  }
  datalistaction(category, params, Type) {
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    this.http
      .post('http://vafalive.com.au/score/default/' + category,
      params, config)
      .subscribe((res) => {
        console.log(res);
        this.events.publish('datalistaction_' + Type + ':changed', res);
        // console.log(this.newsData);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
  }

  postaction(category, params) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post('http://vafalive.com.au/score/matchscore/' + category,
      params, config)
      .map(res => res)
      .catch(error => error)
  }

   postMethodct(category) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
    .post('http://vafalive.com.au/score/default/'+category,
        {accessKey: 'QzEnDyPAHT12asHb4On6HH2016',}, config)
        .map(res => res)
        .catch(error=>error)
  }

   PaymentpostApi(params) {
     console.log(params)
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post('http://vafalive.com.au/score/custom/save-payment-email',
      params, config)
      .map(res => res)
      .catch(error => error)
  }

  CheckDeviceData(params) {
     console.log(params)
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post('http://vafalive.com.au/score/custom/login-webuser-deviceid-payment',
      params, config)
      .map(res => res)
      .catch(error => error)
  }

   EditUserData(params) {
     console.log(params)
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post('http://vafalive.com.au/score/custom/save-data-email',
      params, config)
      .map(res => res)
      .catch(error => error)
  }

  CheckTrialPeriod(params) {
    console.log(params)
   var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
   return this.http
     .post('http://vafalive.com.au/score/custom/check-trial-period',
     params, config)
     .map(res => res)
     .catch(error => error)
 }

 

}
