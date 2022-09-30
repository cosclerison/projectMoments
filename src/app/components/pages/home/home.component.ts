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
  allMoments: Moments[] =[] // para buscar todos registros do banco
  moments: Moments[] = [] // para buscar momentos na pesquisa
  
  baseApiUrl = environment.baseApiUrl // Para buscar dados da api

  faSearch = faSearch; // ativa o icon de lupa para pesquisa
  searchTerm: string = ''; // Inicia a variável vazia

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

  search(e: Event): void { //Evento vindo do input

    const target = e.target as HTMLInputElement //pega o evento do HTML input
    const value = target.value // pega o valor do evento inserido no "target"

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value);// a busca vai ser feita no html pelo campo title
    });
  }
}
