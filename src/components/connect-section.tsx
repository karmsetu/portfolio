// components/connect-section.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { ConnectForm } from './connect-form';

export function ConnectSection() {
  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:karmsetu8@gmail.com',
      icon: Mail,
      color: 'hover:text-red-600',
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/karmsetu',
      icon: Twitter,
      color: 'hover:text-black',
    },
    {
      name: 'LinkedIn',
      href: '',
      icon: Linkedin,
      color: 'hover:text-blue-600',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/karmsetu/',
      icon: Github,
      color: 'hover:text-gray-600',
    },
  ];

  return (
    <section id="connect" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact Form */}
          <ConnectForm />

          {/* Social Links */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Let&apos;s connect</CardTitle>
                <CardDescription>
                  Follow me on social media or reach out through other channels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 border rounded-lg ${social.color} transition-colors group cursor-alias`}
                    >
                      <social.icon
                        className={`w-5 h-5 transition-colors ${social.color}`}
                      />
                      <span className={`font-medium `}>{social.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  I typically respond to emails within 24 hours. For urgent
                  matters, feel free to reach out on social media.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
