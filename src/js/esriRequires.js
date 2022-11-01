var customMap, 
customMapView, 
customFeatureLayer, 
customQuery, 
customEsriRequest, 
customEsriId, 
customServerInfo,
customLayerList,
customTableList,
// FeatureTable Requires
customFeatureTable,
customReactiveUtils,
customSupportQuery

require([
    // Map Requires
    "esri/Map", 
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/rest/query",
    "esri/request",
    "esri/identity/IdentityManager",
    "esri/identity/ServerInfo",
    "esri/widgets/LayerList",
    "esri/widgets/TableList",
    // FeatureTable Requires
    "esri/widgets/FeatureTable",
    "esri/core/reactiveUtils",
    "esri/rest/support/Query",
],
function(
    // Map Requires
    Map, 
    MapView,
    FeatureLayer,
    query,
    esriRequest,
    esriId,
    ServerInfo,
    LayerList,
    TableList,
    // FeatureTable Requires
    FeatureTable, 
    reactiveUtils,
    Query
    )
    {
    // Map Requires
    customMap = Map;
    customMapView = MapView;
    customFeatureLayer = FeatureLayer;
    customQuery = query;
    customEsriRequest = esriRequest;
    customEsriId = esriId;
    customServerInfo = ServerInfo;
    customLayerList = LayerList;
    customTableList = TableList;

    // FeatureTable Requires
    customFeatureTable = FeatureTable;
    customReactiveUtils = reactiveUtils;
    customSupportQuery = Query;
})