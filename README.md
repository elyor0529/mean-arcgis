# README #

### Description

Playground for different back-end and front-end technologies.

This is hosted on Heroku: [https://stark-chamber-92677.herokuapp.com/](https://stark-chamber-92677.herokuapp.com/).

A design document is available in this [Google Doc](https://docs.google.com/document/d/1iicgxfJmsmxlImqLKuDW1t1FUXYyAURZp2GtwfdspAs/edit).  

### Installation

Use `npm`
```
npm install
```

Start everything:
```
npm start
```

#### Testing:

*It does not have that many tests (unit wise) as this was more prototyping
than test driven design.
There where too many unknowns to have an in time solution and use TDD.*


Client unit tests:
```
npm run client-unit-test
```

Server unit tests:
```
npm run server-unit-test
```

 
### Technologies

The technology stack is comprised of:

* [MongoDB](https://www.mongodb.com/download-center#community) --- used to store the donor information
* [mongoosejs](http://mongoosejs.com/)  --- the JS port to use MongoDB
* [Expressjs](http://expressjs.com/)  --- the server for providing the static assets and the data API in a REST or map friendly format
* [Angular2](https://angular.io/) (a.k.a Angular) --- `the` UI framework
* [Angular CLI](https://cli.angular.io/)  --- used to init the project and build components easily
* [Angular Material](https://material.angular.io/components) --- a nice skin for the UI
* [NodeJS](https://nodejs.org/en/) --- the JS interpreter
* [socket.io](http://socket.io/) --- for making the patients see donor events (creation, deletion) in real-time via a open WebSocket
* [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/guide/index.html)  --- the JS API for working with maps (a la ESRI)

### Map Service

The ArcGIS client needs data to consume.
The base map is provided by default, but it needs pins representing donors on it.

The map features are donors which have in their profile spatial
identification attributes (i.e. longitude, latitude)
 
The ExpressJS HTTP server provides a minimal support in the form of
two endpoints:

1. `api/map/0/0/0.csv`: serving a big CSV with all the feature
1. `api/map/0/0/0.geojson`: serving a big GeoJSON with all the features

For now, the JS client consumes only the CSV data to display the points on the map.

### Challenges

#### Learning Angular2 coming from Angular 1.x

Things have changed a lot from 1.x.

The most novel, and not that easy to grasp:
* reactive programming (using observables)
* inter-component communication
* routing

Also using modals and various widgets conforming with the Material design
guidelines was not that easy.
Just look at the issue count from here: [https://github.com/angular/material2/issues](https://github.com/angular/material2/issues)


#### TypeScript

Learning to use a typed language after developing most of my time
with dynamic, non-typed languages (i.e. JavaScript, Python). 

You need a very configured IDE.

That is why the server part was written in ES6 syntax.

#### Integrating Angular2 with arcGIS API for JavaScript

As Angular2 is a new technology, there is much pain in integrating
old stack with it.

These has been just done as proof of concepts.

ArcGIS is using requireJS and Angular2 is using Webpack.

Furthermore, ArcGIS API is not available as an NPM package so angular CLI
cannot load it accordingly.

The bootstrapping involved creating a specialized service that
acts as a namespace for all ESRI related things. (E.g. Map, MapView, etc.)

### Limitations

UI Limitations

Integrating the map provided by ArcGIS with Angular2 components left for
a simple UX.

When clicking on a point on the map as a donor, the reverse geolocation
takes some time (>2000ms).

Map Limitations

* No lazy loading of features on the map
* The entire feature layer is reloaded 

To provide a lazy loading one needs a tile server (/zoom/x/y.<format>)
to be readily available to serve points.

[Mapbox](https://www.mapbox.com/mapbox-gl-js/api/), a competitor of ArcGIS has more support for these things:

* custom vector format
* a lot of open-source projects delivering see this list [https://github.com/mapbox/awesome-vector-tiles](https://github.com/mapbox/awesome-vector-tiles)
