                         //evitar=> :any
export function whatsMyType<T>(argument:T):T{
    
    return argument;
};


let amIString = whatsMyType<string>('Hola Mundo');
let amINumber = whatsMyType<number>(100);
let amIAray = whatsMyType<number[]>([1,2,3,4,5]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed());
console.log(amIAray.join('-'));