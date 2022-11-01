let esraa, lastCreatedFeatures;

function featureTableInitt(){
    require([
        "esri/widgets/FeatureTable",
        "esri/core/reactiveUtils",
        "esri/rest/support/Query",
        "esri/core/watchUtils",
        "esri/widgets/FeatureTable/FieldColumnConfig",
        // "esri/widgets/FeatureTable/support/TableTemplate"
    ], function(
        FeatureTable, 
        reactiveUtils,
        Query,
        watchUtils,
        FieldColumnConfig
        )
        {
          esraa = ["sss"];
          let latestFeatures;
        view.when(() => 
        {
            // const last = new featureLayerWidget({
            //     url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Announcement_WFL1/FeatureServer/0"
            // }); //grabs the first layer in the map
            lastCreatedFeatures = map.layers.getItemAt(0);
            console.log();
            // ahmed
            let querylast = lastCreatedFeatures.createQuery();
            querylast.where = "announcement_state IS NOT NULL";
            querylast.outFields = ["*"];
        
        
            lastCreatedFeatures.queryFeatures(querylast)
              .then(async function(response){
                // returns a feature set with features containing the following attributes
                // STATE_NAME, COUNTY_NAME, POPULATION, POP_DENSITY
                latestFeatures = await response.features;
                console.log(lastCreatedFeatures);
              });
              lastCreatedFeatures.title = "قائمة الإعلانات";
            
            
        
            // Create the feature table
            const featureTable = new FeatureTable({
                view: view, // required for feature highlight to work
                layer: lastCreatedFeatures,
                multiSortEnabled: true, // set this to true to enable sorting on multiple columns
                editingEnabled: true,
                // fieldConfigs: [
                //                 {
                //                     name: "lawsuit_type",
                //                     label: "نوع الدعوى",
                //                     direction: "asc",
                //                 },
                //                 {
                //                     name: "governorate",
                //                     label: "rea",
                //                     format: {
                //                         template: '<span class="esri-icon-zoom-in-magnifying-glass"></span>'
                //                       }
                //                 },
                //                 ,
                //                 {
                //                     name: "address_with",
                //                     label: "مخاطبا مع",
                //                 },
                                
                //         ],
                // autocast to FieldColumnConfigs

                visibleElements: { // autocast to VisibleElements
                    menuItems: {
                        clearSelection: true,
                        refreshData: true,
                        toggleColumns: true,
                        selectedRecordsShowAllToggle: true,
                        selectedRecordsShowSelectedToggle: true,
                        zoomToSelection: true,
                    },
                    menu: true,
                    selectionColumn: true,
                    columnMenus: true,
                },
              
              container: document.getElementById("last_update")
            });

            
            // create custom menu items
            featureTable.when().then(() => {
                const newMenuItem = {
                    label: "تفاصيل اخر تحديث",
                    clickFunction: (event) => {
                        // Listen for the table's selection-change event
                        console.log(esraa)
                    }
                };
                featureTable.menu.items.push(newMenuItem);
            });
        
            // Listen for when the view is updated. If so, pass the new view.extent into the table's filterGeometry
            watchUtils.watch(view, "updating", onZoomChange);
            function onZoomChange(newValue, oldValue, propertyName, target) {
            if (!view.updating){
              // View just finished updating. Get the new zoom value from the view
              featureTable.filterGeometry = view.extent;
              // console.log(last);
            }
            }

            // Listen for the table's selection-change event
            featureTable.on("selection-change", (changes) => 
            {
              // If the selection is removed, remove the feature from the array
              changes.removed.forEach((item) => {
                const data = esraa.find((data) => {
                  return data.feature === item.feature;
                });
                if (data) {
                  esraa.splice(esraa.indexOf(data), 1);
                }
              });
        
              // If the selection is added, push all added selections to array
              changes.added.forEach((item) => {
                const feature = item.feature;
                esraa.push({
                  feature: feature
                });
                console.log(esraa);
              });
            });
        
            // Listen for the click on the view and select any associated row in the table
            view.on("immediate-click", (event) => 
            {
              view.hitTest(event).then((response) => 
              {
                const candidate = response.results.find((result) => 
                {
                  return (
                    result.graphic &&
                    result.graphic.layer &&
                    result.graphic.layer === lastCreatedFeatures
                  );
                });
                // Select the rows of the clicked feature
                candidate && featureTable.selectRows(candidate.graphic);
              });
            });
          });
    
    });

    let tab1Elem = document.querySelector('#button1')

tab1Elem.addEventListener('click', function(){
    lastCreatedFeatures.definitionExpression = ""
    console.log("from event handler");
})

// document.querySelector('#button2').addEventListener('click', function(e){
//   lastCreatedFeatures.queryFeatures(query, function(featureSet) {
//     featureSet.lastCreatedFeatures.sort(function(a, b) {
// return a.attributes[score] - b.attributes[score]; //ascending order
// });
// });
  
// })

document.querySelector('#button2').addEventListener('click', function(e){
  
    lastCreatedFeatures.definitionExpression = "announcement_state = 'not_assigned '"
  


    
})
// var _sort = function(field) 
// {     return function(a, b) 
//   {    var x, y;    x = a.attributes[field]; 
//        y = b.attributes[field]; 
//            return (x < y) ? -1 : 1;     };  };
//            lastCreatedFeatures.sort(_sort('building_no'));
//                      console.log(_sort)

// document.querySelector('#button2').addEventListener('click', function(e){
//  astCreatedFeatures.orderBy = [{
//     field: "score	",
//     order: "descending"  // "descending" | "ascending"
//   }]; l
  
// })

}

// function getToday()
// {
//     let today = new Date();
//     let dd = String(today.getDate()).padStart(2, '0');
//     let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     let yyyy = today.getFullYear();

//     return today = mm + '/' + dd + '/' + yyyy;
// }

//a simple date formatting function
// function dateFormat(inputDate, format) {
//     //parse the input date
//     const date = new Date(inputDate);

//     //extract the parts of the date
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();    

//     //replace the month
//     format = format.replace("MM", month.toString().padStart(2,"0"));        

//     //replace the year
//     if (format.indexOf("yyyy") > -1) {
//         format = format.replace("yyyy", year.toString());
//     } else if (format.indexOf("yy") > -1) {
//         format = format.replace("yy", year.toString().substr(2,2));
//     }

//     //replace the day
//     format = format.replace("dd", day.toString().padStart(2,"0"));

//     return format;
// }

// dateFormat('2021-12-10', 'MM-dd-yyyy')

// Formatted as MM/DD/YYYY hh:mm:ss
const dateStr = '10/11/2022 23:59:59';

const [dateValues, timeValues] = dateStr.split(' ');

console.log(dateValues); // 👉️ "10/11/2022"
console.log(timeValues); // 👉️ "00:00:00"

const [month, day, year] = dateValues.split('/');
const [hours, minutes, seconds] = timeValues.split(':');

const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);

console.log(date); // 👉️ Thu Feb 24 2022 09:26:30

const timestampInMs = date.getTime();

const timestampInSeconds = Math.floor(date.getTime() / 1000);
console.log(timestampInSeconds)

$(document).ready(setTimeout(featureTableInitt, 3000))




// var _sort = function(field) 
// {     return function(a, b) 
//   {    var x, y;    x = a.attributes[field]; 
//        y = b.attributes[field]; 
//            return (x < y) ? -1 : 1;     };  };
//                      theFeatureSet.sort(_sort('Your Field Name'));
