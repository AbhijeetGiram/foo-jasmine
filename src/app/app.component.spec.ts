import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { BaseService } from './services/base.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    const baseServiceStub = () => ({
      fetchUserList: () => ({ subscribe: (f: any) => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [{ provide: BaseService, useFactory: baseServiceStub }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`foo-jasmine`);
  });

  it(`span has value`, () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container span')?.textContent).toContain('foo-jasmine app is running!');
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'loadUserList').and.callThrough();
      component.ngOnInit();
      expect(component.loadUserList).toHaveBeenCalled();
    });
  });

  describe('loadUserList', () => {
    it('makes expected calls success: result', () => {
      const res: any = [
        { "id": "01", "name": "John" },
        { "id": "02", "name": "Mike" }
      ];
      spyOn(component['baseService'], 'fetchUserList').and.returnValue(of(res));
      const spy = spyOn(component, 'loadUserList').and.callThrough();
      component.loadUserList();
      expect(spy).toHaveBeenCalled();
    });

    it('makes expected calls success: zero result', () => {
      spyOn(component['baseService'], 'fetchUserList').and.returnValue(of([]));
      const spy = spyOn(component, 'loadUserList').and.callThrough();
      component.loadUserList();
      expect(spy).toHaveBeenCalled();
    });

    it('makes expected calls success: no result', () => {
      spyOn(component['baseService'], 'fetchUserList').and.returnValue(of({}));
      const spy = spyOn(component, 'loadUserList').and.callThrough();
      component.loadUserList();
      expect(spy).toHaveBeenCalled();
    });

    it('makes expected calls error', () => {
      spyOn(component['baseService'], 'fetchUserList').and.returnValue(throwError({}));
      const spy = spyOn(component, 'loadUserList').and.callThrough();
      component.loadUserList();
      expect(spy).toHaveBeenCalled();
    });
  });
});
