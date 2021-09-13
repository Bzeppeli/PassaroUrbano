import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.module';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css'],
  providers: [ OfertasService ]
})
export class RestauranteComponent implements OnInit {

  public ofertas!: Oferta[]

  public dataTeste: any = new Date(2021, 8, 13)

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertasService.getOfertasPorCategoria('restaurante')
    .then((oferta: Oferta[]) => {
        //console.log(oferta)
        this.ofertas = oferta
    })
  }

}
