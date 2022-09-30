import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moments } from 'src/app/Moments';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // para buscar todos registros do banco
  allMoments: Moments[] =[]
  // para buscar momentos na pesquisa
  moments: Moments[] = []
  // Para buscar dados da api
  baseApiUrl = environment.baseApiUrl

  // todo  search

  constructor(
    private momentService: MomentService,
  ) { }

  ngOnInit(): void {
    /* acessa o serviço momentService, no método getMoments, e detalha ele com subscribe
      colocando o valor dentro de (items)
    */
    this.momentService.getMoments().subscribe((items) => {
      // cria constante data e incorpora a formatação 'pt-BR' em uma nova data - um novo corpo de dados
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      });

      // referencia a contante data para os ambos setem o uso da data formatada com a região citada
      this.allMoments = data;
      this.moments = data;

    })
  }

}
