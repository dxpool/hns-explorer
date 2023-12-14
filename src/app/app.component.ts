import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hns-explorer';

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['zh', 'en', 'zh-tw']);

    let saveLang = localStorage.getItem('lang');
    if (!saveLang) saveLang = navigator.language.match('en') ? 'en' : 'zh';

    this.translateService.use(saveLang);
  }
}
