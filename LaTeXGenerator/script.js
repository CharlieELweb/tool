var focusElement = null;
var fracCount = 0;
var textCount = 0;
var sumCount = 0;
var limitCount = 0;
var integralCount = 0;
var sScriptsCount = 0;
var redicalCount = 0;
var productCount = 0;
var bracketsSCount = 0;
var bracketsMCount = 0;
var bracketsLCount = 0;
var hatCount = 0;
var barCount = 0;
var shrink = false;

const equation = document.getElementById('equation');
const source = document.getElementById('source');
const supportedClasses = ["textBox", "frac", "sscr", "sum", "limit", "integral", "redical", "product", "bracketsS", "bracketsM", "bracketsL", "hat", "bar"];

AddText();
source.addEventListener('change', Render);

function Clear() {
    console.log("Clearing")
    focusElement = null;
    fracCount = 0;
    textCount = 0;
    sumCount = 0;
    limitCount = 0;
    integralCount = 0;
    sScriptsCount = 0;
    redicalCount = 0;
    productCount = 0;
    bracketsSCount = 0;
    bracketsMCount = 0;
    bracketsLCount = 0;
    hatCount = 0;
    barCount = 0;
    while (equation.firstChild) {
        equation.removeChild(equation.lastChild);
    }
    AddText();
}

function GetFocusPosition() {
    if(focusElement == null) {
        return equation;
    }
    return focusElement;
}

function AppendElement(addPosition, newElement) {
    if(addPosition == equation) {
        addPosition.appendChild(newElement);
    } else {
        addPosition.after(newElement);
    }
}

function AddRedical() {
    var addPosition = GetFocusPosition();
    redicalCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "redical";
    newElement.id = "redical" + redicalCount;
    newElement.innerHTML = `
        <div class="symbol redicalSymbol">√</div>
        <div class="textBox redicalRoot" id="redical${redicalCount}U">
            ${AddTextElement(`text${textCount}`, true)}
        </div>
        
        <div class="textBox redicalBase" id="redical${redicalCount}D">
            ${AddTextElement(`text${textCount + 1}`, false)}
        </div>
    `;
    textCount++;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddIntegral() {
    var addPosition = GetFocusPosition();
    integralCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "integral";
    newElement.id = "integral" + integralCount;
    newElement.innerHTML = `
        <div class="symbol integralSymbol">∫</div>
        <div class="textBox" id="integral${integralCount}U">
            ${AddTextElement(`text${textCount}`, true)}
        </div>
        <div class="textBox" id="integral${integralCount}D">
            ${AddTextElement(`text${textCount + 1}`, true)}
        </div>
    `;
    textCount++;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddLimit() {
    var addPosition = GetFocusPosition();
    limitCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "limit";
    newElement.id = "limit" + limitCount;
    newElement.innerHTML = `
        <div class="textBox" id="limit${limitCount}U">
            ${AddTextElement(`text${textCount}`, true)}
        </div>
        <div class="symbol limitSymbol">lim</div>
        <div class="textBox" id="limit${limitCount}D">
            ${AddTextElement(`text${textCount + 1}`, true)}
        </div>
    `;
    textCount++;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddProduct() {
    var addPosition = GetFocusPosition();
    productCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "product";
    newElement.id = "product" + productCount;
    newElement.innerHTML = `
        <div class="textBox" id="product${productCount}U">
            ${AddTextElement(`text${textCount}`, true)}
        </div>
        <div class="symbol productSymbol">Π</div>
        <div class="textBox" id="product${productCount}D">
            ${AddTextElement(`text${textCount + 1}`, true)}
        </div>
    `;
    textCount++;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddSum() {
    var addPosition = GetFocusPosition();
    sumCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "sum";
    newElement.id = "sum" + sumCount;
    newElement.innerHTML = `
        <div class="textBox" id="sum${sumCount}U">
            ${AddTextElement(`text${textCount}`, true)}
        </div>
        <div class="symbol sumSymbol">Σ</div>
        <div class="textBox" id="sum${sumCount}D">
            ${AddTextElement(`text${textCount + 1}`, true)}
        </div>
    `;
    textCount++;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}
function AddTextElement(id, small) {
    if(small == false) {
        return `
        <div class="textBox" id="${id}">
            <input id="${id}_Input">
            <span class='measure'></span>
        </div>
    `
    } else {
        return `
        <div class="textBox" id="${id}">
            <input class='small' id="${id}_Input">
            <span class='small measure'></span>
        </div>
    `
    }
    
}
function AddS_Scripts() {
    var addPosition = GetFocusPosition();
    sScriptsCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "sscr";
    newElement.id = "sscr" + sScriptsCount;
    newElement.innerHTML = `
        <div class="textBox" id="sscr${sScriptsCount}U">
            ${AddTextElement(`text${textCount}`, true)}
        </div>
        <div class="textBox" id="sscr${sScriptsCount}D">
            ${AddTextElement(`text${textCount + 1}`, true)}
        </div>
    `;
    textCount++;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function Remove() {
    
    if(focusElement == null) return;
    
    var addPosition = focusElement.parentElement;
    if(addPosition != equation) {
        console.log(addPosition.childElementCount);
        if(addPosition.childElementCount == 1) {
            addPosition.parentElement.parentElement.removeChild(addPosition.parentElement);
        } else {
            addPosition.removeChild(focusElement);
        }
        
    } else {
        addPosition.removeChild(focusElement);
    }
    
    focusElement = null;
}

function AddText() {
    var addPosition = GetFocusPosition();
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "textBox";
    newElement.id = "text" + textCount;
    newElement.innerHTML = `
        <input id="text${textCount}_Input">
        <span class='measure'></span>
    `;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AdjustInputSize();
}

function AddHat() {
    var addPosition = GetFocusPosition();
    hatCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "hat";
    newElement.id = "hat" + hatCount;
    newElement.innerHTML = `
        <div class="toppers">^</div>
        <div class="textBox" id="hat${hatCount}Content">
            ${AddTextElement(`text${textCount}`, false)}
        </div>
    `;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddBar() {
    var addPosition = GetFocusPosition();
    barCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "bar";
    newElement.id = "bar" + hatCount;
    newElement.innerHTML = `
    <div class="toppers">-</div>
        <div class="textBox" id="bar${hatCount}Content">
            ${AddTextElement(`text${textCount}`, false)}
        </div>
    `;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddBracketsS() {
    var addPosition = GetFocusPosition();
    bracketsSCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "bracketsS";
    newElement.id = "bracketsS" + bracketsSCount;
    newElement.innerHTML = `
        <div class="brackets">(</div>
        <div class="textBox" id="bracketsS${bracketsSCount}Content">
            ${AddTextElement(`text${textCount}`, false)}
        </div>
        <div class="brackets">)</div>
    `;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddBracketsM() {
    var addPosition = GetFocusPosition();
    bracketsMCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "bracketsM";
    newElement.id = "bracketsM" + bracketsMCount;
    newElement.innerHTML = `
        <div class="brackets">[</div>
        <div class="textBox" id="bracketsM${bracketsMCount}Content">
            ${AddTextElement(`text${textCount}`, false)}
        </div>
        <div class="brackets">]</div>
    `;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddBracketsL() {
    var addPosition = GetFocusPosition();
    bracketsLCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "bracketsL";
    newElement.id = "bracketsL" + bracketsLCount;
    newElement.innerHTML = `
        <div class="brackets">{</div>
        <div class="textBox" id="bracketsL${bracketsLCount}Content">
            ${AddTextElement(`text${textCount}`, false)}
        </div>
        <div class="brackets">}</div>
    `;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function AddFraction() {
    var addPosition = GetFocusPosition();
    fracCount++;
    textCount++;
    let newElement = document.createElement('div');
    newElement.className = "frac";
    newElement.id = "frac" + fracCount;
    newElement.innerHTML = `
        <div class="textBox" id="frac${fracCount}U">
            ${AddTextElement(`text${textCount}`, false)}
        </div>
        <div class="line"></div>
        <div class="textBox" id="frac${fracCount}D">
            ${AddTextElement(`text${textCount + 1}`, false)}
        </div>
    `;
    textCount++;
    AppendElement(addPosition, newElement);
    focusElement = newElement;
    AddText();
    AdjustInputSize();
}

function Shrink() {
    shrink = !shrink;
    var shrinkBtn = document.getElementById("btn_shrink");
    if(shrink) {
        shrinkBtn.innerHTML = "Expand";
    } else {
        shrinkBtn.innerHTML = "Shrink";
    }

    const inputs = document.querySelectorAll('input');
    inputs.forEach(ipt => {
        if(shrink) {
            ipt.classList.add("shrink");
        } else {
            ipt.classList.remove("shrink");
        }
    });
}
function AdjustInputSize() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(ipt => {
        
        ipt.addEventListener('input', ResizeInput);
        ipt.addEventListener('click', ChangeFocus);
        ipt.addEventListener('keydown', function (e) {
            if(e.key == 'Backspace') {
                if(ipt.value == '') {
                    Remove();
                }
            }
            ResizeInput.call(ipt);
        }, false);
        ipt.addEventListener('keyup', function (e) {
            if(ipt.parentElement != focusElement) {
                return;
            }
            if(e.key == '^') {
                AddS_Scripts();
                var ElementU = document.getElementById('text' + (textCount - 2) + '_Input');
                ElementU.focus();
                SetFocus(ElementU);
                ipt.value = ipt.value.slice(0, -1);
            } else if(e.key == '_'){
                AddS_Scripts();
                var ElementU = document.getElementById('text' + (textCount - 1) + '_Input');
                ElementU.focus();
                SetFocus(ElementU);
                ipt.value = ipt.value.slice(0, -1);
            } else if(e.key == '(' || e.key == '[' || e.key == '{') {
                switch(e.key) {
                    case '(':
                        AddBracketsS();
                        break;
                    case '[':
                        AddBracketsM();
                        break;
                    case '{':
                        AddBracketsL();
                        break;
                    default:
                        AddBracketsL();
                        break;
                }
                
                var Element = document.getElementById('text' + (textCount - 1) + '_Input');
                ipt.value = ipt.value.slice(0, -1);
                Element.focus();
                SetFocus(Element);
                ResizeInput.call(Element);
            } else if(e.key == ' ') {
                if(ipt.value.slice(-2) == '/ ') {
                    AddFraction();
                    var ElementU = document.getElementById('text' + (textCount - 2) + '_Input');
                    var ElementD = document.getElementById('text' + (textCount - 1) + '_Input');
                    ipt.value = ipt.value.slice(0, -2);
                    ElementU.value = ipt.value;
                    ipt.value = "";
                    if(ElementU.value == '') {
                        ElementU.focus();
                        SetFocus(ElementU);
                    } else {
                        ElementD.focus();
                        SetFocus(ElementD);
                        ResizeInput.call(ElementU);
                    }
                } else if (ipt.value.slice(-5) == '\\sum ') {
                    AddSum();
                    var ElementD = document.getElementById('text' + (textCount - 1) + '_Input');
                    ElementD.focus();
                    SetFocus(ElementD);
                    ipt.value = ipt.value.slice(0, -5);
                } else if (ipt.value.slice(-6) == '\\prod ') {
                    AddProduct();
                    var ElementD = document.getElementById('text' + (textCount - 1) + '_Input');
                    ElementD.focus();
                    SetFocus(ElementD);
                    ipt.value = ipt.value.slice(0, -6);
                } else if (ipt.value.slice(-5) == '\\lim ') {
                    AddLimit();
                    var ElementD = document.getElementById('text' + (textCount - 1) + '_Input');
                    ElementD.focus();
                    SetFocus(ElementD);
                    ipt.value = ipt.value.slice(0, -6);
                } else if (ipt.value.slice(-5) == '\\int ') {
                    AddIntegral();
                    var ElementD = document.getElementById('text' + (textCount - 1) + '_Input');
                    ElementD.focus();
                    SetFocus(ElementD);
                    ipt.value = ipt.value.slice(0, -6);
                } else if (ipt.value.slice(-6) == '\\sqrt ') {
                    AddRedical();
                    var ElementD = document.getElementById('text' + (textCount - 1) + '_Input');
                    ElementD.focus();
                    SetFocus(ElementD);
                    ipt.value = ipt.value.slice(0, -6);
                } else if (ipt.value.slice(-5) == '\\bar ') {
                    AddBar();
                    var ElementD = document.getElementById('text' + (textCount - 1) + '_Input');
                    ElementD.focus();
                    SetFocus(ElementD);
                    ipt.value = ipt.value.slice(0, -5);
                } else if (ipt.value.slice(-5) == '\\hat ') {
                    AddHat();
                    var ElementD = document.getElementById('text' + (textCount - 1) + '_Input');
                    ElementD.focus();
                    SetFocus(ElementD);
                    ipt.value = ipt.value.slice(0, -5);
                }
            }
            console.log(e.key);
            ResizeInput.call(ipt);
        }, false);
        ipt.addEventListener('change', Generate);
        
        ResizeInput.call(ipt);
    })
}
function SetFocus(element) {
    focusElement = element.parentElement;
    console.log(focusElement);
}

function ChangeFocus() {
    focusElement = this.parentElement;
    console.log(focusElement);

}

function ResizeInput() {
    var spanElm = this.nextElementSibling;
    spanElm.textContent = this.value; // the hidden span takes the value of the input; 
    this.style.width = spanElm.offsetWidth + 'px'; // apply width of the span to the input

    if(this.value.length == 0) {
        // this.style.width = "1px";
        this.classList.add('empty');
    } else {
        this.classList.remove('empty');
        // this.style.width = this.value.length + "ch";
        // this.style.border = "0";
        // this.style.margin = "3px 0px";
        // this.style.padding = "3px";
        // this.style.borderRadius = "10px";
    }
    
}

function GenerateAllChild(element) {
    var result = "";
    element.childNodes.forEach(child => {
        if(supportedClasses.includes(child.className)) {
            if(child.id.includes("text")) {
                var text = child.querySelector('input').value;
                text = ReplaceKeywords(text);
                result += "{" + text + "}";
                
            }
            else {
                if(child.className == 'frac') {
                    var elementU = child.querySelector('#' + child.id + 'U');
                    var elementD = child.querySelector('#' + child.id + 'D');
                    // console.log(elementU);
                    // console.log(child.childNodes);
                    result += "\\frac{";
                    result += GenerateAllChild(elementU);
                    result += "}{";
                    result += GenerateAllChild(elementD);
                    result += "}";
                } else if(child.className == 'sscr') {
                    var elementU = child.querySelector('#' + child.id + 'U');
                    var elementD = child.querySelector('#' + child.id + 'D');
                    // console.log(elementU);
                    // console.log(child.childNodes);
                    result += "^{";
                    result += GenerateAllChild(elementU);
                    result += "}_{";
                    result += GenerateAllChild(elementD);
                    result += "}";
                } else if(child.className == 'sum') {
                    var elementU = child.querySelector('#' + child.id + 'U');
                    var elementD = child.querySelector('#' + child.id + 'D');
                    // console.log(elementU);
                    // console.log(child.childNodes);
                    result += "\\sum^{";
                    result += GenerateAllChild(elementU);
                    result += "}_{";
                    result += GenerateAllChild(elementD);
                    result += "}";
                } else if(child.className == 'product') {
                    var elementU = child.querySelector('#' + child.id + 'U');
                    var elementD = child.querySelector('#' + child.id + 'D');
                    // console.log(elementU);
                    // console.log(child.childNodes);
                    result += "\\prod^{";
                    result += GenerateAllChild(elementU);
                    result += "}_{";
                    result += GenerateAllChild(elementD);
                    result += "}";
                } else if(child.className == 'limit') {
                    var elementU = child.querySelector('#' + child.id + 'U');
                    var elementD = child.querySelector('#' + child.id + 'D');
                    // console.log(elementU);
                    // console.log(child.childNodes);
                    result += "\\lim^{";
                    result += GenerateAllChild(elementU);
                    result += "}_{";
                    result += GenerateAllChild(elementD);
                    result += "}";
                } else if(child.className == 'integral') {
                    var elementU = child.querySelector('#' + child.id + 'U');
                    var elementD = child.querySelector('#' + child.id + 'D');
                    // console.log(elementU);
                    // console.log(child.childNodes);
                    result += "\\int^{";
                    result += GenerateAllChild(elementU);
                    result += "}_{";
                    result += GenerateAllChild(elementD);
                    result += "}";
                } else if(child.className == 'redical') {
                    var elementU = child.querySelector('#' + child.id + 'U');
                    var elementD = child.querySelector('#' + child.id + 'D');
                    console.log(elementU);
                    // console.log(child.childNodes);
                    result += "\\sqrt[";
                    result += GenerateAllChild(elementU);
                    result += "]{";
                    result += GenerateAllChild(elementD);
                    result += "}";
                } else if(child.className == 'bracketsS') {
                    var element = child.querySelector('#' + child.id + 'Content');
                    result += "\\left (";
                    result += GenerateAllChild(element);
                    result += "\\right )";
                } else if(child.className == 'bracketsM') {
                    var element = child.querySelector('#' + child.id + 'Content');
                    result += "\\left [";
                    result += GenerateAllChild(element);
                    result += "\\right ]";
                } else if(child.className == 'bracketsL') {
                    var element = child.querySelector('#' + child.id + 'Content');
                    result += "\\left \\{";
                    result += GenerateAllChild(element);
                    result += "\\right \\}";
                } else if(child.className == 'hat') {
                    var element = child.querySelector('#' + child.id + 'Content');
                    result += "\\hat";
                    result += GenerateAllChild(element);
                } else if(child.className == 'bar') {
                    var element = child.querySelector('#' + child.id + 'Content');
                    result += "\\bar";
                    result += GenerateAllChild(element);
                } else {
                    result += GenerateAllChild(child);
                }
                
            }
        }
        
    });
    return result;
}

function Generate() {
    var result = GenerateAllChild(equation);
    document.getElementById('source').value = result;
    console.log(result);
    // var inputText = document.getElementById("input").value.trim();
    // var convertedText = ReplaceKeywords(inputText).trim();
    Render();
}

function ReplaceKeywords(input) {
    var output = input;

    output = output.replace("\\a", "\\alpha ");
    output = output.replace("\\b", "\\beta ");
    output = output.replace("\\d", "\\delta ");
    output = output.replace("\\e", "\\epsilon ");
    output = output.replace("\\g", "\\gamma ");
    output = output.replace("\\h", "\\eta ");
    output = output.replace("\\i", "\\iota ");
    output = output.replace("\\k", "\\kappa ");
    output = output.replace("\\l", "\\lambda ");
    output = output.replace("\\m", "\\mu ");
    output = output.replace("\\n", "\\nu ");
    output = output.replace("\\o", "\\omega ");
    output = output.replace("\\ph", "\\varphi ");
    output = output.replace("\\p", "\\pi ");
    output = output.replace("\\r", "\\rho ");
    output = output.replace("\\s", "\\sigma ");
    output = output.replace("\\t", "\\tau ");
    output = output.replace("\\u", "\\upsilon ");
    output = output.replace("\\x", "\\chi ");
    output = output.replace("\\z", "\\zeta ");

    output = output.replace(">=", "\\geq ");
    output = output.replace("<=", "\\leq ");
    output = output.replace("<->", "\\leftrightarrow ")
    output = output.replace("-->", "\\longrightarrow ")
    output = output.replace("->", "\\to ")
    output = output.replace("<--", "\\longleftarrow ")
    output = output.replace("<-", "\\gets ")
    
    output = output.replace("~", "\\sim ");
    output = output.replace("*", "\\cdot ");
    output = output.replace("+-", "\\pm ");
    output = output.replace("-+", "\\mp ");
    return output;
}

function Render() {
    input = source.value;
    console.log("Rendering...");
    
    var button = document.getElementById("submit");
    button.disabled = true;
    //
    render = document.getElementById('render');
    render.innerHTML = '';
    //
    MathJax.texReset();
    var options = MathJax.getMetricsFor(render);
    options.display = true;
    MathJax.tex2chtmlPromise(input, options).then(function (node) {
    node.style.fontSize = "200%";
    node.style.color = "white";

    render.appendChild(node);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
    
    }).catch(function (err) {
        render.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
    }).then(function () {
      button.disabled = false;
    });
}
function CopySource() {
    
    var copyText = source;
    if(copyText.value == "") {
        alert("Source is empty.");
        return;
    }
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Source Copied");
}