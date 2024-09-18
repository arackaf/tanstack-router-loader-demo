export const users = [
  { id: 1, name: "Adam" },
  { id: 2, name: "Chris" },
  { id: 3, name: "Marc" },
];

export const epics = [
  { id: 1, title: "Migrate to PlanetScale" },
  { id: 2, title: "Learn TypeScript" },
  { id: 3, title: "Implement New Authentication" },
  { id: 4, title: "Learn Java" },
];

export const tasks = [
  // Epic 1 - Migrate to PlanetScale
  { name: "Set up PlanetScale account", epicId: 1, userId: 1 },
  { name: "Add connection credentials", epicId: 1, userId: 1 },
  { name: "Implement transaction helper utilities", epicId: 1, userId: 1 },
  { name: "Migrate data", epicId: 1, userId: 2 },
  { name: "Convert stored procedures to application-code transactions", epicId: 1, userId: 2 },
  { name: "Convert functions to application-code transactions", epicId: 1, userId: 3 },

  // Epic 2 - Learn TypeScript
  { name: "Structural typing", epicId: 2, userId: 2 },
  { name: "Inferred typing", epicId: 2, userId: 2 },
  { name: "Functions", epicId: 2, userId: 2 },
  { name: "Classes", epicId: 2, userId: 2 },
  { name: "Unions", epicId: 2, userId: 2 },
  { name: "Narrowing", epicId: 2, userId: 2 },
  { name: "Discriminated unions", epicId: 2, userId: 2 },
  { name: "TypeScript helpers", epicId: 2, userId: 2 },

  // Epic 3 - Implement New Authentication
  { name: "Set up new auth provider", epicId: 3, userId: 3 },
  { name: "Integrate with session", epicId: 3, userId: 3 },
  { name: "Add Google provider", epicId: 3, userId: 3 },
  { name: "Add GitHub provider", epicId: 3, userId: 3 },
  { name: "Add Facebook provider", epicId: 3, userId: 3 },
  { name: "Update client-side logoug", epicId: 3, userId: 1 },

  // Epic 4 - Learn Java
  { name: "Set up dev environment", epicId: 4, userId: 1 },
  { name: "Review classic Java", epicId: 4, userId: 1 },
  { name: "Asynchrony with Futures", epicId: 4, userId: 1 },
  { name: "Data processing with Streams", epicId: 4, userId: 1 },
  { name: "Data transfer with Records", epicId: 4, userId: 1 },
];
