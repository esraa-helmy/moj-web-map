class GeoCoder
{
    constructor(address)
    {
        this._address = address;
        this._gecodeServiceUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?"
    }

    /**
     * Get Address
     * 
     * @memborof GeoCoder
     * @returns {String} Address
     */
    _getAddress()
    {
        return this._address;
    }

    /**
     * Set Address
     * 
     * @param {String} address
     * @memberof GeoCoder 
     */
    _setAddress(address)
    {
        this._address = address;
    }

    /**
     * GeoCode Address
     * 
     * @returns {Object} Candidate Locations
     * @memberof GeoCoder
     */
    async geoCode()
    {
        const url=`${this._gecodeServiceUrl}address=${this._address}&f=json&token=${apiKey}`;
        var dataRes = 
            await fetch(url).then(function(response) {
                return response.json();
            }).then(function(data) {
                // console.log(data.candidates[0]);
                return data;
            }).catch(function(err) {
                console.log(err)
                console.log("[ERROR]: there some error in geocoding service");
            });
        console.log(dataRes)
        return dataRes
    }    
}


setTimeout(
    async () => {
        let serviceUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?"
        let address = "أبوحماد"
        var geocoder = new GeoCoder(address, serviceUrl);
        var coords =  await geocoder.geoCode();
        // var x = await coords[0]
        // var y = await coords[1]
        console.log(coords)
    }
, 3000)