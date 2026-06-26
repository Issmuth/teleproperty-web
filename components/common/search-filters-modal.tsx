'use client';

import { useEffect, useState, useRef } from 'react';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import {
  SearchFiltersConfig,
  SearchFilterSection,
  SearchFilterOption,
  citySubcityMap,
} from '@/lib/data/search-filters';
import { iconSize, iconButtonClasses, buttonClasses, inputClasses } from '@/lib/design-system/dimensions';

type FilterState = Record<string, string | string[] | boolean>;

type SearchFiltersModalProps = {
  visible: boolean;
  onClose: () => void;
  config: SearchFiltersConfig;
  minFieldLabel?: string;
  maxFieldLabel?: string;
  onChange?: (state: FilterState) => void;
};

export function SearchFiltersModal({
  visible,
  onClose,
  config,
  minFieldLabel = 'Min',
  maxFieldLabel = 'Max',
  onChange,
}: SearchFiltersModalProps) {
  const { colors } = useTheme();
  const [state, setState] = useState<FilterState>({});
  const [expandedSelectId, setExpandedSelectId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Store the previously focused element
  useEffect(() => {
    if (visible) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [visible]);

  // Focus management and escape key handler
  useEffect(() => {
    if (!visible) return;

    // Focus the close button when modal opens
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onClose]);

  // Return focus to trigger element when modal closes
  useEffect(() => {
    if (!visible && previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const initialState = createInitialState(config.sections);
    setState(initialState);
    setExpandedSelectId(null);
    onChange?.(initialState);
  }, [config.sections, visible]);

  useEffect(() => {
    if (visible) {
      onChange?.(state);
    }
  }, [state, visible]);

  if (!visible) return null;

  const handleSegmentPress = (groupId: string, key: string) => {
    setState((current) => ({ ...current, [groupId]: key }));
  };

  const handleChipPress = (
    groupId: string,
    key: string,
    multiSelect: boolean | undefined
  ) => {
    setState((current) => {
      if (multiSelect) {
        const existing = (current[groupId] as string[] | undefined) ?? [];
        const next = existing.includes(key)
          ? existing.filter((item) => item !== key)
          : [...existing, key];
        return { ...current, [groupId]: next };
      }
      return { ...current, [groupId]: key };
    });
  };

  const handleToggle = (groupId: string) => {
    setState((current) => ({
      ...current,
      [groupId]: !(current[groupId] as boolean),
    }));
  };

  const handleSelectPress = (selectId: string) => {
    setExpandedSelectId((current) => (current === selectId ? null : selectId));
  };

  const handleSelectOption = (groupId: string, option: SearchFilterOption) => {
    setState((current) => {
      const updates: FilterState = {
        [groupId]: option.label,
        [`${groupId}_key`]: option.key,
      };

      if (groupId === 'city') {
        updates['subcity'] = 'All Areas';
        updates['subcity_key'] = 'all-subcities';
      }

      return { ...current, ...updates };
    });
    setExpandedSelectId(null);
  };

  const handleRangeChange = (
    groupId: string,
    which: 'min' | 'max',
    value: string
  ) => {
    setState((current) => ({ ...current, [`${groupId}_${which}`]: value }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: colors.background }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={20} style={{ color: colors.activeText }} aria-hidden="true" />
            <div>
              <h2 id="filter-modal-title" className="text-base font-black" style={{ color: colors.text }}>
                {config.title}
              </h2>
              {config.subtitle && (
                <p id="filter-modal-description" className="text-xs font-medium mt-0.5" style={{ color: colors.textMuted }}>
                  {config.subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            type="button"
            aria-label="Close filters dialog"
            className={`${iconButtonClasses.sm} flex items-center justify-center hover:bg-opacity-80 transition-colors`}
            style={{ backgroundColor: colors.surfaceMuted }}
          >
            <X size={iconSize.lg} style={{ color: colors.textMuted }} aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-5 space-y-6">
          {config.sections.map((section) => (
            <FilterSectionView
              key={section.id}
              section={section}
              state={state}
              expandedSelectId={expandedSelectId}
              onSegmentPress={handleSegmentPress}
              onChipPress={handleChipPress}
              onToggle={handleToggle}
              onSelectPress={handleSelectPress}
              onSelectOption={handleSelectOption}
              onRangeChange={handleRangeChange}
              minFieldLabel={minFieldLabel}
              maxFieldLabel={maxFieldLabel}
            />
          ))}
        </div>
      </div>
    </>
  );
}

type FilterSectionViewProps = {
  section: SearchFilterSection;
  state: FilterState;
  expandedSelectId: string | null;
  onSegmentPress: (groupId: string, key: string) => void;
  onChipPress: (
    groupId: string,
    key: string,
    multiSelect: boolean | undefined
  ) => void;
  onToggle: (groupId: string) => void;
  onSelectPress: (selectId: string) => void;
  onSelectOption: (groupId: string, option: SearchFilterOption) => void;
  onRangeChange: (groupId: string, which: 'min' | 'max', value: string) => void;
  minFieldLabel: string;
  maxFieldLabel: string;
};

function FilterSectionView({
  section,
  state,
  expandedSelectId,
  onSegmentPress,
  onChipPress,
  onToggle,
  onSelectPress,
  onSelectOption,
  onRangeChange,
  minFieldLabel,
  maxFieldLabel,
}: FilterSectionViewProps) {
  const { colors } = useTheme();

  if (section.kind === 'segmented') {
    const activeKey = String(state[section.id] ?? section.selectedKey);

    return (
      <SectionBlock title={section.label}>
        <div
          role="radiogroup"
          aria-label={section.label}
          className="flex gap-1 p-1 rounded-xl"
          style={{ backgroundColor: colors.surfaceMuted }}
        >
          {section.options.map((option) => {
            const isActive = option.key === activeKey;
            return (
              <button
                key={option.key}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => onSegmentPress(section.id, option.key)}
                className="flex-1 py-2.5 px-3 rounded-lg font-bold text-sm transition-all"
                style={
                  isActive
                    ? { backgroundColor: colors.activeText, color: '#FFFFFF' }
                    : { backgroundColor: 'transparent', color: colors.textMuted }
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </SectionBlock>
    );
  }

  if (section.kind === 'dual-select') {
    return (
      <div className="grid grid-cols-2 gap-4">
        {section.fields.map((field) => {
          const selectedValue = String(state[field.id] ?? field.value);
          const isExpanded = expandedSelectId === field.id;

          let fieldOptions = field.options;
          if (field.id === 'subcity') {
            const selectedCityKey = String(state['city_key'] ?? 'all-cities');
            fieldOptions = citySubcityMap[selectedCityKey] || field.options;
          }

          return (
            <div key={field.id} className="space-y-2 relative">
              <label htmlFor={field.id} className="text-xs font-black uppercase tracking-wide" style={{ color: colors.textMuted }}>
                {field.label}
              </label>
              <button
                id={field.id}
                type="button"
                onClick={() => onSelectPress(field.id)}
                aria-expanded={isExpanded}
                aria-haspopup="listbox"
                aria-label={`Select ${field.label}, currently ${selectedValue}`}
                className={`w-full ${inputClasses.lg} flex items-center justify-between transition-colors hover:bg-opacity-80 border`}
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <span className="text-sm font-bold truncate" style={{ color: colors.text }}>
                  {selectedValue}
                </span>
                <ChevronDown size={iconSize.md} style={{ color: colors.textMuted }} aria-hidden="true" />
              </button>

              {isExpanded && (
                <div
                  role="listbox"
                  aria-label={`${field.label} options`}
                  className="absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  {fieldOptions.map((option) => {
                    const isSelected = option.label === selectedValue;
                    return (
                      <button
                        key={option.key}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => onSelectOption(field.id, option)}
                        className="w-full px-4 py-3 text-left text-sm font-bold hover:bg-opacity-80 transition-colors"
                        style={{
                          backgroundColor: isSelected ? colors.surfaceMuted : 'transparent',
                          color: isSelected ? colors.activeText : colors.text,
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (section.kind === 'range') {
    const activeKey = String(state[section.id] ?? section.selectedKey);

    return (
      <SectionBlock title={section.label}>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div
            className="rounded-xl border px-4 py-3"
            style={{
              backgroundColor: colors.surfaceMuted,
              borderColor: colors.border,
            }}
          >
            <label htmlFor={`${section.id}-min`} className="text-[10px] font-black uppercase" style={{ color: colors.textMuted }}>
              {minFieldLabel}
            </label>
            <input
              id={`${section.id}-min`}
              type="number"
              placeholder={section.minLabel}
              value={String(state[`${section.id}_min`] ?? '')}
              onChange={(e) => onRangeChange(section.id, 'min', e.target.value)}
              aria-label={`Minimum ${section.label}`}
              className="w-full bg-transparent outline-none text-base font-bold mt-1"
              style={{ color: colors.text }}
            />
          </div>

          <div
            className="rounded-xl border px-4 py-3"
            style={{
              backgroundColor: colors.surfaceMuted,
              borderColor: colors.border,
            }}
          >
            <label htmlFor={`${section.id}-max`} className="text-[10px] font-black uppercase" style={{ color: colors.textMuted }}>
              {maxFieldLabel}
            </label>
            <input
              id={`${section.id}-max`}
              type="number"
              placeholder={section.maxLabel}
              value={String(state[`${section.id}_max`] ?? '')}
              onChange={(e) => onRangeChange(section.id, 'max', e.target.value)}
              aria-label={`Maximum ${section.label}`}
              className="w-full bg-transparent outline-none text-base font-bold mt-1"
              style={{ color: colors.text }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label={`${section.label} quick options`}>
          {section.quickOptions.map((option) => {
            const isActive = option.key === activeKey;
            return (
              <FilterChip
                key={option.key}
                label={option.label}
                selected={isActive}
                onPress={() => onSegmentPress(section.id, option.key)}
              />
            );
          })}
        </div>
      </SectionBlock>
    );
  }

  if (section.kind === 'chips') {
    const activeKeys =
      (state[section.id] as string[] | string | undefined) ?? section.selectedKeys;
    const selectedSet = Array.isArray(activeKeys) ? activeKeys : [activeKeys];

    return (
      <SectionBlock title={section.label}>
        <div className="flex flex-wrap gap-2" role="group" aria-label={section.label}>
          {section.options.map((option) => {
            const isActive = selectedSet.includes(option.key);
            return (
              <FilterChip
                key={option.key}
                label={option.label}
                selected={isActive}
                onPress={() => onChipPress(section.id, option.key, section.multiSelect)}
              />
            );
          })}
        </div>
      </SectionBlock>
    );
  }

  return (
    <SectionBlock title={section.label}>
      <div
        className="rounded-2xl border px-4 py-4 flex items-center justify-between"
        style={{
          backgroundColor: colors.surfaceMuted,
          borderColor: colors.border,
        }}
      >
        <div className="flex-1 space-y-1">
          <p className="text-sm font-black" style={{ color: colors.text }}>
            {section.label}
          </p>
          <p className="text-xs font-medium" style={{ color: colors.textMuted }}>
            {section.description}
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(state[section.id] ?? section.value)}
            onChange={() => onToggle(section.id)}
            aria-label={section.label}
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 rounded-full peer transition-colors peer-checked:bg-[#0B8F55]"
            style={{ backgroundColor: colors.surface }}
            aria-hidden="true"
          >
            <div
              className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5 translate-x-0.5 translate-y-0.5"
            />
          </div>
        </label>
      </div>
    </SectionBlock>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-black uppercase tracking-wide" style={{ color: colors.textMuted }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();

  return (
    <button
      type="button"
      onClick={onPress}
      aria-pressed={selected}
      className={`${buttonClasses.sm} rounded-full border transition-all hover:opacity-80`}
      style={
        selected
          ? { backgroundColor: colors.activeText, borderColor: colors.activeText, color: '#FFFFFF' }
          : { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }
      }
    >
      {label}
    </button>
  );
}

function createInitialState(sections: readonly SearchFilterSection[]): FilterState {
  const nextState: FilterState = {};

  for (const section of sections) {
    if (section.kind === 'segmented' || section.kind === 'range') {
      nextState[section.id] = section.selectedKey;
      continue;
    }

    if (section.kind === 'dual-select') {
      for (const field of section.fields) {
        nextState[field.id] = field.value;
        const selectedOption = field.options.find((opt) => opt.label === field.value);
        if (selectedOption) {
          nextState[`${field.id}_key`] = selectedOption.key;
        }
      }
      continue;
    }

    if (section.kind === 'chips') {
      nextState[section.id] = [...section.selectedKeys];
      continue;
    }

    nextState[section.id] = section.value;
  }

  return nextState;
}
