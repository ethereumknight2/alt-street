import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'danger';
  title?: string;
  children: React.ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  danger: AlertCircle,
};

const styles = {
  info: 'border-blue-500/50 bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100',
  warning:
    'border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100',
  success:
    'border-green-500/50 bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-100',
  danger: 'border-red-500/50 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-100',
};

const iconStyles = {
  info: 'text-blue-600 dark:text-blue-500',
  warning: 'text-amber-600 dark:text-amber-500',
  success: 'text-green-600 dark:text-green-500',
  danger: 'text-red-600 dark:text-red-500',
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={cn('my-6 flex gap-3 rounded-lg border p-4', styles[type])}>
      <Icon className={cn('h-5 w-5 flex-shrink-0', iconStyles[type])} />
      <div className="flex-1 text-sm">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
