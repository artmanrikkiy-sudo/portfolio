for i in range(1,21):
 print(i)

for i in range(2,31,2):
   print(i)

print("3の倍数")

total=0

for i in range(1,31):
   if i % 3 == 0:
      print(i)
      total=total + i

print(f"3の倍数の合計は{total}です。")

motor_values = [300,-15,500]

print("モーター値の以上チェック開始")

alert=count=0

for value in motor_values:
 if value<0:
    print(f"異常値検知:｛value｝→0未満です！")