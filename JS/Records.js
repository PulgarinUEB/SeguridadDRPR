// MARK: - Auth
firebase.auth().onAuthStateChanged(function(user) {
  /*
    if (user) {
        var user = firebase.auth().currentUser;
        console.log(assignedEntity);
    } 
    else {
        window.location.replace("./index.html")
    }
    */
  });


  // MARK: - Firebase
var dataSrc = [];
var ids = [];


function loadData(callback){

  dataSrc = [];

  var databaseRef = firebase.database().ref("synclab0000001").child("coolingRecord");

  var productRef = firebase.database().ref("synclab0000001").child("catalog");
  var userRef = firebase.database().ref("usersPivot");
  var ahdsh = "hdashdas"

  //var table = $('#ex-table').DataTable();

  console.log("Loading data starts ...");
  userRef.once("value", function(users){
    productRef.once("value", function(products){
      databaseRef.on("value", function(snapshot) {
        var count = 0;
      
        snapshot.forEach(element => {
    
          var storageObj = element.val();
          var user = "";
          if(storageObj.createdBy){

            user = users.child(storageObj.createdBy).val().name
          }    
          var fb = storageObj.FBId;
          var d = new Date(storageObj.createdAt);
          ids.push(fb);

            var dataSet = [
              products.child(storageObj.productFBId).val().name, 
              products.child(storageObj.productFBId).val().SKU, 
              storageObj.kindOfMovement, 
              storageObj.qtty, 
              storageObj.packaging, 
              d.toLocaleDateString("en-US"), 
              "<button data-toggle='modal' data-target='#gfgmodal' id='record_click' onclick='test("+count+")'> Ver Más </button>", 
              user];
            dataSrc.push(dataSet);
            count++;
        });
        
        console.log("Loading data ends ...");
        
        console.log("table initialization started ...");
          var dTable=$('#dataTable').DataTable({
            "bDestroy": true,    
            data: dataSrc
            });
        console.log("table initialization ends ...");
      });
    });
  });
  
  
  
   if(callback){callback();}
}

function downloadObjectAsJson(exportObj, exportName){
  
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  var container = document.getElementById('container');
  container.appendChild(downloadAnchorNode);
}


function getDataToPopUp(id){
  var x = document.getElementById("record_click").name;
  console.log(x);
}

var test = function(value) {
  document.getElementById('imagesContainer').innerHTML = "";
  console.log(ids[value]);
  loadProductData(ids[value]);
};

function loadProductData(fbid){
  if(fbid){
    var databaseRef = firebase.database().ref("synclab0000001").child("coolingRecord").child(fbid);
    var productRef = firebase.database().ref("synclab0000001").child("catalog");
    var userRef = firebase.database().ref("usersPivot");
    userRef.once("value", function(users){
      productRef.once("value", function(products){
        databaseRef.once("value", function(snapshot) {
          var user = "";
          if(snapshot.val().createdBy){
            user = users.child(snapshot.val().createdBy).val().name;
          } 
          document.getElementById("recordUser").innerHTML =  user;

          var product = "";
          if(snapshot.val().productFBId){
            product = products.child(snapshot.val().productFBId).val().name;
          } 
          document.getElementById("productName").innerHTML =  product;

          var sku = "";
          if(snapshot.val().productFBId){
            sku = products.child(snapshot.val().productFBId).val().SKU;
          } 
          document.getElementById("productSKU").innerHTML =  sku;

          var mov = "";
          if(snapshot.val().kindOfMovement){
            mov = snapshot.val().kindOfMovement;
          } 
          document.getElementById("recordType").innerHTML =  mov;

          var qtty = "";
          if(snapshot.val().qtty){
            qtty = snapshot.val().qtty;
          } 
          document.getElementById("recordQtty").innerHTML =  qtty;


          var pack = "";
          if(snapshot.val().packaging){
            pack = snapshot.val().packaging;
          } 
          document.getElementById("recordPack").innerHTML =  pack;


          var lot = "";
          if(snapshot.val().lot){
            lot = snapshot.val().lot;
          } 
          document.getElementById("recordLot").innerHTML =  lot;


          var date = "";
          if(snapshot.val().createdAt){
            var d = new Date(snapshot.val().createdAt);
            date = d.toLocaleDateString("en-US");
          } 
          document.getElementById("recordDate").innerHTML =  date;

          snapshot.child("images").forEach(element => {
            var storageObj = element.val();
            console.log(""+storageObj.URL);
            var img = document.createElement('img'); 
            img.src =storageObj.URL;
            img.height = 200;
            img.width = 200;
            document.getElementById('imagesContainer').appendChild(img); 
            var as = document.createElement('a'); 
            document.getElementById('imagesContainer').appendChild(as); 
            img.onclick = function(){
              var a = document.createElement('a');
              a.href = storageObj.URL;
              a.download = "output.png";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
    
          });
           
            
            
        });
      });
    });
    
    
    
  }
  
}


function createReport(tableID, ReportName = ''){
  var downloadLink;
  var dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  ReportName = ReportName?ReportName+'.xls':''+'FlowControl Reporte.xls';//modify excle sheet name here 
  
  // Create download link element
  downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, ReportName);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = ReportName;
      
      //triggering the function
      downloadLink.click();
  }
}

function loadDataFiltered(callback){

  // MARK: Date Filter
  var startDate = document.getElementById('startDatePicker');
  var endDate = document.getElementById('endDatePicker');
  console.log(startDate.value); // prints "2017-06-01"
  console.log(endDate.value); // prints "2017-06-01"

  var dataSrc = [];

  var databaseRef = firebase.database().ref("synclab0000001").child("coolingRecord").orderByChild('createdAt').startAt(String(startDate.value)).endAt(String(endDate.value));

  var productRef = firebase.database().ref("synclab0000001").child("catalog");
  var userRef = firebase.database().ref("usersPivot");

  //var table = $('#ex-table').DataTable();

  console.log("Loading data starts ...");
  userRef.once("value", function(users){
    productRef.once("value", function(products){
      databaseRef.on("value", function(snapshot) {
        var count = 0;
      
        snapshot.forEach(element => {
    
          var storageObj = element.val();
          var user = "";
          if(storageObj.createdBy){

            user = users.child(storageObj.createdBy).val().name
          }    
          var fb = storageObj.FBId;
          var d = new Date(storageObj.createdAt);
          ids.push(fb);

            var dataSet = [
              products.child(storageObj.productFBId).val().name, 
              products.child(storageObj.productFBId).val().SKU, 
              storageObj.kindOfMovement, 
              storageObj.qtty, 
              storageObj.packaging, 
              d.toLocaleDateString("en-US"), 
              "<button data-toggle='modal' data-target='#gfgmodal' id='record_click' onclick='test("+count+")'> Ver Más </button>", 
              user];
            dataSrc.push(dataSet);
            count++;
        });
        
        console.log("Loading data ends ...");
        
        console.log("table initialization started ...");
          var dTable=$('#dataTable').DataTable({
            "bDestroy": true,    
            data: dataSrc
            });
        console.log("table initialization ends ...");
      });
    });
  });
  
  
  
   if(callback){callback();}
}


function filterByDate() {

  var NewFile = "records";
  loadDataFiltered(downloadObjectAsJson(dataSrc, NewFile));

  document.addEventListener("DOMContentLoaded", function(event) {}); 
}


document.addEventListener("DOMContentLoaded", function(event) {
  var NewFile = "records";
  loadData(downloadObjectAsJson(dataSrc, NewFile));
});  

$(document).ready( function() {

  var actualDate = new Date();
  var lastDayOfMonth = new Date(actualDate.getFullYear(), actualDate.getMonth()+1, actualDate.getDay());


  document.getElementById('startDatePicker').valueAsDate = new Date();
  document.getElementById('endDatePicker').valueAsDate = lastDayOfMonth;
});

function exportToCSV(arrayToExport) {

  var CsvString = "";
  arrayToExport.forEach(function(RowItem, RowIndex) {
    RowItem.forEach(function(ColItem, ColIndex) {
      CsvString += ColItem + '|';
    });
    CsvString += "\r\n";
  });
    
  CsvString = "data:application/csv," + encodeURIComponent(CsvString);
  
  var x = document.createElement("A");
  x.setAttribute("href", CsvString );
  x.setAttribute("download","Flow Control - Datos.csv");
  document.body.appendChild(x);
  x.click();
}


function downloadFromFirebase(callback){

  // MARK: Date Filter
  var startDate = document.getElementById('startDatePicker');
  var endDate = document.getElementById('endDatePicker');
  console.log(startDate.value); // prints "2017-06-01"
  console.log(endDate.value); // prints "2017-06-01"

  var dataSrc = []; 
  var header = ["Producto", "SKU", "Movimiento", "Cantidad", "Embalaje", "Lote","Fecha", "Creado por"];
  dataSrc.push(header);

  var databaseRef = firebase.database().ref("synclab0000001").child("coolingRecord").orderByChild('createdAt').startAt(String(startDate.value)).endAt(String(endDate.value));

  var productRef = firebase.database().ref("synclab0000001").child("catalog");
  var userRef = firebase.database().ref("usersPivot");

  //var table = $('#ex-table').DataTable();

  console.log("Loading data starts ...");
  userRef.once("value", function(users){
    productRef.once("value", function(products){
      databaseRef.on("value", function(snapshot) {
        var count = 0;
      
        snapshot.forEach(element => {
    
          var storageObj = element.val();
          var user = "";
          if(storageObj.createdBy){

            user = users.child(storageObj.createdBy).val().name
          }    
          var fb = storageObj.FBId;
          var d = new Date(storageObj.createdAt);
          ids.push(fb);

            var dataSet = [
              products.child(storageObj.productFBId).val().name, 
              products.child(storageObj.productFBId).val().SKU, 
              storageObj.kindOfMovement, 
              storageObj.qtty, 
              storageObj.packaging, 
              storageObj.lot, 
              d.toLocaleDateString("en-US"), 
              user];
            dataSrc.push(dataSet);
            count++;
        });

        exportToCSV(dataSrc);
      });
    });
  });
  
  
  
   if(callback){callback();}
}