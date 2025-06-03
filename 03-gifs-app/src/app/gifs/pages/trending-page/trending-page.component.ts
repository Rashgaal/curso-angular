import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';
import { GifService } from '../../services/gifs.service';
// import { isReactive } from '@angular/core/primitives/signals';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

// const imageUrls: string[] = [
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];

@Component({
  selector: 'app-trending-page',
  // imports: [GiftListComponent],
  templateUrl: './trending-page.component.html',
})

export default class TrendingPageComponent implements AfterViewInit{
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');


  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();

  }


  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return;

    // lo que he hecho de scroll
    const scrollTop = scrollDiv.scrollTop
    //lo que ve el cliente
    const clientHeigth = scrollDiv.clientHeight;
    //max posible del scroll
    const scrollHeight = scrollDiv.scrollHeight;

    // debugger;

    //sumar scrollTop + clientHeigth y si se acerca o supera scrollHeight hacemos nueva peticion
    // console.log({scrollTotal: scrollTop + clientHeigth, scrollHeight});
    //los 300 es para que no llegue al final y darle tiempo para hacer la peticion antes de que llegue abajo
    const isAtBottom = scrollTop + clientHeigth + 300>= scrollHeight;
    // console.log({isAtBottom}) ;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(isAtBottom){
      // CARGAR LA SIGUIENTE PETICION
      this.gifService.loadTrendingGifs();
    }
  }
}
