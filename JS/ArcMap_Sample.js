/**
 * @ Dr. S. Boroushaki
 * Add a simple GeoJson Layer to the map
 */

// declaring variables outside of ready function -- All functions can have access to these variables
var map,
    centerlatlng = L.latLng(36.778259, -119.417931),
    aScale,
    aDiv;

var arrowNorth = L.icon({
    iconUrl: 'img/N Arrow.png',
    iconSize: [179, 282], // size of the icon
    iconAnchor: [89.5, 282], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -282]
})

var agIcon = L.icon({
    iconUrl: 'img/harvest.png'
})




$(function () {

    // With strict mode, you can not use undeclared variables.
    // Strict mode makes it easier to write "secure" JavaScript. https://www.w3schools.com/js/js_strict.asp
    "use strict";

    console.info("Start Web-Mapping 0!");

    // Create a tile layer as our base map - using MapBox
    // https://www.mapbox.com/api-documentation/?language=JavaScript#maps
    // MapBox Base Layers - You neeed to have your Access Token to get access
    var aLayerOne = L.tileLayer('https://api.tiles.mapbox.com/v4/{map_id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: '&copy; <a href="https://www.mapbox.com">MapBox</a> | &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> ',
        maxZoom: 18,
        map_id: 'mapbox.light',
        accessToken: 'pk.eyJ1IjoiY29sbGVnZWtpZDk2MTUiLCJhIjoiY2plZ2F2cTloMmQ1NzJ5cWV6enN4YXBxcSJ9.ooJSy76SFL_gdIa6i_eCRA'

    });

    var aLayerTwo = L.tileLayer('https://api.tiles.mapbox.com/v4/{map_id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: '&copy; <a href="https://www.mapbox.com">MapBox</a> | &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> ',
        maxZoom: 18,
        map_id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoiY29sbGVnZWtpZDk2MTUiLCJhIjoiY2plZ2F2cTloMmQ1NzJ5cWV6enN4YXBxcSJ9.ooJSy76SFL_gdIa6i_eCRA'

    });

    // Creating a geojson layer using groundwater geojson file
    //var aLayerThree = L.geoJson(aGeoJson);



    var aWaterLayer = L.geoJSON(cropsJoined, {
        style: function (feature) { //First, define ths style function based on feature
            return { // You will return the following that is within this
                "color": "#2662c1",
                "strokeColor": "#1b79e6",
                "weight": .5,
                "fillOpacity": .4 //Full transerpancy

            }
        }, // end of style

        onEachFeature: function (feature, layer) { //on each feature, in this case, for each groundwater basin feature, perform the following. You normally use this to do popUps for each feature of a layer

            layer.on("mouseover", function () { //When the mouse is over, do the following

                console.info(` There are ${feature.properties.URBAN} acres`)
                layer.setStyle({ // (1) Set the layer to the following

                    "color": "#aaaa2f", // (A) Fill the color for each on its own property
                    "fillOpacity": .4,
                    "strokeColor": "white"

                });

                $("#aCustomC").html(feature.properties.GWBASIN)







            }); // End of mouseover event

            layer.on("mouseout", function () {


                layer.setStyle({

                    "color": "#2662c1",
                    "strokeColor": "#e61b1b",
                    "weight": .5,
                    "fillOpacity": .4
                })

                $("#aCustomC").html("Web-Mapping")

            }); // End of mouseout event



            var clickEvenet = layer.on("click", function () {

                    google.charts.load('current', {
                        'packages': ['corechart']
                    });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() { //The following will create a chart

                        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Urban', feature.properties.URBAN],
          ['Sunflowers', feature.properties.SUNFLOWERS],
          ['Alfalfa', feature.properties.ALFALFA_AN],
          ['Miscella Type 3', feature.properties.MISCELLA_3],
          ['Cole Crops', feature.properties.COLE_CROPS],
          ['Grapes', feature.properties.GRAPES],
          ['Strawberries', feature.properties.STRAWBERRI],
          ['Corn', feature.properties.CORN__SORG],
          ['Mixed Pastrure', feature.properties.MIXED_PAST],
          ['CITRUS', feature.properties.CITRUS],
          ['Peaches', feature.properties.PEACHES_NE],
          ['Almonds', feature.properties.ALMONDS],
          ['Tomatos', feature.properties.TOMATOES],
          ['Cotton', feature.properties.COTTON],
          ['Avocados', feature.properties.AVOCADOS],
          ['Dates', feature.properties.DATES],
          ['Olives', feature.properties.OLIVES],
          ['Rice', feature.properties.RICE],
          ['Pears', feature.properties.PEARS],
          ['Wild Rice', feature.properties.WILD_RICE],
          ['Apples', feature.properties.APPLES],
          ['Potatos', feature.properties.POTATOES_A]
        ]); //Creating the visuals of it, including the data from geoJSON


                        var options = {
                            title: ('Acreage of crops wihtin the segement of the ' + feature.properties.GWBASIN),
                            width: 500,
                            height: 350
                        }; //Title of the chart

                        var chart = new google.visualization.PieChart(document.getElementById('piechart')); //Making the chart as a div element

                        chart.draw(data, options);
                    } //creation of charts from google 

                    var foodArray = [feature.properties.URBAN, feature.properties.SUNFLOWERS, feature.properties.ALFALFA_AN, feature.properties.MISCELLA_3, feature.properties.COLE_CROPS, feature.properties.GRAPES, feature.properties.STRAWBERRI, feature.properties.CORN__SORG, feature.properties.MIXED_PAST, feature.properties.CITRUS, feature.properties.ALMONDS, feature.properties.TOMATOES, feature.properties.COTTON, feature.properties.AVOCADOS, feature.properties.DATES, feature.properties.OLIVES, feature.properties.RICE, feature.properties.PEARS, feature.properties.WILD_RICE, feature.properties.APPLES, feature.properties.POTATOES_A];




                    console.info(Object.keys(feature.properties));

                    if (Math.max(...foodArray) == Math.max(...foodArray)) {

                        console.info(feature.properties);

                    }

                    console.info(Math.max(...foodArray));

                    console.info(`${Math.max(...foodArray)} is ${Object.keys((Math.max(...foodArray)))}`);

                }

            );


            /*    var popUp = L.popup({
                                 maxWidth: 300,
                                 minWidth: 100
                                        
                                    });*/


        }

    }) //End of creataing water basin feature

    $("#info").on("click", function () {

        window.location.href = "https://gis.water.ca.gov/app/CADWRLandUseViewer/"
        target = "_blank"

    }) //Link to original Data

    // Initiate a map object, place it in myMap div and pass its options including the base map layer: aLayerOne
    map = L.map('myMap', {
        center: centerlatlng,
        zoom: 6.5,
        layers: [aLayerTwo, aWaterLayer] // These are the maps that will come out by default
    });

    // Creating an EVENT for the map
    // By clicking on the map , we write within the console


    // Add a simple scale. the scale shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems


    var sidebar = L.control.sidebar('sidebar', {
        position: 'left'
    });

    setTimeout(function () {
        sidebar.show();
    }, 500);

    map.addControl(sidebar);

    L.control.scale().addTo(map); // options {metric: false}


    //Add a Layer Control to Map
    // You need to have multiple Base Maps - TileLayers
    // i. Create a JavaScript Object of Basemap Layer names as the key and your tilelayers as the values
    var baseLayers = {
        "Light Base": aLayerOne,
        "Dark Base": aLayerTwo
    };

    // ii. Create an overlay Object
    var overLayers = {
        "Ground Water CA": aWaterLayer,

    };

    // iii. create a layers control and pass your object to it and add it to map.
    L.control.layers(baseLayers, overLayers).addTo(map);



    var aControl = L.control({
        position: 'bottomleft'
    });

    aControl.onAdd = function () {

        aDiv = L.DomUtil.create('div');
        $(aDiv).attr('id', 'aCustomC')
            .html('Web-Mapping');

        return aDiv;
    };
    aControl.addTo(map); //custom 1

    var northArrow = L.control({

        position: 'bottomright'

    });
    northArrow.onAdd = function (map) {

        var divN = L.DomUtil.create('div');
        $(divN).attr('id', 'nArrow')

        return divN;
    }

    northArrow.addTo(map); //custom 2
}); // end document ready
