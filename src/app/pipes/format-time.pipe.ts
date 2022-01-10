import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {

    if (value) {
      var mm = Math.floor((value/100) / 60);
      var ss = Math.floor((value/100) - (mm * 60));
      var ms = value.toString().slice(-2) 
  
      return ("00" + mm).slice(-2) + ':' + ("00" + ss).slice(-2) + '.' + ms;  
    } else {
      return ("--:--")
    }
    
  }

}




