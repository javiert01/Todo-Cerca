import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  onGoToTop() {
    document
      .querySelector("#section-3-registro")
      .scrollIntoView({ behavior: "smooth" });
  }
}
