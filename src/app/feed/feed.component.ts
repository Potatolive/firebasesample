import { Component, OnInit, Input } from '@angular/core';
import { Feed } from '../../../stub/socialmessage-api/model/Feed';
import { ApiService } from '../services/api.service';
import { FbService } from '../services/fb.service';
import { ErrorHelper } from '../helpers/error.helper';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() feed: Feed;
  message: string;
  pages: any[];

  constructor(private apiService : ApiService, private fbService: FbService) {
    
     
  }

  ngOnInit() {
    
  }

  fbLogin() {
    this.fbService.init();
    this.fbService.login().subscribe(
      data => {
        this.fbService.getPages().subscribe(
          (data : any) => {
            this.pages = data.data;
            console.log(data.data);
          }
        );
      }
    );
  }

  update() {
    console.log(this.feed);
    this.apiService.Api.putFeedById(this.apiService.Token, this.getId(), this.feed).subscribe(
      data => {
        this.message = data.message;
      },
      err => {
        this.message = ErrorHelper.getErrorMessage(err);
      },
      () => {
        
      });
  }

  create() {
    console.log(this.feed);
    this.apiService.Api.postFeed(this.apiService.Token, this.feed).subscribe(
      data => {
        this.feed = data;
      },
      err => {
        this.message = ErrorHelper.getErrorMessage(err);
      },
      () => {
        
      });
  }

  getId() : any {
    return (this.feed as any)._id;
  }
}
