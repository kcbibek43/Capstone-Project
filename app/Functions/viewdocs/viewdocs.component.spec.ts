import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdocsComponent } from './viewdocs.component';

describe('ViewdocsComponent', () => {
  let component: ViewdocsComponent;
  let fixture: ComponentFixture<ViewdocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewdocsComponent]
    });
    fixture = TestBed.createComponent(ViewdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
