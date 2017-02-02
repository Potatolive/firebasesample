import { Component, OnInit, Input } from '@angular/core';
import { Feed } from '../../../stub/socialmessage-api/model/Feed';
import { ErrorHelper } from '../helpers/error.helper';
import { FeedApi } from '../../../stub/socialmessage-api/api/FeedApi';
import { SecureCrudService } from '../services/secure.crud.service';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() feed: Feed = {};
  pages: any[];
  
  constructor(
    http: Http,
    private _feedService: SecureCrudService<Feed, FeedApi> //Operates on Feeds in a secure way using FeedApi
  ) {
    this._feedService.init(new FeedApi(http, environment.api));
  }

  ngOnInit() {
    
  }

  update() {
    this._feedService.update(this.feed);
  }

  create() {
    this._feedService.create(this.feed);
  }

  delete() {
    this._feedService.delete(this.feed);
  }

  scrap() {
    let id = this.feed ? (this.feed as any)._id : undefined;
    this._feedService.Api.scrapNewPostsFromSource(id, this._feedService.Token,{message: "Sample"}).subscribe(
      data => {
        console.log
      }
    );
  }
}
