import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''

  //atributos de controle de validação dos campos
  public enderecoValido!: boolean
  public numeroValido!: boolean
  public complementoValido!: boolean
  public formaPagamentoValido!: boolean

  //atributos para estados primitivos dos campos --> estado pristine
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  //controlar o botão confirmar compra
  public formEstado: string = 'disabled'

  //pedido
  public pedido!: Pedido 

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
    //this.ordemCompraService.efetivarCompra()
  }

  public atualizaEndereco(endereco: string): void{
    this.endereco=endereco

    this.enderecoEstadoPrimitivo = false

    this.enderecoValido = this.endereco.trim().length > 3 ? true : false
    this.habilitaForm()

  }
  
  
  public atualizaNumero(numero: string): void{
    this.numero=numero

    this.numeroEstadoPrimitivo = false

    this.numeroValido = this.numero.length > 0 ? true : false 
    this.habilitaForm()
  }

  public atualizaComplemento(complemento: string): void{
    this.complemento=complemento

    this.complementoEstadoPrimitivo = false

    this.complementoValido = this.complemento.length > 0 ? true : false
    this.habilitaForm()
  }

  public atualizaFormaPagamento(formaPagamento: string): void{
    this.formaPagamento=formaPagamento

    this.formaPagamentoEstadoPrimitivo = false

    this.formaPagamentoValido = this.formaPagamento.length > 0 ? true : false 
    this.habilitaForm()
  }

  public habilitaForm(): void {
    if(this.enderecoValido == true &&
      this.numeroValido == true &&
      this.formaPagamentoValido == true ) {
      this.formEstado = ''
    }else {
      this.formEstado = 'disable'
    }
  }

  public confirmarCompra(): void{

    this.pedido = new Pedido(this.endereco, this.numero, this.complemento, this.formaPagamento)
    this.ordemCompraService.efetivarCompra(this.pedido).subscribe()
  }

}
