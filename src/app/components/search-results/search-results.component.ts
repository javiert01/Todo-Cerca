import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onExpand() {
    const listaLocales = document.getElementById('lista-locales');
    const mapa = document.getElementById('mapa');
    const angularMap = document.getElementById('angular-map');
    const iconList = document.getElementById('icon-list');
    const iconMap = document.getElementById('icon-map');
    const verMapaText = document.getElementById('ver-mapa');
    const verListaText = document.getElementById('ver-lista');
    angularMap.setAttribute("style",'width: 100vh; height: 100vh');
    listaLocales.classList.toggle('hide-locales');
    mapa.classList.toggle('expand-map');
    iconMap.classList.toggle('display-none');
    iconList.classList.toggle('display-none');
    verMapaText.classList.toggle('display-none');
    verListaText.classList.toggle('display-none');
  }

  toggleCategories() {
    const menu_categorias = document.getElementById('menu-categorias');
    menu_categorias.classList.toggle('mostrar-categorias');
  }
}

