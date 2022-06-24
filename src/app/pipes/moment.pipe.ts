import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(date: Date, format: string = 'DD/MM/YYYY HH:mm'): unknown {
    if(!date) {
      return 'N/A'
    }
    
    return moment.utc(date).local().format(format);
  }

}
