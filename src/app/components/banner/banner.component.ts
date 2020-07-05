import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  slideIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.showSlides();
  }

  showSlides() {
    let i: number;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < slides.length; i++) {
      const slide = slides.item(i);
      slide.style.display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      const dot = dots.item(i);
      dot.classList.remove("active");
    }
    const lastSlide = slides[this.slideIndex - 1];
    const lastDot = dots[this.slideIndex - 1];
    lastSlide.style.display = "block";
    lastDot.classList.add("active");
    setTimeout(() => this.showSlides(), 9000); // Cambiar el tiempo
  }

}
