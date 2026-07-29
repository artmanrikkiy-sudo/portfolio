motor_values = [35,300,-15,500]

print("モーター値の以上チェック開始")

alert_count=0

for value in motor_values:
 if value<0:
    print(f"異常値検知:{value}→0未満です")
    alert_count += 1    
 elif value>256:
   print(f"異常値検知:{value}→256以上です")
   alert_count +=  1
 else:
   print(f"正常値:{value}→正常範囲内です")

print(f"異常値の数は{alert_count}個でした。")
