require(["esri/views/MapView",
      "esri/WebMap",
      "esri/Graphic",
      "esri/config",
      "esri/widgets/Sketch/SketchViewModel",
      "esri/layers/GraphicsLayer",
      "esri/geometry/support/webMercatorUtils"
    ], function (MapView, WebMap, Graphic, esriConfig, SketchViewModel, GraphicsLayer, webMercatorUtils) {
      /************************************************************
       * Creates a new WebMap instance. A WebMap must reference
       * a PortalItem ID that represents a WebMap saved to
       * arcgis.com or an on-premise portal.
       *
       * To load a WebMap from an on-premise portal, set the portal
       * url with esriConfig.portalUrl.
       ************************************************************/
       config.apiKey =
          "apikey";
      

      /************************************************************
       * Set the WebMap instance to the map property in a MapView.
       ************************************************************/
    
      var graphicsLayer = new GraphicsLayer();
      map.layers.add(graphicsLayer);

      // Create a point
      var point = {
        type: "point",
        longitude: 28.159843448357865,
        latitude: -29.374449292814024
      };

      var simpleMarkerSymbol = {
        //You had "simple maker" notice the "r" is missing        
        type: "simple-marker", //
        color: [226, 119, 40], // orange
        size: 30,
        style: "circle",
        outline: {
          color: [255, 255, 255], // white
          width: 2
        }
      };

      var pointGraphic = new Graphic({
//edited geometry has to be in the same spatial reference as the view        
        geometry: wgs84.geographic(point),
        symbol: simpleMarkerSymbol
      });
      graphicsLayer.add(pointGraphic);

      var sketch = new SketchViewModel({
        layer: graphicsLayer,
        view: view,
        //container: "viewDiv"
      });

    

//You have to activate the sketchviewmodels update method
      view.on("click", function (event) {
        view.hitTest(event).then(function (response) {
          var results = response.results;
          results.forEach(function (result) {
            if (result.graphic.layer === SketchViewModel.layer) {
                SketchViewModel.update([result.graphic], {
                tool: "move"
              });
            }
          });
        })
      });
    });