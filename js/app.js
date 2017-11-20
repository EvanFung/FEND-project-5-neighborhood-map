'use-strict';
var ko = require('knockout');
var $ = require('jQuery');
var wNumb = require('wNumb');
var { initMap, initSearch } = require('./map');
window.initMap = initMap;

var Attraction = function(data) {
    this.id = ko.observable(0);
    this.title = data.venue.name;
    this.address = data.venue.location.address || 'No address';
    this.city = data.venue.location.city;
    this.rating = data.venue.rating || 0.0;
    this.checkins = data.venue.stats.checkinsCount;
    this.checkinsFormat = checkinFormat.to(this.checkins) + ' checkins';
    this.url = data.venue.id;
    if (data.venue.featuredPhotos) {
        this.imgSrc = data.venue.featuredPhotos.items[0].prefix + '100x100' +
            data.venue.featuredPhotos.items[0].suffix;
    } else {
        this.imgSrc = 'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/hikingtrail_512.png';
    }
    this.location = {
        lat: data.venue.location.lat,
        lng: data.venue.location.lng
    };
};

var checkinFormat = wNumb({
	thousand: ','
});

var app = (function() {
    var self = this;
    var CLIENT_ID = '1O5OM0UH1XQFPBXM000UK2B5YZM1KCQ0NWZCOBLBWNPASWGP';
    var CLIENT_SECRET = 'SNAJMK1AGOCQAOHDFQBUVP5BT25FDHYK00FLEYBIYRRCNUBL';

    var location = 'Hong Kong, HK';
    var query = 'fun';
    var baseUrl = 'https://api.foursquare.com/v2/venues/explore';

    var requestFourSquare = function() {
        var settings = {
            url: baseUrl,
            data: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                near: location,
                query: query,
                venuePhotos: '1',
                v: '20170801'
            },
            cache: true,
            dataType: 'json'
        };

        $.ajax(settings)
            .done(function(results) {
                console.log(results);
            })
            .fail(function() {
                alert('cannot get data from foursquare');
            });
    };
    requestFourSquare();
})();

var ViewModel = function() {
    var self = this;
    this.resultList = ko.observableArray([]);
    this.userLocation = ko.observable();
    this.filter = ko.observable();

    this.parseResults = function(data) {
        //Set the results to the data we received in json form
        var results = data.respnse.groups[0].items;

        self.resultList.removeAll();

        results.forEach(function(resultData) {
            self.resultList.push(new Attraction(resultData));
        });

        console.log(self.resultList());
    }
};