const avg = 3.90;
const threshold = 0.08;
let isEditMode = true;

const games = document.querySelectorAll('.crane-game');

// 保存された位置と入力データを読み込む
let savedPositions = JSON.parse(localStorage.getItem('ufo_positions')) || {};
let savedData = JSON.parse(localStorage.getItem('ufo_data')) || {};

games.forEach((game, index) => {
    const boothName = game.id.replace('booth-', '');
    
    // 初期状態のテキストを保持し、データがあれば数値を追記
    const defaultText = game.innerText;
    updateGameDisplay(game, boothName, defaultText);

    // 位置の復元
    if (savedPositions[game.id]) {
        game.style.left = savedPositions[game.id].left;
        game.style.top = savedPositions[game.id].top;
    } else {
        game.style.left = (index * 130 + 20) + 'px';
        game.style.top = '50px';
    }

    // ドラッグ＆ドロップ処理
    let isDragging = false;
    let offsetX, offsetY;

    game.addEventListener('mousedown', (e) => {
        if (!isEditMode) { checkData(game, boothName, defaultText); return; }
        isDragging = true;
        offsetX = e.clientX - game.getBoundingClientRect().left;
        offsetY = e.clientY - game.getBoundingClientRect().top;
        game.style.zIndex = 1000;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const floor = document.getElementById('floor').getBoundingClientRect();
        let x = e.clientX - floor.left - offsetX;
        let y = e.clientY - floor.top - offsetY;
        x = Math.max(0, Math.min(x, floor.width - game.offsetWidth));
        y = Math.max(0, Math.min(y, floor.height - game.offsetHeight));
        game.style.left = x + 'px';
        game.style.top = y + 'px';
    });

    document.addEventListener('mouseup', () => { if (isDragging) { isDragging = false; game.style.zIndex = 1; } });
});

// 画面表示と色を更新する関数
function updateGameDisplay(element, boothName, defaultText) {
    if (savedData[boothName]) {
        const val = savedData[boothName].value;
        const status = savedData[boothName].status;
        element.innerHTML = `${defaultText}<br><span>値: ${val.toFixed(2)}</span>`;
        element.className = `crane-game ${status}`;
    } else {
        element.innerHTML = defaultText;
        element.className = 'crane-game';
    }
}

// 位置の保存
function savePositions() {
    let positions = {};
    games.forEach(game => {
        positions[game.id] = { left: game.style.left, top: game.style.top };
    });
    localStorage.setItem('ufo_positions', JSON.stringify(positions));
    alert("💾 新しいレイアウトを保存しました！");
}

// 全てリセット
function clearPositions() {
    localStorage.removeItem('ufo_positions');
    localStorage.removeItem('ufo_data');
    alert("🔄 配置と点検データをリセットしました。ページを再読み込みします。");
    location.reload();
}

// モード切り替え
function toggleMode() {
    isEditMode = !isEditMode;
    const btn = document.getElementById("mode-btn");
    if (isEditMode) {
        btn.innerText = "📁 現在：レイアウト変更モード"; btn.style.backgroundColor = "#f1c40f"; btn.style.color = "black";
    } else {
        btn.innerText = "🔍 現在：点検モード（クリックで入力）"; btn.style.backgroundColor = "#2ecc71"; btn.style.color = "white";
    }
}

// データ入力と判定
function checkData(element, boothName, defaultText) {
    let input = prompt(boothName + "番台の推定値を入力してください：");
    if (input !== null) {
        let value = parseFloat(input); 
        if (isNaN(value)) { alert("❌ エラー：数字で入力してください！"); return; }
        
        let diff = Math.abs(value - avg);
        let status = diff > threshold ? "danger" : "success";
        
        // データを保存用オブジェクトに格納して即時保存
        savedData[boothName] = { value: value, status: status };
        localStorage.setItem('ufo_data', JSON.stringify(savedData));
        
        // 表示を即時更新
        updateGameDisplay(element, boothName, defaultText);
    }
}
