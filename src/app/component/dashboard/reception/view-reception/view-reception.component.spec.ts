import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceptionComponent } from './view-reception.component';

describe('ViewReceptionComponent', () => {
  let component: ViewReceptionComponent;
  let fixture: ComponentFixture<ViewReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
