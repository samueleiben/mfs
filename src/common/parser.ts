export class Parser {
  functions: string[];

  constructor(private formula: string) {
    this.functions = this.loadFunctions();
  }

  parse(x: number) {
    let replaced = this.prepare(x, this.formula);
    return this.parseReq(replaced, 0, 0).result;
  }

  prepare(x: number, formula: string) {
    let replaced = formula.replace(/\(\)/g, ''); // remove '()' (not allowed; this replace operation has to be done first)
    replaced = replaced.replace(/([0-9]+)x/g, '$1*x'); // add multiplication operator before x's
    replaced = replaced.replace(/\)\(/g, ')*('); // add multiplication operator between brackets
    replaced = replaced.replace(/x/g, String(x)); // replace x with its value
    replaced = replaced.replace(/([0-9]+)e/g, '$1*e'); // add multiplication operator before e's
    replaced = replaced.replace(/e/g, '2.718281828459045'); // replaced constant e, (don't use Math.E for the build to work)
    replaced = replaced.replace(/\s/g, ''); // remove spaces for simplicity
    return replaced;
  }

  parseReq(formula: string, startIndex: number, level: number) {
    let lastIndex;
    let res;
    for(let i = startIndex; i < formula.length; i++) {
      lastIndex = i;
      let char = formula.charAt(i);
      // apply functions (before other applications)
      if(/[a-z]/.test(char)) {
        this.functions.forEach(f => {
          if(f == formula.substring(i, i + f.length)) {
            let subParsed = this.parseReq(formula, i + f.length + 1, level + 1);
            let result = this.executeFunction(f, subParsed.result, null);
            formula = this.replacePart(formula, i, subParsed.returnIndex, result);
          }
        });
      // special case: '^'
      } else if(char == '^') {
        // figure out number before '^' (base)
        let base = '';
        // find beginning of number
        let start;
        for(let j = i; j >= 0; j--) {
          if(this.isNumber(formula.charAt(j))) {
            start = j;
            break;
          }
        }
        // iterate over number until the start of the number is reached
        for(let j = start; j >= 0; j--) {
          if(this.isNumber(formula.charAt(j))) {
            base = formula.charAt(j) + base;
            continue;
          }
          break;
        }

        // figure out number behind '^' (exponent)
        let exponent = '';
        let returnIndex;
        if(formula.charAt(i + '^'.length) == '(') {
          let subParsed = this.parseReq(formula, i + '^'.length + 1, level + 1);
          exponent = subParsed.result;
          returnIndex = subParsed.returnIndex;
        } else {
          for(let j = i + '^'.length; j < formula.length; j++) {
            if(this.isNumber(formula.charAt(j))) {
              exponent = exponent + formula.charAt(j);
              continue;
            }
            break;
          }
          returnIndex = i + exponent.length;
        }
        // calculate power
        let result = this.executeFunction('^', base, exponent);
        formula = this.replacePart(formula, i - base.length, returnIndex, result);
      } else if(char == '(') {
        let subParsed = this.parseReq(formula, i + 1, level + 1);
        formula = this.replacePart(subParsed.formula, i, subParsed.returnIndex, subParsed.result);
      } else if(char == ')') {
        if(formula.substring(startIndex, i).length == 0) { // prevent error when calling eval with an empty string (undefined)
          continue;
        }
        res = eval(formula.substring(startIndex, i));
        if(level > 0) {
          break;
        } else {
          formula = this.replacePart(formula, startIndex, i, res);
        }
      }
    }

    if(level == 0) {
      res = eval(formula);
    }
    return {formula: formula, result: res, returnIndex: lastIndex};
  }

  replaceFunction(formula: string, index: number) {
    this.functions.forEach(f => {
      if(f == formula.substring(index, index + f.length)) {
        let subParsed = this.parseReq(formula, index + f.length + 1, 1);
        let result = this.executeFunction(f, subParsed.result, null);
        formula = this.replacePart(formula, index, subParsed.returnIndex, result);
      }
    });
  }

  replacePart(formula: string, start: number, end: number, value: number) {
    var newValue = new Array(end - start).join(' ') + value;
    return formula.substring(0, start) + newValue + formula.substring(end + 1, formula.length);
  }

  loadFunctions() {
    return ['sin', 'cos', 'tan', 'log', '^', 'sqrt', 'abs' ];
  }

  executeFunction(f: string, value1: string, value2: string) {
    let result;
    if(f == 'log') {
      result = Math.log(parseInt(value1));
    } else if(f == 'cos') {
      result = Math.cos(parseInt(value1));
    } else if(f == 'sin') {
      result = Math.sin(parseInt(value1));
    } else if(f == 'tan') {
      result = Math.tan(parseInt(value1));
    } else if(f == 'sqrt') {
      result = Math.sqrt(parseInt(value1));
    } else if(f == '^') {
      result = Math.pow(parseInt(value1), parseInt(value2));
    } else if(f == 'abs') {
      result = Math.abs(parseInt(value1));
    } else {
      console.log('unknown function call detected: ' + f);
    }
    return result;
  }

  isNumber(c: string) {
    return !isNaN(parseInt(c));
  }
}
