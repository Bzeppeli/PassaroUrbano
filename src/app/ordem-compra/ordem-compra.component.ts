import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra!: number

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]), 
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'complemento': new FormControl(null, [Validators.maxLength(150)]), 
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompra(): void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('endereco')?.markAllAsTouched
      this.formulario.get('numero')?.markAllAsTouched
      this.formulario.get('formaPagamento')?.markAllAsTouched
    }else {
      let pedido: Pedido = new Pedido(this.formulario.value.endereco, this.formulario.value.numero ,this.formulario.value.complemento ,this.formulario.value.formaPagamento)

      this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) => {
         this.idPedidoCompra = idPedido
         console.log(this.idPedidoCompra)
      })

    }
  }
}
