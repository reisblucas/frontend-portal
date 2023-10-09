import { Flex, Input, Select } from '@chakra-ui/react'

export function Filters({ search, queryLimit, handleSearchAction, handleLimitAction }: Filters.Props) {
  return (
    <Flex
      flexDirection="row"
      justifyContent={{ base: 'space-between', md: 'space-around' }}
      alignItems="center"
      gap={2}
    >
      <Input
        id="search"
        type="text"
        placeholder="Find your medication..."
        onChange={handleSearchAction}
        value={search ?? ''}
      />

      <Select maxWidth="30%" alignSelf="center" defaultValue={queryLimit} onChange={handleLimitAction}>
        <option disabled value="50">
          Items per page
        </option>
        <option value="50">50</option>
        <option value="80">80</option>
        <option value="100">100</option>
      </Select>
    </Flex>
  )
}

export namespace Filters {
  export interface Props {
    search: string | null
    queryLimit: number
    handleSearchAction: (e: React.FormEvent<HTMLInputElement>) => void
    handleLimitAction: (e: React.FormEvent<HTMLSelectElement>) => void
  }
}
