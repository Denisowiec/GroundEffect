export function shuffle(array) {
    // Fisher-Yatess shuffle algorith, taken from w3schools JS tutorial
    for (let i = array.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
}

export function generateDeck(colors, standard = false) {
    // Accepts an array of color names
    // Returns an array of objects containing the color name, a corner speed value and a straight speed value

    // This just return the standard deck as featured in the original board game
    if (standard) {
        return [[
                { "color": "black", "cornerSpeed": 2, "straightSpeed": 17 },
                { "color": "blue", "cornerSpeed": 1, "straightSpeed": 14 },
                { "color": "green", "cornerSpeed": 0, "straightSpeed": 10 },
                { "color": "grey", "cornerSpeed": 1, "straightSpeed": 13 },
                { "color": "red", "cornerSpeed": 0, "straightSpeed": 11 },
                { "color": "yellow", "cornerSpeed": 2, "straightSpeed": 15 }
            ],
            [
                { "color": "black", "cornerSpeed": 0, "straightSpeed": 11 },
                { "color": "blue", "cornerSpeed": 3, "straightSpeed": 19 },
                { "color": "green", "cornerSpeed": 1, "straightSpeed": 14 },
                { "color": "grey", "cornerSpeed": 0, "straightSpeed": 10 },
                { "color": "red", "cornerSpeed": 1, "straightSpeed": 12 },
                { "color": "yellow", "cornerSpeed": 2, "straightSpeed": 16 }
            ],
            [
                { "color": "black", "cornerSpeed": 3, "straightSpeed": 18 },
                { "color": "blue", "cornerSpeed": 2, "straightSpeed": 16 },
                { "color": "green", "cornerSpeed": 1, "straightSpeed": 12 },
                { "color": "grey", "cornerSpeed": 3, "straightSpeed": 19 },
                { "color": "red", "cornerSpeed": 2, "straightSpeed": 17 },
                { "color": "yellow", "cornerSpeed": 1, "straightSpeed": 13 }
            ],
            [
                { "color": "black", "cornerSpeed": 3, "straightSpeed": 19 },
                { "color": "blue", "cornerSpeed": 0, "straightSpeed": 10 },
                { "color": "green", "cornerSpeed": 1, "straightSpeed": 13 },
                { "color": "grey", "cornerSpeed": 3, "straightSpeed": 18 },
                { "color": "red", "cornerSpeed": 1, "straightSpeed": 14 },
                { "color": "yellow", "cornerSpeed": 1, "straightSpeed": 12 }
            ],
            [
                { "color": "black", "cornerSpeed": 2, "straightSpeed": 16 },
                { "color": "blue", "cornerSpeed": 3, "straightSpeed": 18 },
                { "color": "green", "cornerSpeed": 2, "straightSpeed": 15 },
                { "color": "grey", "cornerSpeed": 1, "straightSpeed": 14 },
                { "color": "red", "cornerSpeed": 1, "straightSpeed": 13 },
                { "color": "yellow", "cornerSpeed": 0, "straightSpeed": 11 }
            ],
            [
                { "color": "black", "cornerSpeed": 2, "straightSpeed": 15 },
                { "color": "blue", "cornerSpeed": 1, "straightSpeed": 13 },
                { "color": "green", "cornerSpeed": 3, "straightSpeed": 19 },
                { "color": "grey", "cornerSpeed": 0, "straightSpeed": 11 },
                { "color": "red", "cornerSpeed": 3, "straightSpeed": 18 },
                { "color": "yellow", "cornerSpeed": 1, "straightSpeed": 14 }
            ],
            [
                { "color": "black", "cornerSpeed": 1, "straightSpeed": 12 },
                { "color": "blue", "cornerSpeed": 0, "straightSpeed": 11 },
                { "color": "green", "cornerSpeed": 2, "straightSpeed": 17 },
                { "color": "grey", "cornerSpeed": 2, "straightSpeed": 15 },
                { "color": "red", "cornerSpeed": 3, "straightSpeed": 19 },
                { "color": "yellow", "cornerSpeed": 0, "straightSpeed": 10 }
            ],
            [
                { "color": "black", "cornerSpeed": 1, "straightSpeed": 14 },
                { "color": "blue", "cornerSpeed": 1, "straightSpeed": 12 },
                { "color": "green", "cornerSpeed": 3, "straightSpeed": 18 },
                { "color": "grey", "cornerSpeed": 2, "straightSpeed": 16 },
                { "color": "red", "cornerSpeed": 2, "straightSpeed": 15 },
                { "color": "yellow", "cornerSpeed": 2, "straightSpeed": 17 }
            ],
            [
                { "color": "black", "cornerSpeed": 0, "straightSpeed": 10 },
                { "color": "blue", "cornerSpeed": 2, "straightSpeed": 15 },
                { "color": "green", "cornerSpeed": 0, "straightSpeed": 11 },
                { "color": "grey", "cornerSpeed": 2, "straightSpeed": 17 },
                { "color": "red", "cornerSpeed": 2, "straightSpeed": 16 },
                { "color": "yellow", "cornerSpeed": 3, "straightSpeed": 18 }
            ],
            [
                { "color": "black", "cornerSpeed": 1, "straightSpeed": 13 },
                { "color": "blue", "cornerSpeed": 2, "straightSpeed": 17 },
                { "color": "green", "cornerSpeed": 2, "straightSpeed": 16 },
                { "color": "grey", "cornerSpeed": 1, "straightSpeed": 12 },
                { "color": "red", "cornerSpeed": 0, "straightSpeed": 10 },
                { "color": "yellow", "cornerSpeed": 3, "straightSpeed": 19 }
            ]]
    }

    const possibleCards = [
        [0, 10],
        [0, 11],
        [1, 12],
        [1, 13],
        [1, 14],
        [2, 15],
        [2, 16],
        [2, 17],
        [3, 18],
        [3, 19]
    ]

    const options = possibleCards.slice()
    shuffle(options)
    const doubled = options.concat(options)

    const matrix = []
    for (let i = 0; i < 10; i++) {
        matrix[i] = doubled.slice(i, i+10)
    }

    shuffle(matrix)

    const deck = []
    
    for (let option of matrix) {
        let card = []
        let offset = 0
        for (let col of colors) {
            let row = new Object
            row.color = col
            row.cornerSpeed = option[offset][0]
            row.straightSpeed = option[offset][1]
            card.push(row)
            offset++
        }
        deck.push(card)
    }

    return deck
}