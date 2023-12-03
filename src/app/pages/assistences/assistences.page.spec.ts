import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistencesPage } from './assistences.page';

describe('AssistencesPage', () => {
  let component: AssistencesPage;
  let fixture: ComponentFixture<AssistencesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssistencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
