import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
//import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  //injectamos el servicio
  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  //al llevarmelo al servicio de la paginacion en shared lo comento aqui para traermelo de alli
  // activatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map(params => (params.get('page') ? +params.get('page')! : 1)),
  //     map( page => (isNaN(page) ? 1 : page)),
  //   ),
  //   {
  //     initialValue:1,
  //   }
  // )

  // para hacer la peticion http tan pronto como ingrese (nos conectamos a un observable)
  productsResource = rxResource({
    request: () => ({page: this.paginationService.currentPage()-1}),
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: request.page * 9,
      });
    },
  });

}
