# PathFinder

App that gives you the shortest/longest path/distance between A and B.

It currently only has Dijkstra algorithm that gives you the shortest distance.

The app supports adding new algorithms to it without heavy changes, look below to see how to.

# Running the App

once downloaded go to the ```my-app``` folder and run ```npm install``` to install all the modules, once installed run ```npm start``` to start the app

# Adding a new Algorithm

```NavBar.jsx```

add your Algorithm name to 
```javascript 
const Algorithms = ["Dijkstra", AlgorithmName];
```

```Grid.jsx```

add your Algorithm name and function to the Visualize function, it should look like this:

```javascript
  Visualize(algorithm) {
    const algorithmFunctions = {
      Dijkstra: () => {
        this.prepareDijkstra();
      }
      AlgorithName: () => {
        algorithmFunction();
      }
    };

    algorithmFunctions[algorithm]();
  }
```
your algorithm function should return an array with the id's of the grid nodes in order to use the ```animateAlgorithm(path)``` function

