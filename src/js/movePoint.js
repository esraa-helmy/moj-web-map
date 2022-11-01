// require([
//     "esri/Map",
//     "esri/views/MapView",
//     "esri/widgets/Sketch/SketchViewModel",
//     "esri/Graphic",
//     "esri/layers/GraphicsLayer",
//     "esri/widgets/Editor",
//     "esri/widgets/Editor/EditorViewModel",
//     "esri/geometry/support/webMercatorUtils",
//     "esri/layers/FeatureLayer",      
//     "esri/geometry/Polygon",
//     "esri/geometry/Polyline"
//   ], function(
//     Map, MapView, SketchViewModel, Graphic, GraphicsLayer, Editor, EditorViewModel, webMercatorUtils, FeatureLayer, Polygon, Polyline
//   ) {

//     let editGraphic;

//     // First create a point geometry (this is the location of the Titanic)
//     var point = {
//       "spatialReference": {
//       "latestWkid": 3857,
//       "wkid": 102100
//       },
//       "x": -12349307.378622508,
//       "y": 3794215.525960344
//     };

//     // Create a symbol for drawing the point
//     var markerSymbol = {
//       type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
//       color: [226, 119, 40],
//       outline: { // autocasts as new SimpleLineSymbol()
//         color: [255, 255, 255],
//         width: 2
//       }
//     };

//     // Create a graphic and add the geometry and symbol to it
//     var pointGraphic = new Graphic({
//       geometry: point,
//       symbol: markerSymbol
//     });

//     // Create a graphic and add the geometry and symbol to it
//     var pointGraphic1 = new Graphic({
//       geometry: webMercatorUtils.geographicToWebMercator(point),
//       symbol: markerSymbol
//     });


//     // GraphicsLayer to hold graphics created via sketch view model
//     const graphicsLayer = new GraphicsLayer({
//       id: "tempGraphics"
//     });

  

//  const featureLayerr = new FeatureLayer({
//         url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Announcement_WFL1/FeatureServer/0",
//         outFields: ["*"],
//         popupEnabled: false,
//         id: "incidentsLayer"
//       });

//     map.add(featureLayerr);


//     // Create the graphics representing the line and buffer
//     const pointSymbol = {
//             type: "simple-marker",
//             style: "circle",
//             size: 10,
//             color: [0, 255, 255, 0.5]
//           };

//     const polylineSymbol = {
//       type: "simple-line", // autocasts as new SimpleLineSymbol()
//       color: "#8A2BE2",
//       width: "4",
//       style: "dash"
//     };

//     const polygonSymbol = {
//       type: "simple-fill", // autocasts as new SimpleFillSymbol()
//       color: "rgba(138,43,226, 0.8)",
//       style: "solid",
//       outline: {
//         color: "white",
//         width: 1
//       }
//     };

//     const sketchViewModel = new SketchViewModel({
//         view,
//         layer: graphicsLayer,
//         updateOnGraphicClick: false,
//           defaultUpdateOptions: {
//             // set the default options for the update operations
//             toggleToolOnClick: false // only reshape operation will be enabled
//           },
//         pointSymbol,
//         polylineSymbol,
//         polygonSymbol
//       });

//     view.when(function () {
      
//       // Add the graphics to the view's graphics layer
//       // create a new sketch view model        
//       //setUpClickHandler();        
//       view.on("click", function (event) {
//         console.log("State:: "+sketchViewModel.state);

//         if (sketchViewModel.state === "active") {
//             console.log("State:: "+sketchViewModel.state);
//             return;
//           }
//           view.hitTest(event).then(function (response) {
//             var results = response.results;
//             if (results.length > 0) {
//               for (var i = 0; i < results.length; i++) {
//                   editGraphic = results[i].graphic;

//                   //editGraphic.symbol = pointSymbol;   
//                   graphicsLayer.graphics.add(editGraphic);
//                   sketchViewModel.update(editGraphic, { tool: "move" });                                     
                 

//                   //2. Hide Feature from Feature Layer
//                   featureLayerr.definitionExpression = "OBJECTID <> " + editGraphic.attributes.OBJECTID
//                   break;
//               }
//             }
//           });
//         });
      
//       // Listen the sketchViewModel's update-complete and update-cancel events
//       sketchViewModel.on(["update", "undo", "redo"], function(event){
//         console.log(event);
//         onGraphicUpdate(event);
//       });
//       // get the graphic as it is being updated
//     });
    

//       // Runs when sketchViewModel's update-complete or update-cancel
//       // events are fired.
//       function onGraphicUpdate(event) {
//         //console.log("update Graphics..."+event.state);
//         //console.log(graphicsLayer.graphics.items.length);
//         let graphic = '';
//         graphicsLayer.graphics.items.forEach(ele => {              
//             //console.log(ele.geometry.x + " - " +ele.geometry.y);
//             graphic = ele;
//         });
//         let moveGraphicGeo = graphicsLayer.graphics.items[graphicsLayer.graphics.items.length-1].geometry;
//         //console.log(moveGraphicGeo.x + " - " +moveGraphicGeo.y);
//         console.log(graphic.geometry.x + " - " +graphic.geometry.y);
//         const toolType = event.toolEventInfo.type;
       
//         if (event.toolEventInfo && (toolType === "move-stop" || toolType === "reshape-stop"))
       
//         { 
//           console.log("reshape tool completed..");
//           // applyEdit to update the layer
//           // -----------------------------------  Apply Edits   ----------------------------
//           let params = {updateFeatures:[graphic]}
//           featureLayerr.applyEdits(params).then(function(editsResult) {
//             // Get the objectId of the newly added feature.
//             // Call selectFeature function to highlight the new feature.
//             if (editsResult.addFeatureResults.length > 0) {
//               const objectId = editsResult.addFeatureResults[0].objectId;
//               console.log("Object ID updated..."+objectId);
//               //selectFeature(objectId);
//             }
//             //document.getElementById("btnUpdate").style.cursor = "pointer";              
//           }).catch(function(error) {
//             console.log("===============================================");
//             console.error(
//               "[ applyEdits ] FAILURE: ",
//               error.code,
//               error.name,
//               error.message
//             );
//             console.log("error = ", error);
//             //document.getElementById("btnUpdate").style.cursor = "pointer";
//           });

//           featureLayerr.definitionExpression = "OBJECTID > 1"

//             // Remove Graphics
//             graphicsLayer.graphics.removeAll();
//         }
        
//       }

//       // set up logic to handle geometry update and reflect the update on "graphicsLayer"
//       function setUpClickHandler() {
        
//       }
//       setTimeout(featureLayerr, 6000)
    
//   });
