'use client';

import { FC, useCallback } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { PostCreationRequest, PostValidator } from '@/lib/validators/post';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditorProps {
  subredditId: string;
}

const Editor: FC<EditorProps> = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: '',
      content: null,
    },
  });

  const initializeEditor = useCallback(async () => {
    const Editor = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Link = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const Image = (await import('@editorjs/code')).image;
  }, []);

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
