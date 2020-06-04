import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixOscarsComponent } from './choix-oscars.component';

describe('ChoixOscarsComponent', () => {
  let component: ChoixOscarsComponent;
  let fixture: ComponentFixture<ChoixOscarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixOscarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixOscarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
