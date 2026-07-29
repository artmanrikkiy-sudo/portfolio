counter = 0
for i in range(51):
    if i % 5 == 0:
        print(i)
        counter += 1
print(f"5の倍数は全部で{counter}個ありました。")
