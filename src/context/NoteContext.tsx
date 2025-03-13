
import React, { createContext, useContext, useState } from 'react';
import { createNote, getNote, CreatedNote, NoteData } from '../utils/api';
import { toast } from 'sonner';

interface NoteContextProps {
  isCreating: boolean;
  isLoading: boolean;
  createdNote: CreatedNote | null;
  currentNote: { content: string; expiration: Date } | null;
  createNewNote: (data: NoteData) => Promise<void>;
  fetchNote: (id: string, token?: string) => Promise<void>;
  resetState: () => void;
}

const NoteContext = createContext<NoteContextProps | undefined>(undefined);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createdNote, setCreatedNote] = useState<CreatedNote | null>(null);
  const [currentNote, setCurrentNote] = useState<{ content: string; expiration: Date } | null>(null);

  const createNewNote = async (data: NoteData) => {
    try {
      setIsCreating(true);
      const note = await createNote(data);
      setCreatedNote(note);
      toast.success('Note created successfully');
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    } finally {
      setIsCreating(false);
    }
  };

  const fetchNote = async (id: string, token?: string) => {
    try {
      console.log("NoteContext: Fetching note with id:", id, "and token:", token);
      setIsLoading(true);
      const note = await getNote(id, token);
      console.log("NoteContext: Note retrieved:", note);
      setCurrentNote(note);
      if (!note) {
        toast.error('Note not found or expired');
      }
    } catch (error) {
      console.error('Error fetching note:', error);
      toast.error('Failed to fetch note');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setCreatedNote(null);
    setCurrentNote(null);
  };

  return (
    <NoteContext.Provider
      value={{
        isCreating,
        isLoading,
        createdNote,
        currentNote,
        createNewNote,
        fetchNote,
        resetState,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNote must be used within a NoteProvider');
  }
  return context;
};
