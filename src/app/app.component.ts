import { Component } from '@angular/core';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'foo-jasmine';

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.loadUserList();
  }

  loadUserList() {
    this.baseService.fetchUserList().subscribe((res: any) => {
      if (res && res.length > 0) {
        console.log('loadUserList(): if', res);
      } else if (res && res.length === 0) {
        console.log('loadUserList(): else if', res);
      } else {
        console.log('loadUserList(): else', res);
      }
    }, (error: Error) => {
      // console.error(error);
    });
  }
}
