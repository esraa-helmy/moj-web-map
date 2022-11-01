var view, map, featureLayer, featureLayerWidget, recentZoomExtent;
var featureLayerUrl = "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/AnnouncementV2/FeatureServer/0"
require(
    ["esri/Map", "esri/views/MapView","esri/layers/FeatureLayer","esri/rest/query",
    "esri/request","esri/identity/IdentityManager","esri/identity/ServerInfo","esri/widgets/LayerList",
    "esri/widgets/TableList", "esri/core/watchUtils", "esri/geometry/Extent","esri/PopupTemplate"],
    function(Map, MapView,FeatureLayer,query,esriRequest,esriId,ServerInfo,LayerList,TableList, watchUtils, Extent,PopupTemplate){
        featureLayerWidget = FeatureLayer
        // create map
        map = new Map({
            basemap: "streets-vector",
            layers: []
        });

        console.log("map initiaited");

        // create map view
        view = new MapView({
            map: map,
            container: "viewDiv"
        });

        // add layer to map
        async function addLayer() 
        {
            featureLayer = new FeatureLayer({
                // URL to the service
                url: featureLayerUrl,
                // refreshInterval : 0.1
            });

            
            
            //add layer to Map
            map.add(featureLayer);
            
        }
        // addLayer().then((resolvedVal) => {
        //     console.log("layer added");
        //   }, (error) => {
        //     console.error("error");
        //   });

          watchUtils.watch(view, "updating", onZoomChange);
          function onZoomChange(newValue, oldValue, propertyName, target) {
           if (!view.updating){
              localStorage.setItem('mapextent', JSON.stringify(view.extent));
           }
          }

          const recentExtent = JSON.parse(localStorage.getItem('mapextent'));
          console.log(recentExtent.xmin)
          var startExtent = new Extent();
            startExtent.xmin = recentExtent.xmin;
            startExtent.ymin = recentExtent.ymin;
            startExtent.xmax = recentExtent.xmax;
            startExtent.ymax = recentExtent.ymax;
            startExtent.spatialReference = recentExtent.spatialReference;
            view.extent = startExtent;

            // featureLayer.refresh();

    }

)