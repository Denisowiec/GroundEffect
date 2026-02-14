# GroundEffect

**A digital "legends" deck replacement for *Heat: Pedal to the Metal***

This is a helper-app for playing the board game *Heat: Pedal to the Metal*, themed around old-school formula racing, released by Days of Wonder in 2022. The original game provides a "legends" deck - a simple but effective way to introduce additional cars into the race that are not player-controlled. Unfortunately the deck was never updated for the addtional car colors introduced in the expansions, and only supports the 6 cars from the original edition. This app is meant to alleviate this problem while providing some other features.

### How it works

The app can generate a 10-card deck for an arbitrary number of cars between 1-10 (although only 9 cars are currently available for the game). The original deck is also hardcoded and available if you check the "use standard deck option".

Instead of reshuffling the same deck over and over, the app can generate a new deck on every reshuffle, which should make the legends a bit more unpredictable.

You can choose a handicap - an additional value that will be added to the speed values on the cards to make the game more difficult. There's also an option to only add it half the time (based on an RNG) which is meant to provide intermediate diffculty levels.

In addition to that, the app also has a simplistic built-in tool to record championship results. These are stored in your browser storage, along with the last used configuration options, so it persists if you close or reload the page (unless you use the browsers private mode).

### Technical info

The app is written in typescript and uses the Vue 3 framework without any additional modules. It's developed as a learning excercise, without the use of generative AI and is my first ever JS-based project and my first web app.

### Other stuff

This is a fan-made thing. I have no affiliation with Days of Wonder. The title of the game and the name of DoW is used for informational purposes. The app itself doesn't use any copyrighted artwork.

### Features planned

A planned feature for the app is a championship-campaign generator. It will create championships similar to the ones available in the game itself, but they could be of any length and include any or all of the tracks. For longer campaigns the app could gradually increase tha handicap for the legends, in order to offset the human players acquiring additional upgrades.

There should also be an ability to save track multiple championship results in browser storage, not just one.