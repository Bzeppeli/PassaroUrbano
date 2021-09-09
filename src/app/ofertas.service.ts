import { Oferta } from "./shared/oferta.module"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { URL_API } from "./app.api"
//import 'rxjs/add/operator/toPromises'
//import { map } from 'rxjs/operators'

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) { }



    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)

    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorId(id: string): Promise<Oferta> {
        return this.http
            .get(`${URL_API}?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                //onsole.log(resposta.shift());
                return resposta[0];
            });
    }
}

    /*public getOfertas2(): Promise<Oferta[]> {
        return new Promise((resolve, reject) => {
            //algum tipo de processamento, que ao finalizar, chama a função resolve ou a função reject
            console.log('será que passou por aqui?')
            let deuCerto = true
            if(deuCerto) {
                setTimeout(() => resolve(this.ofertas), 3000)
            } else {
                reject({ codigo_erro: 404, mensagem_erro: 'Servidor não Encontrado' })
            }
            
        })
        .then( (ofertas: any) => {
            //fazer alguma tentativa
            console.log('primeiro then')

            return this.ofertas
        }).then((ofertas: any) => {
            //fazer outra tratativa
            console.log('segundo then')
            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    resolve2( ofertas )
                }, 3000)
            })
        }).then((ofertas: any) => {
            console.log('terceiro then executado após 3 segundos, por que estava aguardando uma promisse ser resolvida')
            return ofertas
        })
    }*/