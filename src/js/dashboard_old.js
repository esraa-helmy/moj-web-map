// Load the Map and MapView modules
require([
  "esri/Map", 
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/rest/query",
  "esri/request",
  "esri/identity/IdentityManager",
  "esri/identity/ServerInfo",
  "esri/widgets/LayerList"
], 
function(
    Map, 
    MapView,
    FeatureLayer,
    query,
    esriRequest,
    esriId,
    ServerInfo,
    LayerList
    ) {

    // Create a Map instance
    let map = new Map({
      basemap: "satellite"
    });

  
    // Create a MapView instance (for 2D viewing) and set its map property to
    // the map instance we just created
    let view = new MapView({
      map: map,
      container: "viewDiv"
    });


    // build query
    function getQuery(){
        query.executeForCount(placesLayerUrl, {  // autocasts as new Query()
            where: "pop2000 = 1000"
         }).then(function(count){
           console.log(count, " features matched the input query");
         }, function(error){
              console.log(error); // will print error in console if unsupported layers are used
            });
    }
    // getQueryBtn = document.getElementById("query-btn")
    // getQueryBtn.addEventListener("click", getQuery);
    // #########################################################
    let serverInfo = new ServerInfo();
    serverInfo.server = "https://geoportal.strategizeit.us/arcgis/";
    serverInfo.tokenServiceUrl = "https://geoportal.strategizeit.us/arcgis/sharing/rest/generateToken";
    serverInfo.hasServer = true;
    esriId.registerServers([serverInfo]);
    var def = esriId.generateToken(serverInfo, {
      "username": "GISDeveloper",
      "password": "Developer@1234",
      "client": "referer",
      "referer": document.URL
    });
    def.then(function (value) {
      
      token = value.token;
      console.log(token)
      
      esriId.registerToken({
        server : serverInfo.server,
        token : token,
        expires : 90
      });
      });
    async function getToken() {
      esriRequest("https://geoportal.strategizeit.us/arcgis/sharing/rest/generateToken",{
          method: "post",
          query:{
            f:"json",
            username: 'GISDeveloper',
            password: 'Developer@1234',
            // I guess this would be sampleserver8 for you
            referer: 'https://strategizeit.maps.arcgis.com/',
          }
        }).then(response => {
          token = response.data.token;
          addFeature(token)
        });

        async function addFeature(token){
          var serviceUrl = "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/AnnouncementV2/FeatureServer/0"
          userToken = token;
          // const url = `${serviceUrl}?token=${userToken}&f=json`
          const url = `${serviceUrl}?token=${userToken}`
          $.post(`${serviceUrl}`,
              {
                  token: userToken,
                  f: "json",
              },
              function(data, status){
                  console.log(JSON.stringify(data));
              });
              const otherLayer = new FeatureLayer({
                // URL to the service
                url: serviceUrl
              });
            
              //add layer to Map
              map.add(otherLayer);
              console.log("layer added")
      }
       
  }

  let layerList = new LayerList({
    view: view,
    // executes for each ListItem in the LayerList
    listItemCreatedFunction: function (event) {
  
      // The event object contains properties of the
      // layer in the LayerList widget.
  
      let item = event.item;
  
      if (item.title === "US Demographics") {
        // open the list item in the LayerList
        item.open = true;
        // change the title to something more descriptive
        item.title = "Population by county";
        // set an action for zooming to the full extent of the layer
        item.actionsSections = [[{
          title: "Go to full extent",
          className: "esri-icon-zoom-out-fixed",
          id: "full-extent"
        }]];
      }
    }
  });
  view.ui.add(layerList, {
    position: "top-left"
  });
  
  var mapAdder = document.getElementById("map-adder");
  mapAdder.addEventListener("click", getToken)
  
  });
