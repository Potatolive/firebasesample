import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { Feed } from '../../../stub/socialmessage-api/model/Feed';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  feeds: Subject<Feed[]> = new BehaviorSubject([]);
  errorMessage: Subject<string> = new BehaviorSubject('');
  loading: boolean = true;
  newFeed: Feed = { };

  constructor(
    private apiService: ApiService, 
    private alertService: AlertService) {
    
  }

  ngOnInit() {
    this.refreshFeeds();
  }

  refreshFeeds() {
    this.loading = true;
    this.apiService.Api.getFeeds(this.apiService.Token).subscribe(
      data => {
        this.feeds.next(data);
      },
      err => {
        this.errorMessage.next(AlertService.getErrorMessage(err));
      },
      () => {
        this.loading = false;
      }
    );
  }
}
