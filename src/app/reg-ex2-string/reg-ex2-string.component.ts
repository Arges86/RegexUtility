import { Component, OnInit, ViewChild } from '@angular/core';
import * as sha1 from 'js-sha1';

import { Utils } from '../services/utils.component';
import { Rest } from '../services/rest.component';

@Component({
  selector: 'app-reg-ex2-string',
  templateUrl: './reg-ex2-string.component.html',
  styleUrls: ['./reg-ex2-string.component.scss']
})

export class RegEx2StringComponent implements OnInit {

  // tslint:disable-next-line: no-use-before-declare
  formData: FormData = new FormData();
  @ViewChild('f') form: any;
  totalLoops = 100000;
  invert = false;
  max = 200000;
  min = 100;
  step = 10;
  thumbLabel = false;
  showTicks = false;
  error: string;
  loading: boolean;
  examples: object;
  count: string;

  constructor(private utils: Utils, private rest: Rest) { }

  ngOnInit() {
    this.examples = [
      {type: 'Password', value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/ },
      {type: 'Password', value: /^[a-zA-Z]\w{3,14}$/},
      {type: 'Email', value: /[\w-]+@([\w-]+\.)+[\w-]+/},
      {type: 'Username', value: /^[a-z0-9_-]{3,16}$/}
    ];
  }

  clear() {
    this.formData.result = null;
    this.form.reset();
    this.error = null;
    this.count = null;
    this.totalLoops = 100000;
  }

  try(example: string) {
    this.formData.regeX = new RegExp(example);
    this.onSubmit();
  }

  onSubmit() {
    this.loading = true;
    this.error = null;
    this.formData.result = '';
    this.count = null;
    console.log('Starting search...');
    console.log(`Total number of attempts: ${this.totalLoops}`);

    const regEx = new RegExp(this.formData.regeX);

    this.createRegEx(regEx)
      .then( res => {
        console.log(res.match(regEx));
        this.formData.result = res.match(regEx)['0'];
        // this.formData.result = 'P@ssw0rd';
      })
      .catch( err => {
        this.error = err;
      })
      .finally(() => {
        console.log('done');
        this.loading = false;
      });
  }

  validateInput() {
    this.formData.regeX = this.utils.validateInput(this.formData.regeX);
  }

  createRegEx(reg: RegExp): Promise<string> {
    return new Promise<string>((resolve, reject) => {

    let r: string;
    let returnedValue: string;

    let x = 0;
    let i: number;
    let done: boolean;
    do {
        i = Math.floor((Math.random() * 100) + 1);
        r = this.generateRandomString(i);
        // console.log(r);
        x++;

        if (reg.test(r)) {
          done = false;
        } else {
          done = true;
        }

        if (x > this.totalLoops) {
          done = false;
        } else {
          returnedValue = r;
        }

      } while (done);

    if (x < this.totalLoops) {
      resolve(returnedValue);
    } else {
      const reason = new Error(`Gave up after ${x} tries`);
      reject(reason);
    }

    console.log(`Took ${x} tries`);
    });
  }

  generateRandomString(length: number) {
    let randomString = '';
    let randomAscii: number;
    const asciiLow = 32;
    const asciiHigh = 126;
    for (let i = 0; i < length; i++) {
        randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
        randomString += String.fromCharCode(randomAscii);
    }
    return randomString;
  }

  checkPwd(pwd: string) {
    this.count = null;
    this.loading = true;

    let hashed = sha1(pwd);
    hashed = hashed.toUpperCase();
    console.log(hashed);

    const substring = hashed.substring(0, 5);
    console.log(hashed.substr(5));

    this.rest.checkPwd(substring)
    .subscribe( res  => {
      this.loading = false;

      res.forEach(response => {
        if (response.includes(hashed.substr(5))) {
          console.log('Password Found!');
          const hash = response.split(':');
          console.log(hash[0]);
          console.log(hash[1]);
          this.count = hash[1];
        }
      });

      if (!this.count) {
        console.log('No Breaches found');
        this.count = '0';
      }

    },
    error => {
      console.log(error);
      this.loading = false;
    });
  }
}

class FormData {
  regeX: RegExp;
  result: string;
}
