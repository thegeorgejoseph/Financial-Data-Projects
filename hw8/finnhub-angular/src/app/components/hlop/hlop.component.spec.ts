import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HLOPComponent } from './hlop.component';

describe('HLOPComponent', () => {
  let component: HLOPComponent;
  let fixture: ComponentFixture<HLOPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HLOPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HLOPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
