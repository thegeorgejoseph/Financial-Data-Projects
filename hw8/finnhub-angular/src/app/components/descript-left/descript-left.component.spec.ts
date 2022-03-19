import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptLeftComponent } from './descript-left.component';

describe('DescriptLeftComponent', () => {
  let component: DescriptLeftComponent;
  let fixture: ComponentFixture<DescriptLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
