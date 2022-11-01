var kinds;
async function getKindData()
{
        view.when(() => 
        {
            const featureLayer = map.layers.getItemAt(0); //grabs the first layer in the map
            // ahmed
            let query = featureLayer.createQuery();
            query.where = "OBJECTID IS NOT NULL";
            query.outFields = [ "announcement_state" ];
        
            return featureLayer.queryFeatures(query)
              .then(function(response){
                // returns a feature set with features containing the following attributes
                // STATE_NAME, COUNTY_NAME, POPULATION, POP_DENSITY
                return response.features;
            })
        })
        
        .then(function(response){
            // define different kinds array
            kinds = []
            for (var i = 0; i < response.length; i++) 
            {
                // push new kind to kind array
                kinds.push(response[i].attributes.announ_status)
            }
            // remove duplicated kinds from array
            kinds = new Set(kinds)
            console.log(kinds)
            return kinds
        })

        .then(function(response){
            fillKindList(response)
        })
        
        .catch(function(err){
            console.log("[ERROR]: " + err)
        })

}

function fillKindList(kindSet){
    kindArr = Array.from(kindSet)
    // console.log(kindArr)
    for (var i = 0; i < kindArr.length; i++)
    {
        $("#custom-div").append(`<p style="display: inline; value="${kindArr[i]}">${kindArr[i]}</p> <input type="checkbox" class="kind-checkbox" value="${kindArr[i]}" style="display: inline;"> <br><br>`)
        $(".type-list").append(`<li>
            <input class='type-checkbox' class="filter" data-filter=".check1" type="checkbox"  value="${kindArr[i]}">
            <label class="checkbox-label" for="checkbox1" >${kindArr[i]}</label>
        </li>`)
        console.log("[INFO]: " + kindArr[i]+" Added to Kind DIV") 
    }
    
}
$(document).ready(setTimeout(getKindData, 3000));


async function getWorkersList()
{
    let featureFilterClass = new FeatureFilter_("https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/AnnouncementV2/FeatureServer/0", "announcement_state");
    const workerList = await featureFilterClass.getFieldValues();
    for (const worker of workerList){
        $("#worker-list").append(`<option class='worker'  value="${worker}">${worker}</option>`)
        console.log("[INFO]: " + worker +" Added to WorkerList")
    }
}
$(document).ready(setTimeout(getWorkersList, 4000));


