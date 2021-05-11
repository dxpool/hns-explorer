import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { toASCII } from 'punycode';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  spy: any;
  query = '';
  url = [];
  notFound = false;
  types = {
    Name: 'name',
    Block: 'block',
    Transaction: 'tx'
  }

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) {
    this.spy = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.query = this.route.snapshot.queryParams.q;
        this.checkQuery(this.query);
      }
    })
  }

  ngOnDestroy(): void {
    this.spy.unsubscribe();
  }

  async checkQuery(q: string) {
    try {
      q = toASCII(q);
      let result = await this.api.search(q);
      switch (result.length) {
        case 0:
          this.notFound = true;
          break;
        case 1:
          this.router.navigateByUrl(result[0].url);
        default:
          this.url = result;
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
