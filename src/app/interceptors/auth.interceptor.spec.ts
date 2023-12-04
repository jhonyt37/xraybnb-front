import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';
import { SessionService } from '../services/auth/session.service';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let sessionService: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        SessionService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    sessionService = TestBed.inject(SessionService);
  });

  it('should add an Authorization header with a valid access token', () => {
    // Mock a user with an access token
    const user = {
      access_token: 'your-access-token',
      // Add other user properties as needed
    };

    // Spy on the session service to return the mock user
    jest.spyOn(sessionService, 'getUser').mockReturnValue(user);

    // Make an HTTP request using the HttpClient
    httpClient.get('/api/data').subscribe((response) => {
      expect(response).toBeTruthy(); // Add your response expectations
    });

    // Expect that an HTTP request was made and check its headers
    const httpRequest = httpTestingController.expectOne('/api/data');
    const headers = httpRequest.request.headers;
    expect(headers.has('Authorization')).toBeTruthy();
    expect(headers.get('Authorization')).toBe(`Bearer ${user.access_token}`);

    // Respond to the request
    httpRequest.flush({ data: 'your-response-data' });

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should not add an Authorization header without a valid access token', () => {
    // Mock a user without an access token
    const user = null;

    // Spy on the session service to return the mock user
    jest.spyOn(sessionService, 'getUser').mockReturnValue(user);

    // Make an HTTP request using the HttpClient
    httpClient.get('/api/data').subscribe((response) => {
      expect(response).toBeTruthy(); // Add your response expectations
    });

    // Expect that an HTTP request was made and check its headers
    const httpRequest = httpTestingController.expectOne('/api/data');
    const headers = httpRequest.request.headers;
    expect(headers.has('Authorization')).toBeFalsy();

    // Respond to the request
    httpRequest.flush({ data: 'your-response-data' });

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });
});
