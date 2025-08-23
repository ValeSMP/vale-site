// src/app/privacy/page.tsx
import { Metadata } from 'next';
import PrivacyPage from '@/components/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | ValeSMP',
  description: 'Privacy policy for ValeSMP Minecraft server - Learn how we collect, use, and protect your data.',
};

export default function Privacy() {
  return <PrivacyPage />;
}