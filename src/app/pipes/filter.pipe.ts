import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], searchText: string): any {
    if(!products) return [];
    if(!searchText) return products;

    searchText = searchText.toLowerCase();
    return products.filter( p => {
          return p.product.name.toLowerCase().includes(searchText);
        });
       }

}
