import { Component, Input } from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() type: string;
  @Input() list: any[];
  @Input() page: number;
  @Input() total: number;
  @Input() pageSize: number;
  @Input() changePage: Function;
  @Input() loading: boolean;

  @Input() status: string[];
  @Input() selectedStatus: string;
  @Input() changeStatus: Function;

  iconUp = faAngleUp;
  iconDown = faAngleDown;

  isOpen = false;

  title = {
    blocks: 'title.blocks',
    names: 'title.names',
    history: 'title.history'
  }

  constructor() { }

  open(e: boolean) {
    this.isOpen = e;
  }
}
