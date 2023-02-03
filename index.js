// 색상을 추가
function okay() {
    let count = document.getElementsByClassName("color-row").length;
    if (count === 6) { // 리스트에 있는 색상의 수가 6개일 때
        alert("색상은 6개까지 추가할 수 있습니다.");
    } else {
        count++;
        let color_value = document.getElementById("color-value").value;
        plusColor(color_value, count);
    }
}

// 색상이 추가되면 저장 버튼을 추가
function plusColor(color_value, count) {
    printColor(color_value, count);

    if (count === 1) { // 첫번째 리스트가 추가됐을 경우
        let color_input = document.getElementById("color-input");
        let span = document.createElement("span");
        span.textContent = "|";
        color_input.appendChild(span);
        let save_btn = document.createElement("button");
        save_btn.setAttribute("onclick", "saveColor()");
        save_btn.classList.add("btn");
        save_btn.textContent = "저장";
        color_input.appendChild(save_btn);
    }
}

// 색상이 추가되면 리스트에 추가
function printColor(color_value, count) {
    // 리스트를 만들어서 추가
    let color_name = document.getElementById("color-name");
    let color_row = document.createElement("li");
    color_row.classList.add("color-row");
    color_row.setAttribute("onmouseenter", "mouseenter(" + count + ")");
    color_row.setAttribute("onmouseleave", "mouseleave(" + count + ")");
    color_row.textContent = color_value;
    color_name.appendChild(color_row);

    // 팔레트에 해당 색상을 배경색으로 갖는 div 추가
    let color_palette = document.getElementById("color-palette");
    let color_div = document.createElement("div");
    color_div.classList.add("color");
    color_div.style.backgroundColor = color_value;
    color_palette.appendChild(color_div);
}

// 리스트에 마우스 들어갈 때
function mouseenter(count) {
    let color_row = document.getElementsByClassName("color-row")[count - 1];

    // 삭제 버튼
    let color_row_cancel = document.createElement("button");
    color_row_cancel.setAttribute("onclick", "removeColor(" + count + ")");
    color_row_cancel.classList.add("color-row-cancel");
    color_row_cancel.textContent = "X";
    color_row.appendChild(color_row_cancel);

    // 수정 버튼
    let color_row_update = document.createElement("button");
    color_row_update.setAttribute("onclick", "updateColor(" + count + ")");
    color_row_update.classList.add("color-row-update");
    color_row_update.textContent = "⎋";
    color_row.appendChild(color_row_update);
}

// 리스트에서 마우스 나올 때
function mouseleave(count) {
    let color_row = document.getElementsByClassName("color-row")[count - 1];
    color_row.removeChild(color_row.childNodes[2]);
    color_row.removeChild(color_row.childNodes[1]);
}

// 색상 삭제
function removeColor(count) {
    let color_name = document.getElementById("color-name");
    let color_row = document.getElementsByClassName("color-row")[count - 1];

    let color_palette = document.getElementById("color-palette");
    let color_div = document.getElementsByClassName("color")[count - 1];
    color_name.removeChild(color_row);
    color_palette.removeChild(color_div);

    // 저장 버튼과 그 앞의 | 삭제
    if (document.getElementsByClassName("color-row").length === 0) {
        let color_input = document.getElementById("color-input");
        color_input.removeChild(color_input.childNodes[6]);
        color_input.removeChild(color_input.childNodes[5]);
    }

    onoffMouse(0);
}

// 마우스 이벤트의 삭제, 추가를 관리하는 함수
function onoffMouse(type) {
    let color_row = document.getElementsByClassName("color-row");
    if (type) {
        for (let i = 0; i < color_row.length; i++) {
            color_row[i].removeAttribute("onmouseenter");
            color_row[i].removeAttribute("onmouseleave");
        }
    } else {
        for (let i = 0; i < color_row.length; i++) {
            color_row[i].setAttribute(
                "onmouseenter",
                "mouseenter(" + (i + 1) + ")"
            );
            color_row[i].setAttribute(
                "onmouseleave",
                "mouseleave(" + (i + 1) + ")"
            );
        }
    }
}

// 색상 수정
function updateColor(count) {
    mouseleave(count);
    let _color = document.getElementsByClassName("color-row")[count - 1].textContent;
    document.getElementById("color-value").value = _color;
    document.getElementsByClassName("clr-field")[0].style.color = _color;

    AddtoUpdate(count);
    onoffMouse(1);
}

// 추가 폼의 버튼에서 수정 폼의 버튼으로 변경
function AddtoUpdate(count) {
    let _btn = document.getElementsByClassName("btn")[0];
    _btn.innerHTML = "변경";
    _btn.setAttribute("onclick", "update(" + count + ")");
    let _btn2 = document.getElementsByClassName("btn")[1];
    _btn2.innerHTML = "취소";
    _btn2.setAttribute("onclick", "updateCancel()");
}

// 수정한 색상을 반영하여 변경할 때
function update(count) {
    let color_value = document.getElementById("color-value").value;
    let color_row = document.getElementsByClassName("color-row")[count - 1];
    color_row.textContent = color_value;

    let color_div = document.getElementsByClassName("color")[count - 1];
    color_div.style.backgroundColor = color_value;

    UpdatetoAdd();
    onoffMouse(0);
}

// 수정 폼의 버튼에서 추가 폼의 버튼으로 변경
function UpdatetoAdd() {
    let _btn = document.getElementsByClassName("btn")[0];
    _btn.innerHTML = "추가";
    _btn.setAttribute("onclick", "okay()");
    let _btn2 = document.getElementsByClassName("btn")[1];
    _btn2.innerHTML = "저장";
    _btn2.setAttribute("onclick", "saveColor()");
}

// 수정을 취소할 때
function updateCancel() {
    UpdatetoAdd();
    onoffMouse(0);
}