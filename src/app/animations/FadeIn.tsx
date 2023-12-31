import { motion } from 'framer-motion';
import { Children } from 'react';
import React, { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
  }

const FadeIn: React.FC<FadeInProps> = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#F9EFE7', width: '100%', height: '100%' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default FadeIn;
