import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbrandsComponent } from './pbrands.component';

describe('PbrandsComponent', () => {
  let component: PbrandsComponent;
  let fixture: ComponentFixture<PbrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
