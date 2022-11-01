let tableSelectedFeatures;
let sorting = [
    {
        name: "name",
        label: "العنوان ",
      
    },
 
  {
      name: "governorate",
      label: "المحافظة ",
     
  },
  {
      name: "district",
      label: "المركز ",
    
  },

  {
      name: "defendant_type",
      label: "نوع المعلن إليه",
    
  },
  {
      name: "addressing_with_juridical",
      label: "مخاطبا مع إعتباري",
    
  },
  {
      name: "public_prosecutor",
      label: "النائب العام",
    
  },
  {
      name: "legal_representative ",
      label: "الممثل القانوني",
    
  },
  {
      name: "management_refuse_or_close",
      label: "جهة الإدارة للرفض\\للغلق",
    
  },
  {
      name: "unable_to_announce_reason",
      label: "سبب تعذر الإعلان",
    
  },
  {
      name: "addressed_name",
      label: "إسم المخاطب",
    
  },
  {
      name: "addressed_id",
      label: "الرقم القومي",
    
  },
  {
      name: "registered_no	",
      label: "رقم التسجيل",
    
  },
  {
      name: "registered_date",
      label: "تاريخ التسجيل",
    
  },
  {
      name: "remote_adjudicate",
      label: "التقاضي عن بعد",
    
  },
  {
      name: "phone_no",
      label: "رقم الهاتف",
    
  },
  {
      name: "email",
      label: "البريد الإلكتروني",

  },
  {
    name: "score",
    label: "ترتيب",
    direction: "asc",

},
{
  name: "updated_1",
  label: "تم التعديل ",

},
 

];
function featureTableInit(){
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
        tableSelectedFeatures = [];
        view.when(() => 
        {
            // const featureTableLayer = new featureLayerWidget({
            //     url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Announcement_WFL1/FeatureServer/0"
            // }); //grabs the first layer in the map
            const featureTableLayer = map.layers.getItemAt(0);
            console.log();
            // ahmed
            let query = featureTableLayer.createQuery();
            query.where = "OBJECTID IS NOT NULL";
            query.outFields = [ "*" ];
        
            featureTableLayer.queryFeatures(query)
              .then(function(response){
                // returns a feature set with features containing the following attributes
                // STATE_NAME, COUNTY_NAME, POPULATION, POP_DENSITY
                console.log(response.features);
              });
              featureTableLayer.title = "قائمة الإعلانات";
            console.log(featureTableLayer)
            
        
            // Create the feature table
            const featureTable = new FeatureTable({
                view: view, // required for feature highlight to work
                layer: featureTableLayer,
                multiSortEnabled: true, // set this to true to enable sorting on multiple columns
                editingEnabled: true,
                fieldConfigs: sorting,
                // fieldConfigs: [
                //                 {
                //                     name: "lawsuit_type",
                //                     label: "نوع الدعوى",
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
              
              container: document.getElementById("tableDiv")
            });

            
            // create custom menu items
            featureTable.when().then(() => {
                const newMenuItem = {
                    label: "تفاصيل الإعلانات المحددة",
                    clickFunction: (event) => {
                        // Listen for the table's selection-change event
                        console.log(tableSelectedFeatures)
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
              // console.log(featureTableLayer);
            }
            }

            // Listen for the table's selection-change event
            featureTable.on("selection-change", (changes) => 
            {
              // If the selection is removed, remove the feature from the array
              changes.removed.forEach((item) => {
                const data = tableSelectedFeatures.find((data) => {
                  return data.feature === item.feature;
                });
                if (data) {
                  tableSelectedFeatures.splice(tableSelectedFeatures.indexOf(data), 1);
                }
              });
        
              // If the selection is added, push all added selections to array
              changes.added.forEach((item) => {
                const feature = item.feature;
                tableSelectedFeatures.push({
                  feature: feature
                });
                console.log(tableSelectedFeatures);
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
                    result.graphic.layer === featureTableLayer
                  );
                });
                // Select the rows of the clicked feature
                candidate && featureTable.selectRows(candidate.graphic);
              });
            });
          });
    
    });

}

$(document).ready(setTimeout(featureTableInit, 3000))