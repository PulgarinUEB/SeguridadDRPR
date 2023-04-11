// MARK: - Auth
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
      var user = firebase.auth().currentUser;
      console.log(assignedEntity);
  } 
  else {
      window.location.replace("./index.html")
  }
});

// MARK: - Firebase
var firebaseRef = firebase.database().ref("synclab0000001").child("catalog");
var dataSrc = [];

function loadData(callback){
  var databaseRef = firebase.database().ref("synclab0000001").child("catalog");

  //var table = $('#ex-table').DataTable();

  console.log("Loading data starts ...");
  databaseRef.on("value", function(snapshot) {
    
    snapshot.forEach(element => {
      var storageObj = element.val();
      console.log("Loading data starts3 ...");
        var dataSet = [storageObj.name, storageObj.SKU, storageObj.status, storageObj.description];
        dataSrc.push(dataSet);
    });
     
  
    console.log("Loading data ends ...");
    
    console.log("table initialization started ...");
      var dTable=$('#dataTable').DataTable({
        "bDestroy": true,    
        data: dataSrc,
        columns: [
              { title: "Nombre" },
              { title: "SKU" },
              { title: "Estado" },
              { title: "Descripción" }
          ],
        });
    console.log("table initialization ends ...");
  });
  
   if(callback){callback();}
}

function 	downloadObjectAsJson(exportObj, exportName){
  
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    var container = document.getElementById('container');
    container.appendChild(downloadAnchorNode);
}

document.addEventListener("DOMContentLoaded", function(event) {
  var NewFile = "records";
  loadData(downloadObjectAsJson(dataSrc, NewFile));
});  
