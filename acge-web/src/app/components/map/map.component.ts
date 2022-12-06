import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  public map!: L.Map;
  private farms!: any;
  private WorstFarms!: any;
  private BestFarms!: any;
  private errorMsg!: any;
  private file!: any;
  public UploadForm!: FormGroup;

  //Leaflet Map initialization
  private initMap(): void {
    this.map = L.map('map', {
      center: [-0.5642, 37.1245],
      zoom: 10,
      attributionControl: false,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }
  // Map legend
  private initMapLegend(): void {
    /*Legend specific*/
    var legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = function (map: L.Map) {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML += '<h4>Layers Legend</h4>';
      div.innerHTML +=
        '<i style="background: #008f681a;border:2px solid #008f68;"></i><span>Farms</span><br>';
      div.innerHTML +=
        '<i style="background: #00ff0080;border:2px solid #00ff00;"></i><span>Best Performing Farms</span><br>';
      div.innerHTML +=
        '<i style="background: #ff000080;border:2px solid #ff0000;"></i><span>Worst Performing Farms</span><br>';
      return div;
    };

    // legend.addTo(this.map);
    this.map.addControl(legend);
  }
  private getFeatureProps(props: any) {
    const farm = {
      Farm_Name: props.farm_name,
      SOC: props.soc,
    };
    console.log(farm);
  }
  // Layer Manipulation function top be used by mouse events
  private highlightFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 0.2,
      fillColor: '#DFA612',
    });
    this.getFeatureProps(layer.feature.properties);
  }
  // Reseting the applied styling done by highting
  private resetFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.1,
      fillColor: '#008f68',
    });
  }
  //Preparing Farms data as Leaflet Geojson Layer
  private initFarmsLayer() {
    const farmsLayer = L.geoJSON(this.farms, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.1,
        fillColor: '#008f68',
      }),
      onEachFeature: (feature, layer) =>
        layer.on({
          mouseover: (e) => this.highlightFeature(e),
          mouseout: (e) => this.resetFeature(e),
        }),
    });

    this.map.addLayer(farmsLayer);
    this.map.fitBounds(farmsLayer.getBounds());
    farmsLayer.bringToBack();
  }
  //Preparing WorstFarms data as Leaflet Geojson Layer
  private initWorstFarmsLayer() {
    const farmsLayer = L.geoJSON(this.WorstFarms, {
      style: (feature) => ({
        weight: 4,
        opacity: 0.7,
        color: '#ff0000',
        fillOpacity: 0.5,
        fillColor: '#ff0000',
      }),
      onEachFeature: (feature, layer) =>
        layer.on({
          mouseover: (e) => this.getFeatureProps(feature.properties),
        }),
    });
    this.map.addLayer(farmsLayer);
    this.map.fitBounds(farmsLayer.getBounds());
  }

  //Preparing BestFarms data as Leaflet Geojson Layer
  private initBestFarmsLayer() {
    const farmsLayer = L.geoJSON(this.BestFarms, {
      style: (feature) => ({
        weight: 4,
        opacity: 0.7,
        color: '#00ff00',
        fillOpacity: 0.5,
        fillColor: '#00ff00',
      }),
      onEachFeature: (feature, layer) =>
        layer.on({
          mouseover: (e) => this.getFeatureProps(feature.properties),
        }),
    });
    this.map.addLayer(farmsLayer);
    this.map.fitBounds(farmsLayer.getBounds());
  }

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.UploadForm = this.formBuilder.group({
      file: ['', [Validators.required]],
    });
  }
  get UploadFormControls() {
    return this.UploadForm.controls;
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initMapLegend();
    this.dataService.getFarms().subscribe({
      next: (farms) => {
        this.farms = farms;
        this.initFarmsLayer();
      },
      error: (error) => {
        this.errorMsg = error;
      },
    });
  }

  // Function for reading added file through input field
  uploadFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  // Function for submiting data to the api
  public submitCsv() {
    if (this.UploadForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('csv_file', this.file);
    this.dataService.postFarmcCSV(formData).subscribe({
      next: (results) => {
        console.log(results);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public addWorstFarms() {
    this.dataService.getWorst3Farms().subscribe({
      next: (farms) => {
        this.WorstFarms = farms;
        this.initWorstFarmsLayer();
      },
      error: (error) => {
        this.errorMsg = error;
      },
    });
  }
  public addBestFarms() {
    this.dataService.getBest3Farms().subscribe({
      next: (farms) => {
        this.BestFarms = farms;
        this.initBestFarmsLayer();
      },
      error: (error) => {
        this.errorMsg = error;
      },
    });
  }
}
