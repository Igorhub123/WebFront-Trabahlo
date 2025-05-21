import { Router, Routes } from '@angular/router';
import { ListagemComponent } from './marmit-hub/listagem/listagem.component'
import { CadastroComponent } from './marmit-hub/cadastro/cadastro.component'
import { EdicaoComponent } from './marmit-hub/edicao/edicao.component'

export const routes: Routes = [
    { path: '', redirectTo: 'listagem', pathMatch: 'full' },
    { path: 'listagem', component: ListagemComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'edicao/:id', component: EdicaoComponent }
];