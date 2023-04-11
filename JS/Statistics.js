		
		
		function productOuts(){

			document.getElementById("productOutOption").classList.add('active');
		  
			document.getElementById("productInOption").classList.remove('active');

			document.getElementById("outOption").classList.remove('active');

			document.getElementById("inOption").classList.remove('active');

			document.getElementById("chart_product_out").classList.remove('invisible');

			document.getElementById("chart_product_out").classList.add('column2');

			document.getElementById("chart_product_in").classList.remove('column2');

			document.getElementById("chart_product_in").classList.add('invisible');

			document.getElementById("chart_month_out").classList.remove('column2');

			document.getElementById("chart_month_out").classList.add('invisible');
			document.getElementById("chart_month_in").classList.remove('column2');

			document.getElementById("chart_month_in").classList.add('invisible');


		}
		function productIn(){

			document.getElementById("productOutOption").classList.remove('active');
		  
			document.getElementById("productInOption").classList.add('active');

			document.getElementById("outOption").classList.remove('active');

			document.getElementById("inOption").classList.remove('active');


			document.getElementById("chart_product_out").classList.remove('column2');

			document.getElementById("chart_product_out").classList.add('invisible');

			document.getElementById("chart_product_in").classList.remove('invisible');

			document.getElementById("chart_product_in").classList.add('column2');

			document.getElementById("chart_month_out").classList.remove('column2');

			document.getElementById("chart_month_out").classList.add('invisible');
			document.getElementById("chart_month_in").classList.remove('column2');

			document.getElementById("chart_month_in").classList.add('invisible');

		}



		
		/*

		document.addEventListener("DOMContentLoaded", function() {
			 var jan = 0;
			  var feb = 0;
			  var mar = 0;
			  var apr = 0;
			  var may = 0;
			  var jun = 0;
			  var jul = 0;
			  var aug = 120;
			  var sep = 0;
			  var oct = 0;
			  var nov = 0;
			  var dec = 0;
			// Line chart 2
			new Chart(document.getElementById("chartjs-line2"), {
				type: "line",
				data: {
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					datasets: [{
						label: "Entradas",
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
		});
*/
		document.addEventListener("DOMContentLoaded", function() {
			// Doughnut chart
			new Chart(document.getElementById("chartjs-bar3"), {
				type: "bar",
				data: {
					labels: ["Social", "Search Engines", "Direct", "Other"],
					datasets: [{
						data: [260, 125, 54, 146],
						backgroundColor: [
							window.theme.primary,
							window.theme.success,
							window.theme.warning,
							"#dee2e6"
						],
						borderColor: "transparent"
					}]
				},
				options: {
					maintainAspectRatio: false,
					cutoutPercentage: 65,
					legend: {
						display: false
					}
				}
			});
		});

		document.addEventListener("DOMContentLoaded", function() {
			// Pie chart
			new Chart(document.getElementById("chartjs-pie"), {
				type: "pie",
				data: {
					labels: ["Social", "Search Engines", "Direct", "Other"],
					datasets: [{
						data: [260, 125, 54, 146],
						backgroundColor: [
							window.theme.primary,
							window.theme.warning,
							window.theme.danger,
							"#dee2e6"
						],
						borderColor: "transparent"
					}]
				},
				options: {
					maintainAspectRatio: false,
					legend: {
						display: false
					}
				}
			});
		});

		document.addEventListener("DOMContentLoaded", function() {
			// Radar chart
			new Chart(document.getElementById("chartjs-radar"), {
				type: "radar",
				data: {
					labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
					datasets: [{
						label: "Model X",
						backgroundColor: "rgba(0, 123, 255, 0.2)",
						borderColor: window.theme.primary,
						pointBackgroundColor: window.theme.primary,
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: window.theme.primary,
						data: [70, 53, 82, 60, 33]
					}, {
						label: "Model S",
						backgroundColor: "rgba(220, 53, 69, 0.2)",
						borderColor: window.theme.danger,
						pointBackgroundColor: window.theme.danger,
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: window.theme.danger,
						data: [35, 38, 65, 85, 84]
					}]
				},
				options: {
					maintainAspectRatio: false
				}
			});
		});

		document.addEventListener("DOMContentLoaded", function() {
			// Polar Area chart
			new Chart(document.getElementById("chartjs-polar-area"), {
				type: "polarArea",
				data: {
					labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
					datasets: [{
						label: "Model S",
						data: [35, 38, 65, 70, 24],
						backgroundColor: [
							window.theme.primary,
							window.theme.success,
							window.theme.danger,
							window.theme.warning,
							window.theme.info
						]
					}]
				},
				options: {
					maintainAspectRatio: false
				}
			});
		});
