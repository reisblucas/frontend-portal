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
  last_page: number
}

export interface Manufacturer {
  name: string
}

export type ManufacturersList = Exclude<keyof MedicationsList, 'data'> & {
  data: Manufacturer[]
}
