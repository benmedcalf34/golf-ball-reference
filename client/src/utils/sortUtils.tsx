export type SortDirection = 'asc' | 'desc' | null

export interface SortConfig<T> {
  key: keyof T
  direction: SortDirection
}

export function sortData<T>(data: T[], config: SortConfig<T> | null): T[] {
  if (!config || !config.key || !config.direction) return data

  const { key, direction } = config

  return [...data].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue
    }

    return direction === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })
}
