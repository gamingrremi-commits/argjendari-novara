/**
 * Pure helpers safe for both server AND client components.
 * MUST NOT import any server-only modules (next/headers, supabase server client, etc.).
 */

/**
 * Helper to get SVG key for a category slug — for placeholder rendering
 */
export function getProductSvgKey(categorySlug: string): string {
  const map: Record<string, string> = {
    'unaza-fejese': 'ring',
    'gjerdane': 'pendant',
    'vathe': 'earrings',
    'byzylyke': 'tennis',
    'ora': 'watch',
    'aksesore-burrash': 'mens',
  };
  return map[categorySlug] || 'ring';
}
