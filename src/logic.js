export function shuffle(array) {
    // Fisher-Yatess shuffle algorith, taken from w3schools JS tutorial
    for (let i = array.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
}

export function generateDeck(colors) {
    // Accepts an array of color names
    // Returns an array of objects containing the color name, a corner speed value and a straight speed value
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