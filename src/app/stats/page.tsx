import { Metadata } from 'next';
import StatsPage from '@/components/StatsPage';

export const metadata: Metadata = {
  title: 'Stats | ValeSMP',
  description: 'View player statistics, rankings, and achievements on Vale SMP',
};

export default function Stats() {
  return <StatsPage />;
}