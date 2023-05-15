"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawBoard = void 0;
function drawBoard(board) {
    console.log(';test');
    board.forEach((row, i) => row.forEach((item, j) => {
        document.getElementById(`${i}${j}`).innerHTML = item;
    }));
}
exports.drawBoard = drawBoard;
//# sourceMappingURL=drawBoard.js.map