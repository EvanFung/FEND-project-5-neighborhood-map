var places = {
    id: "4b7e4c3ff964a520b6e82fe3",
    name: "Tai Mo Shan (大帽山)",
    contact: {},
    location: {
        address: "Centre of the New Territories, Hong Kong",
        lat: 22.40721006128253,
        lng: 114.10836963065078,
        labeledLatLngs: [{
            label: "display",
            lat: 22.40721006128253,
            lng: 114.10836963065078
        }],
        distance: 1208,
        cc: "HK",
        city: "Tai Mo Shan",
        country: "Hong Kong",
        formattedAddress: [
            "Centre of the New Territories, Hong Kong",
            "Hong Kong"
        ]
    },
    categories: [{
        id: "4eb1d4d54b900d56c88a45fc",
        name: "Mountain",
        pluralName: "Mountains",
        shortName: "Mountain",
        icon: {
            prefix: "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/mountain_",
            suffix: ".png"
        },
        primary: true
    }],
    verified: false,
    stats: {
        checkinsCount: 667,
        usersCount: 437,
        tipCount: 7
    },
    rating: 9,
    ratingColor: "00B551",
    ratingSignals: 45,
    beenHere: {
        count: 0,
        marked: false,
        lastCheckinExpiredAt: 0
    },
    hours: {
        status: "Likely open",
        richStatus: {
            entities: [],
            text: "Likely open"
        },
        isOpen: true,
        isLocalHoliday: false
    },
    photos: {
        count: 0,
        groups: []
    },
    hereNow: {
        count: 0,
        summary: "Nobody here",
        groups: []
    }
}

    <div class="d-flex">
        <img class="result-img" src="${marker.imgSrc}">
        <div class="result-text-container">
            <h3 class="result-title">${marker.label.text} . ${marker.name}</h3>
            <h4 class="result-subtitle">${marker.address}</h4>
            <h4 class="result-subtitle">${marker.city}</h4>
            <div class="result-details d-flex align-items-center">
                <span class="result-icon"><i class="fa fa-star" aria-hidden="true"></i></span>
                <h5>${marker.checkins}</h5>
                <span class="result-icon"><i class="fa fa-phone" aria-hidden="true"></i></span>
                <h5></h5>
            </div>
        </div>
        <div class="rating">${marker.rating}</div>
        <div class="result-link"><a target="_blank" href="https://foursquare.com/v/${marker.url}">See more on Foursquare</a></div>
    </div>