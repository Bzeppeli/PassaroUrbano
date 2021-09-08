import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas!: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    //this.ofertas = this.ofertasService.getOfertas()
    //console.log(this.ofertas)
    this.ofertasService.getOfertas2()
      .then((ofertas: Oferta[]) => {
        console.log('apareceu 3 seg depois')
        this.ofertas = ofertas
      })
      .catch((param: any) => { 
        console.log(param) 
      })
  }

}
