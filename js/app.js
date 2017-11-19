var ko = require('knockout');
var $ = require('jquery');
require('jquery.sidr.min');
require('bootstrap.min');
var styles = require('./mapstyle');
var map;
window.styles = styles; //pass it to window object


window.initMap = function() {
	var latlng = new google.maps.LatLng(22.3964,114.1095);
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 12,
        styles:window.styles,
        mapControlType: false
    });
};


