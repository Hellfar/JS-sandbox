||||||
|---|---|---|---|---|
|    |  ca| c!a| !ca|!c!a|
|  db|    |    |    |    |
| d!b|    |    |    |    |
| !db|    |    |    |    |   
|!d!b|    |    |    |    |

coords for Karnaugh map body (values relatives) in function of number of input:

- 0 -> [/]
- 1 -> [0, 1]
- 2 -> [1, 1]
- 3 -> [1, 3]
- 4 -> [3, 3]
- 5 -> [3, 7]
- 6 -> [7, 7]
- ...

---
x coords:

- 1 -> 1
- 2 -> keep
- 3 -> 2
- 4 -> keep
- 5 -> 3
- 6 -> keep
- 7 -> 4
- 8 -> keep
- 9 -> 5
- ...

---
y coords:

- 1 -> keep
- 2 -> 1
- 3 -> keep
- 4 -> 2
- 5 -> keep
- 6 -> 3
- 7 -> keep
- 8 -> 4
- 9 -> keep
- ...

---
`[Math.pow(2, Math.floor(inputNumber / 2)) - 1, Math.pow(2, Math.ceil(inputNumber / 2)) - 1]`

x head setup:
```
loop over range[1] with i
    headTitle(0 i oddLetter(range[1] - i))
end
```

```
var x = 0
loop over number with i
    y = x
    if (i % 2)
        x = (x + 1) * 2 - 1
    end
end
```