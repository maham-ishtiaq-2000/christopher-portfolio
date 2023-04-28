import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  showButton = false;

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true); // Add scroll event listener
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true); // Remove scroll event listener
  }

  scroll = (): void => {
    this.showButton = (window.scrollY > 0) ? true : false;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
