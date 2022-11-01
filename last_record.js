let last;
function lastRecord (){
    require([
        "esri/widgets/FeatureTable",
        "esri/core/reactiveUtils",
        "esri/rest/support/Query",
        "esri/core/watchUtils",
        "esri/widgets/FeatureTable/FieldColumnConfig",
    ],
    function(
        FeatureTable, 
        reactiveUtils,
        Query,
        watchUtils,
        FieldColumnConfig
        )
        {
            lastRecord[ "esraa"];
            view.when(()=>{
                const record = map.layers.getItemAt(0);
            console.log(record);
            })
        }

    )
}