import json

def main():
    with open("../src/standard_deck.json", "r") as f:
        deck = json.load(f)
    colors = {}
    for card in deck:
        for row in card:
            if row['color'] not in colors:
                colors[row['color']] = []
            colors[row['color']].append({'corner_speed': row['corner_speed'], 'straight_speed': row['straight_speed']})

    for key, val in colors.items():
        colors[key] = list(sorted(val, key=lambda x: x['corner_speed']+x['straight_speed']/10))

    for key in colors.keys():
        print(f"{key[:4]} | ", end="")
    print()
    for i in range(len(colors['blue'])):
        for color in colors.values():
            row = color[i]
            print(f"{row['corner_speed']} {row['straight_speed']} | ", end="")
        print()


if __name__ == "__main__":
    main()
