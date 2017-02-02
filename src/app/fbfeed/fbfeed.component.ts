import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Feed } from '../../../stub/socialmessage-api/model/Feed';
import { FbService } from '../services/fb.service';
import { FeedApi } from '../../../stub/socialmessage-api/api/FeedApi';
import { SecureCrudService } from '../services/secure.crud.service';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-fbfeed',
  templateUrl: './fbfeed.component.html',
  styleUrls: ['./fbfeed.component.css']
})
export class FbfeedComponent implements OnInit {
  @Output() createFeed : EventEmitter<Feed> = new EventEmitter();
  pages: any[];
  selectedPage: any = {};
  hashTag: string;
  api: FeedApi;

  constructor(
    private http: Http,
    private feedService: SecureCrudService<Feed, FeedApi>,
    private fbService: FbService) {
      this.feedService.init(new FeedApi(http, environment.api));
  }

  ngOnInit() {
    
  }

  isLoggedIntoFB() : boolean {
    return this.fbService.AccessToken != null;
  }

  fbLogin() {
    this.fbService.init();
    this.fbService.login().subscribe(
      data => {
        this.fbService.AccessToken = data;
        this.fbService.getPages().subscribe(
          (data : any) => {
            this.pages = data.data;
          }
        );
      }
    );
  }

  create() {
    let feed: Feed = {};
    feed.feedType = Feed.FeedTypeEnum.facebook;
    feed.feedName = this.selectedPage.name;
    feed.feedHandle = this.selectedPage.id;
    feed.hashTag = this.hashTag;
    this.feedService.create(feed);

    this.feedService.item.subscribe(data => {
      if(data) {
        let id = (data as any)._id;
        if(id) {
          this.feedService.Api.authorizeToScrap(id, this.feedService.Token, this.fbService.AccessToken).subscribe(
            authData => {
              console.log(authData);
            },
            err => {
              console.log(err);
            },
            () => {

            }
          )
        }
      }
    });
    this.createFeed.emit(feed);
  }

  authorize() {
    
  }
}
