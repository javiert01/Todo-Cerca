import { Pipe, PipeTransform, ɵConsole } from '@angular/core';

@Pipe({name: 'capitalPipe'})
export class CapitalPipe implements PipeTransform {
  transform(value: string): string {
    let newStr = '';
    if (value.length > 0) {
      const separatedValues = value.split(' ');
      if (separatedValues.length > 0) {
        newStr += separatedValues[0];
        for (let i = 1; i < separatedValues.length; i++) {
          newStr += ' ';
          if (separatedValues[i].length > 1) {
            const first = separatedValues[i][0].toUpperCase();
            newStr += (first + separatedValues[i].substring(1));
          } else {
            newStr += separatedValues[i];
          }
        }
      } else {
        newStr += value;
      }
    } else {
      newStr += value;
    }
    return newStr;
  }
}

