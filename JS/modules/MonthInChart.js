
function onSelectChangeInMonth(){
    var select = document.getElementById("month_select_in");
    document.getElementById("in_month_lbl").innerHTML = select.value;
    var res = select.value.split("-");

    var y = res[0];
    var m = res[1]
    console.log(parseInt(m, 10));
    loadMonthInChartData((parseInt(m, 10) - 1),parseInt(y, 10),"true");

}

var inMonth=null;

function loadMonthInChartData(month,year,isUpdate){
    var databaseRef = firebase.database().ref("synclab0000001").child("coolingRecord");
    
  
    //var table = $('#ex-table').DataTable();
    console.log(month);
    console.log(year);
  

    databaseRef.once("value", function(snapshot) {
      var dates = [];
      snapshot.forEach(element => {

        var storageObj = element.val();
        var d = new Date(storageObj.recordDate);
        if(storageObj.kindOfMovement && storageObj.kindOfMovement == "Ingreso"){
            
            
            if(d.getMonth() == (month) && d.getFullYear() == year){
                dates.push(d.getDate());
                
            }
            



        }
        

          //var dataSet = [storageObj.name, storageObj.SKU, storageObj.status, storageObj.description];
          //dataSrc.push(dataSet);
      });
      dates.push(0);
      dates.push(31);
      dates.sort(function(a,b){return a - b});

      let unique = [...new Set(dates)];
      console.log(unique);

      var datas =  new Array(unique.length).fill(0);

      console.log("-------------1");
      snapshot.forEach(element => {

        var storageObj = element.val();
        var d = new Date(storageObj.recordDate);
        if(storageObj.kindOfMovement && storageObj.kindOfMovement == "Ingreso"){
            unique.forEach(function(valor, indice, array){
                if(d.getMonth() == (month) && d.getFullYear() == year){
                    if(valor == d.getDate()){
                        datas[indice]++; 
                    }
                }
                    
            });
            



        }
        

          //var dataSet = [storageObj.name, storageObj.SKU, storageObj.status, storageObj.description];
          //dataSrc.push(dataSet);
      });
      console.log("------------2");
      
      console.log(datas);
      if(isUpdate ==  "true"){
          console.log("up");
          inMonth.destroy();
      }
      inMonth = new Chart(document.getElementById("chartjs-bar2"), {
        type: "bar",
				data: {
					labels: unique,
					datasets: [{
						label: "Entradas",
						backgroundColor: window.theme.primary,
						borderColor: window.theme.primary,
						hoverBackgroundColor: window.theme.primary,
						hoverBorderColor: window.theme.primary,
						data: datas,
						barPercentage: .75,
						categoryPercentage: .5
					}]
				},
				options: {
					maintainAspectRatio: false,
					legend: {
						display: false
					},
					scales: {
						yAxes: [{
							gridLines: {
                color: "rgba(0,0,0,0.05)"
            },
stacked: false,
ticks: {
stepSize: 1
}
						}],
						xAxes: [{
							stacked: false,
							gridLines: {
                color: "transparent"
            }
						}]
					}
				}
    });
      
       
    

    });
    
    
  }
  function inOption(){

    document.getElementById("productOutOption").classList.remove('active');
    
    document.getElementById("productInOption").classList.remove('active');

    document.getElementById("outOption").classList.remove('active');

    document.getElementById("inOption").classList.add('active');
    document.getElementById("chart_product_out").classList.remove('column2');

    document.getElementById("chart_product_out").classList.add('invisible');

    document.getElementById("chart_product_in").classList.remove('column2');

    document.getElementById("chart_product_in").classList.add('invisible');
    
    document.getElementById("chart_month_out").classList.remove('column2');

    document.getElementById("chart_month_out").classList.add('invisible');

    document.getElementById("chart_month_in").classList.remove('invisible');

    document.getElementById("chart_month_in").classList.add('column2');

    var d= new Date();
    loadMonthInChartData(d.getMonth(),d.getFullYear(),"false");

  }
  


