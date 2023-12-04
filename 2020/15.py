inp = [2,1,10,11,0,6]

dinner_ready = False

spoken = inp[:]
while not dinner_ready:
    last_spoken = spoken[-1]
    turn = len(spoken)
    if spoken.count(last_spoken) == 1:
        spoken.append(0)
    else:
        time_it_was_last_spoken = len(spoken) - 1 - spoken[:-1][::-1].index(last_spoken)
        spoken.append(turn - time_it_was_last_spoken)
    
    if turn == 2020 - 1:
        dinner_ready = True

print("PART1:", spoken[-1])

# PART 2 needs to be more efficient haha

def tired_of_playing(turn):
    return turn == 30000001

turn = len(inp) + 1
last_spoken = inp[-1]
spoken_count = {v: i+1 for i, v in enumerate(inp[:-1])}

while not tired_of_playing(turn):
    if last_spoken not in spoken_count:
        spoken_count[last_spoken] = turn - 1
        next_spoken = 0
    else:
        next_spoken = turn - spoken_count[last_spoken] - 1
        spoken_count[last_spoken] = turn - 1

    last_spoken = next_spoken
    turn += 1

print("PART2:", last_spoken)

