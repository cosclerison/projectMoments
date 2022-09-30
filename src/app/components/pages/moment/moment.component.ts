import { MessagesService } from 'src/app/services/messages.service';
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
    private messagesService: MessagesService,
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService  // carregamento do dado 
      .getMoment(id)
      .subscribe(item => 
        this.moment = item.data);
  }

  // remove os dados do banco, o mesmo aguarda o resultado para dar continuidade
  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.delete('');

    this.router.navigate(['/']); 
  }
}
