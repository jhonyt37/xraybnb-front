import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeamsService } from './teams.service';
import { environment } from '../../../environments/environment';

describe('TeamsService', () => {
  let service: TeamsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamsService],
    });
    service = TestBed.inject(TeamsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get teams by project', () => {
    const projectId = 1;
    const mockTeams = [{ id: 1, name: 'Team A' }];

    service.getTeamsByproject(projectId).subscribe((teams) => {
      expect(teams).toEqual(mockTeams);
    });

    const req = httpTestingController.expectOne(`${environment.url_api}/projects-app/teams/${projectId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTeams);
  });

  it('should add member to a team', () => {
    const mockMember = { teamId: 1, memberId: 2 };
    const response = { message: 'Member added successfully' };

    service.addMemberToTeam(mockMember).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpTestingController.expectOne(`${environment.url_api}/projects-app/teams/add-member-team`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockMember);

    req.flush(response);
  });

  it('should get candidates by team', () => {
    const teamId = 1;
    const mockCandidates = [{ id: 1, name: 'Candidate A' }];

    service.getCandidateByTeam(teamId).subscribe((candidates) => {
      expect(candidates).toEqual(mockCandidates);
    });

    const req = httpTestingController.expectOne(`${environment.url_api}/projects-app/teams/candidates/${teamId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockCandidates);
  });
});