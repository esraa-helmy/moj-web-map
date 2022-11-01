let editThisAction, editor;
function initEditFeatureLayer(){
require(["esri/WebMap", "esri/views/MapView", "esri/widgets/Editor"], function (
    WebMap,
    MapView,
    Editor
  ) {

    
    editThisAction = {
            title: "Edit feature",
            id: "edit-this",
            className: "esri-icon-edit"
        };

      

        let editorDivElem = document.getElementById("editorDiv");
        // editorDivElem.innerHTML = `<div id="close-edit" class="popup-btn">x</div>`
        
        view.when(() => {
              view.map.allLayers.forEach((layer) => {
                if (layer.type === "feature") {
                    const pointInfos = {
                        layer: layer,
                        formTemplate: {
                          // autocasts to FormTemplate
                          elements: [
                            {
                              // autocasts to Field Elements
                              type: "field",
                              fieldName: "name",
                              // label: " "
                              editable: false,

                            }
                          ]
                        }
                      };
                      editor = new Editor({
                        view: view,
                        layerInfos: [pointInfos],
                        container:editorDivElem
                      });
          
                      // Add the widget to the view
                    //   view.ui.add(editor, "top-right");

                      layer.on('edits', (event)=>{
                        console.log(event);
                        let objectId = event.edits.updateFeatures[0].attributes.OBJECTID;
                        arcgisRest.updateFeatures({
                            url: layer.parsedUrl.path,
                            features: [{
                                // geometry: { x: lon, 
                                //     y: lat, 
                                //     spatialReference: { wkid: recordObject.srid } },
                                attributes: {
                                    OBJECTID: objectId, 
                                    updated_1: "Yes",
                                    // type: recordObject.type,
                                    // status: recordObject.status,
                                    // address: recordObject.address,
                                }
                            }]
                          }).then(function(response) {
                            console.log(response);
                            console.log("record updated");
                          }).catch(function(error) {
                            console.log(error);
                          })
                      })
                }
              })

              
              
        })

        function editThis() {
            // If the EditorViewModel's activeWorkflow is null, make the popup not visible
            if (!editor.viewModel.activeWorkFlow) {
              view.popup.visible = false;
              // Call the Editor update feature edit workflow
    
              editor.startUpdateWorkflowAtFeatureEdit(view.popup.selectedFeature);
              view.ui.add(editor, "top-right");
              view.popup.spinnerEnabled = false;
        
            }
        }
      
        view.popup.on("trigger-action", (event) => {
            if (event.action.id === "edit-this") {
              
                
               
                
                editThis();


                // let closeEditElement = document.querySelector("close-edit");
                
            }
            
            if(document.getElementById("close-edit") == null){
              let closeEditElement = document.createElement("div");
              closeEditElement.setAttribute('id', 'close-edit');
              closeEditElement.textContent = "cancel"
              editorDivElem.appendChild(closeEditElement);

              closeEditElement.addEventListener("click", (evt)=>{
                
                  editorDivElem.style.display = 'none';
                  editor.viewModel.cancelWorkflow();
                  
              })
              
          }

          editorDivElem.style.display = 'block';
          
          
            // editThisAction.addEventListener("click", (evt)=>{
                
            //     editThisAction.style.display = 'block';
            //     editor.viewModel.cancelWorkflow();
            // })
        });

       
    
       


        securedLayer.on("apply-edits", () => {
            
                editor.viewModel.cancelWorkflow();
                view.ui.remove(editor);
                
           
            
      
      
          });

        
        
                 
      

    // function handleEventListners(){
    //   let editFeatureElement = document.querySelector("#edit-feature");
    //     editFeatureElement.addEventListener('click', (e)=>{
    //         initEditFeatureLayer();
    //     });
    // }
    
    // setTimeout(initEditFeatureLayer, 6000)
    // 
    
    // setTimeout(handleEventListners, 6000)


    
})

}

setTimeout(initEditFeatureLayer, 3000);
