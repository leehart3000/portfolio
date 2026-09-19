export const statusMeta = {
  mature: {
    label: 'Mature',
    emoji: '🌳',
    color: '#E8D4B0',
    description: "Established, stable projects that have been in active use or maintenance for a while. The foundations are settled, even as features continue to evolve.",
  },
  growing: {
    label: 'Growing',
    emoji: '🪴',
    color: '#C3D9BE',
    description: "Actively being developed, with real, working functionality already in place. Not finished, but genuinely usable and moving forward.",
  },
  seedling: {
    label: 'Seedling',
    emoji: '🌱',
    color: '#DCF2C4',
    description: "Early-stage and experimental — just getting started, with the core idea taking shape rather than a polished product yet.",
  },
};

export type StatusKey = keyof typeof statusMeta;