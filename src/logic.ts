export const AllColors = new Set(["black", "blue", "green", "grey", "red", "yellow", "orange", "purple",])
export const AllTracks = new Set(["Great Britain", "France", "Italia", "USA", "Japan", "Mexico", "Netherlands", "Spain", "Germany", "South Africa"])

type Cardrow = {
    color: string,
    straightSpeed: number,
    cornerSpeed: number
}

export type Config = {
        colors: string[],
        handicap: number,
        ifHalfHandicap: boolean,
        ifRegenOnShuffle: boolean,
        ifStandardDeck: boolean
}

export function shuffle(array: any[]) {
    // Fisher-Yatess shuffle algorith, taken from w3schools JS tutorial
    for (let i = array.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
}

export function generateDeck(colors: Set<string>, standard = false): Cardrow[][] {
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

    const possibleCards: [number, number][] = [
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

    const matrix: [number, number][][] = []
    for (let i = 0; i < 10; i++) {
        matrix[i] = doubled.slice(i, i+10)
    }

    shuffle(matrix)

    const deck: Cardrow[][] = []
    
    for (let option of matrix) {
        let card: Cardrow[] = []
        let offset = 0
        for (let col of colors) {
            if (offset > option.length) {
                break
            }
            let row: Cardrow = {
                color: col,
                cornerSpeed: option[offset]![0],
                straightSpeed: option[offset]![1]
            }
            card.push(row)
            offset++
        }
        deck.push(card)
    }

    return deck
}

// Functions related to preserving basic configuration in-browser
export function saveConfig(config: Config) {
    const configToSave = {
        colors: Array.from(config.colors),
        handicap: config.handicap,
        if_half_handicap: config.ifHalfHandicap,
        if_regen_on_shuffle: config.ifRegenOnShuffle,
        if_standard_deck: config.ifStandardDeck
    }
    localStorage.setItem('config', JSON.stringify(configToSave))
}

export function getConfig(): Config | null {
    const data = localStorage.getItem('config')
    if (data == null) {
        return null
    }
    const parsed = JSON.parse(data)

    const config: Config = {
        colors: Array.from(parsed.colors),
        handicap: Number(parsed.handicap),
        ifHalfHandicap: parsed.if_half_handicap,
        ifRegenOnShuffle: parsed.if_regen_on_shuffle,
        ifStandardDeck: parsed.if_standard_deck
    }
    return config
}

// Functions related to Championship results tracker
export class Results {
    botColors: string[]
    playerColors: string[]
    players: Map<string, string>
    raceNames: string[]
    results: Array<Map<string, number>>

    constructor(colors: string[]) {
        this.botColors = colors
        this.playerColors = []
        this.playerColors = []
        this.players = new Map<string, string>()
        this.raceNames = []
        this.results = []
    }


    getAllColors(): string[] {
        return this.playerColors.concat(this.botColors)
    }
    
    getAvColors(): string[] {
        let all = Array.from(AllColors)
        let used = this.getAllColors()
        let av = []
        for (let c of all) {
            if (!used.includes(c)) {
                av.push(c)
            }
        }
        return av
    }

    getAvTracks(): string[] {
        let av = []
        for (let t of AllTracks) {
            if (!this.raceNames.includes(t)) {
                av.push(t)
            }
        }
        return av
    }

    addPlayer(name: string, color: string) {
        this.players.set(color, name)
        this.playerColors.push(color)

        for (let r of this.results) {
            r.set(color, 0)
        }
    }

    editPlayerColor(oldColor: string, newColor: string) {
        let name = this.players.get(oldColor)
        if (name === undefined) {
            console.log("Error while changing player color: player doesn't exist")
            return
        }
        this.players.delete(oldColor)
        this.playerColors.splice(this.playerColors.indexOf(oldColor))
        this.addPlayer(name, newColor)
    }

    editPlayerName(col: string, name: string) {
        this.players.set(col, name)
    }

    removePlayer(col: string) {
        this.players.delete(col)
        this.playerColors.splice(this.playerColors.indexOf(col))
        for (let r of this.results) {
            r.delete(col)
        }
    }

    addRace(name: string) {
        this.raceNames.push(name)
        let newMap = new Map()
        for (let c of this.getAllColors()) {
            newMap.set(c, 0)
        }
        this.results.push(newMap)
    }

    editRaceName (oldName: string, newName: string) {
        this.raceNames[this.raceNames.indexOf(oldName)] = newName
    }

    removeRace(name: string) {
        let raceNum = this.raceNames.indexOf(name)
        this.raceNames.splice(raceNum)
        this.results.splice(raceNum)
    }

    getResult(raceName: string, color: string): number | null {
        let raceIndex = this.raceNames.indexOf(raceName)
        if (raceIndex === -1) {
            throw new Error("race name not found")
        }
        let row = this.results[raceIndex]
        if (row === undefined) {
            throw new Error("results row out of bounds")
        }
        let score = row.get(color)
        if (score !== undefined) {
            return score
        }
        return null
    }

    putResults(race: string, col: string, points: number) {
        let raceNum = this.raceNames.indexOf(race)
        if (raceNum === -1) {
            throw new Error("race name not found")
        }
        let resultRow = this.results[raceNum]
        if (resultRow !== undefined) {
            resultRow.set(col, Number(points))
        } else {
            throw new Error("results table out of bounds")
        }
    }

    sumResults(color: string): number {
        let sum = 0
        for (let r of this.results) {
            let score = r.get(color)
            if (score !== undefined) {
                sum += score
            } else {
                throw new Error("results table out of bounds")
            }
        }
        return sum
    }
}

export function saveChampResults(res: Results) {
    const objectifiedResults = []
    for (let r of res.results) {
        objectifiedResults.push(Object.fromEntries(r))
    }
    const resToSave = {
        colors: res.getAllColors(),
        player_names: Object.fromEntries(res.players),
        race_names: res.raceNames,
        results: objectifiedResults
    }
    localStorage.setItem('championship_results', JSON.stringify(resToSave))
}

export function getChampResults(): Results | null {
    const data = localStorage.getItem('championship_results')
    if (data == null) {
        return null
    }
    const parsed = JSON.parse(data)

    let usedCols = []
    for (let col of Object.keys(parsed.player_names)) {
        usedCols.push(col)
    }
    let botColors = []
    for (let col of parsed.colors) {
        if (!usedCols.includes(col)) {
            botColors.push(col)
        }
    }
    botColors.sort()

    const res = new Results(botColors)
    for (let [col, name] of Object.entries(parsed.player_names)) {
        res.addPlayer(name as string, col)
        usedCols.push(col)
    }

    for (let r of parsed.race_names) {
        res.addRace(r)
    }
    for (let i = 0; i < parsed.results.length; i++) {
        let r = res.raceNames[i]
        if (r === undefined) {
            throw new Error("results table out of bounds")
        }
        for (let [c, points] of Object.entries(parsed.results[i])) {
            res.putResults(r, c, Number(points))
        }
    }
    return res
}