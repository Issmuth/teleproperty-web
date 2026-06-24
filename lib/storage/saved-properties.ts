const SAVED_PROPERTIES_KEY = '@teleproperty:saved_properties';

export type SavedProperty = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  savedAt: string;
  type?: 'property' | 'project'; // To distinguish between properties and projects
};

/**
 * Get all saved properties from localStorage
 */
export function getSavedProperties(): SavedProperty[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(SAVED_PROPERTIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading saved properties:', error);
    return [];
  }
}

/**
 * Check if a property is saved
 */
export function isPropertySaved(propertyId: string): boolean {
  try {
    const saved = getSavedProperties();
    return saved.some((p) => p.id === propertyId);
  } catch (error) {
    console.error('Error checking saved property:', error);
    return false;
  }
}

/**
 * Save a property
 */
export function saveProperty(property: Omit<SavedProperty, 'savedAt'>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = getSavedProperties();
    const exists = saved.some((p) => p.id === property.id);
    
    if (!exists) {
      const newProperty: SavedProperty = {
        ...property,
        savedAt: new Date().toISOString(),
      };
      saved.unshift(newProperty);
      localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(saved));
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('savedPropertiesChanged'));
    }
  } catch (error) {
    console.error('Error saving property:', error);
    throw error;
  }
}

/**
 * Remove a saved property
 */
export function removeSavedProperty(propertyId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = getSavedProperties();
    const filtered = saved.filter((p) => p.id !== propertyId);
    localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(filtered));
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('savedPropertiesChanged'));
  } catch (error) {
    console.error('Error removing saved property:', error);
    throw error;
  }
}

/**
 * Toggle property saved status
 */
export function toggleSavedProperty(
  property: Omit<SavedProperty, 'savedAt'>
): boolean {
  try {
    const isSaved = isPropertySaved(property.id);
    
    if (isSaved) {
      removeSavedProperty(property.id);
      return false;
    } else {
      saveProperty(property);
      return true;
    }
  } catch (error) {
    console.error('Error toggling saved property:', error);
    throw error;
  }
}
