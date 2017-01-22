import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { AlertService } from '../services/alert.service';
import { Feed } from '../../../stub/socialmessage-api/model/Feed';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  feeds: Observable<Feed[]>;
  errorMessage: Observable<string>;
  loading: boolean;

  constructor(private feedService: FeedService, private alertService: AlertService) {
    
  }

  ngOnInit() {
    this.feeds = this.feedService.getFeeds();
    this.errorMessage = this.alertService.errorMessage$;
  }
}
