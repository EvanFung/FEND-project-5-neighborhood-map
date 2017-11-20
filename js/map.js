var styles = require('./mapstyle');
var initMap;
var map;
var markers = [];
var largeInfowindow, autocomplete, geocoder, bounds;
initMap = function() {
    var latlng = new google.maps.LatLng(22.3964, 114.1095);
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 12,
        styles: styles,
        mapControlType: false
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

module.exports = {
	initMap: initMap,
	initSearch: initSearch
};