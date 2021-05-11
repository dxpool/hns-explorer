import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  spy: any;
  url = '';
  mobileNav = false;
  faBars = faBars;
  faSearch = faSearch;
  type = 'home';
  heroForm: FormGroup;
  languages = [
    { name: '简体中文', avatar: '../../../assets/images/flags/zh.png' },
    { name: 'English', avatar: '../../../assets/images/flags/en.png' }
  ];
  selectedLang = null;

  titles = {
    home: { zh: 'HNS 浏览器', en: 'HNS Explorer' },
    blocks: { zh: 'HNS | 区块记录', en: 'HNS | Blocks' },
    block: { zh: 'HNS | 区块 # ', en: 'HNS | Block # ' },
    names: { zh: 'HNS | 域名记录', en: 'HNS' }
  }

  constructor(private router: Router, private translateService: TranslateService, private title: Title) {
    this.spy = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.url = e.url;
        this.mobileNav = false;

        this.setTitleAndNav(e.url);
      }
    });
  }

  ngOnInit(): void {
    this.selectedLang =
      this.translateService.currentLang === 'en' ? this.languages[1].name : this.languages[0].name;
  }

  ngOnDestroy(): void {
    this.spy.unsubscribe();
  }

  async search(f: NgForm) {
    try {
      const query = f.form.value.query.trim();
      this.router.navigateByUrl('/search?q=' + query);

    } catch (error) {
      console.error(error);
    }
  }

  showMobileNav() {
    this.mobileNav = !this.mobileNav;
  }

  closeMobileNav() {
    this.mobileNav = false;
  }

  change(item: string) {
    const type = item === 'English' ? 'en' : 'zh';
    this.translateService.use(type);
    localStorage.setItem('lang', type);
    this.setTitleAndNav(this.url);
  }

  async setTitleAndNav(path: string) {
    const part = path.split('/');
    const titleText = await this.translateService.get('head').toPromise();

    switch (part[1]) {
      case '':
        this.title.setTitle(titleText.title.home);
        this.type = 'home';
        break;
      case 'blocks':
        this.title.setTitle(titleText.title.blocks);
        this.type = 'blocks';
        break;
      case 'block':
        this.title.setTitle(titleText.title.block + part[2]);
        this.type = 'blocks';
        break;
      case 'names':
        this.title.setTitle(titleText.title.names);
        this.type = 'names';
        break;
      case 'name':
        this.title.setTitle(titleText.title.name + part[2]);
        this.type = 'names';
        break;
      case 'tx':
        this.title.setTitle(titleText.title.tx + part[2]);
        this.type = 'none';
        break;
      case 'address':
        this.title.setTitle(titleText.title.address + part[2]);
        this.type = 'none';
        break;
      case 'charts':
        this.title.setTitle(titleText.title.charts);
        this.type = 'charts';
        break;
      default:
        this.title.setTitle(titleText.title.home);
        this.type = 'none';
        break;
    }
  }

  getHighlight(tab: string) {
    return this.type === tab ? 'active' : '';
  }
}
