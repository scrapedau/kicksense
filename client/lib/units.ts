export interface UnitSystem {
  speed: {
    unit: string;
    convert: (value: number) => number;
  };
  distance: {
    unit: string;
    convert: (value: number) => number;
  };
}

export const IMPERIAL: UnitSystem = {
  speed: {
    unit: "mph",
    convert: (value) => value, // Base unit is mph
  },
  distance: {
    unit: "in",
    convert: (value) => value, // Base unit is inches
  },
};

export const METRIC: UnitSystem = {
  speed: {
    unit: "km/h",
    convert: (value) => value * 1.60934, // mph to km/h
  },
  distance: {
    unit: "cm",
    convert: (value) => value * 2.54, // inches to cm
  },
};

export function getUnitSystem(isMetric: boolean): UnitSystem {
  return isMetric ? METRIC : IMPERIAL;
}

export function formatSpeed(value: number, isMetric: boolean): string {
  const units = getUnitSystem(isMetric);
  const converted = units.speed.convert(value);
  return `${converted.toFixed(1)} ${units.speed.unit}`;
}

export function formatDistance(value: number, isMetric: boolean): string {
  const units = getUnitSystem(isMetric);
  const converted = units.distance.convert(value);
  return `${converted.toFixed(1)} ${units.distance.unit}`;
}
