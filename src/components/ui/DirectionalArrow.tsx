import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRTL } from '@/hooks/useRTL';

interface DirectionalArrowProps {
  direction?: 'left' | 'right';
  className?: string;
}

export function DirectionalArrow({ direction = 'right', className = 'w-4 h-4' }: DirectionalArrowProps) {
  const { isRTL } = useRTL();

  const Icon = direction === 'right'
    ? (isRTL ? ArrowLeft : ArrowRight)
    : (isRTL ? ArrowRight : ArrowLeft);

  return <Icon className={className} />;
}
