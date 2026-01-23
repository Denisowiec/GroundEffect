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
    console.log(colors)
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

    const numberOfColors = colors.size
    const deck = []

    // This prepares a shuffled set of 10 options that don't repeat, for every color
    const numbersByColor = new Map()
    for (const col of colors) {
        numbersByColor.set(col, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
    for (const c of numbersByColor.values()) {
        shuffle(c)
    }

    // We now create cards for the deck, by selecting possible cards one by one for each color
    for (let i = 0; i < 10; i++) {
        let card = []
        for (const col of colors) {
            let speedValues = possibleCards[numbersByColor.get(col)[i]]
            card.push({ color: col, cornerSpeed: speedValues[0], straightSpeed: speedValues[1]})
        }
        deck.push(card)
    }
    // TODO: For the time being, the algorith allows for the same values for two different
    // colors on the same cards. This shouldn't happen, assuming there are fewer than 10 colors.
    return deck
}