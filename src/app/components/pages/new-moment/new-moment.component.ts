import { MomentService } from './../../../services/moment.service';
import { Component, OnInit } from '@angular/core';

import { Moments } from 'src/app/Moments';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText: string = 'Compartilhar!'

  constructor(private momentService: MomentService) { }

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
  }
}
