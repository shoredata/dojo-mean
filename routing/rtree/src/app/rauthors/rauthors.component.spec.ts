import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RauthorsComponent } from './rauthors.component';

describe('RauthorsComponent', () => {
  let component: RauthorsComponent;
  let fixture: ComponentFixture<RauthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RauthorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RauthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
