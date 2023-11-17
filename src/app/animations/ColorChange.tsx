import { motion } from 'framer-motion';

const ColorChange = ({ children }) => {
  return (
    <motion.div
      initial={{ backgroundColor: 'red' }}
      animate={{ backgroundColor: 'blue' }}
      exit={{ backgroundColor: 'red' }}
    >
      {children}
    </motion.div>
  );
};

export default ColorChange;
