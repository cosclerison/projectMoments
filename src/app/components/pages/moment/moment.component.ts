import { MessagesService } from 'src/app/services/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { 
  FormControlDirective,
  FormControl,
  FormGroup,
  Validator,
  Validators,
  FormGroupDirective,
 } from '@angular/forms';

import { faTimes, faEdit, faCancel } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from 'src/app/services/comment.service';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { Moments } from 'src/app/Moments';
import { Comment } from 'src/app/Comment';


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
  faCancel = faCancel;

  commentForm!: FormGroup

  constructor(
    private messagesService: MessagesService,
    private commentService: CommentService,
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

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }
  
  get username() {
    return this.commentForm.get('username')!;
  }

  cancel() {
    this.router.navigate(['/']);
  }

  // remove os dados do banco, o mesmo aguarda o resultado para dar continuidade
  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.delete('');

    this.router.navigate(['/']); 
  }

  async onSubmit(formDirective: FormGroupDirective) {
    
    if(this.commentForm.invalid){
      return
    }

    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add('Comentário adicionado!');

    // Reset the form
    this.commentForm.reset();
    formDirective.resetForm();
    // this.router.navigate(['/'])
  }
}
