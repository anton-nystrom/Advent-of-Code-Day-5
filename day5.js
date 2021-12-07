import { input } from "./puzzleInput.js";
let coordinates = input;
coordinates = coordinates.split("\n");
coordinates = coordinates.map(item => item.split(" -> "));
coordinates = coordinates.map(item => item.map(item => item.split(",")));
coordinates = coordinates.map(item => item.map(item => item.map(Number)));
let lines = [], lineCoordinates = [], diagonals = [], diagonalCoordinates = [];
for (let i = 0; i < coordinates.length; i++) {
    const line = coordinates[i];
    if(line[0][0] === line[1][0] || line[0][1] === line[1][1]) {
        lines.push(line);
    }
    else {
        diagonals.push(line);
    }
}

console.log("Part One: " + partOne().result);
console.log("Part Two: " + partTwo());

function partOne() {
    lines.forEach(line => {
        let length = 0;
        lineCoordinates.push([line[0][0], line[0][1]]);
        if(line[0][1] === line[1][1]) {
            length = Math.abs((line[0][0] - line[1][0]));
        }
        else if(line[0][0] === line[1][0]) {
            length = Math.abs((line[0][1] - line[1][1]));
        }
        if(length > 1) {
            let count = 1;
            let end, x, y;
            while(count < length) {
                if(line[0][0] < line[1][0]) {
                    x = line[0][0] + count;
                    y = line[0][1];
                }
                else if(line[0][0] > line[1][0]) {
                    x = line[0][0] - count;
                    y = line[0][1];
                }
                else if(line[0][1] < line[1][1]) {
                    y = line[0][1] + count;
                    x = line[0][0];
                }
                else if(line[0][1] > line[1][1]) {
                    y = line[0][1] - count;
                    x = line[0][0];
                }
                if(count === 1) { 
                    end = line.splice(1, 1)[0];
                }
                line.push([x, y]);
                lineCoordinates.push([x, y]);
                count++;
            }
            line.push(end);
            lineCoordinates.push(end);
        }
    });
    let dangerous = {};
    lineCoordinates.forEach(function (x) { dangerous[x] = (dangerous[x] || 0) + 1; });
    const result = Object.values(dangerous).filter(item => item !== 1).length;
    return {result, lineCoordinates};
};

function partTwo() {
    diagonals.forEach(line => {
        diagonalCoordinates.push([line[0][0], line[0][1]]);
        let length = line[1][1] - line[0][1];
        let signY = Math.sign(length);
        length = Math.abs(length);
        let signX = Math.sign(line[1][0] - line[0][0]);
        if(length > 1) {
            let count = 1;
            let end, x, y;
            while(count < length) {
                x = line[0][0] + (count * signX);
                y = line[0][1] + (count * signY);
                if(count === 1) { 
                    end = line.splice(1, 1)[0];
                }
                line.push([x, y]);
                diagonalCoordinates.push([x, y]);
                count++;
            }
            line.push(end);
            diagonalCoordinates.push(end);
        }
    });
    let allCoordinates = diagonalCoordinates.concat(lineCoordinates);
    let dangerous = {};
    allCoordinates.forEach(function (x) { dangerous[x] = (dangerous[x] || 0) + 1; });
    const result = Object.values(dangerous).filter(item => item !== 1).length;
    return result;
};