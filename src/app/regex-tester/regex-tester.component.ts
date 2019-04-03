import { Component, OnInit, ViewChild } from '@angular/core';

import { Utils } from '../services/utils.component';

@Component({
  selector: 'app-regex-tester',
  templateUrl: './regex-tester.component.html',
  styleUrls: ['./regex-tester.component.scss']
})
export class RegexTesterComponent implements OnInit {

  // tslint:disable-next-line: no-use-before-declare
  formData: FormData = new FormData();
  @ViewChild('f') form: any;
  error: string;
  results: Array<string>;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  clear() {
    this.form.reset();
    this.error = null;
  }

  onSubmit() {
    console.log(this.formData);
    console.log(this.formData.radio);

    // find operation
    if (this.formData.radio === 'Find') {
      if (this.checkMatch(this.formData.regeX, this.formData.string)) {
        console.log('String is in RegEx');
        this.results = this.highlightText(this.formData.regeX, this.formData.string);
      } else {
        this.results = [`String Invalid`];
      }

    // replace operation
    } else if (this.formData.radio === 'Replace') {
      let Output: string;
      Output = this.formData.string.replace(this.formData.regeX, this.formData.replace);
      this.results = [Output];
    }

  }

  validateInput() {
    this.formData.regeX = this.utils.validateInput(this.formData.regeX);
  }

  checkMatch(regex: RegExp, data: string): boolean {
    return regex.test(data);
  }

  highlightText(regex: RegExp, data: string) {
    const match = this.formData.string.match(regex)['0'];
    const start = data.search(match);
    console.log(start);
    const stop = (match.length) + start;
    console.log(stop);
    const myArray = data.split('');
    for (let i = start; i < stop; i++) {
      // console.log(myArray[i]);
      myArray[i] = `<span style="background-color: yellow;border-bottom: solid black 1px;">${myArray[i]}</span>`;
    }
    return myArray;
  }

}

class FormData {
  regeX: RegExp;
  string: string;
  radio = 'Find';
  replace?: string;
}
