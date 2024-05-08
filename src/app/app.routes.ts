import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FornecedoresComponent } from './components/fornecedores/fornecedores.component';
import { FornecedorDetailComponent } from './components/fornecedor-detail/fornecedor-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'fornecedores', component: FornecedoresComponent},
    { path: 'fornecedores/:id', component: FornecedorDetailComponent},
    { path: '**', component: HomeComponent }
];
