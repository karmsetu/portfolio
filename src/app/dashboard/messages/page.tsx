// app/dashboard/messages/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  email: string;
  message: string;
  name?: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesPage() {
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/contact`);

        if (response.ok) {
          const result = await response.json();
          setMessages(result);
        } else {
          toast.error('Failed to load messages');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMessages();
  }, []);

  const filteredMessages = messages.filter(
    (message) =>
      message.email.toLowerCase().includes(search.toLowerCase()) ||
      message.name?.toLowerCase().includes(search.toLowerCase()) ||
      message.message.toLowerCase().includes(search.toLowerCase())
  );
  // In your messages page component
  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}/read`, {
        method: 'PATCH',
      });

      if (response.ok) {
        // Update local state
        setMessages(
          messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
        );
        toast.success('Message marked as read');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to mark as read');
      }
    } catch (error) {
      console.error('Error marking as read:', error);
      toast.error('Failed to mark message as read');
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update local state
        setMessages(messages.filter((msg) => msg.id !== id));
        toast.success('Message deleted successfully');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Manage contact form submissions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>
                {filteredMessages.length} message
                {filteredMessages.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {message.email || 'Anonymous'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">{message.message}</p>
                    </TableCell>
                    <TableCell>
                      {new Date(message.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          message.read
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {message.read ? 'Read' : 'Unread'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(message.id)}
                          disabled={message.read}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMessage(message.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
