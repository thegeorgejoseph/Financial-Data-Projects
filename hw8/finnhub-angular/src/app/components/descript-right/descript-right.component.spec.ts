import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptRightComponent } from './descript-right.component';

describe('DescriptRightComponent', () => {
  let component: DescriptRightComponent;
  let fixture: ComponentFixture<DescriptRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
