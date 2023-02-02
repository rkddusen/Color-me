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
    printColor(color_value);

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
function printColor(color_value) {
    // 리스트를 만들어서 추가
    let color_name = document.getElementById("color-name");
    let color_row = document.createElement("li");
    color_row.classList.add("color-row");
    color_row.textContent = color_value;
    color_name.appendChild(color_row);

    // 팔레트에 해당 색상을 배경색으로 갖는 div 추가
    let color_palette = document.getElementById("color-palette");
    let color_div = document.createElement("div");
    color_div.classList.add("color");
    color_div.style.backgroundColor = color_value;
    color_palette.appendChild(color_div);
}