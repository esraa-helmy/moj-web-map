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

  

  map = new Map("map", {
    basemap: "streets",
    center: [29, 30],
    zoom: 11
  });

  map.on("layers-add-result", initEditing);

  var featureLayer = new FeatureLayer("https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Announcement_WFL1/FeatureServer/0", {
    mode: FeatureLayer.MODE_ONDEMAND,
    outFields: ["*"],
    id: "featureLayer"
  });
  map.addLayers([featureLayer]);

  function initEditing(evt) {
    var editToolbar = new Edit(map);
    editToolbar.on("deactivate", function(evt) {
      if (evt.info.isModified) {
        featureLayer.applyEdits(null, [evt.graphic], null);
      }
    });

    var editingEnabled = false;
    featureLayer.on("dbl-click", function(evt) {
      event.stop(evt);
      if (editingEnabled) {
        editingEnabled = false;
        editToolbar.deactivate();
        featureLayer.clearSelection();
      }
      else {
        editingEnabled = true;
        editToolbar.activate(Edit.EDIT_VERTICES, evt.graphic);
        // select the feature to prevent it from being updated by map navigation
        var query = new Query();
        query.objectIds = [evt.graphic.attributes[featureLayer.objectIdField]];
        featureLayer.selectFeatures(query);
      }
    });
  }
});

$(document).ready(setTimeout(createPopup, 6000))