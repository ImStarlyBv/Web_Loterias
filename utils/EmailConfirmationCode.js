export default class EmailConfirmationCode {
    constructor() {
        console.log("Esto es de EmailConfirmationCode class")

        this.charters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
            'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
            'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

        this.replacements = {
            'A': 'kke', 'B': 'hwa', 'C': 'qwe', 'D': 'rtz', 'E': 'uio', 'F': 'pas', 'G': 'dfg', 'H': 'hjk',
            'I': 'ljn', 'J': 'rpq', 'K': 'rsR', 'L': 'Tvw', 'M': 'WWz', 'N': 'QXA', 'O': 'Qsw', 'P': 'qza',
            'Q': '0sb', 'R': 'COu', 'S': 'fBh', 'T': 'ajk', 'U': 'lmo', 'V': 'pqr', 'W': 'stu', 'X': 'vwx',
            'Y': 'yz0', 'Z': '1w3', 'a': '9y0', 'b': '1xc', 'c': '3ab', 'd': 'zde', 'e': 'fgt', 'f': 'i8k',
            'g': 'lgn', 'h': 'opc', 'i': 'rft', 'j': 'uvz', 'k': 'xaz', 'l': '2op', 'm': '45i', 'n': '729',
            'o': 'jab', 'p': 'cne', 'q': 'fvh', 'r': 'qjk', 's': 'ymn', 't': 'opk', 'u': 'rht', 'v': 'JNA',
            'w': 'xFz', 'x': '123', 'y': '456', 'z': '789', '0': '0ab', '1': 'cde', '2': 'fgh', '3': 'ijk',
            '4': 'lmn', '5': 'opq', '6': 'rst', '7': 'uvw', '8': 'xyz', '9': '1T3'
        }
    }

    randomChar() {
        let result = ""
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * this.charters.length)
            result += this.charters[randomIndex]
        }
        return result
    }
    
    encode(toEncode) {
        let reult = ''
        for (let char of toEncode) {
            if (this.replacements[char]) {
                reult += this.replacements[char];
            } else {
                // Si el carácter no está en el objeto replacements, lo dejamos como está
                reult += char;
            }
        }
        return reult
    }
    
    // Invertimos el objeto replacements
    revertReplacements() {
        const invertedReplacements = {};
        for (let key in this.replacements) {
            invertedReplacements[this.replacements[key]] = key;
        }
    }
    
    decode(toDecode) {
        let result = ''
        let i = 0;
    
        while (i < toDecode.length) {
            let found = false;
            
            // Buscamos las secuencias codificadas en el objeto invertido
            for (let seq in invertedReplacements) {
                if (toDecode.startsWith(seq, i)) {
                    result += invertedReplacements[seq];
                    i += seq.length;
                    found = true;
                    break;
                }
            }
    
            // Si no encontramos una secuencia codificada, añadimos el carácter tal cual
            if (!found) {
                result += toDecode[i];
                i++;
            }
        }
    
        return result
    }

    /*getACode() {
        const code = this.encode(this.randomChar())
        return code
    }*/

    getACode() {
        const code = this.randomChar()
        return code
    }

    // To re-send code using base64
    encode64() {
        const { text } = req.body;
        if (!text) {
            return res.status(400).send({ error: 'No text provided' });
        }
        const encodedText = Buffer.from(text).toString('base64');
        res.send({ encoded: encodedText });
    }

    decode64(toDecode) {

    }
}