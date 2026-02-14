/**
 * Creates a localization helper function for Umbraco elements
 * @param element - The element instance (should have `localize` property from UmbElementMixin)
 * @returns A function that localizes strings using the element's localization context
 */
export function createLocalizeHelper(element: { localize?: { term: (key: string, ...args: any[]) => string } }) {
  return (key: string, ...args: any[]): string => {
    if (!element.localize) {
      return key;
    }
    return element.localize.term(key, ...args);
  };
}

/**
 * Type for the localization helper function
 */
export type LocalizeHelper = ReturnType<typeof createLocalizeHelper>;