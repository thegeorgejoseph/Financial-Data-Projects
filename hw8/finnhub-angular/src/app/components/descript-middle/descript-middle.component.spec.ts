import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptMiddleComponent } from './descript-middle.component';

describe('DescriptMiddleComponent', () => {
  let component: DescriptMiddleComponent;
  let fixture: ComponentFixture<DescriptMiddleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptMiddleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
