function createPopup(){
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/FeatureLayer",
        "esri/PopupTemplate",
        "esri/request",
      ], function (
        config,
        Map,
        mapView,
        Graphic,
        GraphicsLayer,
        FeatureLayer,
        PopupTemplate,
        esriRequest
      ) {
        config.apiKey =
          "apikey";
      
      
      
      
      
       
        
        var template = {
          // autocasts as new PopupTemplate()
          container: document.createElement("div"),
          actions: [editThisAction],
          title: "{Name}",
          content: `<table border = "1" align="center" width=100% >
         
      
          <tbody>
           <tr>
            
           <td align="right">{name}</td>
           <td align="right"> العنوان</td>
      
           </tr>
        
        
       
        
         
          <tr>
           
          <td align="right">{defendant_name} </td>
          <td align="right">الاسم الإفتراضي</td>
     
         </tr>

         <tr>
           
          <td align="right">{announ_no} </td>
          <td align="right">رقم الإعلان </td>
     
         </tr>
         <tr>
           
          <td align="right">{lawsuit_no} </td>
          <td align="right">رقم القضية </td>
     
         </tr>
         
         
       
        
         <tr>
           
         <td align="right">{lawsuit_type} </td>
         <td align="right"> نوع الدعوى </td>
    
        </tr>
        <tr>
           
        <td align="right">{announ_type} </td>
        <td align="right"> نوع الإعلان </td>
   
       </tr>
       <tr>
           
       <td align="right">{sender_court} </td>
       <td align="right"> المحكمة الراسلة </td>
  
      </tr>
      <tr>
           
      <td align="right">{primary_court} </td>
      <td align="right"> المحكمة الابتدائية </td>
 
     </tr>
    
    

<tr>
           
<td align="right">{advertising_priority} </td>
<td align="right"> أولوية الإعلان </td>

</tr>
<tr>
           
<td align="right"> </td>
<td align="right"> </td>

</tr>
<tr> 
<td colspan="2" align="right"><div  class="popup-btn">  <a href="http://35.225.123.108:8069/web#id={id}&cids=1&menu_id=109&action=174&active_id=1&model=project.task&view_type=form"> <div style="color:rgb(255, 255, 255);  text-align: center; ">التفاصيل</div> </a></div></td>
            
</tr>

         
        
       
      
          </tbody>
      
        </table> `,
      
         
       
        
      
        };
    
    
        map.layers.getItemAt(0).popupTemplate = template;
      
        
    });
      
}

$(document).ready(setTimeout(createPopup, 4000))