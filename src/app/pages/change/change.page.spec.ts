import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePage } from './change.page';

describe('ChangePage', () => {
  let component: ChangePage;
  let fixture: ComponentFixture<ChangePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
