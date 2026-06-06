# 正常データとテストデータを比較して、異常値の可能性を判断するコード

import logging

# ログの設定
logging.basicConfig(level=logging.INFO, filename='anomaly.log', encoding='utf-8', format='%(asctime)s [%(levelname)s] %(message)s',datefmt='%Y-%m-%d %H:%M:%S')

#取得した正常値
normal_data=[3.90,3.88,3.91]
#比較したい値
test_data=[3.86,3.92,4.05]
#変更可能な閾値
threshold = 0.08

avg=sum(normal_data) / len(normal_data)
logging.info(f"正常平均値: {round(avg,2)}")

for value in test_data:
    diff = value - avg
    
    logging.info(f"推定値: {value}")
    logging.info(f"差分: {round(diff,2)}")

    if abs(diff) > threshold:
        logging.warning("異常値の可能性があります。")
    else:
        logging.info("正常値の範囲内です。")
    logging.info("--------")

#ログを残しましょう。
#streamlitで表示してみましょう。