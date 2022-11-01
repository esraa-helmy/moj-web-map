class FeatureFilter_
{
    #featureLayerUrl;
    #fieldName;

    constructor(featureLayerUrl, fieldName)
    {
        this.#featureLayerUrl = featureLayerUrl;
        this.#fieldName = fieldName;
    }

    /**
     * get feature layer URL
     * 
     * @returns {String} featureLayer URL
     * @memberof FeatureFilter
     */
    getFeatureLayerUrl()
    {
        return this.#featureLayerUrl;
    }

    /**
     * set feature layer URL
     * 
     * @param {String} featureLayerUrl
     * @memberof FeatureFilter 
     */
    setFeatureLayerUrl(featureLayerUrl)
    {
        this.#featureLayerUrl = featureLayerUrl;
    }

    /**
     * get field name
     * 
     * @returns {String}
     * @memberof FeatureFilter
     */
    getFieldName()
    {
        return this.#fieldName;
    }

    /**
     * set field name
     * 
     * @param {String} fieldName
     * @memberof FeatureFilter
     */
    setFieldName(fieldName)
    {
        this.#fieldName = fieldName;
    }

    /**
     * create Esri feature layer
     * 
     * @returns {Object}
     * @memberof FeatureFilter
     */
    async #createFeatureLayer()
    {
        const layerObject = new featureLayerWidget({
            url: this.#featureLayerUrl,
            outFields: ["*"]
        });
        
        return layerObject;
    }

    /**
     * get feature layer field names
     * 
     * @returns {Array}
     * @memberof FeatureFilter
     */
    async getFeatureLayerFieldNames()
    {
        const fieldNames = new Array();
        const layerObject = await this.#createFeatureLayer();
        let query = layerObject.createQuery();
        query.where = "OBJECTID IS NOT NULL";
        query.outFields = [ "*" ];
    
        return layerObject.queryFeatures(query)
            .then(function(response){
            // returns a feature set with features containing the following attributes
            var fieldsCount = response.fields.length;
            for (var i = 0; i < fieldsCount; i++){
                const field = response.fields[i];
                fieldNames.push(field.name);
            }
            console.log(typeof fieldNames);
            return fieldNames;
        })

    }

    /**
     * Check if field exist
     * 
     * @returns {Boolean}
     * @memberof FeatureFilter
     */
    async #fieldExist()
    {
        let exist = new Array( await this.getFeatureLayerFieldNames()).includes(this.#fieldName);
        console.log(exist);
        return exist;
    }

    /**
     * get field values
     * 
     * @returns {Array}
     * @memberof FeatureFilter
     */
    async getFieldValues()
    {
        this.#fieldExist();
        if ( await this.#fieldExist )
        {
            var self = this;
            const fieldValues = new Array();
            const layerObject = await this.#createFeatureLayer();
            let query = layerObject.createQuery();
            query.where = "OBJECTID IS NOT NULL";
            query.outFields = [ "*" ];
        
            return layerObject.queryFeatures(query)
                .then(function(response){
                // returns a feature set with features containing the following attributes
                const featureCount = response.features.length;
                for ( let i = 0; i < featureCount; i++ )
                {
                    fieldValues.push(response.features[i].attributes[self.#fieldName])
                }
                return new Set(fieldValues);
            })
        }

        return await false;
    }

    createExpression(field, value)
    {
        var expression = `${field} in (${value})`
        return expression
    }

    async createDefinitionExpression(fieldName, element)
    {
        let selectedValues = await this.#getSelectedValues(element);
        const queryValues = selectedValues.toString().replace(/,/g,"','");
        const featureLayer = await map.layers.getItemAt(0);
        if (queryValues.length > 0)
        {
            featureLayer.definitionExpression = await this.createExpression(fieldName, queryValues);
        } else
        {
            featureLayer.definitionExpression = '';
        }
    }

    async #getSelectedValues(element)
    {
        // define selected values array
        var selectedValues = new Array();
        // check the selected values
        document.querySelectorAll(element).forEach(item => {
            if (item.checked){
                checkedValues.push(item.value);
            }
        })
        // return selected values array
        return selectedValues
    }

    async #getLayerData()
    {
        const fieldNames = new Array();
        const layerObject = await this.#createFeatureLayer();
        let query = layerObject.createQuery();
        query.where = "OBJECTID IS NOT NULL";
        query.outFields = [ "*" ];
    
        return await layerObject.queryFeatures(query)
            .then(function(response){
            // returns a feature set with features containing the following attributes
           
            return(response.features);
        })

    }

    async searchFilter(keyword)
    {
        const features = await this.#getLayerData();
        var results = [];
        var toSearch = keyword;

        for(const feature of features)
        {
            for (var attr in feature.attributes)
            {
                // console.log(feature.attributes[attr])
                if (new String(feature.attributes[attr]).includes(toSearch))
                {
                    results.push(feature.attributes["OBJECTID"])
                }
            }
        }
        results = Array.from(new Set(results));
        console.log(results.length);
        const queryValues = results.toString();
        const featureLayer = map.layers.getItemAt(0);
        if (results.length > 0)
        {
            featureLayer.definitionExpression = this.createExpression("OBJECTID", queryValues);
            $("#search-status-lable").text("");
        } else
        {
            $("#search-status-lable").css({'color': 'red'});
            $("#search-status-lable").text("لا يوحد نتائج للبحث");
            featureLayer.definitionExpression = 'OBJECTID IS NOT NULL'
        }
        
        console.log("map filtered")
        
    }
}   
var FeatureFilterClass;
async function Main(){
    FeatureFilterClass = new FeatureFilter_("https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/AnnouncementV2/FeatureServer/0", "announcement_state");
    var fieldNames = await FeatureFilterClass.getFeatureLayerFieldNames();

    
    
    // for ( var i = 0; i < fieldNames.length; i++) {
    //     document.getElementById("filter-choice-list").innerHTML += `<option class="field-name" value="${fieldNames[i]}">${fieldNames[i]}</option>`
    // }

    // document.getElementById('filter-choice-list').addEventListener('change', async function() {
    //     FeatureFilterClass.setFieldName(this.value)
    //     const values = await ff.getFieldValues()
    //     console.log('You selected: ', this.value, " has values: \n", values);
    //     // await ff.getLayerData();
    // });
}


setTimeout(Main, 5000)