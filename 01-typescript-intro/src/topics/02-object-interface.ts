
const skills: string[] = ['Bash', 'Counter', 'Healing'];

interface Character{
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;  //Si no lo sabemos desde el principio
    // hometown: string | undefined;
}



const rash: Character = {
    name: 'Rashgaal',
    hp: 100,
    skills: ['bash', 'counter']
}

rash.hometown = 'Rivendell';

console.table(rash)

export{};