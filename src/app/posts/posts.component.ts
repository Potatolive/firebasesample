import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialPost } from '../../../stub/socialmessage-api/model/SocialPost';
import { SocialPostApi } from '../../../stub/socialmessage-api/api/SocialPostApi';
import { SecureCrudService } from '../services/secure.crud.service';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  private sub: any;
  private feedId: any;
  private posts: SocialPost[];

  constructor(
    private route: ActivatedRoute,
    http: Http,
    // private _postCrudModel: SecureCrudService<SocialPost, SocialPostApi>
    ) {

    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.feedId = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
