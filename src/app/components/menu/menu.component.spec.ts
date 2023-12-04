import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const currentUser = { access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjN4QUhqaVFOVl9WbjctcXRTQWFVMyJ9.eyJpc3MiOiJodHRwczovL2FiYy1qb2JzLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjUyYWM2MjgxMzViNTFhMTMyNGE5Y2YxIiwiYXVkIjoiaHR0cDovL2FiYy1qb2JzLnVzZXJzLWFwaS5kZXYiLCJpYXQiOjE2OTc2Nzc4MTQsImV4cCI6MTY5Nzc2NDIxNCwiYXpwIjoicFdzWUtHRE02MGNkdERPd0FkR1p5VDlpcGlBY0hSNE4iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbInJlYWQ6bG9jYXRpb24iLCJyZWFkOnVzZXJzIiwicmVnaXN0ZXI6Y29tcGFueSJdfQ.rMSMjblwUb17nrOZNwQBzWF9cEpDs1Zntf6m6XehlfI_fcwi0Id-u0wFrXA5Ao1wL8iKRAWxcItTWRnm1kz38w4rfdXO-5-KHARgKqGXbuzcF-BXbsxxU7ZYol5wvgDrk8JJFjsO5M22J9DA4DLpGoORNQtAexa82bdLU4wTySXRW5v__hSDVDz10227CcM4UtNyKoLQ7TAL5BT3Lkc2Rozsa0AF9VRchBj2qMNJhAXF2I26_HSAytD_hfuVXktj3jHN4KaklpHIBJXmoENaSGJDA18Dgdi5IilE5x6jxVNWgcC3id5nuzatGI09YO2YFn9bEwQ0SQvpwv_fuugHPA' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
      })],
      declarations: [MenuComponent]
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
