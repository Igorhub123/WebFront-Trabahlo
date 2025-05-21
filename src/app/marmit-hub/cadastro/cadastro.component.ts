import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarmitHubService } from '../marmit-hub.service';
import { Router } from '@angular/router';
import { MarmitHub } from '../marmit-hub.model';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true 
})
export class CadastroComponent {
  marmithub: MarmitHub = {
    id: 0,
    descricao: "",
    data_food: new Date(),
    disp_ped: false,
    cod_tamanho: '',
    valor_tamanho: 0,
  }

  dataInput: string = this.formatDateToInput(this.marmithub.data_food);

  constructor(
    private marmithubservice: MarmitHubService,
    private router: Router
  ) {}

  salvar() {
    this.marmithub.data_food = new Date(this.dataInput);

    this.marmithubservice.cadastrarMarmitHub(this.marmithub).subscribe(() => {
      this.router.navigate(['../listagem']);
    });
  }

  private formatDateToInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
