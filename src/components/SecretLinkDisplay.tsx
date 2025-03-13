
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, Copy, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface SecretLinkDisplayProps {
  id: string;
  token: string;
  expiration: Date;
}

const SecretLinkDisplay: React.FC<SecretLinkDisplayProps> = ({ id, token, expiration }) => {
  const [copied, setCopied] = useState(false);
  
  const secretLink = `${window.location.origin}/view/${id}?token=${token}`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secretLink);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };
  
  return (
    <div className="animate-scale-in">
      <Card className="overflow-hidden border-border/50 shadow-apple">
        <div className="bg-primary/5 px-6 py-4 border-b border-border/30">
          <div className="flex items-center space-x-2 text-primary">
            <Link2 className="h-5 w-5" />
            <h3 className="font-medium">Your Secret Note Link</h3>
          </div>
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Private Link</div>
              <div className="text-xs text-muted-foreground">
                Expires {format(expiration, "PPP 'at' p")}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                value={secretLink}
                readOnly
                className="font-mono text-sm bg-secondary/50"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0 transition-all duration-200 hover:bg-primary/5 hover:border-primary/30"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
            <p>This link grants access to your note. Keep it secure and share it only with trusted recipients.</p>
          </div>
          
          <Button
            variant="default"
            className="w-full transition-all duration-300"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretLinkDisplay;
