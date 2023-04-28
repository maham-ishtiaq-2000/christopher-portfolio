import {Component, ElementRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import Isotope from 'isotope-layout';
import {Items} from 'src/app/shared/interfaces/items.interface';
import * as imagesLoaded from 'imagesloaded';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  Object = Object;
  selectFilter: string = "All";
  items: Items[] = [];
  imagesDidLoad = false;

  filter = new Set<string>();

  private _iso!: Isotope;
  hoverSelect:string='';
  hoverCount:string='';
  /**
   * Creates an instance of ProjectsComponent.
   * @param {Title} _title
   * @memberof ProjectsComponent
   */
  constructor(private _title: Title, private _el: ElementRef, private _http: HttpClient) {
    this._title.setTitle('Projects - Chris Rodriguez');

    this._getprojects().then(()=> {
      this._loadImages();
    });
   }

  /**
   * @param {Event} event
   * @memberof ProjectsComponent
   */
  onFilterClick(event: Event) {
    const target = event.target as HTMLButtonElement | HTMLSelectElement;
    const value = target.value || target.getAttribute('data-filter') || 'All';
    this.selectFilter = value;

    if (value === 'All') {
      this._iso.arrange({
        filter: () => true,
      });
    } else {
      this._iso.arrange({
        filter: (itemElem: any) => {
          const number = itemElem.getAttribute('data-category');
          const myArray = number.split(', ');
          return myArray.includes(value);
        },
      });
    }
  }

  /**
   * @param {any[]} values
   * @memberof ProjectsComponent
   */
  uniqueValues() {
    this.items.forEach((x) => {
      Object.values(x.attributes).forEach((y) => {
          if (this.filter.has(y)) {
            return;
          }
          this.filter.add(y);
      });
    });
  }

  get filters(): string[] {
    return Array.from(this.filter);
  }

  private _loadImages() {
    const E = this._el.nativeElement.querySelector('.grid');

    imagesLoaded(E, (res) => {
      if ((res as any).isComplete) {
        setTimeout(() => {
          this.imagesDidLoad = true;
          this._iso = new Isotope(E, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
              gutter: 0,
            },
          });
          this.uniqueValues();
  
          const gridItems = E.querySelectorAll('.grid-item');
          gridItems.forEach((item: HTMLElement) => {
            this._addIsotopeClassOnViewport(item);
          });
        }, 500);
      }
    });
  }

  filterDatacount(name:string){
    var dataCount:any;
    if (name){
      dataCount = this.items.filter((item: any) => {
        const findData = item.attributes.filter((itemset: any) => itemset === name)
        return findData.length > 0 ? true : false;
  
      })
    }
    else{
      dataCount=this.items;
    }

    return dataCount.length;
  }
  private async _getprojects(): Promise<Items[]> {
    const result = await firstValueFrom(this._http.get<any[]>('./assets/json/projects.json'));

    if (result !== undefined) {
      this.items = result;
    }

    return this.items;
  }

  private _addIsotopeClassOnViewport(element: HTMLElement) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fC = element.firstChild as HTMLElement;
          if(fC) {
            fC.classList.add('grid-show');
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    observer.observe(element);
  }

  mouseEnter(name: string) {
    var dataCount: any;
    if (name) {
      this.hoverSelect = name;
      dataCount = this.items.filter((item: any) => {
        const findData = item.attributes.filter((itemset: any) => itemset === name)
        return findData.length > 0 ? true : false;
      })
    }
    else {
      dataCount = this.items;
      this.hoverSelect ='All';
    }

    this.hoverCount = dataCount.length > 0 ? dataCount.length.toString()  :'';
  }

  mouseLeave() {
    this.hoverSelect='';
    this.hoverCount='';
  }
}