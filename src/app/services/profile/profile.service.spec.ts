import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ProfileService', () => {
  let service: ProfileService;
  let httpTestingController: HttpTestingController;
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    });

    service = TestBed.inject(ProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call addExperience service', () => {
    const experiencie = {
      job: "nuevo trabajo",
      company: "empresa nueva",
      description: "descripcion nueva",
      dateInit: "2021-01-01",
      dateEnd: "2021-01-10",
    }
    service.addExperience(1, experiencie).subscribe((data) => {
      expect(data).toBeDefined();
    });

  });
  it('should call addEducation service', () => {
    const education = {
      title: "Nuevo grado",
      type: "Maestria",
      institution: "institucion nueva",
      dateInit: "2021-01-01",
      dateEnd: "2021-01-10",
    }
    service.addEducation(1, education).subscribe((data) => {
      expect(data).toBeDefined();
    });

  });
  it('should call UpdateLanguageSkills service', () => {
    const skills = {
      languages: ["Es", "En"],
      abilities: [1, 2],
    }
    service.UpdateLanguageSkills(1, skills).subscribe((data) => {
      expect(data).toBeDefined();
    });

  });
});
