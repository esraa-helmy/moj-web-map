class MapInitiator
{
    #mapDiv
    #basemap
    
    constructor(mapDiv, basemap)
    {
        this.#mapDiv = mapDiv;
        this.#basemap = basemap;
    }

    get mapDiv()
    {
        return this.mapDiv;
    }

    set mapDiv(mapDiv)
    {
        this.mapDiv = mapDiv;
    }

    get basemap()
    {
        return this.basemap;
    }

    set basemap(basemap)
    {
        this.basemap = basemap;
    }

    async createMap()
    {
        return new Map({
            basemap: this.basemap,
            layers: []
        });
    }

    async createView()
    {
        return new MapView({
           map: await this.createMap,
           container: this.mapDiv, 
        })
    }
}
