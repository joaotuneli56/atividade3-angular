import { FornecedorService } from './../../services/fornecedor.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fornecedor } from '../../interfaces/fornecedore';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.css'
})
export class FornecedoresComponent {

  fornecedorForm: FormGroup = new FormGroup({});
  fornecedor: Fornecedor[] = [];

  constructor(private fornecedorService: FornecedorService, private formBuilder: FormBuilder) {
    this.fornecedorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      emial: ['', Validators.required],
      material: ['', Validators.required]
    });
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  insert() {
    if (this.fornecedorForm.valid) {
      const forncedorAdd: Fornecedor = {
        id: this.generateRandomString(5),
        nome: this.fornecedorForm.value.nome,
        email: this.fornecedorForm.value.email,
        material: this.fornecedorForm.value.material
      };
      this.fornecedor.push(forncedorAdd);
      this.fornecedorForm.reset();
      this.fornecedorService.add(forncedorAdd).subscribe();
      alert('Inserido com sucesso!')
    }
  }

  list(): void {
     this.fornecedorService.list().subscribe((fornecedor) => (this.fornecedor = fornecedor));
  }

  ngOnInit(): void {
    this.list();
  }

  remover(id: string): void {
    this.fornecedor = this.fornecedor.filter((c) => c.id !== id);
    this.fornecedorService.remove(id).subscribe();
    alert('Removido com sucesso!')
  }
}
