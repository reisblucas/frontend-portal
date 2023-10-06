import { useMedications } from '@/medications'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Medications() {
  const medications = useMedications()
  const session = useSession()
  console.log('session', session)
  console.log('medications', medications.data)

  return <div>Medications</div>
}
