import { Injectable } from "@angular/core";
@Injectable()
export class Utils {

  validateInput(data: RegExp) {

    // sets to string and removes all whitespaces
    let res = data.toString();
    res = (res).replace(/ /g, '');

    // if string starts with backslash, remove it
    if (res.charAt(0) === '/') {
      res = res.substring(1);
    }

    // if string ends with backslash, remove it
    if (res.charAt(res.length - 1) === '/') {
      res = res.substring(0, res.length - 1);
    }

    return new RegExp(res);
  }
}
