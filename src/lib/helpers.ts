export const transcribe = (sequence) => {
    return sequence.split('').map((nuc)=> nuc == 'T' ? 'U': nuc).join('')
}
export const capitalizeString = (word:string) => {
    return word.substring(0,1).toUpperCase()+word.substring(1,)
}