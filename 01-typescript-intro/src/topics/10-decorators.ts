// "experimentalDecorators": true
function classDecorator<T extends { new(...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        newProperty = 'New Property';
        hello = 'override';
    }
}


@classDecorator
export class Superclass {
    public myProperty: string = 'Abc123';

    print() {
        console.log('Hola mundo');
    }
}

console.log(Superclass);

const myClass = new Superclass();
console.log(myClass);