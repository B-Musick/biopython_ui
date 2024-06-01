export const transcribe = (sequence) => {
    return sequence.split('').map((nuc)=> nuc == 'T' ? 'U': nuc).join('')
}
