export type SequenceFeature = {
    feature_id: number,
    type: string,
    location: SequenceFeatureLocation[],
    qualifiers: Object
}

export type SequenceRecord = {
    id: string,
    name: string,
    description: string,
    dbxrefs: Array<any>,
    seq: string,
    features: SequenceFeature[]
    annotations: Object,
    letter_annotations: Array<any>
}

export type SequenceFeatureLocation =  {
    ref: string,
    ref_db: string,
    strand: string
}