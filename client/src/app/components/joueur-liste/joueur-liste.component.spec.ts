import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurListeComponent } from './joueur-liste.component';

describe('JoueurListeComponent', () => {
  let component: JoueurListeComponent;
  let fixture: ComponentFixture<JoueurListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueurListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
