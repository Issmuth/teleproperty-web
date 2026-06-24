'use client';

import { useEffect, useState } from 'react';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import {
  SearchFiltersConfig,
  SearchFilterSection,
  SearchFilterOption,
  citySubcityMap,
} from '@/lib/data/search-filters';

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
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: colors.background }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={20} style={{ color: colors.activeText }} />
            <div>
              <h2 className="text-base font-black" style={{ color: colors.text }}>
                {config.title}
              </h2>
              {config.subtitle && (
                <p className="text-xs font-medium mt-0.5" style={{ color: colors.textMuted }}>
                  {config.subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-opacity-80 transition-colors"
            style={{ backgroundColor: colors.surfaceMuted }}
          >
            <X size={18} style={{ color: colors.textMuted }} />
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
          className="flex gap-1 p-1 rounded-xl"
          style={{ backgroundColor: colors.surfaceMuted }}
        >
          {section.options.map((option) => {
            const isActive = option.key === activeKey;
            return (
              <button
                key={option.key}
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
              <label className="text-xs font-black uppercase tracking-wide" style={{ color: colors.textMuted }}>
                {field.label}
              </label>
              <button
                onClick={() => onSelectPress(field.id)}
                className="w-full min-h-[48px] rounded-xl border px-4 flex items-center justify-between transition-colors hover:bg-opacity-80"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <span className="text-sm font-bold truncate" style={{ color: colors.text }}>
                  {selectedValue}
                </span>
                <ChevronDown size={16} style={{ color: colors.textMuted }} />
              </button>

              {isExpanded && (
                <div
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
            <label className="text-[10px] font-black uppercase" style={{ color: colors.textMuted }}>
              {minFieldLabel}
            </label>
            <input
              type="number"
              placeholder={section.minLabel}
              value={String(state[`${section.id}_min`] ?? '')}
              onChange={(e) => onRangeChange(section.id, 'min', e.target.value)}
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
            <label className="text-[10px] font-black uppercase" style={{ color: colors.textMuted }}>
              {maxFieldLabel}
            </label>
            <input
              type="number"
              placeholder={section.maxLabel}
              value={String(state[`${section.id}_max`] ?? '')}
              onChange={(e) => onRangeChange(section.id, 'max', e.target.value)}
              className="w-full bg-transparent outline-none text-base font-bold mt-1"
              style={{ color: colors.text }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
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
        <div className="flex flex-wrap gap-2">
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
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 rounded-full peer transition-colors peer-checked:bg-[#0B8F55]"
            style={{ backgroundColor: colors.surface }}
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
      onClick={onPress}
      className="min-h-[34px] px-3 rounded-full border font-bold text-sm transition-all hover:opacity-80"
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
