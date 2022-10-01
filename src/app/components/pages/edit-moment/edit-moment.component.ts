import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Moments } from 'src/app/Moments';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moments;
  btnText: string = 'Editar';

  constructor(
    private messagesService: MessagesService,
    private momentService: MomentService,
    private route: ActivatedRoute,
    private Router: Router,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // carrega o id vindo da rota do service

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })
  }

  async editHandler(momentData: Moments) {
    
    const id = this.moment.id;
    const title = this.moment.title;

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messagesService.add(`Momento ${id} atualizado com sucesso`);

    this.Router.navigate(['/']);
  }
}
