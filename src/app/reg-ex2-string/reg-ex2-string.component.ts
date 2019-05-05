import { Component, OnInit, ViewChild } from '@angular/core';
import * as sha1 from 'js-sha1';
import * as RandExp from 'randexp';

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
  error: string;
  loading: boolean;
  examples: object;
  count: string;
  invalid = true;

  constructor(private utils: Utils, private rest: Rest) { }

  ngOnInit() {
    this.examples = [
      {type: 'Password', value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/ },
      {type: 'Password', value: /^[a-zA-Z]\w{3,14}$/},
      {type: 'Email', value: /[\w-]+@([\w-]+\.)+[\w-]+/},
      {type: 'Username', value: /^[a-z0-9_-]{3,16}$/},
      // tslint:disable-next-line: max-line-length
      {type: 'IPv4', value: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}
    ];
  }

  clear() {
    this.formData.result = null;
    this.form.reset();
    this.error = null;
    this.count = null;
  }

  try(example: string) {
    this.formData.regeX = new RegExp(example);
    this.invalid = false;
    this.onSubmit();
  }

  onSubmit() {
    this.loading = true;
    this.error = null;
    this.formData.result = '';
    console.log(this.invalid);
    const randexp = new RandExp(this.formData.regeX);
    this.formData.result = randexp.gen();
    this.loading = false;
  }

  validateInput() {
    try {
      this.formData.regeX = this.utils.validateInput(this.formData.regeX);
      this.invalid = false;
    } catch (SyntaxError) {
      console.log(SyntaxError);
      this.error = 'Invalid Regular Expression';
      this.invalid = true;
    }
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
