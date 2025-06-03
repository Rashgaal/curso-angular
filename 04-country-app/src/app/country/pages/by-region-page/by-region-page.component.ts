import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region-interface';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Europe';
}


@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];


  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  //queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  //temporal
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  //selectedRegion = signal<Region | null>(null);
  //                                                                     default
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));


  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      console.log({ request: request.region })
      if (!request.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region,
        }
      });

      return this.countryService.searchByRegion(request.region)

    },
  });

  // En el HTML se hace directamente
  // selectRegion(region: Region) {
  //   this.selectedRegion.set(region);
  // }
}
