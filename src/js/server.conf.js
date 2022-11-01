var serverInfo, apiKey;
require(["esri/identity/IdentityManager", "esri/identity/ServerInfo"],
function(esriId, ServerInfo,){
    serverInfo = new ServerInfo();
    serverInfo.server = "https://strategizeit.maps.arcgis.com/";
    serverInfo.tokenServiceUrl = "https://www.arcgis.com/sharing/generateToken";
    serverInfo.hasServer = true;
    esriId.registerServers([serverInfo]);
    // apiKey = "AAPKc43a0cc3050c492a88a850c32c5d330dI110bXfbWLj9rSgLqhJ5I3mwND8H4LeXVIjvqDtVT3tSKnpZciTL0sR1aV5nZchf";
    apiKey = "AAPKdce0cea9783e4846ba3fd59830b52b7fUFHyYt1vFoNlC92qZNrTBR-ohMjnfzYVf8xkiHiJUjVbdWp7qMAiaeXJVqsKdzwD";
})