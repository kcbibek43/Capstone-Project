import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagelistComponent } from './messagelist.component';

describe('MessagelistComponent', () => {
  let component: MessagelistComponent;
  let fixture: ComponentFixture<MessagelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagelistComponent]
    });
    fixture = TestBed.createComponent(MessagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
