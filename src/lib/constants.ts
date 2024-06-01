import { AminoAcidPolarity } from "./enums"

export const codonTable = {
    "UUU": "F",      "CUU": "L",      "AUU": "I",      "GUU": "V",
    "UUC": "F",      "CUC": "L",      "AUC": "I",      "GUC": "V",
    "UUA": "L",      "CUA": "L",      "AUA": "I",      "GUA": "V",
    "UUG": "L",      "CUG": "L",      "AUG": "M",      "GUG": "V",
    "UCU": "S",      "CCU": "P",      "ACU": "T",      "GCU": "A",
    "UCC": "S",      "CCC": "P",      "ACC": "T",      "GCC": "A",
    "UCA": "S",      "CCA": "P",      "ACA": "T",      "GCA": "A",
    "UCG": "S",      "CCG": "P",      "ACG": "T",      "GCG": "A",
    "UAU": "Y",      "CAU": "H",      "AAU": "N",      "GAU": "D",
    "UAC": "Y",      "CAC": "H",      "AAC": "N",      "GAC": "D",
    "UAA": "Stop",   "CAA": "Q",      "AAA": "K",      "GAA": "E",
    "UAG": "Stop",   "CAG": "Q",      "AAG": "K",      "GAG": "E",
    "UGU": "C",      "CGU": "R",      "AGU": "S",      "GGU": "G",
    "UGC": "C",      "CGC": "R",      "AGC": "S",      "GGC": "G",
    "UGA": "Stop",   "CGA": "R",      "AGA": "R",      "GGA": "G",
    "UGG": "W",      "CGG": "R",      "AGG": "R",      "GGG": "G" 
}

export const startCodon = "AUG"

export const inverseCodonTable = {
    "F": {short: "Phe", full: "Phenylalanine", description: "", color: "bg-red-400", polarity: AminoAcidPolarity.Polar},
    "L": {short: "Leu", full: "Leucine", description: "", color: "bg-orange-300", polarity: AminoAcidPolarity.Polar},
    "S": {short: "Ser", full: "Serine", description: "", color: "bg-amber-300", polarity: ""},
    "Y": {short: "Tyr", full: "Tyrosine", description: "", color: "bg-yellow-300", polarity: ""},
    "C": {short: "Cys", full: "Cystine", description: "", color: "bg-lime-300", polarity: ""},
    "W": {short: "Trp", full: "Tryptophan", description: "", color: "bg-green-500", polarity: ""},
    "P": {short: "Pro", full: "Proline", description: "", color: "bg-emerald-400", polarity: ""},
    "H": {short: "His", full: "Histidine", description: "", color: "bg-teal-300", polarity: ""},
    "Q": {short: "Gln", full: "Glutamine", description: "", color: "bg-cyan-200", polarity: ""},
    "R": {short: "Arg", full: "Arginine", description: "", color: "bg-sky-400", polarity: ""},
    "I": {short: "Ile", full: "Isoleucine", description: "", color: "bg-blue-400", polarity: ""},
    "M": {short: "Met", full: "Methionine", description: "", color: "bg-indigo-400", polarity: ""},
    "T": {short: "Thr", full: "Threonine", description: "", color: "bg-violet-400", polarity: ""},
    "N": {short: "Asn", full: "Asparagine", description: "", color: "bg-purple-400", polarity: ""},
    "K": {short: "Lys", full: "Lysine", description: "", color: "bg-fuchsia-300", polarity: ""},
    "V": {short: "Val", full: "Valine", description: "", color: "bg-pink-300", polarity: ""},
    "A": {short: "Ala", full: "Alanine", description: "", color: "bg-rose-300", polarity: ""},
    "D": {short: "Asp", full: "Aspartic Acid", description: "", color: "bg-rose-900", polarity: ""},
    "E": {short: "Glu", full: "Glutamic acid", description: "", color: "bg-indigo-700", polarity: ""},
    "G": {short: "Gly", full: "Glycine", description: "", color: "bg-sky-600", polarity: ""},
}