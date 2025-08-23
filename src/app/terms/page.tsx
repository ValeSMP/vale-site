// src/app/terms/page.tsx
import { Metadata } from 'next';
import TermsPage from '@/components/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Use | ValeSMP',
  description: 'Terms of use for ValeSMP Minecraft server - Rules, guidelines, and legal information for our community.',
};

export default function Terms() {
  return <TermsPage />;
}