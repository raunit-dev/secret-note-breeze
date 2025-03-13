
import React from 'react';
import Layout from '@/components/Layout';
import NoteViewer from '@/components/NoteViewer';

const View = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <NoteViewer />
      </div>
    </Layout>
  );
};

export default View;
