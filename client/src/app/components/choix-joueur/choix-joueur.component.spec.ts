import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixJoueurComponent } from './choix-joueur.component';

describe('ChoixJoueurComponent', () => {
  let component: ChoixJoueurComponent;
  let fixture: ComponentFixture<ChoixJoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixJoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
