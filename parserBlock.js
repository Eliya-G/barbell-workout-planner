const errorPara = document.querySelector("#errorPara");
const mainEnter = document.querySelector("#mainEnter"); // Selecting DOM nodes
const inputBox = document.querySelector("input");
const bottomNavigator = document.createElement("div")
bottomNavigator.setAttribute("id", "bottomNavigator")



function parseUserInput() { 
    
    let parsedString = inputBox.value;
    let newArray = [];
    
    const blankInputString = "Error: Input some weights to calculate."

    if(parsedString === ""){
        errorPara.textContent = blankInputString
    }


    for (const match of parsedString.matchAll(/\d+/g)) {
        newArray.push(match[0]);
    }

    for (i of newArray){
        const errorMessage = `Error: For the input of "${i}" no weight division can occur due to it being less then or equal to the bar weight so nothing with be displayed in the set.` 
        if (i <= 20 && metric_mode === true){
            errorPara.textContent = errorMessage
            break
        } else if (i <= 45 && metric_mode === false){
            errorPara.textContent = errorMessage
            break
        } else{
            errorPara.textContent = ""
        }
    }
    
    if (newArray.length === 0){
        errorPara.textContent = blankInputString
    }
    return newArray
}


function metricRecuFunc(weight, dict){
    if (weight >= 25) {
        dict[25] += 1;
        return metricRecuFunc(weight - 25, dict);
    } else if (weight >= 20) {
        dict[20] += 1;
        return metricRecuFunc(weight - 20, dict);
    } else if (weight >= 15) {
        dict[15] += 1;
        return metricRecuFunc(weight - 15, dict);
    } else if (weight >= 10) {
        dict[10] += 1;
        return metricRecuFunc(weight - 10, dict);
    } else if (weight >= 5) {
        dict[5] += 1;
        return metricRecuFunc(weight - 5, dict);
    } else if (weight >= 2.5) {
        dict[2.5] += 1;
        return metricRecuFunc(weight - 2.5, dict);
    } else if (weight >= 1.25 && btnCheckBox.checked == true) {
        dict[1.25] += 1;
        return metricRecuFunc(weight - 1.25, dict);
    } else {
        dict["remainder"] = Math.abs(weight) < 1e-10 ? 0 : weight;
        return dict
    }

}

function imperialRecuFunc(weight, dict) {
    if (weight >= 45) {
        dict[45] += 1;
        return imperialRecuFunc(weight - 45, dict);
    } else if (weight >= 35) {
        dict[35] += 1;
        return imperialRecuFunc(weight - 35, dict);
    } else if (weight >= 25) {
        dict[25] += 1;
        return imperialRecuFunc(weight - 25, dict);
    } else if (weight >= 10) {
        dict[10] += 1;
        return imperialRecuFunc(weight - 10, dict);
    } else if (weight >= 5) {
        dict[5] += 1;
        return imperialRecuFunc(weight - 5, dict);
    } else if (weight >= 2.5 && btnCheckBox.checked == true) {
        dict[2.5] += 1;
        return imperialRecuFunc(weight - 2.5, dict);
    } else {
        dict["remainder"] = Math.abs(weight) < 1e-10 ? 0 : weight;
        return dict
    }
    
}


mainEnter.addEventListener("click", () => {
    arrayIndexPosition = 0;
    enterFunc();
}); // Allowing both means of hitting "Enter" to execute parser
inputBox.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        arrayIndexPosition = 0;
        enterFunc(); 
    }
});

function weightTransformer(decPersentage){
    const parsedArray = parseUserInput();

    if (metric_mode === true){
        let plateDictionaryM = {
            25: 0,
            20: 0,
            15: 0,
            10: 0,
            5: 0,
            2.5: 0,
            1.25: 0,
            "remainder":0
        };
        const result = metricRecuFunc(((parsedArray[arrayIndexPosition]-20)*decPersentage)/2, plateDictionaryM);
        return result

    } else{
        let plateDictionaryI = {
            45: 0,
            35: 0,
            25: 0,
            10: 0,
            5: 0,
            2.5: 0,
            "remainder":0
        };
        const result = imperialRecuFunc(((parsedArray[arrayIndexPosition]-45)*decPersentage)/2, plateDictionaryI);
        return result
    }
}

function weightStrBuilder(decPersentage){
    const array = weightTransformer(decPersentage)
    let builtString = "";

    if (metric_mode === true){
        if (array[25] != 0){
            builtString += `${array[25]}x25`
        }
        if (array[20] != 0){
            builtString += ` ${array[20]}x20`
        }
        if (array[15] != 0){
            builtString += ` ${array[15]}x15`
        }
        if (array[10] != 0){
            builtString += ` ${array[10]}x10`
        }
        if (array[5] != 0){
            builtString += ` ${array[5]}x5`
        }
        if (array[2.5] != 0){
            builtString += ` ${array[2.5]}x2.5`
        }
        if (array[1.25] != 0){
            builtString += ` ${array[1.25]}x1.25`
        } 
    
        return [builtString, array["remainder"]]
    } else{
        if (array[45] != 0){
            builtString += `${array[45]}x45`
        }
        if (array[35] != 0){
            builtString += ` ${array[35]}x35`
        }
        if (array[25] != 0){
            builtString += ` ${array[25]}x25`
        }
        if (array[10] != 0){
            builtString += ` ${array[10]}x10`
        }
        if (array[5] != 0){
            builtString += ` ${array[5]}x5`
        }
        if (array[2.5] != 0){
            builtString += ` ${array[2.5]}x2.5`
        } 

        return [builtString, array["remainder"]]
    }
}

function enterFunc(){

    if (document.querySelector("#parserdiv") != null){
        document.querySelector("#parserdiv").remove()
    }


    const parserDiv = document.createElement("div"); // Making new DOM nodes
    parserDiv.setAttribute("id", "parserdiv");
    
    
    const para50percent = document.createElement('p');
    const workset50 = weightStrBuilder(0.5)[0]
    if (workset50 != ""){
        para50percent.textContent = `You need ${workset50} ${metric_mode?"kg":"lb"} on each side.`
        const para50percenth3 = document.createElement('h3');
        para50percenth3.textContent = "50% Warm Up";
        parserDiv.appendChild(para50percenth3);parserDiv.appendChild(para50percent);
    } 
    const para70percent = document.createElement('p');
    const workset70 = weightStrBuilder(0.7)[0]
    if (workset70 != ""){
        para70percent.textContent = `You need ${workset70} ${metric_mode?"kg":"lb"} on each side.`
        const para70percenth3 = document.createElement('h3');
        para70percenth3.textContent = "70% Warm Up";
        parserDiv.appendChild(para70percenth3);parserDiv.appendChild(para70percent);
    } 
    const para85percent = document.createElement('p');
    const workset85 = weightStrBuilder(0.85)[0]
    if (workset85 != ""){
        para85percent.textContent = `You need ${workset85} ${metric_mode?"kg":"lb"} on each side.`
        const para85percenth3 = document.createElement('h3');
        para85percenth3.textContent = "85% Warm Up";
        parserDiv.appendChild(para85percenth3);parserDiv.appendChild(para85percent);
    } 

    const para100percent = document.createElement('p');
    const workset100 = weightStrBuilder(1)[0]
    if (workset100 != 0){
        para100percent.textContent = `You need ${workset100} ${metric_mode?"kg":"lb"} on each side.`
        const para100percenth3 = document.createElement('h3');
        para100percenth3.textContent = "Workset";
        parserDiv.appendChild(para100percenth3);parserDiv.appendChild(para100percent);
    }

    const paraRemainder = document.createElement('p');
    const findRemainder = weightStrBuilder(1)[1]
    if (findRemainder != 0 && findRemainder > 0){
    paraRemainder.textContent = `You have ${findRemainder} ${metric_mode?"kg":"lb"} remaining`;
    }

    if (weightStrBuilder(1)[1] != 0){
        parserDiv.appendChild(paraRemainder)
    }
    document.body.appendChild(parserDiv); 

    worksetCount.textContent = `Workset ${arrayIndexPosition + 1} of ${parseUserInput().length}`;
    parserDiv.appendChild(bottomNavigator);
}

const checkBoxPara = document.querySelector("#checkBoxPara")
const uniteButton = document.querySelector("#uniteButton");
const btnCheckBox = document.querySelector("#btnCheckBox");
let metric_mode = false;
uniteButton.addEventListener("click",() =>{
    if (uniteButton.textContent == "lb"){
        btnCheckBox.checked = false
        uniteButton.textContent = "kg"
        checkBoxPara.textContent = `Enable 1.25 kg`;
        metric_mode = true;
    } else{
        btnCheckBox.checked = false
        uniteButton.textContent = "lb"
        checkBoxPara.textContent = `Enable 2.5 lb`;
        metric_mode = false;
    }
})




let arrayIndexPosition = 0
const leftArrow = document.createElement('button');
leftArrow.setAttribute("class", "arrow-button left-arrow")
const rightArrow = document.createElement('button');
rightArrow.setAttribute("class", "arrow-button right-arrow")

const span1 = document.createElement('span');
span1.setAttribute("class", "arrow")
const span2 = document.createElement('span');
span2.setAttribute("class", "arrow")
rightArrow.appendChild(span1);
leftArrow.appendChild(span2);

const worksetCount = document.createElement('p');
bottomNavigator.appendChild(worksetCount);
bottomNavigator.appendChild(leftArrow);
bottomNavigator.appendChild(rightArrow);


leftArrow.addEventListener("click", () => {
    if (arrayIndexPosition != 0){
    arrayIndexPosition -= 1
    enterFunc()
    } 
})
rightArrow.addEventListener("click", () => {
    if (arrayIndexPosition != parseUserInput().length - 1){
    arrayIndexPosition += 1
    enterFunc()
    }
})


