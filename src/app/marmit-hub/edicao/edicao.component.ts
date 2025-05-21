import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarmitHub } from '../marmit-hub.model';
import { MarmitHubService } from '../marmit-hub.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EdicaoComponent implements OnInit {

  marmithub: MarmitHub = {
    id: 0,
    descricao: '',
    data_food: new Date(),
    disp_ped: false,
    cod_tamanho: '',
    valor_tamanho: 0
  };

  dataInput: string = '';

  constructor(
    private marmithubservice: MarmitHubService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 0) {
      this.marmithubservice.buscarMarmitHub(id).subscribe((marmita) => {
        this.marmithub = marmita;
        this.dataInput = this.formatDateToInput(new Date(marmita.data_food));
      });
    }
  }

  atualizar(): void {
    this.marmithub.data_food = this.createDateWithoutTimezone(this.dataInput);
    this.marmithubservice.atualizarMarmitHub(this.marmithub.id, this.marmithub).subscribe(() => {
      this.router.navigate(['/listagem']);
    });
  }

  private formatDateToInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private createDateWithoutTimezone(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // cria no fuso local, sem UTC
  }
}
