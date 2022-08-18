import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseService]
    });
    service = TestBed.inject(BaseService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchUserList', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.fetchUserList().subscribe(res => {
        expect(res).toEqual();
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush();
      httpTestingController.verify();
    });
  });
});
