$( document ).ready(function(){
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(hi);
});

function drawChart(data) {
	console.log("Inside drawChart",data);
	var data = google.visualization.arrayToDataTable(data);
	var options = {
		width: 400,
    	height: 300,  
    	title: 'Area Percentage of Crops',
    	is3D: true,
    	animation: {duration: 1000, easing: 'out'}
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	google.visualization.events.addListener(chart, 'click', function () {
		chart.clearChart()
	});
	
	google.visualization.events.addListener(chart, 'ready', function () {});
	chart.draw(data, options);
	console.log("Inside drawChart 11");
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setMap());
	} 
	else {
		alert("Geolocation is not supported by this browser.");
	}
}

function makeTableHTML(myArray,array) {
	var result = "<table class='table'>";
	result += "<thead><tr><th>Crop</th><th>Yield</th></tr></thead><tbody>";

	for(var i=0; i<myArray.length; i++) {
		result += "<tr>";
		result += "<td>"+myArray[i]+"</td>";
		result += "<td>"+array[i]+"</td>";
		result += "</tr>";
	}
	result += "</tbody></table>";
	return result;
}

function hello(farm,households){
	$.getJSON( "../../static/json/member.json", function( data ) {
		for(row in data){
			if(data[row].HID==households && data[row].relation=="Head"){
				var owner=data[row].name
			} 
		}

		$.getJSON( "../../static/json/crop.json", function( data ) {
			var crop=[]
			var yield=[]
			for(row in data){
				if(data[row].FID==farm.FID && data[row].season==document.getElementById("season").value &&data[row].year==document.getElementById("value").innerHTML){
					crop.push(data[row].Crop )
					yield.push(data[row].Yield)					
				}
			}
			console.log("Draw table");
			document.getElementById('farmdetails').innerHTML="<p><b>Owner</b> : "+owner+"</p><br><p><b>Total Area </b>: "+farm.area+" hectares</p><br>"+makeTableHTML(crop,yield)
		});
	});
}

function hi(farm){
	if(farm){ 
		$('#myModal').modal();
		$.getJSON( "../../static/json/crop.json", function( data ) {
			var piedata=[["crop","extent"]]
			for (row in data){
				var temp=[]
				if(data[row].FID==farm &&data[row].season==document.getElementById("season").value &&data[row].year==document. getElementById("value").innerHTML ){
					temp.push(data[row].Crop)
					temp.push(data[row].Extent)
					piedata.push(temp)
				}  
			}
			console.log(piedata);
			drawChart(piedata)
		});
	}
}

function lease(farm){
	if(farm){ 
		$('#myModal1').modal();
		$.getJSON( "../../static/json/leasefarm.json", function( data ) {
			var land_area=0;
			var land_cost=0;
			for (row in data){
				console.log("farm"+farm);
				console.log("ID"+data[row].LFID);
				if (data[row].LFID==farm){
					land_area=data[row].area;
					land_cost=data[row].cost;
					console.log("area "+data[row].area);
					console.log("cost "+data[row].cost);
				}
			}
			document.getElementById('leasedetails').innerHTML="<p><b>Total Area </b>: "+land_area+" hectares</p><br><p><b>Land Cost </b>: "+land_cost+" Rupees per Month</p><br>";
		});
	}
}
/*
function lease(farm){
	$.getJSON( "../../static/json/member.json", function( data ) {
		for(row in data){
			if(data[row].HID==households && data[row].relation=="Head"){
				var owner=data[row].name
			} 
		}

		$.getJSON( "../../static/json/crop.json", function( data ) {
			var crop=[]
			var yield=[]
			for(row in data){
				if(data[row].FID==farm.FID && data[row].season==document.getElementById("season").value &&data[row].year==document.getElementById("value").innerHTML){
					crop.push(data[row].Crop )
					yield.push(data[row].Yield)					
				}
			}
			document.getElementById('farmdetails').innerHTML="<p><b>Owner</b> : "+owner+"</p><br><p><b>Total Area </b>: "+farm.area+" hectares</p><br>"+makeTableHTML(crop,yield)
		});
}*/
function setMap(position) {
	var myCenter = new google.maps.LatLng(12.9716,78.7541);
	var mapCanvas = document.getElementById("map");
	var mapOptions = {center: myCenter, zoom: 6, mapTypeId: 'terrain'};
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var srcImage = 'https://developers.google.com/maps/documentation/' +
		'javascript/examples/full/images/talkeetna.png';

	// The custom USGSOverlay object contains the USGS image,
	// the bounds of the image, and a reference to the map.

	var infowindow = new google.maps.InfoWindow();
	$.getJSON( "../../static/json/household.json", function( data ) {
		var marker
			$.getJSON( "../../static/json/householdphoto.json", function( data1 ){
			for (row in data){
				for(temp in data1){
					if(data[row].monthly_income>=40000){
				var house_icon = {
					url:"../../static/img/index.png", 
					scaledSize: new google.maps.Size(5*data[row].number_of_member,5*data[row].number_of_member), 
					origin: new google.maps.Point(0,0), 
					anchor: new google.maps.Point(0, 0)
				};
				}
				if(data[row].monthly_income<40000){
			var house_icon = {
			url:"../../static/img/index1.png", 
			scaledSize: new google.maps.Size(5*data[row].number_of_member,5*data[row].number_of_member), 
			origin: new google.maps.Point(0,0), 
			anchor: new google.maps.Point(0, 0)
			};
			}
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(data[row].location.coordinates[1], data[row].location.coordinates[0]),
					icon:house_icon,
				});
				google.maps.event.addListener(marker, 'mouseover', (function(marker, row) {
					return function() {
						infowindow.setContent("<b> Members : </b>"+data[row].number_of_member+ "<br><br>"+"<b>Income(per month) :</b> "+data[row].monthly_income+ "<br><br>" +'<img src="https://kisan-vikas-server.herokuapp.com'+data1[row].pic_name+'">');
						infowindow.open(map, marker);
					}
				}
				)(marker, row));
				marker.setMap(map);
			}
		}
		});
	});
	/*
	$.getJSON( "../../static/json/household.json", function( data ) {
		var marker
		$.getJSON( "../../static/json/householdphoto.json", function( data1 ) {
		for (row in data){ 
			for(temp in data1){
				if(data[row].HID == data1[temp].HID){
					if(data[row].monthly_income>10000){
			var house_icon = {
			url:"../../static/img/index.ico", 
			scaledSize: new google.maps.Size(10*data[row].number_of_member,10*data[row].number_of_member), 
			origin: new google.maps.Point(0,0), 
			anchor: new google.maps.Point(0, 0)
			};
			}
			if(data[row].monthly_income<10000){
			var house_icon = {
			url:"../../static/img/index1.ico", 
			scaledSize: new google.maps.Size(10*data[row].number_of_member,10*data[row].number_of_member), 
			origin: new google.maps.Point(0,0), 
			anchor: new google.maps.Point(0, 0)
			};
			}
				marker = new google.maps.Marker({
				position: new google.maps.LatLng(data[row].location.coordinates[1], data[row].location.coordinates[0]),
				icon:house_icon,
			});
			google.maps.event.addListener(marker, 'mouseover', (function(marker, row) {

				return function() {
					infowindow.setContent("<b>members : </b>"+data[row].number_of_member+ "<br><br>"+"<b>income :</b> "+data[row].monthly_income+ "" + "<br><br>" + '<img src="https://kisan-vikas-server.herokuapp.com' + data1[row].pic_name + '">');
					infowindow.open(map, marker);
				}
			}
			)(marker, row));
			marker.setMap(map);
			}}}
		});
	});*/

	$.getJSON( "../../static/json/well.json", function( data ) {
		var marker
			$.getJSON( "../../static/json/wellphoto.json", function( data1 ){
			for (row in data){
				for(temp in data1){
				var house_icon = {
					url:"../../static/img/well.jpg", 
					scaledSize: new google.maps.Size(20,20), 
					origin: new google.maps.Point(0,0), 
					anchor: new google.maps.Point(0, 0)
				};
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(data[row].location.coordinates[1], data[row].location.coordinates[0]),
					icon:house_icon,
				});
				google.maps.event.addListener(marker, 'mouseover', (function(marker, row) {
					return function() {
						infowindow.setContent("<b>Depth : </b>"+data[row].depth+"<br> <br>"+" <b>Yield :</b> "+ data[row].average_yield  + "<br><br>" + '<img src="https://kisan-vikas-server.herokuapp.com' + data1[row].pic_name + '">');
						infowindow.open(map, marker);
					}
				}
				)(marker, row));
				marker.setMap(map);
			}
		}
		});
	});


	$.getJSON( "../../static/json/storage.json", function( data ) {
		var marker
			$.getJSON( "../static/json/storagephoto.json", function( data1 ){
			for (row in data){
				for(temp in data1){
					var house_icon = {
					url:"../../static/img/storage.png", 
					scaledSize: new google.maps.Size(20,20), 
					origin: new google.maps.Point(0,0), 
					anchor: new google.maps.Point(0, 0)
				};
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(data[row].location.coordinates[1], data[row].location.coordinates[0]),
					icon:house_icon,
				});
				google.maps.event.addListener(marker, 'mouseover', (function(marker, row) {
					return function() {
						infowindow.setContent("<b>Owner : </b>"+data[row].owner_name+"<br> <br>"+" <b>Capacity :</b> "+ data[row].storage + "<br><br>" + '<img src="https://kisan-vikas-server.herokuapp.com' + data1[row].pic_name + '">');
						infowindow.open(map, marker);
					}
				}
				)(marker, row));
				marker.setMap(map);
			}
		}
		});
	});


	$.getJSON( "../../static/json/farm.json", function( data ) {
		for (row in data){ 
			var path=[]
			for (rows in data[row].plot.coordinates[0]){
				path.push(new google.maps.LatLng(data[row].plot.coordinates[0][rows][1],data[row].plot.coordinates[0][rows][0]))
			}

			var flightPath = new google.maps.Polygon({
				path: path,
				strokeColor: "green",
				strokeOpacity: 1,
				strokeWeight: 2,
				fillColor: "green",
				fillOpacity: 0.4,
			});   
			flightPath.setMap(map);
			google.maps.event.addListener(flightPath, 'click', (function(marker,row) {
				return function() {
					hi(data[row].FID)
					hello(data[row],data[row].HID)
				}
			})(flightPath, row));

		}
	});

	$.getJSON( "../../static/json/leasefarm.json", function( data ) {
		for (row in data){ 
			var path=[]
			for (rows in data[row].plot.coordinates[0]){
				path.push(new google.maps.LatLng(data[row].plot.coordinates[0][rows][1],data[row].plot.coordinates[0][rows][0]))
			}

			var flightPath = new google.maps.Polygon({
				path: path,
				strokeColor: "red",
				strokeOpacity: 1,
				strokeWeight: 2,
				fillColor: "red",
				fillOpacity: 0.4,
			});   

			flightPath.setMap(map);
			google.maps.event.addListener(flightPath, 'click', (function(marker,row) {
				return function() {
					lease(data[row].LFID)
					//hello(data[row],data[row].HID)
				}
			})(flightPath, row));

		}
	});
	var iconBase = '../../static/img/';
        var icons = {
          House1: {
            name: 'Household(income<40k/month)',
            icon: iconBase + 'index1.ico'
          },
          House2: {
            name: 'Household(income>=40k/month)',
            icon: iconBase + 'index.ico'
          },
          Well: {
            name: 'Well',
            icon: iconBase + 'well.ico'
          },
          Storage: {
            name: 'Storage House',
            icon: iconBase + 'storage.ico'
          }
        };
 	var legend = document.getElementById('legend');
        for (var key in icons) {
          var type = icons[key];
          var name = type.name;
          var icon = type.icon;
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + name;
          legend.appendChild(div);
        }
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}
