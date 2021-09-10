import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''

  constructor(private route: ActivatedRoute, private ofertaService: OfertasService) { }

  ngOnInit(): void {
    console.log(this.route.parent?.snapshot.params['id'])
    this.ofertaService.getComoUsarOfertaProId(this.route.parent?.snapshot.params['id'])
    .then((resposta: string) => {
        this.comoUsar = resposta
    })
  }

}
