class UserAuth
{
    constructor(username, password)
    {
        this.username = username;
        this.password = password;
    }

    async generateUserToken()
    {
        var self = this;
        require(["esri/identity/IdentityManager", "esri/identity/ServerInfo", 
        "esri/layers/FeatureLayer", "esri/Map", "esri/views/MapView", "esri/config"],
        async function(esriId, ServerInfo, FeatureLayer, Map, MapView, esriConfig)
        {
            userIsAuthenticated = false;
            
            try
            {
                def = await esriId.generateToken(serverInfo, {
                "username": self.username, // username
                "password": self.password, // password
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
                    console.log("this is not no");
                    return true
                })
                .catch(function(err) {
                    console.log(err.message)
                    return false
                });
                
            } catch (err)
            {
                console.log(err.message);
                return false
            }
        })
    }

    getUserToken(){
        return this.generateUserToken()
    }

    userIsAuthenticated()
    {
        return this.generateUserToken()
    }


}




setTimeout(() => {
    var userClass = new UserAuth("GISDeveloper", "Developer@1234")

    setTimeout(console.log("user token: " + userClass.generateUserToken()), 2000)

}, 4000)

