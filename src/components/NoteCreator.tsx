
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { LockIcon } from 'lucide-react';
import ExpirationPicker from './ExpirationPicker';
import { useNote } from '@/context/NoteContext';
import SecretLinkDisplay from './SecretLinkDisplay';

const NoteCreator: React.FC = () => {
  const { isCreating, createdNote, createNewNote } = useNote();
  const [content, setContent] = useState('');
  const [expiration, setExpiration] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Default to 7 days from now
    return date;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      await createNewNote({ content, expiration });
    }
  };

  if (createdNote) {
    return (
      <SecretLinkDisplay 
        id={createdNote.id} 
        token={createdNote.secretToken} 
        expiration={createdNote.expiration} 
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-scale-in">
      <Card className="border-border/50 shadow-apple overflow-hidden gradient-border glow-sm">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/30">
          <div className="flex items-center space-x-2">
            <LockIcon className="h-5 w-5 text-primary glow-sm" />
            <CardTitle className="text-lg font-medium">Create a Secret Note</CardTitle>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="note-content" className="text-sm font-medium text-foreground">
                Note Content
              </label>
              <Textarea
                id="note-content"
                placeholder="Type your secure note here..."
                className="min-h-[200px] resize-y text-base font-mono border-border/50 bg-muted/40 transition-shadow duration-300 hover:glow-sm focus:glow-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Expiration Time
              </label>
              <ExpirationPicker date={expiration} onDateChange={setExpiration} />
            </div>
          </CardContent>
          
          <CardFooter className="bg-muted/30 px-6 py-4 border-t border-border/30">
            <Button 
              type="submit" 
              className="w-full transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:glow-md"
              disabled={isCreating || !content.trim()}
            >
              {isCreating ? 'Creating...' : 'Create Secret Note'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NoteCreator;
