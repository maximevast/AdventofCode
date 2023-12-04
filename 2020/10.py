lst = """74
153
60
163
112
151
22
67
43
160
193
6
2
16
122
126
32
181
180
139
20
111
66
81
12
56
63
95
90
161
33
134
31
119
53
148
104
91
140
36
144
23
130
178
146
38
133
192
131
3
73
11
62
50
89
98
103
110
164
48
80
179
92
194
86
40
13
123
68
115
19
46
77
152
138
69
49
59
30
132
9
185
1
188
171
72
116
101
61
141
107
21
47
147
182
170
39
37
127
26
102
137
191
162
172
29
10
154
157
83
82
175
145
167"""

adapters = [int(e) for e in lst.split("\n")]
adapters.sort()
adapters.insert(0, 0)

diffs = []
for i, a in enumerate(adapters):
    if i == len(adapters) - 1:
        continue
    diffs.append(adapters[i+1] - a)

print("PART1: ", diffs.count(1)*(diffs.count(3) + 1))

paths_to = {} 
paths_to[0] = 1
for adapter in adapters:
    for diff in range(3):
        nxt = adapter + diff + 1
        if nxt in adapters:
            if not nxt in paths_to: paths_to[nxt] = 0
            paths_to[nxt] += paths_to[adapter]

print("PART2: ", paths_to[adapters[-1]])
