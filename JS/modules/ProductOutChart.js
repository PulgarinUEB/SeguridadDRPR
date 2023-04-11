
function onSelectChangeOut(){
    var select = document.getElementById("product_select_out");
    document.getElementById("out_product_lbl").innerHTML = select.options[select.selectedIndex].text;
    var fbid = select.value;
    loadProductOutChartData(fbid,"true");

}

function loadOutSelectData(){
    var databaseRef = firebase.database().ref("synclab0000001").child("catalog");
  
    //var table = $('#ex-table').DataTable();
  
    console.log("Loading data starts ...");
    var select = document.getElementById("product_select_out");


    databaseRef.once("value", function(snapshot) {
        
      snapshot.forEach(element => {
        var storageObj = element.val();
        select.options[select.options.length] = new Option(storageObj.name,storageObj.FBId);
        

       
        });

    });
    
    
  }
document.addEventListener("DOMContentLoaded", function() {
    // Line chart
    loadOutSelectData();

});
var out=null;

function loadProductOutChartData(fbid,isUpdate){
    var databaseRef = firebase.database().ref("synclab0000001").child("coolingRecord");
  
    //var table = $('#ex-table').DataTable();
  
    console.log("Loading data starts ...");

    databaseRef.once("value", function(snapshot) {
      var jan = 0;
      var feb = 0;
      var mar = 0;
      var apr = 0;
      var may = 0;
      var jun = 0;
      var jul = 0;
      var aug = 0;
      var sep = 0;
      var oct = 0;
      var nov = 0;
      var dec = 0;
      snapshot.forEach(element => {
        var storageObj = element.val();
        var d = new Date(storageObj.recordDate);
        if(fbid){
            if(fbid == "non"){
                if(storageObj.kindOfMovement && storageObj.kindOfMovement == "Despacho"){
                    console.log("Loading data starts3 ..."+storageObj.FBId);
                    if(d.getMonth() == 0){
                        jan++;
                    }else if(d.getMonth() == 1){
                        feb++;
                    }else if(d.getMonth() == 2){
                        mar++;
                    }else if(d.getMonth() == 3){
                        apr++;
                    }else if(d.getMonth() == 4){
                        may++;
                    }else if(d.getMonth() == 5){
                        jun++;
                    }else if(d.getMonth() == 6){
                        jul++;
                    }else if(d.getMonth() == 7){
                        aug++;
                    }else if(d.getMonth() == 8){
                        sep++;
                    }else if(d.getMonth() == 9){
                        oct++;
                    }else if(d.getMonth() == 10){
                        nov++;
                    }else if(d.getMonth() == 11){
                        dec++;
                    }



                }
            }else{
                if(storageObj.productFBId){
                    if(storageObj.productFBId == fbid){
                        if(storageObj.kindOfMovement && storageObj.kindOfMovement == "Despacho"){
                            console.log("Loading data starts3 ..."+storageObj.FBId);
                            if(d.getMonth() == 0){
                                jan++;
                            }else if(d.getMonth() == 1){
                                feb++;
                            }else if(d.getMonth() == 2){
                                mar++;
                            }else if(d.getMonth() == 3){
                                apr++;
                            }else if(d.getMonth() == 4){
                                may++;
                            }else if(d.getMonth() == 5){
                                jun++;
                            }else if(d.getMonth() == 6){
                                jul++;
                            }else if(d.getMonth() == 7){
                                aug++;
                            }else if(d.getMonth() == 8){
                                sep++;
                            }else if(d.getMonth() == 9){
                                oct++;
                            }else if(d.getMonth() == 10){
                                nov++;
                            }else if(d.getMonth() == 11){
                                dec++;
                            }
        
        
        
                        }	
                    }
                }
            }
        }
        

          //var dataSet = [storageObj.name, storageObj.SKU, storageObj.status, storageObj.description];
          //dataSrc.push(dataSet);
      });
      if(isUpdate ==  "true"){
          console.log("up");
          out.destroy();
      }
      out = new Chart(document.getElementById("chartjs-line2"), {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Salidas",
                fill: true,
                backgroundColor: "#e37960",
                borderColor: "#11698e",
                borderDash: [4, 4],
                data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                intersect: false
            },
            hover: {
                intersect: true
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    reverse: true,
                    gridLines: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }],
                yAxes: [{
                    ticks: {
                        stepSize: 500
                    },
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: "rgba(0,0,0,0)",
                        fontColor: "#fff"
                    }
                }]
            }
        }
    });
      
       
    
      console.log("Loading data ends ..."+jan);

    });
    
    
  }
  

document.addEventListener("DOMContentLoaded", function() {
    // Line chart
    loadProductOutChartData("non","false");

});