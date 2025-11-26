// Storage interface for consultation responses
export interface IStorage {
  // Add any future storage methods here if needed
}

export class MemStorage implements IStorage {
  // Simple storage implementation for consultation responses
}

export const storage = new MemStorage();
