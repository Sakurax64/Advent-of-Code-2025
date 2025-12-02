password = 0
startPos = 50
with open("cy.txt") as input:
    position = startPos
    for line in input:
        direction = line[0]
        number = int(line[1:])

        if direction == "R":
            position = position + number
            
            if position >= 100:
                password += position // 100
        else:
            prev = position
            position = position - number
            
            if position <= 0:
                password += position // -100 + 1
                
                if prev == 0:
                    password -= 1
        
        position = position % 100

print(password)