'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getSavedProperties,
  isPropertySaved,
  toggleSavedProperty,
  type SavedProperty,
} from '@/lib/storage/saved-properties';

export function useSavedProperties() {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedProperties = useCallback(() => {
    try {
      setLoading(true);
      const properties = getSavedProperties();
      setSavedProperties(properties);
    } catch (error) {
      console.error('Error loading saved properties:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSavedProperties();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '@teleproperty:saved_properties') {
        loadSavedProperties();
      }
    };

    // Listen for custom events from same tab
    const handleCustomEvent = () => {
      loadSavedProperties();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('savedPropertiesChanged', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedPropertiesChanged', handleCustomEvent);
    };
  }, [loadSavedProperties]);

  const refresh = useCallback(() => {
    loadSavedProperties();
  }, [loadSavedProperties]);

  return {
    savedProperties,
    loading,
    refresh,
  };
}

export function usePropertySaved(propertyId: string) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSaved = useCallback(() => {
    try {
      setLoading(true);
      const saved = isPropertySaved(propertyId);
      setIsSaved(saved);
    } catch (error) {
      console.error('Error checking if property is saved:', error);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    checkSaved();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '@teleproperty:saved_properties') {
        checkSaved();
      }
    };

    // Listen for custom events
    const handleCustomEvent = () => {
      checkSaved();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('savedPropertiesChanged', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedPropertiesChanged', handleCustomEvent);
    };
  }, [checkSaved]);

  const toggleSaved = useCallback(
    (property: Omit<SavedProperty, 'savedAt'>) => {
      try {
        const newSavedState = toggleSavedProperty(property);
        setIsSaved(newSavedState);
        return newSavedState;
      } catch (error) {
        console.error('Error toggling saved property:', error);
        throw error;
      }
    },
    []
  );

  return {
    isSaved,
    loading,
    toggleSaved,
    refresh: checkSaved,
  };
}
