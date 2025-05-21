import { Component, OnInit } from '@angular/core';
import { MarmitHub } from '../marmit-hub.model';
import { MarmitHubService } from '../marmit-hub.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  marmithubs: MarmitHub[] = [];
  termoBusca: string = '';

  constructor(private marmithubService: MarmitHubService) { }

  ngOnInit(): void {
    this.carregarMarmit();
  }

  carregarMarmit(): void {
    this.marmithubService.listarMarmitHub().subscribe((res) => {
      this.marmithubs = res;
    });
  }

  buscarMarmitas(): void {
    const termo = this.termoBusca.trim();

    if (!termo) {
      this.carregarMarmit();
      return;
    }

    const idBusca = Number(termo);

    if (!isNaN(idBusca)) {
      this.marmithubService.buscarMarmitHub(idBusca).subscribe({
        next: (res) => {
          this.marmithubs = res ? [res] : [];
        },
        error: () => {
          this.marmithubs = [];
        }
      });
    } else {
      this.marmithubService.buscarMarmitHubPorDescricao(termo).subscribe(res => {
        this.marmithubs = res;
      });
    }
  }

  excluirMarmita(id: number): void {
    if (confirm('Tem certeza que deseja excluir essa marmita?')) {
      this.marmithubService.deletarMarmitHub(id).subscribe({
        next: () => {
          alert('Marmita excluída com sucesso!');
          this.carregarMarmit();
        },
        error: (erro) => {
          alert('Erro ao excluir marmita.');
          console.error(erro);
        }
      });
    }
  }
}
