class FeatureFilter
{
    /**
     * Creates an instance of FeatureFilter.
     *
     * @param {Array} checkedValues
     * @memberof FeatureFilter
     */
    constructor(fieldName, checkedValues)
    {
        // console.log(fieldName, checkedValues)
        this.__checkedValues = checkedValues;
        this.__checkedValuesCount = this.__checkedValues.length;
        this.fieldName = fieldName;
    }

    /**
     * Check if checkedValues is array
     * 
     * @method
     * @returns {Boolean}
     * @memberof FeatureFilter 
     */
    _isArray()
    {
        if (typeof(this.__checkedValues) == Array)
        {
            return true
        }
        return false
    }

    /**
     * Get checkedValues Array
     * 
     * @method
     * @returns {Array}
     * @memberof FeatureFilter
     */
    _getCheckedValues()
    {
        return this.__checkedValues;
    }

    /**
     * Set checkedValues Array
     * 
     * @method
     * @param {Array} checkedValues
     * @memberof FeatureFilter 
     */
    _setCheckedValues(checkedValues)
    {
        this.__checkedValues = checkedValues;
    }
    
    /**
     * Create FeatureLayer definitionExpression by FieldName and Values to look in
     * 
     * @method
     * @param {String} field 
     * @param {String} value 
     * @returns {String} expression
     * @memberof FeatureFilter
     */
    createExpression(field, value)
    {
        var expression = `${field} in ('${value}')`
        return expression
    }

    /**
     * create attribute filter
     * 
     * @method
     * @return {Object} object of filtered attributes
     * @memberof FeatureFilter 
     */
    async attributeFilter()
    {
        // convert Arr to String
        const queryValues = await this.__checkedValues.toString().replace(/,/g,"','");
        console.log(await this.__checkedValuesCount);
        // Get map feature
        const featureLayer = map.layers.getItemAt(0);
        // Init feature query
        let query = featureLayer.createQuery();
        // check kinds arr length & create query
        if (this.__checkedValuesCount == 0)
        {
            query.where = ``;
        } else
        {
            query.where = this.createExpression(this.fieldName, queryValues);
        }
        // define out fields
        query.outFields = ["*"];
        // execute query
        featureLayer.queryFeatures(query)
        .then(function(response){
            // returns a feature set with features containing the kind attribute
            return response.features;
        });
    }

    /**
     * Create map filter
     * 
     * @method
     * @memberof FeatureFilter
     */
    async mapFilter() 
    {
        const queryValues = this.__checkedValues.toString().replace(/,/g,"','");
        // expr = this.createExpression("kind", `('${queryValues}')`);
        console.log(queryValues);
        const featureLayer = map.layers.getItemAt(0);
        if (this.__checkedValues.length > 0)
        {
            featureLayer.definitionExpression = this.createExpression(this.fieldName, queryValues);

        } else
        {
            featureLayer.definitionExpression = '';
        }
    }
}



function getSelectedKinds(){
    // define check kinds array
    var checkedValues = new Array();
    // check the checked kinds
    document.querySelectorAll('.kind-checkbox').forEach(item => {
        if (item.checked){
            checkedValues.push(item.value);
        }
    })
    // return checked kinds array
    console.log(checkedValues)
    return checkedValues
}

function featureFilterInit()
{
    document.querySelectorAll('.kind-checkbox').forEach(item => {
        item.addEventListener('click', event => {
          //handle click
          // create FeatureQuery instance
          const kindsArray = getSelectedKinds();
          const featureFilter = new FeatureFilter("announcement_state", kindsArray);
          var filterResult = featureFilter.filter();
    
        })
    })
}

$(document).ready(
    setTimeout(() => {
        document.querySelectorAll('.kind-checkbox').forEach(item => {
            item.addEventListener('click', event => {
              //handle click
              // create FeatureQuery instance
              const kindsArray = getSelectedKinds();
              const featureFilter = new FeatureFilter("announcement_state", kindsArray);
              featureFilter.attributeFilter();
              featureFilter.mapFilter();
            })
        })
    }, 4000)
)