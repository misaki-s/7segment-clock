// script.js

// 7セグメントパターン定義（A-GセグメントのON/OFF状態）
const SEGMENT_PATTERNS = {
    '0': [1, 1, 1, 1, 1, 1, 0],
    '1': [0, 1, 1, 0, 0, 0, 0],
    '2': [1, 1, 0, 1, 1, 0, 1],
    '3': [1, 1, 1, 1, 0, 0, 1],
    '4': [0, 1, 1, 0, 0, 1, 1],
    '5': [1, 0, 1, 1, 0, 1, 1],
    '6': [1, 0, 1, 1, 1, 1, 1],
    '7': [1, 1, 1, 0, 0, 0, 0],
    '8': [1, 1, 1, 1, 1, 1, 1],
    '9': [1, 1, 1, 1, 0, 1, 1]
};

const OFF_FILL_COLOR = "rgba(255, 0, 0, 0.0)";
const ON_FILL_COLOR = "#363636";
const OFF_STROKE_COLOR = "#1c1c1c";

// 現在の時間帯に応じて文字色を変更する
function updateTextColor() {
    const now = new Date();
    const hours = now.getHours();

    // 00:00 から 08:00 は暗い灰色、それ以外は白
    const textColor = (hours >= 0 && hours < 8) ? "#363636" : "#d3d3d3";

    // すべての7セグメントの点灯色を変更
    window.ON_FILL_COLOR = textColor;
}

// 1秒ごとに文字色をチェック
setInterval(updateTextColor, 1000);
updateTextColor();

// 各桁の7セグメントSVGを生成
function createSevenSegment(id) {
    const svg = document.getElementById(id);
    const segments = [
        { d: "M14 10 L46 10 L50 14 L46 18 L14 18 L10 14 Z", id: "A" }, // 上のセグメント
        { d: "M50 14 L54 18 L54 46 L50 50 L46 46 L46 18 Z", id: "B" }, // 右上のセグメント
        { d: "M50 50 L54 54 L54 82 L50 86 L46 82 L46 54 Z", id: "C" }, // 右下のセグメント
        { d: "M14 82 L46 82 L50 86 L46 90 L14 90 L10 86 Z", id: "D" }, // 下のセグメント
        { d: "M10 50 L14 54 L14 82 L10 86 L6 82 L6 54 Z", id: "E" }, // 左下のセグメント
        { d: "M10 14 L14 18 L14 46 L10 50 L6 46 L6 18 Z", id: "F" }, // 左上のセグメント
        { d: "M14 46 L46 46 L50 50 L46 54 L14 54 L10 50 Z", id: "G" }, // 中央のセグメント
    ];

    segments.forEach((segment, index) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", segment.d);
        path.setAttribute("fill", OFF_FILL_COLOR); // 初期は薄い色
        path.setAttribute("data-segment", segment.id);
        path.setAttribute("stroke", OFF_STROKE_COLOR);
        path.setAttribute("stroke-width", "1"); // 非表示セグメントのstroke
        svg.appendChild(path);
    });
}

// 数字を表示
function displayNumber(svgId, number) {
    const svg = document.getElementById(svgId);
    const pattern = SEGMENT_PATTERNS[number];

    Array.from(svg.children).forEach((path, index) => {
        path.setAttribute(
            "fill",
            pattern[index] === 1 ? ON_FILL_COLOR : OFF_FILL_COLOR
        );
    });
}

// 時計の更新
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // 各桁を更新
    displayNumber("hours-tens", hours[0]);
    displayNumber("hours-units", hours[1]);
    displayNumber("minutes-tens", minutes[0]);
    displayNumber("minutes-units", minutes[1]);
    displayNumber("seconds-tens", seconds[0]);
    displayNumber("seconds-units", seconds[1]);
}

// 初期化と毎秒更新
["hours-tens", "hours-units", "minutes-tens", "minutes-units", "seconds-tens", "seconds-units"].forEach(createSevenSegment);
setInterval(updateClock, 1000);
updateClock();
