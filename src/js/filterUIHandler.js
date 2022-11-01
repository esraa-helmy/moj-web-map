// type filter
function getSelectedTypes(){
    // define check kinds array
    var selectedTypes = new Array();
    // check the checked kinds
    document.querySelectorAll('.type-checkbox').forEach(item => {
        if (item.checked){
            selectedTypes.push(item.value);
        }
    })
    // return checked kinds array
    return selectedTypes;
}
$(document).ready(
    setTimeout( () => {
        document.querySelectorAll('.type-checkbox').forEach(item => {
            item.addEventListener('click', event => {
                //handle click
                // create FeatureQuery instance
                const selectedTypes =  getSelectedTypes();
                const featureFilter = new FeatureFilter("announcement_state", selectedTypes);
                featureFilter.attributeFilter();
                featureFilter.mapFilter();
            })
        })
    }, 5000)
)

// worker filter
$(document).ready(setTimeout(() => {
    document.getElementById('worker-list').addEventListener('change', function() {
        console.log('You selected: ', this.value);
        const featureFilter = new FeatureFilter("legal_user_id", [this.value]);
        featureFilter.attributeFilter();
        featureFilter.mapFilter();
      });
    
      document.getElementById('search-filter').addEventListener('input', async (event) => {
        const keyword = await document.getElementById('search-filter').value;
        console.log(keyword);
        var values = await FeatureFilterClass.searchFilter(keyword);
      }, false);
}, 5000))