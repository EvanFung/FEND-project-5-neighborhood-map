var styles = require('./mapstyle');
var initMap;
var map;
var markers = [];
var largeInfowindow, autocomplete, geocoder, bounds;
initMap = function() {
    //locate center of the map in Hong Kong
    var latlng = new google.maps.LatLng(22.3964, 114.1095);
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 10,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        styles: styles
    });
    bounds = new google.maps.LatLngBounds();
    google.maps.event.addDomListener(window, 'resize', function() {
        if (bounds) { map.fitBounds(bounds) };
    });
    largeInfowindow = new google.maps.InfoWindow();
    initSearch();
};

function initSearch() {
    var input = document.getElementById('location-input');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    geocoder = new google.maps.Geocoder();
}

function searchPlace(address, app) {
    // Close the any infowindos that are open
    largeInfowindow.close();
    // Lookup address and get lat lng
    zoomToArea(address, geocoder, app);
}

function zoomToArea(address, geocoder, app) {
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            app.location = results[0].formatted_address;
            app.query = 'fun';
            app.baseUrl = 'https://api.foursquare.com/v2/venues/explore'
            app.requestFourSquare();
        } else {
            window.alert('We could not find that location - try entering a more' +
                ' specific place.');
        }
    });
}

function setMarkers(list) {
    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon();
    // Reset bounds variable
    bounds = new google.maps.LatLngBounds();
    deleteMarkers();
    var item;
    for (var i = 0; i < list.length; i++) {
        item = list[i];
        //create a new marker for each item
        var marker = new google.maps.Marker({
            map: map,
            position: item.location,
            label: {
                text: item.id() + ' ',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600'
            },
            animation: google.maps.Animation.DROP,
            name: item.title,
            imgSrc: item.imgSrc,
            address: item.address,
            city: item.city,
            checkins: item.checkinsFormat,
            rating: item.rating,
            url: item.url,
            phone: item.phone,
            icon: defaultIcon,
        });

        markers.push(marker);

        //create an onclik event to open an infowindow at each marker
        marker.addListener('click', function() {
            animateMarker(-1, this);
            populateInfoWindow(this, largeInfowindow);
        });

        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker if zoom option is set
    map.fitBounds(bounds);
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon() {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + '0091ff' +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}


function populateInfoWindow(marker, infoWindow) {
    //Always close the exsiting infowindow first
    largeInfowindow.close();
    // Set the infoWindow on the marker
    infoWindow.marker = marker;
    infoWindow.setContent(`
<div class=" d-flex">
	<img class="result-img" src="${marker.imgSrc}">
    <div class="result-text-container">
        <h3 class="result-title">${marker.label.text} . ${marker.name}</h3>
        <h4 class="result-subtitle">${marker.address}</h4>
        <h4 class="result-subtitle">${marker.city}</h4>
        <div class="result-details d-flex align-items-center"><span class="result-icon"><i class="fa fa-star" aria-hidden="true"></i></span>
            <h5>${marker.checkins}</h5><span class="result-icon"><i class="fa fa-phone" aria-hidden="true"></i></span>
            <h5>${marker.phone}</h5></div>
        <div>
            <div class="rating">${marker.rating}</div>
        </div>
    </div>
</div>
<div class="result-link"><a target="_blank" href="https://foursquare.com/v/${marker.url}">See on Foursquare</a></div>
    `);
    //Display the infowindow 
    infoWindow.open(map, marker);

    marker.addListener('closeclick', function() {
        infoWindow.marker = null;
    });

    marker.addListener('closeclick', function() {
        infoWindow.marker = null;
    });
}


// This function will loop through the listings and hide them all.
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
//deletes all markers in the array by removing references ot them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function hideMarkers(array) {
    var validMarker = false;
    for (var i = 0; i < markers.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (markers[i].name === array[j].title) {
                validMarker = true;
                break;
            }
        }
        validMarker ? markers[i].setVisible(true) : markers[i].setVisible(false);
        validMarker = false;
    }
}

function animateMarker(index, marker) {
    var marker = markers[index] || marker;
    if (marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE)
        window.setTimeout(function() {
            marker.setAnimation(null);
        }, 500);
    }
}

function showSpecifiedMarker(index) {
    animateMarker(index);
    populateInfoWindow(markers[index], largeInfowindow);
}


module.exports = {
    markers: markers,
    largeInfowindow: largeInfowindow,
    bounds: bounds,
    initMap: initMap,
    initSearch: initSearch,
    setMarkers: setMarkers,
    populateInfoWindow: populateInfoWindow,
    searchPlace: searchPlace,
    geocoder: geocoder,
    hideMarkers: hideMarkers,
    animateMarker: animateMarker,
    showSpecifiedMarker: showSpecifiedMarker
};