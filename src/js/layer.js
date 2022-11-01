class Layer
{
    constructor(layerUrl)
    {
        this._layerUrl = layerUrl;
    }

    /**
     * Get feature layer url
     * 
     * @returns {string} => layer url
     * @memberof Layer
     */
    _getLayerUrl()
    {
        return this._layerUrl;
    }

    /**
     * set layer url
     * 
     * @param {String} layerUrl
     * @memberof Layer 
     */
    _setLayer(layerUrl)
    {
        this._layerUrl = layerUrl;
    }

    /**
     * create FeatureLayer object
     * 
     * @returns {Object} => new FeatureLayer object
     * @memberof Layer
     */
    createLayerObject()
    {
        const layerObject = new featureLayerWidget({
            url: this._layerUrl
        });
        
        return layerObject;
    }

    /**
     * create FeatureLayer object then addToMap
     * @memberof Layer
     */
    addToMap()
    {
        map.add(this.createLayerObject());
    }

    /**
     * insert new record to feature layer
     * 
     * @param {Object} recordObject
     * @memberof Layer
     */
    async insertRecord(recordObject)
    {
        var geocoder = new GeoCoder(recordObject.address);
        var coords =  await geocoder.geoCode();
        var lon = coords.candidates[0].location.x;
        var lat = coords.candidates[0].location.y;

        await arcgisRest.addFeatures({
        url: this._layerUrl,
        token: token,
        features: [{
            geometry: { x: lon, 
            y: lat, 
            // spatialReference: { wkid: 3857 } 
        },
            attributes: { 
                governorate: recordObject.governorate,
                street_name: recordObject.street_name,
                district: recordObject.district,
                building_no: recordObject.building_no,
                primary_court_code: recordObject.primary_court_code,
                defendant_name: recordObject.defendant_name,
                announ_no: recordObject.announ_no,
                lawsuit_no: recordObject.lawsuit_no,
                other: recordObject.other,
                address: recordObject.address,
                case_inspector_name: recordObject.case_inspector_name,
                address_with: recordObject.address_with,
                announ_notes: recordObject.announ_notes,
                date: recordObject.date,
                general_notes: recordObject.general_notes,
                longitude: recordObject.longitude,
                latitude: recordObject.latitude,
                registrant_date: recordObject.registrant_date,
                task_no: recordObject.task_no,
                advertiser_type: recordObject.advertiser_type,
                announ_status: recordObject.announ_status,
                lawsuit_type: recordObject.lawsuit_type,
                announ_type: recordObject.announ_type,
                sender_court: recordObject.sender_court,
                primary_court: recordObject.primary_court,
                sender_court_code: recordObject.sender_court_code,
                address_with_details_results: recordObject.address_with_details_results,
                address_with_name: recordObject.address_with_name,
                lawsuit_document: recordObject.lawsuit_document,
                address_with_no: recordObject.address_with_no,
                address_with_name_english: recordObject.address_with_name_english,
                address_with_national_no: recordObject.address_with_national_no,
                remote_litigation: recordObject.remote_litigation,
                phone_number: recordObject.phone_number,
                mail: recordObject.mail,
                announ_status_details: recordObject.announ_status_details,
                Reason_nonimplementation: recordObject.Reason_nonimplementation,
                partial_court: recordObject.partial_court,
                partial_court: recordObject.partial_court,
                service_dept: recordObject.service_dept,
                task_code: recordObject.task_code,
                advertising_priority: recordObject.advertising_priority,
                announ_details_url: recordObject.announ_details_url, 
            } 
        }]
      }).then(function(response) {
        console.log(response);
        // console.log(this._getLayerUrl());
        console.log("record inserted")
        // this.refresh();
      }).catch(function(error) {
        console.log(error);
      })
    }

    /**
     * delete feature from feature layer
     * 
     * @param {Integer} recordId
     * @memberof Layer
     */
    deleteRecord(recordId)
    {
        arcgisRest.deleteFeatures({
            url: this._layerUrl,
            objectIds: recordId
          }).then(function(response) {
            console.log(response);
            console.log("record deleted");
          }).catch(function(error) {
            console.log(error);
          }).then((response) => {
            this.refresh();
          })
    }

    /**
     * Update feature from feature layer
     * 
     * @param {Integer} recordId 
     * @param {Object} recordObject
     * @memberof Layer
     */
    async updateRecord(recordId, recordObject)
    {
        // var geocoder = new GeoCoder(recordObject.address);
        // var coords =  await geocoder.geoCode();
        // var lon = coords.candidates[0].location.x;
        // var lat = coords.candidates[0].location.y;
        console.log(this._layerUrl)
        // customEsriConfig.request.interceptors.push({
        //     urls: this._layerUrl,
        //     before: function (params) {
        //     params.requestOptions.query = params.requestOptions.query || {};
        //     params.requestOptions.query.token = token;
        //     },
        // });

        await arcgisRest.updateFeatures({
            url: this._layerUrl,
            features: [{
                // geometry: { x: lon, 
                //     y: lat, 
                //     spatialReference: { wkid: recordObject.srid } },
                attributes: {
                    OBJECTID: recordId, 
                    task_code : 333,
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
    }

    refresh()
    {
        const featureLayer = map.layers.getItemAt(0);
        featureLayer.definitionExpression = '';
    }
}


let l;
async function updateLayer(){
   const recordObject = { 
    governorate: "vالقاهرة",
    street_name: "صلاح سالم",
    district: "الحي العاشر",
    building_no: "221",
    primary_court_code: "551",
    defendant_name: "عمرو عادل",
    announ_no: "2431",
    lawsuit_no: "554431",
    other: "تم التحويل",
    address: "أبوحماد",
    case_inspector_name: "محمد فادي",
    address_with: "ابراهيم فادي",
    announ_notes: "لا يوجد",
    date: "9-19-2022, 10:44 AM",
    general_notes: "لا يوجد",
    longitude: 29.112233,
    latitude: 30.123111,
    registrant_date: "9-9-2022, 10:44 AM",
    task_no: "4412233",
    advertiser_type: "طبيعي",
    announ_status: "مسند",
    lawsuit_type: "صحيفة دعوى",
    announ_type: "صحيفة دعوى",
    sender_court: "القاهرة الإبتدائية",
    primary_court: "القاهرة الإبتدائية",
    sender_court_code: "01",
    address_with_details_results: "لا يوجد",
    address_with_name: "ابراهيم فادي",
    lawsuit_document: "لا يوجد",
    address_with_no: "012667118221",
    address_with_name_english : "Ibrahim Fady",
    address_with_national_no : "27718882221312234",
    remote_litigation : "نعم",
    phone_number : "012881231291",
    mail : "iera@dedo.com",
    announ_status_details : "تم الإسناد",
    Reason_nonimplementation : "",
    partial_court : "القاهرة الجزئية",
    service_dept : "",
    task_code : "212331",
    advertising_priority : "critical",
    announ_details_url : "http://www.example.com", 
}

    // let recordObject = {
    //     OBJECTID: 4, 
    //                 title: "",
    //                 type: "",
    //                 status: "",
    //                 address: "cairo",
    // }
    console.log(recordObject);

    // var l = new Layer("https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/test_feature_layer/FeatureServer/0")
    l = new Layer(`https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/AnnouncementV2/FeatureServer/0?token=${token}`);
    // var addRecord =  await l.insertRecord(recordObject);
    // console.log("layer added");
    // var updateRecord =  await l.updateRecord(43 ,recordObject)
    // var deleteRecord =  await l.deleteRecord(43)
    // await console.log(l._getLayerUrl());



}

// setTimeout(updateLayer, 6000)


