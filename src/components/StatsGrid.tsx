import { headlineData } from "@/data";
import { LAYOUT, STAT_CONFIGS } from "../lib/constants";
import { StatCard } from "./StatCard";

export const StatsGrid = () => {
  const { stats } = headlineData;

  return (
    <div
      className={`grid grid-cols-2 ${LAYOUT.gap.statGrid} w-full ${LAYOUT.maxWidth} ${LAYOUT.margin.vertical}`}
    >
      {STAT_CONFIGS.map((config) => (
        <StatCard
          key={config.key}
          value={stats[config.key]}
          label={config.label}
          icon={config.icon}
          hoverColor={config.hoverColor}
        />
      ))}
    </div>
  );
};
