import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlayersComponent } from './modal-players.component';

describe('ModalPlayersComponent', () => {
  let component: ModalPlayersComponent;
  let fixture: ComponentFixture<ModalPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
