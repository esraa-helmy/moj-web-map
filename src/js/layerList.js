require(["esri/widgets/LayerList"], function (LayerList){
  function initLayerList(){

      // craete LayerList
      let layerList = new LayerList({
        view: view,
      // executes for each ListItem in the LayerList
      listItemCreatedFunction: function (event) {
    
        // The event object contains properties of the
        // layer in the LayerList widget.
    
        let item = event.item;
    
        if (item.title === "قائمة المحاكم") {
          // open the list item in the LayerList
          item.open = true;
          // change the title to something more descriptive
          item.title = "Population by county";
          // set an action for zooming to the full extent of the layer
          item.actionsSections = [[{
            title: "Go to full extent",
            className: "esri-icon-zoom-out-fixed",
            id: "full-extent"
          }]];
        }
      }
    });
    // view.ui.add(layerList, {
    //   position: "top-left"
    // });
  }

  setTimeout(initLayerList, 1000);

})