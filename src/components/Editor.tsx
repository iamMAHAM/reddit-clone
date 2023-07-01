'use client';

import { FC } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

interface EditorProps {}

const Editor: FC<EditorProps> = ({}) => {
  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border-zinc-50">
      <form
        id="subreddit-post-form"
        className="w-fit"
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextAreaAutoSize
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default Editor;
