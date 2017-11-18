const ko = require('knockout');
const $ = require('jquery');
require('jquery.sidr.min');
const styles = require('./mapstyle');
const map;
window.styles = styles; //pass it to window object


window.initMap = function() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7413549, lng: -73.9980244 },
        zoom: 13,
        styles:window.styles,
        mapControlType: false
    });
};