'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

async function submitContact(payload: ContactPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Unable to submit the form.');
  }

  return (await response.json()) as { ok: boolean };
}

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setName('');
      setEmail('');
      setMessage('');
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a note</CardTitle>
        <CardDescription>
          This form uses React Query for the mutation boundary. It is intentionally separate from the content fetch path.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate({ name, email, message });
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              aria-label="Your name"
              autoComplete="name"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              aria-label="Your email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Textarea
            aria-label="Your message"
            placeholder="Tell us what you want to build."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Sending...' : 'Send message'}
            </Button>
            {mutation.isSuccess ? <p className="text-sm text-accent">Message queued.</p> : null}
            {mutation.isError ? (
              <p className="text-sm text-destructive">
                {mutation.error instanceof Error ? mutation.error.message : 'Something went wrong.'}
              </p>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
