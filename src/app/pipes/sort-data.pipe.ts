import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortData',
  standalone: true,
  pure: false
})
export class SortDataPipe implements PipeTransform {

  transform(arr: any[], property: string): any[] {
    // @ts-ignore
    arr.sort((a:any, b:any) => {
      if(a[property] < b[property]) return -1;
      if(a[property] > b[property]) return 1;
    })
    return arr;
  }

}
