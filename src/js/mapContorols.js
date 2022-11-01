require(["esri/widgets/Bookmarks", "esri/widgets/Measurement", "esri/widgets/ScaleBar", "esri/widgets/Legend",
  "esri/widgets/Fullscreen", "esri/widgets/Locate", "esri/Graphic", "esri/widgets/Search", "esri/widgets/BasemapToggle"], 
    function (Bookmarks, Measurement, ScaleBar, Legend, Fullscreen, Locate, Graphic, Search, BasemapToggle)
    {
        
      // Set the activeView to the 2D MapView
      let activeView = view;

      // basemap toggle 
      let basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "satellite"
      });
      view.ui.add(basemapToggle, {
        position: "top-right"
      });
      // Create new instance of the Measurement widget
      const measurement = new Measurement();


      // Set-up event handlers for buttons and click events
    //   const switchButton = document.getElementById("switch-btn");
      const distanceButton = document.getElementById("distance");
      const areaButton = document.getElementById("area");
      const clearButton = document.getElementById("clear");

    //   switchButton.addEventListener("click", () => {
    //     switchView();
    //   });
      distanceButton.addEventListener("click", () => {
        distanceMeasurement();
      });
      areaButton.addEventListener("click", () => {
        areaMeasurement();
      });
      clearButton.addEventListener("click", () => {
        clearMeasurements();
      });

      // Call the loadView() function for the initial view
      loadView();

      // The loadView() function to define the view for the widgets and div
      function loadView() {
        activeView.set({
          container: "viewDiv"
        });
        // Add the appropriate measurement UI to the bottom-right when activated
        activeView.ui.add(measurement, "bottom-right");      
        // Set the views for the widgets
        measurement.view = activeView;
      }

      // When the 2D or 3D button is activated, the switchView() function is called
      function switchView() {
        // Clone the viewpoint for the MapView or SceneView
        const viewpoint = activeView.viewpoint.clone();
        // Get the view type, either 2d or 3d
        const type = activeView.type;

        // Clear any measurements that had been drawn
        clearMeasurements();

        // Reset the measurement tools in the div
        activeView.container = null;
        activeView = null;
        // Set the view based on whether it switched to 2D MapView or 3D SceneView
        activeView = type.toUpperCase() === "2D" ? sceneView : mapView;
        activeView.set({
          container: "viewDiv",
          viewpoint: viewpoint
        });
        // Add the appropriate measurement UI to the bottom-right when activated
        activeView.ui.add(measurement, "bottom-right");
        // Add the legend to the bottom left
        activeView.ui.add(legend, "bottom-left");

        // Set the views for the widgets
        measurement.view = activeView;
        legend.view = activeView;
        // Reset the value of the 2D or 3D switching button
        switchButton.value = type.toUpperCase();
      }

      // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
      function distanceMeasurement() {
        const type = activeView.type;
        measurement.activeTool =
          type.toUpperCase() === "2D" ? "distance" : "direct-line";
        distanceButton.classList.add("active");
        areaButton.classList.remove("active");
      }

      // Call the appropriate AreaMeasurement2D or AreaMeasurement3D
      function areaMeasurement() {
        measurement.activeTool = "area";
        distanceButton.classList.remove("active");
        areaButton.classList.add("active");
      }

      // Clears all measurements
      function clearMeasurements() {
        distanceButton.classList.remove("active");
        areaButton.classList.remove("active");
        measurement.clear();
      }
    
      // end 2d measurement Widget

      // create scaleBar
      let scaleBar = new ScaleBar({
          view: view,
          position: "bottom-left",
          style: "ruler",
          unit: "metric"
        });
        // Add widget to the bottom left corner of the view
        view.ui.add(scaleBar, {
          position: "bottom-left"
        });

      // Create Legend
      let legend = new Legend({
          view: view,
          label: "مفتاح الخريطة"
      });
    //   view.ui.add(legend, {position: "bottom-right"});

      // create fullscreen widget
      let fullscreen = new Fullscreen({
        view:view
      });
      view.ui.add(fullscreen, {
        position: "top-left"
      });

      let locateWidget = new Locate({
        view: view,   // Attaches the Locate button to the view
        graphic: new Graphic({
          symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
          // graphic placed at the location of the user when found
        })
      });
      // view.ui.add(locateWidget, "top-right");

      // create search widget
      const searchWidget = new Search({
        view: view,
        locationEnabled: false,
        placeholder:"ssssssssss"
      });
      // Adds the search widget below other elements in
      // the top left corner of the view
      view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
      });

      // custom Div
      customDiv = document.getElementById("custom-div")
      // view.ui.add(customDiv, "bottom-right");


      // generate filter ui
      var filterChoice = document.getElementById("filter-choice");
      view.ui.add(filterChoice, "bottom-right");
      var filter = document.getElementById("cd-filter");
        // view.ui.add(filter, "bottom-right");
      

})