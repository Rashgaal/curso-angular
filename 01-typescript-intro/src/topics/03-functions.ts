

function addNumbers(a: number, b: number) {
    return a + b;
}

// funcion flecha
const addNumbersArrow = (a: number, b: number): string => {
    return `${a + b}`;
}

function multiply(firstNumber: number, secondNumber?: number, base: number = 2) {
    return firstNumber * base;
}


//const result: number = addNumbers(1, 2);
//const result2: string = addNumbersArrow(1, 2);
//const multiplyResult: number = multiply(5);
//console.log({ result, result2, multiplyResult })

interface Character {
    name: string;
    hp: number;
    showHp: () => void;
}

const healCharacter = (character: Character, amount: number) => {

    character.hp += amount;

}

const rashgaal: Character = {
    name: 'Rashgaal',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida ${this.hp}`);
    }
}

healCharacter(rashgaal, 10);
healCharacter(rashgaal, 30);

rashgaal.showHp();

export { };

