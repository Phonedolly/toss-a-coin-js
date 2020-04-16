/* 동전 던지기 시행이 성공했는가? */
function isSuccess() {
    let rand = Math.floor(Math.random() * 10) + 1;

    // 만든 난수가 짝수이면 성공했다고 판단
    if (rand % 2 == 0)
        return 1;
    else
        return 0;
}

function getProportion(rVarX, n) {
    return parseFloat(rVarX / n).toFixed(10);
}

function getVarianceY(rVarY, n) {
    return parseFloat((rVarY * (1 - rVarY)) / n).toFixed(10);
}

function genData(n) {
    let halfBaseLineData = [0.5]; // 0.5 기준선
    let graphLabel = [0] // 1 ~ n까지의 숫자 저장. 편의를 위해 0번째 원소는 쓰지 않는다.
    let randomVarX = [0]; // 확률변수 Xn. 편의를 위해 0번째 원소는 쓰지 않는다.
    let randomVarY = [undefined]; // (X/n). 확률변수 Y
    let varianceY = [0];
    let cntSuccess = 0;


    /* label 만들기 */
    for (var i = 1; i <= n; i++) {
        graphLabel.push(i); // 시행 횟수를 나타내는 배열
        halfBaseLineData.push(0.5); // 0.5 기준선을 나타내는 배열
    }

    /* n번만큼 시행 */
    for (let i = 1; i <= n; i++) {
        /* 시행 하기 */
        if (isSuccess() == 1) {
            randomVarX.push(++cntSuccess);
        } else {
            randomVarX.push(cntSuccess);
        }

        // (X / n) 기록하기
        let proportion = getProportion(randomVarX[i], i);
        randomVarY.push(proportion); // 확률변수 Y
        varianceY.push(getVarianceY(proportion, i)); // Y의 분산
    }

    return {
        graphLabel,
        halfBaseLineData,
        randomVarY,
        varianceY
    }
}

function drawVarYTable(varianceY, n) {
    for (let i = 10; i <= n; i += 10) {
        let newRow = document.createElement("tr");
        let newTosses = document.createElement("td"); // # of coin tosses
        let newVarYValue = document.createElement("td"); // Var(Y)

        /* 새 row 추가 */
        let t = document.getElementById('varianceTable');
        t = t.firstChild.nextSibling; // <table> 선택
        t = t.lastChild.previousSibling; // <tbody>선택

        //t의 모든 하위 자식 지우기
        while (i == 10 && t.hasChildNodes()) {
            t.removeChild(t.firstChild);
        }

        t.appendChild(newRow); // table->tbody 안에 새 row 추가

        /* 새 td들 추가 */
        newRow.appendChild(newTosses);
        newRow.appendChild(newVarYValue);

        newTosses.innerHTML = i; // # of coin tosses
        newVarYValue.innerHTML = varianceY[i]

    }
}