import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { faTimes, faEdit, faE } from '@fortawesome/free-solid-svg-icons';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { Moments } from 'src/app/Moments';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moments;

  baseApiUrl = environment.baseApiUrl;

  // Acessando os icons
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentoService: MomentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentoService  // carregamento do dado 
      .getMoment(id)
      .subscribe(item => 
        this.moment = item.data);
  }
}
