import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from './../../../services/moment.service';
import { Component, OnInit } from '@angular/core';

import { Moments } from 'src/app/Moments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText: string = 'Compartilhar!'

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async createHandler(moment: Moments) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image) {
      formData.append('image', moment.image);
      console.log('Deu Certo');
    }

    await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add('Momento adicionado com sucesso!');

    this.router.navigate(['/']);

  }
}
