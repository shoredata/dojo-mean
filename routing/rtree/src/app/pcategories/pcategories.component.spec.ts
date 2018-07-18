import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcategoriesComponent } from './pcategories.component';

describe('PcategoriesComponent', () => {
  let component: PcategoriesComponent;
  let fixture: ComponentFixture<PcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
