const testInput2 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

const lines = testInput2.split("\n")
const myNb = lines.map(line => line.split("|")[0].split(":")[1].split(" ").filter(Boolean))
const valid = lines.map(line => line.split("|")[1].split(" ").filter(Boolean))

const a1 = myNb.reduce((acc, curr, index)=> {
    const count = curr.filter(nb => valid[index].includes(nb)).length 
    return count === 0 ? acc : acc += Math.pow(2, count-1)
},0)
console.log(a1)

const initialCount = Array.from(Array(lines.length)).map(a => 1)
const a2 = myNb.map((row, index) => {
    const multiplier = initialCount[index]
    for (let t = 0; t < multiplier; t ++) {
        const count = row.filter(nb => valid[index].includes(nb)).length
        for (let i = index+1; i<=index+count; i++) {
            initialCount[i]++
        }
    }
  
})
console.log(initialCount.reduce((a, b) => a+=b, 0))