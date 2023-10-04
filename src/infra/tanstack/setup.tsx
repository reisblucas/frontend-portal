import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider as Provider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export function QueryClientProvider({ children }: QueryClientProvider.Props) {
  return <Provider client={queryClient}>{children}</Provider>
}

export namespace QueryClientProvider {
  export type Props = {
    children: React.ReactNode
  }
}
