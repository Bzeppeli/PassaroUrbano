import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.module';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Oferta[]>
  public ofertasFiltradas!: Oferta[]

  private subjectPesqisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
     this.ofertas = this.subjectPesqisa
     .pipe(debounceTime(300))
     .pipe(distinctUntilChanged())
     .pipe(switchMap((termoDaBusca: string)=> {
        console.log('requisicao http para api')
        if(termoDaBusca.trim() === ''){
          //retornar um observable de array de ofertas vazio
          return of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termoDaBusca)
     }))
     .pipe(catchError((err: any) => {
       //console.log(err)
       return of<Oferta[]>([])
     }))

     this.ofertas.subscribe((ofertas: Oferta[]) => {
       //console.log(ofertas)
       this.ofertasFiltradas = ofertas
     })
  }

  public pesquisa(termoDaBusca: string): void{
    //console.log('key up caracter: ', termoDaBusca)
    this.subjectPesqisa.next(termoDaBusca)



   /* this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)

    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas),
                            (erro:any) => console.log('ofertas não carregadas', erro),
                            () => console.log('fluxo completo')
    )*/
  }

}
