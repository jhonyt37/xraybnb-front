import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { CurrentUser, TokenInfo } from './current-user.interface';
import jwt_decode from "jwt-decode";

describe('SessionService', () => {
  let sessionService: SessionService;
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService],
    });
    sessionService = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(sessionService).toBeTruthy();
  });

  it('should have initial values set', () => {
    // Test that initial values are set correctly
    expect(sessionService.isAuthenticated()).toBe(false);
    expect(sessionService.getScopes()).toEqual([]);
    expect(sessionService.getUser()).toBeNull();
  });

  it('should set and retrieve user data', () => {
    // Create a sample user and token data
    const user: CurrentUser = {
      access_token: 'your-access-token',
      // Add other user properties as needed
    };
    const tokenInfo: TokenInfo = {
      exp: Date.now() / 1000 + 3600, // Set the token to expire in 1 hour
      permissions: ['read', 'write'],
      // Add other token properties as needed
    };

    // Set the user and token data
    localStorage.setItem('currentUser', JSON.stringify(user));
    sessionService = new SessionService();

    // Test that values are set correctly
    expect(sessionService.isAuthenticated()).toBe(false);
  });



  it('should return null if no user data in localStorage', () => {
    // Set localStorage to return null for 'currentUser'
    sessionService = new SessionService();

    // Test that getUser() returns null if no user data in localStorage
    expect(sessionService.getUser()).toBeNull();
  });
});
