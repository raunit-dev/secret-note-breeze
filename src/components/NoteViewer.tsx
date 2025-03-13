
import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { useNote } from '@/context/NoteContext';
import { format } from 'date-fns';

const NoteViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, currentNote, fetchNote } = useNote();
  
  // Extract token from URL query parameters
  const token = new URLSearchParams(location.search).get('token') || undefined;

  // Use a useEffect to fetch the note when the component mounts or the id/token changes
  useEffect(() => {
    if (id) {
      console.log("Fetching note with id:", id, "and token:", token);
      fetchNote(id, token);
    }
  }, [id, token, fetchNote]);

  const goBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-6 text-center">
        <p className="text-lg">Loading secure content...</p>
      </div>
    );
  }

  if (!currentNote) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Note Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This note may have expired or been deleted, or you might not have the correct access token.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={goBack}>
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Secure Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-4 min-h-[200px] whitespace-pre-wrap font-mono">
            {currentNote.content}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <Clock className="inline-block h-4 w-4 mr-1" />
            Expires {format(currentNote.expiration, "PPP 'at' p")}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <EyeOff className="h-4 w-4 mr-2" />
            <span>This note will be deleted after viewing</span>
          </div>
          <Button variant="outline" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Create New Note
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoteViewer;
