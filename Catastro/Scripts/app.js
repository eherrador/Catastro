var mapa;
var infowindow = null;

$(document).ready(function ($) {
    "use strict";
    initMap();
    startButtonEvents();
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

function startButtonEvents() {
    document.getElementById('btnBuscar'
      ).addEventListener('click', function () {
          zoomToLocalidad();
      });
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

function zoomToLocalidad() {
    var cvecatastral = document.getElementById('txtBuscar').value;
    if (cvecatastral == "29014000100800380010") //Hueyotzipan - 29014000100800380010
    {
        var hueyotzipan = new google.maps.LatLng(19.465463, -98.345663);
        mapa.setCenter(hueyotzipan);
        mapa.setZoom(17);
        var marker = new google.maps.Marker({
            position: hueyotzipan,
            map: mapa,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            title: "Clave Catastral: 29014000100800380010"
        });
    }
    else if (cvecatastral == "29013000102380400010") //Huamantla - 29013000102380400010
    {
        var huamantla = new google.maps.LatLng(19.318111, -97.930051);
        mapa.setCenter(huamantla);
        mapa.setZoom(17);
        var marker = new google.maps.Marker({
            position: huamantla,
            map: mapa,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            title: "Clave Catastral: 29013000102380400010"
        });
    }
    else if (cvecatastral == "29005000107340380010") //Apizaco - 29005000107340380010
    {
        var apizaco1 = new google.maps.LatLng(19.408168, -98.128769);
        mapa.setCenter(apizaco1);
        mapa.setZoom(17);
        var marker = new google.maps.Marker({
            position: apizaco1,
            map: mapa,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            title: "Clave Catastral: 29005000107340380010"
        });
    }
    else if (cvecatastral == "290050001001A0030010") //Apizaco - 290050001001A0030010
    {
        var apizaco2 = new google.maps.LatLng(19.417454, -98.145063);
        mapa.setCenter(apizaco2);
        mapa.setZoom(17);
        var marker = new google.maps.Marker({
            position: apizaco2,
            map: mapa,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            title: "Clave Catastral: 290050001001A0030010"
        });
    }
    else if (cvecatastral == "290520001001A0350010") //San Jose Teacalco - 290520001001A0350010
    {
        var san_jose_teacalco = new google.maps.LatLng(19.336095, -98.062896);
        mapa.setCenter(san_jose_teacalco);
        mapa.setZoom(17);
        var marker = new google.maps.Marker({
            position: san_jose_teacalco,
            map: mapa,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            title: "Clave Catastral: 290520001001A0350010"
        });
    }
    else
    {
        alert("La clave catastral: " + cvecatastral + " no la tenemos registrada.");
    }
    
    //var monterrey = new google.maps.LatLng(25.660263, -100.296556);
    //mapa.setCenter(monterrey);
    //mapa.setZoom(11);

    //if (otherfeatures != null) {
    //    for (var i = 0; i < otherfeatures.length; i++)
    //        mapa.data.remove(otherfeatures[i]);
    //}

    //if (features != null) {
    //    for (var i = 0; i < features.length; i++)
    //        mapa.data.remove(features[i]);
    //}

    //var estado = $.getJSON("/GeoJSON/NLUrbAgeb.txt");
    //estado.done(function (data) {
    //    features = mapa.data.addGeoJson(data);
    //    setTimeout(function () { $("#ciudadesModal").modal("hide") }, 3000);
    //});
}