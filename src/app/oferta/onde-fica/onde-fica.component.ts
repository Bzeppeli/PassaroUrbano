import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = ''

  constructor(private route: ActivatedRoute, private oferta: OfertasService) { }

  ngOnInit(): void {
    this.oferta.getOndeFicaPorId(this.route.parent?.snapshot.params['id'])
    .then((resposa: string) => {
        this.ondeFica = resposa
    })
  }

}
