import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnDestroy {
  pageSize = 20;
  lists = [];
  page = 1;
  total = 0;
  loading = true;

  spy: Subscription;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
    this.spy = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const page = this.route.snapshot.queryParams.page || 1;
        this.handleBlocks(page);
      }
    });
  }

  ngOnDestroy(): void {
    this.spy.unsubscribe();
  }

  changePage(page: number) {
    this.router.navigate(['/blocks'], { queryParams: { page } });
  }

  async handleBlocks(page: number) {
    try {
      this.loading = true;

      const blocks = await this.api.getBlocks(this.pageSize, (page - 1) * this.pageSize);

      this.total = blocks.total;
      this.lists = blocks.result;
      this.page = page;
      this.loading = false;

    } catch (error) {
      console.error(error);
    }
  }
}
