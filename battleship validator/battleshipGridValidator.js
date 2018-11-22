/*jshint esversion: 6 */

function validateBattlefield(field) {
    console.log(field);

    field = (addZeroBorder(field));

    function addZeroBorder(array) {
        for (let x = 0; x < array.length; x++) {
            array[x].unshift(0);
            array[x].push(0);
        }
        array.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        array.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        return array;
    }


    // let valid = true;
    let solo = 0;  // no neighbours - quantity 4
    let end = 0;  // 1 neighbour - quantity 12
    let mid = 0;    // 2 neighbours - quantity 4
    let diagonals = 0;

    for (let x = 1; x < field.length - 2; x++) {
        for (let y = 1; y < field[x].length - 2; y++) {
            //     console.log (x,y);
            if (field[x][y] === 1) {
                checkForNoDiagonals(x, y);
                checkForNeighbours(x, y);
            }
        }
    }

    function checkForNoDiagonals(x, y) {
        diagonals = diagonals + (field[x - 1][y - 1]) + (field[x - 1][y + 1]) + (field[x + 1][y - 1]) + (field[x + 1][y + 1]);
        console.log("Diagonals: " + diagonals);
    }

    function checkForNeighbours(x, y) {
        let sumNeighbours = (field[x - 1][y]) + (field[x][y + 1]) + (field[x][y - 1]) + (field[x + 1][y]);
        console.log("Neighbours: " + sumNeighbours);
        switch (sumNeighbours) {
            case 0:
                solo++;
                console.log("Solo: " + solo);
                break;
            case 1:
                end++;
                console.log("End: " + end);
                break;
            case 2:
                mid++;
                console.log("Mid: " + mid);
                break;
        }

        console.log("Solo: " + solo);
        console.log("Mid: " + mid);
        console.log("End: " + end);

    }
        if (solo === 4 && end === 12 && mid === 4 && diagonals === 0) {
            console.log("TRUE!!!");
            return true;
        }
        else {
            console.log("FALSE!!!");
            return false;
        }
}

 field = 
    [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]];

validateBattlefield(field);