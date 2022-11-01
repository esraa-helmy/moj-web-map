require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/FeatureTable",
  "esri/core/watchUtils"
], (
  WebMap,
  MapView,
  FeatureLayer,
  FeatureTable,
  watchUtils
) => {
  let selectedFeature, id;
  const features = [];

  view.popup =  {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false
      }
    }

  // When view is ready, find feature layer and set title and outFields
  view.when(() => {
    const tableLayer = map.layers.getItemAt(0);
    tableLayer.title = "قائمة الإعلانات";
    tableLayer.outFields = ["*"];

    // Get references to div elements for toggling table visibility
    const appContainer = document.getElementById("appContainer");
    const tableContainer = document.getElementById("tableContainer");
    const tableDiv = document.getElementById("tableDiv");

    // Create FeatureTable
    const featureTable = new FeatureTable({
      view: view, // make sure to pass in view in order for selection to work
      layer: tableLayer,
      fieldConfigs: [
                    {
                      name: "Name",
                      label: "الإسم",
                      
            
                    },
                    {
                        name: "kind",
                        label: "النوع",
                        
              
                    },
                    {
                    name: "Governorate",
                    label: "المحافظة",
                    
            
                    }
                  ],
      container: tableDiv
    });

    // Add toggle visibility slider
    view.ui.add(document.getElementById("mainDiv"), "top-right");

    // Get reference to div elements
    const checkboxEle = document.getElementById("checkboxId");
    const labelText = document.getElementById("labelText");

    // Listen for when toggle is changed, call toggleFeatureTable function
    checkboxEle.onchange = () => {
      toggleFeatureTable();
    };

    function toggleFeatureTable() {
      // Check if the table is displayed, if so, toggle off. If not, display.
      if (!checkboxEle.checked) {
        appContainer.removeChild(tableContainer);
        labelText.innerHTML =
          "Show Feature Table";
      } else {
        appContainer.appendChild(tableContainer);
        labelText.innerHTML =
          "Hide Feature Table";
      }
    }

    featureTable.on("selection-change", (changes) => {

      // If row is unselected in table, remove it from the features array
      changes.removed.forEach((item) => {
        const data = features.find((data) => {
          return data.feature === item.feature;
        });
      });

      // If a row is selected, add to the features array
      changes.added.forEach((item) => {
        const feature = item.feature;
        features.push({
          feature: feature
        });

        // Listen for row selection in the feature table. If the popup is open and a row is selected that is not the same feature as opened popup, close the existing popup.
        if ((feature.attributes.OBJECTID !== id) && (view.popup.visible === true)) {
          featureTable.deselectRows(selectedFeature);
          view.popup.close();
        }
      });
    });

    // Watch for the popup's visible property. Once it is true, clear the current table selection and select the corresponding table row from the popup
    watchUtils.watch(view.popup.viewModel, "active", (graphic) => {
      selectedFeature = view.popup.selectedFeature;
      if ((selectedFeature !== null) && (view.popup.visible !== false)) {
        featureTable.clearSelection();
        featureTable.selectRows(view.popup.selectedFeature);
        id = selectedFeature.getObjectId();
      }
    });
  });
});
