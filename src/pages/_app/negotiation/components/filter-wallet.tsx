import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNegotiationFilters } from '@/context/dashboard-filter-context';

export function FilterWallet() {
  const { filters, toggleWallet } = useNegotiationFilters();
  const isActive = filters.isWalletActive;

  const handleClick = () => {
    toggleWallet();
  };

  return (
    <Button
      onClick={handleClick}
      variant={isActive ? 'outline' : 'link'}
      className={`flex gap-2 items-center transition-all duration-200 ${
        isActive ? 'border-green-500 text-green-500' : 'text-muted-foreground'
      }`}
    >
      <Wallet size={20} />
      Carteira
      <AnimatePresence>
        {isActive && (
          <motion.span
            key="wallet-active"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
