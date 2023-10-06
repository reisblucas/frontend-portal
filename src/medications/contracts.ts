export interface Medication {
  application_number: string
  product_number: string
  form: string
  strength: string
  reference_drug: string
  drug_name: string
  active_ingredient: string
  reference_standard: string
}

export interface MedicationsList {
  data: Medication[]
  total: number
  lastPage: number
}
