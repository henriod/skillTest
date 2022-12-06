import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getFarms() {
    return this.http.get(environment.listFarms);
  }

  public getWorst3Farms() {
    return this.http.get(environment.listWorstFarms);
  }

  public getBest3Farms() {
    return this.http.get(environment.listBestFarms);
  }
  public postFarmcCSV(data: FormData) {
    return this.http.post(environment.uploadCsvFarms, data);
  }
}
