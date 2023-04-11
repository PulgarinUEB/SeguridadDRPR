
function onSelectChangeOutMonth(){
    var select = document.getElementById("month_select_out");
    document.getElementById("out_month_lbl").innerHTML = select.value;
    var res = select.value.split("-");

    var y = res[0];
    var m = res[1]
    console.log(parseInt(m, 10));
    loadMonthOutChartData((parseInt(m, 10) - 1),parseInt(y, 10),"true");

}

var outMonth=null;

function loadMonthOutChartData(month,year,isUpdate){
    var databaseRef = firebase.database().ref("synclab0000001").child("coolingRecord");
  
    //var table = $('#ex-table').DataTable();
    console.log(month);
    console.log(year);
  

    databaseRef.once("value", function(snapshot) {
      var dates = [];
      snapshot.forEach(element => {

        var storageObj = element.val();
        var d = new Date(storageObj.recordDate);
        if(storageObj.kindOfMovement && storageObj.kindOfMovement == "Despacho"){
            
            
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
        if(storageObj.kindOfMovement && storageObj.kindOfMovement == "Despacho"){
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
          outMonth.destroy();
      }
      outMonth = new Chart(document.getElementById("chartjs-bar1"), {
        type: "bar",
				data: {
					labels: unique,
					datasets: [{
						label: "Despachos",
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
  
  function outOption(){
    document.getElementById("productOutOption").classList.remove('active');
		  
    document.getElementById("productInOption").classList.remove('active');

    document.getElementById("outOption").classList.add('active');

    document.getElementById("inOption").classList.remove('active');

    document.getElementById("chart_product_out").classList.remove('column2');

    document.getElementById("chart_product_out").classList.add('invisible');

    document.getElementById("chart_product_in").classList.remove('column2');

    document.getElementById("chart_product_in").classList.add('invisible');
    
    document.getElementById("chart_month_out").classList.remove('invisible');

    document.getElementById("chart_month_out").classList.add('column2');
    document.getElementById("chart_month_in").classList.remove('column2');

    document.getElementById("chart_month_in").classList.add('invisible');
    var d= new Date();
    loadMonthOutChartData(d.getMonth(),d.getFullYear(),"false");
  }

