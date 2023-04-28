import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('object') sunOrMoonElementRef!: ElementRef<HTMLDivElement>;
  private intervalId: any;
  now: Date;
  hour: number;
  minute: number;

  constructor(private _title: Title) {
    this._title.setTitle('Chris Rodriguez');
    this.now = new Date();
    this.hour = this.now.getHours();
    this.minute = this.now.getMinutes();
  }

  ngAfterViewInit() {
    this.intervalId = setInterval(() => {
      this.rotateSunAndMoon();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  rotateSunAndMoon() {
    // Update time
    this.now = new Date();
    this.hour = this.now.getHours();
    this.minute = this.now.getMinutes();
  
    // Get sun or moon element
    const sunOrMoon = this.sunOrMoonElementRef.nativeElement;
      
    // Determine whether it is currently daytime or nighttime
    const isDaytime = this.hour >= 6 && this.hour < 19;
  
    // Set sun or moon class and visibility based on whether it is currently daytime or nighttime
    if (isDaytime) {
      sunOrMoon.classList.add('sun');
      sunOrMoon.classList.add('rays');
      sunOrMoon.classList.remove('moon');
    } else {
      sunOrMoon.classList.add('moon');
      sunOrMoon.classList.remove('sun');
      sunOrMoon.classList.remove('rays');
    }
  }
}
