import random

#1から100までのランダムな整数を生成
target = random.randint(1,100)
count = 0
while True:
    try:  
        guess = int(input("1から100までの数字を当ててください。※半角で入力してください。"))
    except ValueError:
        print("有効な数字を入力してください。")
        continue
    if not 1 <= guess <= 100:
        print("1から100までの数字を入力してください。")
        continue
    count += 1
    if count == 7:
        hinto = "偶数" if target % 2 == 0 else "奇数"
        print(f"【ヒント】正解の数字は「{hinto}」だよ！")
    if guess < target:
        print("もっと大きい数字です")
    elif guess > target:
        print("もっと小さい数字です")
    else:
        if count <3:
            rank = "神"
        elif count < 5:
            rank = "天才"
        elif count < 8:
            rank = "すごい"
        elif count < 12:
            rank = "普通"
        else:
            rank = "もっと頑張りましょう"
        print(f"正解です！あなたは{count}回で当てました。{rank}！")
        break