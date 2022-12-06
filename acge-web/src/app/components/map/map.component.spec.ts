import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as L from 'leaflet';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a Leaflet map', () => {
    expect(component.map).toBeTruthy();
    expect(component.map instanceof L.Map).toBeTruthy();
  });

  it('should create a form with file controls', () => {
    expect(component.UploadForm.contains('file')).toBeTruthy();
  });

  it('should make the file control required', () => {
    const control = component.UploadForm.get('file');
    control!.setValue('');
    expect(control!.valid).toBeFalsy();
  });
});
