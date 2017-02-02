import { Component, OnInit } from '@angular/core';
import { Feed } from '../../../stub/socialmessage-api/model/Feed';
import { FeedApi } from '../../../stub/socialmessage-api/api/FeedApi';
import { SecureCrudService } from '../services/secure.crud.service';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  public get feedCrudModel() : SecureCrudService<Feed, FeedApi> {
    return this._feedCrudModel;
  }

  constructor(
    http: Http,
    private _feedCrudModel: SecureCrudService<Feed, FeedApi>
    ) {
    this._feedCrudModel.init(new FeedApi(http, environment.api));
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.feedCrudModel.listItems();
  }

  addFeed(addedFeed: Feed) {
    this.refresh();
  }
}
