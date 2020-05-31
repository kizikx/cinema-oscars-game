import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutGameComponent } from './ajout-game.component';

describe('GameComponent', () => {
  let component: AjoutGameComponent;
  let fixture: ComponentFixture<AjoutGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
