import { Component, OnInit, NgZone } from "@angular/core";
import { LoginAuthService } from "../login-auth.service";
import { FleetserviceService } from "../fleetservice.service";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.sass"]
})
export class MapComponent implements OnInit {
  loginUser: any = {};

  zoom: number = 8;
  // initial center position for the map
  lat: number = 41.808389;
  lng: number = -71.402476;
  constructor(
    private authService: LoginAuthService,
    private _service: FleetserviceService,
    private zone: NgZone
  ) {
    this.authService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem("currentUser"));
    //console.log("this.loginUser", this.loginUser.token);
  }

  ngOnInit() {
    //console.log("this.loginUser.token", this.loginUser.token);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  mapClicked($event: MouseEvent) {
    console.log("dragEnd", $event);
  }

  loadUser() {}
  markers: marker[] = [
    {
      serialNumber: "AU534028",
      model: "DFE28JSHBSS",
      timestamp: 1415903400000,
      latitude: "41.808389",
      longitude: "-71.402476",
      severity: 1,
      vehicleId: "8",
      markerUrl: "assets/image/pins/pin_d_1.png"
    },
    {
      serialNumber: "FF503491",
      model: "PYE22PSHSS",
      timestamp: 1425666600000,
      latitude: "41.830485",
      longitude: "-71.418091",
      severity: 0,
      vehicleId: "11",
      markerUrl: "assets/image/pins/pin_d_1.png"
    },
    {
      serialNumber: "RF513777",
      model: "CYE22TSHSS",
      timestamp: 1440441000000,
      latitude: "41.794382",
      longitude: "-71.454387",
      severity: 2,
      vehicleId: "17",
      markerUrl: "assets/image/pins/pin_d_2.png"
    },
    {
      serialNumber: "TG400464",
      model: "SE25JSHEC",
      timestamp: 0,
      latitude: "41.807059",
      longitude: "-71.389835",
      severity: 0,
      vehicleId: "4",
      markerUrl: "assets/image/pins/pin_d_3.png"
    }
  ];

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Themes begin
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartdiv", am4charts.PieChart);

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";

      // Let's cut a hole in our Pie chart the size of 20% the radius
      chart.innerRadius = am4core.percent(20);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      // change the cursor on hover to make it apparent the object can be interacted with
      pieSeries.slices.template.cursorOverStyle = [
        {
          property: "cursor",
          value: "pointer"
        }
      ];

      pieSeries.alignLabels = false;
      pieSeries.labels.template.disabled = true;
      pieSeries.labels.template.bent = true;
      pieSeries.labels.template.radius = 3;
      pieSeries.labels.template.padding(0, 0, 0, 0);

      pieSeries.ticks.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      let shadow = pieSeries.slices.template.filters.push(
        new am4core.DropShadowFilter()
      );
      shadow.opacity = 0;

      // Create hover state
      let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Add a legend
      chart.legend = new am4charts.Legend();

      chart.data = [
        {
          country: "O-Load",
          litres: 10
        },
        {
          country: "C-Load",
          litres: 20
        },
        {
          country: "U-Load",
          litres: 4
        },
        {
          country: "No-Load",
          litres: 2
        }
      ];
    });
  }
}

// just an interface for type safety.
interface marker {
  serialNumber: string;
  model: string;
  timestamp: number;
  latitude: string;
  longitude: string;
  severity: number;
  vehicleId: string;
  markerUrl: string;
}
