import { useCommandPalette } from "@/components/CommandPaletteProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { headlineData } from "@/data";
import { motion } from "framer-motion";
import { ActionButtons } from "./ActionButtons";
import { LAYOUT } from "./constants";
import { HeadlineTitle } from "./HeadlineTitle";
import { SocialLinks } from "./SocialLinks";
import { StatsGrid } from "./StatsGrid";

interface HeadlineColumnProps {
  onBookCallClick: () => void;
}

const HeadlineColumn = ({ onBookCallClick }: HeadlineColumnProps) => {
  const { open: openCommandPalette } = useCommandPalette();
  const { description } = headlineData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left"
    >
      <div className="relative flex flex-col items-center lg:items-start w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <HeadlineTitle />
        </motion.div>

        <p className="text-white/60 text-lg mt-6 mb-6 max-w-xl">
          {description}
        </p>

        <StatsGrid />

        <TooltipProvider delayDuration={100}>
          <div
            className={`flex items-center justify-between w-full ${LAYOUT.maxWidth} ${LAYOUT.margin.vertical}`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <SocialLinks />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <ActionButtons
                onBookCallClick={onBookCallClick}
                onCommandPaletteOpen={openCommandPalette}
              />
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default HeadlineColumn;
