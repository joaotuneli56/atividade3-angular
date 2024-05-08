import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Fornecedor } from '../../interfaces/fornecedor';
import { FornecedorService } from '../../services/fornecedor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedor-detail.component.html',
  styleUrl: './fornecedor-detail.component.css'
})
export class FornecedorDetailComponent {

  fornecedorForm: FormGroup = new FormGroup({}); //criar um formulário
  fornecedor?: Fornecedor;

  //Quando o componente é instanciado, o Angular injeta o serviço fornecedorService
  constructor(private fornecedorService: FornecedorService, private FormBuilder: FormBuilder, private route: ActivatedRoute) {

    this.getFornecedorById();
  }

  getFornecedorById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.fornecedorService.getById(id).subscribe((fornecedor) => (this.fornecedor = fornecedor));

    this.fornecedorForm = this.FormBuilder.group({
      nome: [this.fornecedor?.nome],
      email: [this.fornecedor?.email],
      id: [this.fornecedor?.id]
    }); //criar um formulário com os campos nome e telefone
  }
  ngOnInit(): void {
  }

//método para gerar uma string aleatória
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  update(): void {
    if (this.fornecedorForm.valid) {
      const fornecedorAdd: Fornecedor = {
        id: this.fornecedorForm.value.id,
        nome: this.fornecedorForm.value.nome,
        email: this.fornecedorForm.value.email
      };

      this.fornecedorService.update(fornecedorAdd).subscribe();
      alert('Atualizado com sucesso!')
    }
  }

}
