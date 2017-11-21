'use-strict';
var ko = require('knockout');
var $ = require('jQuery');
var wNumb = require('wNumb');
var { initMap, initSearch, setMarkers, populateInfoWindow, searchPlace, geocoder, hideMarkers, animateMarker, showSpecifiedMarker } = require('./map');
window.initMap = initMap;
// console.log(hideMarkers);
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
        this.imgSrc = 'https://igx.4sqi.net/img/general/100x100/11932034_wMs88Hpv1wzeN7TAVZ6QsfDIbJwXJVvELefxM4i3mLE.jpg';
    }
    this.location = {
        lat: data.venue.location.lat,
        lng: data.venue.location.lng
    };
    this.phone = data.venue.contact.formattedPhone || 'No contact info available';
};

var checkinFormat = wNumb({
    thousand: ','
});

var App = function() {
    var self = this;
    var CLIENT_ID = '1O5OM0UH1XQFPBXM000UK2B5YZM1KCQ0NWZCOBLBWNPASWGP';
    var CLIENT_SECRET = 'SNAJMK1AGOCQAOHDFQBUVP5BT25FDHYK00FLEYBIYRRCNUBL';

    self.location = 'Hong Kong, HK';
    self.query = 'fun';
    self.baseUrl = 'https://api.foursquare.com/v2/venues/explore';

    this.requestFourSquare = function() {
        var requestFlag;
        var settings = {
            url: self.baseUrl,
            data: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                near: self.location,
                query: self.query,
                venuePhotos: '1',
                v: '20170801'
            },
            cache: true,
            dataType: 'json'
        };

        $.ajax(settings)
            .done(function(results) {
                viewModel.parseResults(results);
                //from map.js function
                setMarkers(viewModel.resultList());
                console.log(results);
                return true;
            })
            .fail(function() {
                alert('cannot get data from foursquare');
                return false;
            });
    };

    this.init = function() {
        this.requestFourSquare();
    }
};

var ViewModel = function() {
    var self = this;
    this.resultList = ko.observableArray([]);
    this.locationInput = ko.observable('');
    this.filter = ko.observable('');

    self.parseResults = function(data) {
        //Set the results to the data we received in json form
        var results = data.response.groups[0].items;

        self.resultList.removeAll();

        results.forEach(function(resultData) {
            self.resultList.push(new Attraction(resultData));
        });
        //update id 
        updateResultId();
        //debug
        // console.log(self.resultList());
    };

    ko.extenders.notifyMarkers = function(target) {
        target.subscribe(function(array) {
            hideMarkers(array);
        });
        return target;
    }

    self.filteredItems = ko.computed(function() {
        var filter = self.filter().toLowerCase();

        if (!filter) {
            return self.resultList();
        } else {
            return ko.utils.arrayFilter(self.resultList(), function(result) {
                return result.title.toLowerCase().includes(filter);
            });
        }
    }).extend({ notifyMarkers: '', rateLimit: 50 });

    self.toggleFilters = function() {
        document.getElementById('filters').classList.toggle('slide-in');
    };

    self.searchLocation = function() {
        searchPlace(self.locationInput(), app);
    };

    self.emptyFilter = function() {
        self.filter('');
    };

    self.showMarker = function(item) {
        var index = item.id() - 1;
        showSpecifiedMarker(index);
    }

    self.sortByRating = function() {
        toggleButton('#ratingsBtn');
        self.resultList.sort(function(a, b) {
            return (a.rating === b.rating) ? 0 : (a.rating > b.rating ? -1 : 1);
        });
        updateResultId();
        setMarkers(self.resultList());
    }

    self.sortByCheckins = function() {
        toggleButton('#checkinsBtn');
        self.resultList.sort(function(a, b) {
            return (a.checkins === b.checkins) ? 0 : (a.checkins > b.checkins ? -1 : 1);
        });
        updateResultId();
        setMarkers(self.resultList());
    }

    var updateResultId = function() {
        for (var i = 0; i < self.resultList().length; i++) {
            self.resultList()[i].id(i + 1);
        }
    };

    var toggleButton = function(btnId) {
        $('#ratingsBtn').removeClass('filter-btn-selected');
        $('#checkinsBtn').removeClass('filter-btn-selected');
        $(btnId).addClass('filter-btn-selected');
    }
};

// Create an alert if Google Maps doesn't respond
function googleError() {
    'use strict';
    alert("Google is not responding. Check your connection or come back later.");
}

var viewModel = new ViewModel();
var app = new App();
app.init();
ko.applyBindings(viewModel);