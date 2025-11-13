// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface Station {
  id: string;
  name: string;
  description?: string;
  processor?: (input: any) => Promise<any>;
}

export const stations: Station[] = [];

export function getStation(id: string): Station | undefined {
  return stations.find(s => s.id === id);
}

export function registerStation(station: Station): void {
  stations.push(station);
}

export default {
  stations,
  getStation,
  registerStation,
};
