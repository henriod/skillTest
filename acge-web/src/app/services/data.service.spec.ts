import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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
    const testUrl = 'http://localhost:8000/api/v1/farms/';
    const testData = {
      type: 'FeatureCollection',
      features: [
        {
          id: 'dd475b42-5a70-4d29-9d23-efa247e7fb6a',
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [36.6828918621896, -1.32209309690797],
                  [36.6817693146741, -1.32150868054062],
                  [36.6820704404787, -1.32093144548994],
                  [36.6831869679401, -1.32151282288075],
                  [36.6828918621896, -1.32209309690797],
                ],
              ],
            ],
          },
          bbox: [
            36.6817693146741, -1.32209309690797, 36.6831869679401,
            -1.32093144548994,
          ],
          properties: {
            farm_name: 'Pleasant meadows',
            soc: 200000,
          },
        },
        {
          id: '9d69dca7-da20-4271-8011-8a748d132a8a',
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [36.6850667258066, -1.32229655146208],
                  [36.6842792083558, -1.32189105361013],
                  [36.6848066586475, -1.32080704408268],
                  [36.6856292169269, -1.32121257411664],
                  [36.6850667258066, -1.32229655146208],
                ],
              ],
            ],
          },
          bbox: [
            36.6842792083558, -1.32229655146208, 36.6856292169269,
            -1.32080704408268,
          ],
          properties: {
            farm_name: 'Green fields',
            soc: 135000,
          },
        },
        {
          id: '27f35704-3b33-445b-b66c-eaa7bd1c9e13',
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [36.6834076867451, -1.3214422180075],
                  [36.6838969220348, -1.32047970045412],
                  [36.6840429681333, -1.32043076351651],
                  [36.6848066586475, -1.32080704408268],
                  [36.6842792083558, -1.32189105361013],
                  [36.6834076867451, -1.3214422180075],
                ],
              ],
            ],
          },
          bbox: [
            36.6834076867451, -1.32189105361013, 36.6848066586475,
            -1.32043076351651,
          ],
          properties: {
            farm_name: 'Bella Vista',
            soc: 175000,
          },
        },
        {
          id: '739bb157-3408-40a3-8cb5-bb54120ac065',
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [36.6814440018922, -1.3190542543773],
                  [36.6826434266373, -1.31661103383083],
                  [36.6831275582099, -1.31687657956897],
                  [36.683108707304, -1.31693353539037],
                  [36.6825704684497, -1.31804795623787],
                  [36.6819543358792, -1.31930712134356],
                  [36.6814440018922, -1.3190542543773],
                ],
              ],
            ],
          },
          bbox: [
            36.6814440018922, -1.31930712134356, 36.6831275582099,
            -1.31661103383083,
          ],
          properties: {
            farm_name: 'Dominion farms',
            soc: 12500,
          },
        },
        {
          id: '72b05257-4b72-4469-8b7f-b7a603e4cd38',
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [36.6794131501547, -1.31792603802093],
                  [36.6805857676736, -1.31551669110996],
                  [36.6809502979615, -1.31565701102695],
                  [36.6813291646532, -1.31584130195935],
                  [36.6813291646524, -1.31584130286333],
                  [36.6801836967707, -1.31830805870633],
                  [36.6796065273706, -1.31802195066048],
                  [36.6794131501547, -1.31792603802093],
                ],
              ],
            ],
          },
          bbox: [
            36.6794131501547, -1.31830805870633, 36.6813291646532,
            -1.31551669110996,
          ],
          properties: {
            farm_name: 'Yala swaps',
            soc: 120000,
          },
        },
        {
          id: 'a214b3aa-ced6-476c-9440-cfacefc277f8',
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [36.6848670291739, -1.32065280130079],
                  [36.6840212111592, -1.32023595269827],
                  [36.6845031184618, -1.31925550131646],
                  [36.6853401809825, -1.31966793239002],
                  [36.6848670291739, -1.32065280130079],
                ],
              ],
            ],
          },
          bbox: [
            36.6840212111592, -1.32065280130079, 36.6853401809825,
            -1.31925550131646,
          ],
          properties: {
            farm_name: 'Kano swaps',
            soc: 150000,
          },
        },
        {
          id: '053f2f52-4a8e-4ccd-a60e-dde7fce30c4e',
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [36.6853401809825, -1.31966793239002],
                  [36.6845031184618, -1.31925550131646],
                  [36.6851375235976, -1.31796576582771],
                  [36.6860723164723, -1.31838159415916],
                  [36.6860481787779, -1.31843144357707],
                  [36.6849595188329, -1.32069835105683],
                  [36.6848670291739, -1.32065280130079],
                  [36.6853401809825, -1.31966793239002],
                ],
              ],
            ],
          },
          bbox: [
            36.6845031184618, -1.32069835105683, 36.6860723164723,
            -1.31796576582771,
          ],
          properties: {
            farm_name: 'Ahero plans',
            soc: 155000,
          },
        },
      ],
    };

    service.getFarms().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
