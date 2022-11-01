// require(["esri/views/MapView",
//       "esri/WebMap",
//       "esri/Graphic",
//       "esri/config",
//       "esri/widgets/Sketch/SketchViewModel",
//       "esri/layers/GraphicsLayer",
//       "esri/geometry/support/webMercatorUtils"
//     ], function (MapView, WebMap, Graphic, esriConfig, SketchViewModel, GraphicsLayer, webMercatorUtils) {
//       /************************************************************
//        * Creates a new WebMap instance. A WebMap must reference
//        * a PortalItem ID that represents a WebMap saved to
//        * arcgis.com or an on-premise portal.
//        *
//        * To load a WebMap from an on-premise portal, set the portal
//        * url with esriConfig.portalUrl.
//        ************************************************************/
//        config.apiKey =
//           "apikey";
      

//       /************************************************************
//        * Set the WebMap instance to the map property in a MapView.
//        ************************************************************/
    
//       var graphicsLayer = new GraphicsLayer();
//       map.featureLayer.add(graphicsLayer);

//       // Create a point
//       var point = {
//         type: "point",
//         longitude: 30.159843448357865,
//         latitude: -29.374449292814024
//       };

//       var simpleMarkerSymbol = {
//         //You had "simple maker" notice the "r" is missing        
//         type: "simple-marker", //
//         color: [226, 119, 40], // orange
//         size: 30,
//         style: "circle",
//         outline: {
//           color: [255, 255, 255], // white
//           width: 2
//         }
//       };

//       var pointGraphic = new Graphic({
// //edited geometry has to be in the same spatial reference as the view        
//         geometry: wgs84.geographic(point),
//         symbol: simpleMarkerSymbol
//       });
//       graphicsLayer.add(pointGraphic);

//       var sketch = new SketchViewModel({
//         layer: graphicsLayer,
//         view: view,
//         //container: "viewDiv"
//       });

    

// //You have to activate the sketchviewmodels update method
//       view.on("click", function (event) {
//         view.hitTest(event).then(function (response) {
//           var results = response.results;
//           results.forEach(function (result) {
//             if (result.graphic.layer === SketchViewModel.layer) {
//                 SketchViewModel.update([result.graphic], {
//                 tool: "move"
//               });
//             }
//           });
//         })
//       });
//     });



// require([
//         "esri/widgets/Sketch",
//         "esri/Map",
//         "esri/layers/GraphicsLayer",
//         "esri/views/MapView"
//       ], function (Sketch, Map, GraphicsLayer, MapView) {
//         function initSketch(){
//             const sketch = new Sketch({
//                 layer: map.layers.getItemAt(0),
//                 view: view,
//                 // a will be selected as soon as it is created
//                 creationMode: "update"
//               });
      
//               view.ui.add(sketch, "top-right");
//         }

//         setTimeout(initSketch, 6000)
        
//       });



// require([
//     "esri/config",
//     "esri/map",
//     "esri/SnappingManager",
//     "esri/dijit/editing/Editor",
//     "esri/layers/FeatureLayer",
//     "esri/tasks/GeometryService",
//     "esri/toolbars/draw",
//     "dojo/keys",
//     "dojo/parser",
//     "dojo/_base/array",
//     "dojo/i18n!esri/nls/jsapi",
//     "dijit/layout/BorderContainer",
//     "dijit/layout/ContentPane",
//     "dojo/domReady!"
//   ], function (
//     esriConfig, Map, SnappingManager, Editor, FeatureLayer, GeometryService,
//     Draw, keys, parser, arrayUtils, i18n
//     ) {
    
//     function initFeatureEditing(){
//         parser.parse();

//     //snapping is enabled for this sample - change the tooltip to reflect this
//     i18n.toolbars.draw.start += "<br/>Press <b>CTRL</b> to enable snapping";
//     i18n.toolbars.draw.addPoint += "<br/>Press <b>CTRL</b> to enable snapping";

//     //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications
//     esriConfig.defaults.geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

 

//     map.on("layers-add-result", initEditing);

//     var operationsPointLayer = map.layers.getItemAt(0);
   
   

//     map.addLayers([
//       operationsPointLayer
//     ]);
//     map.infoWindow.resize(400, 300);

//     function initEditing (event) {
//       var featureLayerInfos = arrayUtils.map(event.layers, function (layer) {
//         return {
//           "featureLayer": layer.layer
//         };
//       });

//       var settings = {
//         map: map,
//         layerInfos: featureLayerInfos
//       };
//       var params = {
//         settings: settings
//       };
//       var editorWidget = new Editor(params, 'editorDiv');
//       editorWidget.startup();

//       //snapping defaults to Cmd key in Mac & Ctrl in PC.
//       //specify "snapKey" option only if you want a different key combination for snapping
//       map.enableSnapping();
//     }

//     }
//     setTimeout(initFeatureEditing, 6000)
//   });





require([
    "esri/map",
    "esri/toolbars/edit",
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "esri/config",
  
    "dojo/_base/event",
    "dojo/parser",
  
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", 
    "dojo/domReady!"
  ], function(
    Map, Edit, FeatureLayer, Query, esriConfig,
    event, parser
  ) {
    parser.parse();
  
    
  
   
  
    map.on("layers-add-result", initEditing);
  
    // var editiFeatureLayer = map.layers.getItemAt(0); 
    // editi
    // new FeatureLayer("https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Announcement_WFL1/FeatureServer/0", {
    //   mode: FeatureLayer.MODE_ONDEMAND,
    //   outFields: ["*"],
    //   id: "featureLayer"
    // });
    // map.addLayers([featureLayer]);
  
    function initEditing(evt) {
      var editToolbar = new Edit(map);
      editToolbar.on("deactivate", function(evt) {
        if (evt.info.isModified) {
            securedLayer.applyEdits(null, [evt.graphic], null);
        }
      });
  
      var editingEnabled = false;
      securedLayer.on("dbl-click", function(evt) {
        event.stop(evt);
        if (editingEnabled) {
          editingEnabled = false;
          editToolbar.deactivate();
          securedLayer.clearSelection();
        }
        else {
          editingEnabled = true;
          editToolbar.activate(Edit.EDIT_VERTICES, evt.graphic);
          // select the feature to prevent it from being updated by map navigation
          var query = new Query();
          query.objectIds = [evt.graphic.attributes[securedLayer.objectIdField]];
          securedLayer.selectFeatures(query);
        }
      });
    }
    setTimeout(initFeatureEditing, 6000)
  });
  
 