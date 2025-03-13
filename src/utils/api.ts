
// For now, we'll mock the API calls
// In a real implementation, these would make actual HTTP requests

export interface NoteData {
  content: string;
  expiration: Date;
}

export interface CreatedNote {
  id: string;
  secretToken: string;
  expiration: Date;
}

// Mock function to create a note
export const createNote = async (noteData: NoteData): Promise<CreatedNote> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate random ID and token
  const id = Math.random().toString(36).substring(2, 10);
  const secretToken = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
  
  return {
    id,
    secretToken,
    expiration: noteData.expiration
  };
};

// Mock function to get a note
export const getNote = async (id: string, token?: string): Promise<{ content: string; expiration: Date } | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real implementation, we would validate the token and check expiration
  // For now, return some mock data
  if (id && token) {
    return {
      content: "This is a secure note that will self-destruct after viewing.",
      expiration: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    };
  }
  
  // If just id is provided (public viewing)
  if (id) {
    return {
      content: "This is a public note with no token required.",
      expiration: new Date(Date.now() + 24 * 60 * 60 * 1000)
    };
  }
  
  return null;
};
