var table = document.getElementById('table');
var a = document.getElementById('header_row');

document.addEventListener('click', function(e) {
    if(e.target.matches("#submit")) {
        table.innerHTML = '';
        table.appendChild(a);
        let form = document.getElementsByClassName('form');
        // for (let i = 0; i < 3; i++) {
        //     console.log(document.getElementsByClassName('form')[i].value);
        // }

        iy = parseInt(form[1].value);
        ix = parseInt(form[2].value);
        numberOfSteps = parseInt(form[3].value);
        finalValue = parseInt(form[4].value);
        //console.log( " >> " + math.evaluate.toString())
        console.log("form value : " + `y + h * ${form[0].value}`);
        solve(numberOfSteps, finalValue, ix, iy, `y + h * ${form[0].value}`);
    }
});

function eplusone(x,y,h, expression) {
    let frac = math.simplify(expression, {x:x, y:y, h:h}).toString();
    return(math.evaluate(frac))
}

function solve(stepNumber, finalValue, initx, inity, expression) {
    let h = ((finalValue) - (initx))/stepNumber;
    let table = [];
    table.push([]);
    table[0].push([]);

    table[0][0] = initx;
    table[0][1] = inity;
    table[0][2] = eplusone(table[0][0], table[0][1], h, expression);

    

    for (let i = 1; i < stepNumber; i++) {
        table.push([]);
        table[i][0] = table[i-1][0] + h;
        table[i][1] = table[i-1][2];
        table[i][2] = eplusone(table[i][0], table[i][1], h, expression);
    }
    constructTable(table, finalValue, stepNumber);
}

function constructTable(arr, finalValue, stepNumber) {
    for (let i = 0; i < arr.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            let td = document.createElement('td');
            td.innerText = `${math.round(arr[i][j], 3)}`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    constructGraph(arr, finalValue, stepNumber)
}

function constructGraph(arr, max, stepNumber) {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    let jsonArray = [];
    for (let i = 0; i < arr.length; i++) {
        jsonArray.push({x : arr[i][0], y : arr[i][2]});
    }

    //console.log((max / stepNumber));

    //console.log(stepArray)
    var myLineChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets:[{
                data: jsonArray,
                borderColor: "#3e95cd",
                borderWidth: 3,
                fill: false,
                showLine: true,
                label: 'estimated graph of d/dx f(x)',
                lineTension: 0
            }]
        },
        options: {
            showLines: true
        }
    });
}



