import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxUserComponent } from './dialog-box-user.component';

describe('DialogBoxUserComponent', () => {
  let component: DialogBoxUserComponent;
  let fixture: ComponentFixture<DialogBoxUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
