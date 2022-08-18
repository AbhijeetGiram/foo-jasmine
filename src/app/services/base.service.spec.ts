import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    const httpClientStub = () => ({
      get: () => ({ subscribe: (f: any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BaseService,
        { provide: HttpClient, useFactory: httpClientStub }
      ]
    });
    service = TestBed.inject(BaseService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchUserList', () => {
    it('makes expected calls', () => {
      const res: any = [
        { "id": "01", "name": "John" },
        { "id": "02", "name": "Mike" }
      ];
      spyOn(service['http'], 'get').and.returnValue(of(res));
      const spy = spyOn(service, 'fetchUserList').and.callThrough();
      service.fetchUserList();
      expect(spy).toHaveBeenCalled();
    });
  });
});
