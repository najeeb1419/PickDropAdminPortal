import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { CategoryDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';



@Component({
  selector: 'app-pick-vehicle',
  templateUrl: './pick-vehicle.component.html',
  styleUrls: ['./pick-vehicle.component.css']
})
export class PickVehicleComponent implements OnInit {
  title: string = 'AGM project';
  originLatitude: number;
  originLongitude: number;

  destinationLatitude: number;
  destinationLongitude: number;

  zoom: number;
  address: string;
  private geoCoder;
  vehicleType = google.maps.TravelMode.DRIVING;
  categoryList:CategoryDto[]=[];
  attachmentUrl = AppConsts.attachmentUrl;
  defaultImage = AppConsts.defaultImage;
  
  @ViewChild('search') search: ElementRef;
  @ViewChild('destinationt') destinationt: ElementRef;
  // public searchElementRef: ElementRef;
  public origin: any;
  public destination: any;
  public distance: any;
  public duration: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _categoryService: CategoryServiceProxy,
  ) { }


  ngOnInit(): void {
    this.loadPlaceAuto();
    this.loadDestinationPlaceAuto();
    // this.getDirection();

  }


  loadPlaceAuto() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.search.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.originLatitude = place.geometry.location.lat();
          this.originLongitude = place.geometry.location.lng();
          this.origin = { lat: this.originLatitude, lng: this.originLongitude };
          this.zoom = 12;
        });
      });
    });
  }


  loadDestinationPlaceAuto() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.destinationt.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.destinationLatitude = place.geometry.location.lat();
          this.destinationLongitude = place.geometry.location.lng();
          this.destination = { lat: this.destinationLatitude, lng: this.destinationLongitude };
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.originLatitude = position.coords.latitude;
        this.originLongitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.originLatitude, this.originLongitude);
      });
    }
  }

  markerDragEnd($event: any) {
    console.log($event);
    this.originLatitude = $event.coords.lat;
    this.originLongitude = $event.coords.lng;
    this.getAddress(this.originLatitude, this.originLongitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  public getDistancia(vehicleTYpe: string) {
    this.GetCategories();
    this.vehicleType = vehicleTYpe as google.maps.TravelMode;
    return new google.maps.DistanceMatrixService().getDistanceMatrix({ 'origins': [this.origin], 'destinations': [this.destination], travelMode: this.vehicleType }, 
    (results: any) => {
      this.distance = results.rows[0].elements[0].distance.text;
      this.duration = results.rows[0].elements[0].duration.text;
    });

    
  }



  GetCategories() {
    this._categoryService.getHistory(
      undefined,
      undefined,
      undefined,
      'Category',
      0,
      200
    ).subscribe(result => {
      this.categoryList = result.items;
    });
  }

}
