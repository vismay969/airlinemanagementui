import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(collection: any[], field: string, value: string): any[] {
    if (!collection) {
      return [];
    }
    if (!field || !value) {
      return collection;
    }
    if (isNaN(parseInt(value, 10))) {
      return collection.filter(item => item[field].includes(value));
    }    else {
      return collection.filter(item => item[field] === parseInt(value, 10));
    }
    return null;
  }

}

