##Neighborhood Map project

### About

Fifth project from the Front-End Web Developer Nanodegree in [Udacity](https://www.udacity.com/): You will develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

### How to run the application locally

Some useful tips to help you get started:

1. Clone the repository to your computer( run on terminal )

2. ```
   git clone https://github.com/EvanFung/FEND-project-5-neighborhood-map.git
   ```

3. Install dependencies with npm

4. ```
   npm install
   ```

5. Run gulp (Learn more about <a href="https://gulpjs.com/">Gulp</a>)

6. ```
   gulp
   ```

7. To inspect the site on your mobile devices, you can run a local server

   ```bash
   $> cd /path/to/your-project-folder
   $> python -m SimpleHTTPServer 8000
   ```

8. Open a browser and visit localhost:8000

9. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8000
  ```

10. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

### APIs used

- Google Maps Javascript API (https://developers.google.com/maps/documentation/javascript/)
- Google Places Library to make the search box autocomplete looking for places
- Foursquare API to find a fun place which loading on the sidebar

### Udacity's instructions

You will develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

1. Review our course JavaScript Design Patterns.
2. Download the Knockout framework.
3. Write code required to add a full-screen map to your page using the Google Maps API.
4. Write code required to add map markers identifying a number of locations you are interested in within this neighborhood.
5. Implement the search bar functionality to search and filter your map markers. There should be a filtering function on markers that already show up. Simply providing a search function through a third-party API is not enough.
6. Implement a list view of the identified locations.
7. Add additional functionality using third-party APIs when a map marker, search result, or list view entry is clicked (ex. Yelp reviews, Wikipedia, Flickr images, etc). If you need a refresher on making AJAX requests to third-party servers, check out our Intro to AJAX course.

### License

The project is licensed under the [MIT license](license.txt).