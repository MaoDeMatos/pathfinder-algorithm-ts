# Pathfinder algorithm

This is my rework of a [pathfinder algorithm I made with PHP](https://github.com/MaoDeMatos/pathfinder-algorithm.git), but with Typescript.

## Goal

Make a pathfinder algorithm capable of using a 2D array as a map to find the shortest path between two points.

It must :

- Travel **only up/down** and **left/right**, _no diagonals allowed_
- Travel through **_1_**s and avoid **_0_**s
- Return the distance of the shortest path
- Return the map with the path displayed
- Return an error message if there are no paths, invalid data is provided, etc...

## Start

```sh
yarn dev
# or
npm run dev
```

## Use a JSON file

```sh
yarn dev --jsonFile={filename}
# or
yarn dev -f {filename}
# example
yarn dev --jsonFile=./data/simple.json
yarn dev -f "./data/simple.json"
```
