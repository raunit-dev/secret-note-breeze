
import React from 'react';
import Layout from '@/components/Layout';
import NoteCreator from '@/components/NoteCreator';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-medium tracking-tight mb-4">
            Share notes securely
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create encrypted notes that self-destruct after being read or expire after a set time.
          </p>
        </div>

        <NoteCreator />
      </div>
    </Layout>
  );
};

export default Index;
