let def, securedLayer, userIsAuthenticated, token, customEsriConfig, lastCreatedFeatureLayer;
var securedLayerUrl = "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Announcement_WFL1/FeatureServer/0";
var securedMapUrl = "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/AnnouncementV2/FeatureServer/0";

require(["esri/identity/IdentityManager", "esri/identity/ServerInfo", 
"esri/layers/FeatureLayer", "esri/Map", "esri/views/MapView", "esri/config"],
function(esriId, ServerInfo, FeatureLayer, Map, MapView, esriConfig)
{
    userIsAuthenticated = false;
    customEsriConfig = esriConfig;
    customEsriId = esriId;
    customServerInfo = ServerInfo;

    
    try
    {
        def = esriId.generateToken(serverInfo, {
        "username": "solutionsanalyst2", 
        "password": "Sanalyst@123",
        "client": "referer",
        "referer": document.URL
        })
        .then(function (value) 
        {
            token = value.token;
            // console.log(token)
            esriId.registerToken({
                server : serverInfo.server,
                token : token,
                expires : 90
            });
            // console.log(value);
            userIsAuthenticated = true;
            // console.log(userIsAuthenticated) 
        })
        .catch(function(err) {
            console.log(err)
        });
        
    } catch (err)
    {
        console.log(err.message);
    }
        

    // push urls
    function pushUrls()
    {
        esriConfig.request.interceptors.push({
            urls: securedMapUrl,
            before: function (params) {
            params.requestOptions.query = params.requestOptions.query || {};
            params.requestOptions.query.token = token;
            },
        });
    }
    
        
    setTimeout(()=>{
        console.log("user is authenticated: " + userIsAuthenticated)
        if (userIsAuthenticated)
        {
            setTimeout(pushUrls, 500)
            // create secured layer instance
            async function addSecuredLayer(){
                securedLayer = new FeatureLayer({
                    url: securedMapUrl 
                });
                map.add(securedLayer);
                
                lastCreatedFeatureLayer = new FeatureLayer({
                    url: securedMapUrl,
                    // definitionExpression: "governorate = 'محافظه الشرقيه'"
                })
                console.log(token)
            }
            setTimeout(addSecuredLayer, 1000)
        }        
    }, 1000)
    
})


