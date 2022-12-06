import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch geoJSON data from the specified URL', () => {
    const testUrl = environment.listFarms;
    const testData = 'features';

    service.getFarms().subscribe((data) => {
      expect(data).toContain(testData);
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
