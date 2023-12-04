import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProjectModel} from "../../models/projects";

describe('ProjectsService', () => {
  let service: ProjectsService;
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call registerProject service', () => {
    let registerProjectValue: ProjectModel = {
      projectName: "Mi Proyecto",
      projectDescription: "Descripción de mi proyecto",
      projectDate: new Date(),
      companyId: 0,
      id: 1
    };

    service.registerProject(registerProjectValue).subscribe((data) => {
      expect(data).toBeDefined();
    });

  });

});
