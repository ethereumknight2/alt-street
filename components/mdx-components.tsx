import Image from 'next/image';
import { Callout } from '@/components/callout';
import { ProsCons } from '@/components/pros-cons';
import { AffiliateButton } from '@/components/affiliate-button';
import { SubscribeForm } from '@/components/subscribe-form';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const mdxComponents = {
  Image,
  Callout,
  ProsCons,
  AffiliateButton,
  SubscribeCta: () => <SubscribeForm variant="inline" />,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  caption: TableCaption,
};
