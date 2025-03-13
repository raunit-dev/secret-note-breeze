
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

  useEffect(() => {
    if (id) {
      fetchNote(id, token);
    }
  }, [id, token, fetchNote]);

  const goBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm mb-4 animate-pulse glow-sm">
          Decrypting Note
        </div>
        <div className="text-xl font-medium animate-pulse glow-sm">Loading secure content...</div>
      </div>
    );
  }

  if (!currentNote) {
    return (
      <div className="max-w-2xl mx-auto animate-scale-in">
        <Card className="border-border/50 shadow-apple text-center overflow-hidden gradient-border glow-sm">
          <CardHeader className="bg-destructive/10 border-b border-border/30">
            <div className="flex justify-center">
              <ShieldAlert className="h-6 w-6 text-destructive mb-2 glow-sm" />
            </div>
            <CardTitle className="text-lg font-medium">Note Not Found</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-6">
              This note may have expired or been deleted, or you might not have the correct access token.
            </p>
            <Button onClick={goBack} className="bg-gradient-to-r from-primary to-accent hover:glow-md transition-all duration-300">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-scale-in">
      <Card className="border-border/50 shadow-apple overflow-hidden gradient-border glow-sm">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary glow-sm" />
              <CardTitle className="text-lg font-medium">Secure Note</CardTitle>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Expires {format(currentNote.expiration, "PPP 'at' p")}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-md bg-muted/30 p-4 min-h-[200px] whitespace-pre-wrap font-mono border border-border/50 glow-sm">
            {currentNote.content}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 px-6 py-4 border-t border-border/30 flex flex-col sm:flex-row gap-4 items:center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <EyeOff className="h-4 w-4 mr-2" />
            <span>This note will be deleted after viewing</span>
          </div>
          <Button variant="outline" onClick={goBack} className="transition-all duration-200 hover:glow-accent-sm border-border/50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Create New Note
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoteViewer;
