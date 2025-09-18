import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon: LucideIcon;
  hoverColor: string;
}

export const StatCard = ({
  value,
  label,
  icon: Icon,
  hoverColor,
}: StatCardProps) => (
  <motion.div
    className="bg-white/5 border border-white/10 rounded-lg p-4 group"
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    <div className="flex items-center justify-between mb-1">
      <div className="text-3xl font-bold text-white">{value}+</div>
      <Icon
        className={`w-5 h-5 text-white/40 ${hoverColor} transition-colors`}
      />
    </div>
    <div className="text-white/60 text-sm">{label}</div>
  </motion.div>
);
