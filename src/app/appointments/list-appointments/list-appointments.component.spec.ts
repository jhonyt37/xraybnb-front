import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListAppointmentsComponent } from './list-appointments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppointmentsService } from '../../services/appointments/appointments.service';
import { of } from 'rxjs';

describe('ListAppointmentsComponent', () => {
  let component: ListAppointmentsComponent;
  let fixture: ComponentFixture<ListAppointmentsComponent>;
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let appointmentsService: AppointmentsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListAppointmentsComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useValue: {
            getTranslation: (lang: string) => {
              return of({ 'citas_entrevistas': 'Citas entrevistas' });
            }
          }
        }
      })]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAppointmentsComponent);

    appointmentsService = TestBed.inject(AppointmentsService);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tralate on list of appointments', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    const tralateTittle = translateService.instant('citas_entrevistas');

    expect(tralateTittle).toBe('Citas entrevistas');
  });

  it('should get list of appointments', () => {
    const mockAppointments: any = [
      { date: '2023-10-30T12:00:00', candidateName: 'John', interviewerName: 'Interviewer' },
    ];
    jest.spyOn(appointmentsService, 'getAppointmentsUser').mockReturnValue(of(mockAppointments));
    component.getListAppointments();
    expect(component.totalAppointments.length).toBeGreaterThan(0);
  });

});
