var mapa;
var infowindow = null;

$(document).ready(function ($) {
    "use strict";
    initMap();
    google.maps.event.addDomListener(window, 'load', initMap);
});

function initMap() {
    //Enabling new cartography and themes
    google.maps.visualRefresh = true;

    //Setting starting options of map
    var mapOptions = {
        center: new google.maps.LatLng(19.318311, -98.241019),
        zoom: 11,
        //maxZoom: 17,
        //minZoom: 11,
        //draggable: false,
        //disableDefaultUI: false,
        //scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Getting map DOM element
    var mapElement = document.getElementById('mapDiv');

    //Creating a map with DOM element which is just obtained
    mapa = new google.maps.Map(mapElement, mapOptions);

    CargaFusionTableTlaxcala();

    //mapa.data.addListener('click', clickOnGeoJSON);
    mapa.data.addListener('mouseover', mouseInToRegion);
    mapa.data.addListener('mouseout', mouseOutOfRegion);
}

function CargaFusionTableTlaxcala() {
    var layer = new google.maps.FusionTablesLayer({
        heatmap: { enabled: false },
        query: {
            select: "col9",
            from: "1pJYiq7AJ8lSBnIPVX3rBvThe9NLESH72lB2AO0Jb",
            where: ""
        },
        options: {
            styleId: 2,
            templateId: 2
        }
    });
    layer.setMap(mapa);
}

function styleFeature(feature) {
    var outlineWeight = 0.5, zIndex = 1;
    if (feature.getProperty('state') === 'hover') {
        outlineWeight = zIndex = 2;
    }

    return {
        strokeWeight: outlineWeight,
        strokeColor: '#fff',
        zIndex: zIndex
    };
}

function clickOnGeoJSON(e) {
    content = '';
    e.feature.forEachProperty(function (value, key) {
        content += key + ': ' + value + '<br>';
    });
    if (infowindow != null)
        infowindow.close();
    infowindow = new google.maps.InfoWindow()
    infowindow.setContent(content);
    infowindow.setPosition(e.latLng);
    infowindow.setMap(mapa);
}

function mouseInToRegion(e) {
    // set the hover state so the setStyle function can change the border
    e.feature.setProperty('state', 'hover');
}

function mouseOutOfRegion(e) {
    // set the hover state so the setStyle function can change the border
    e.feature.setProperty('state', 'normal');
}

