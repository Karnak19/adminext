const SECONDS_IN_ONE_DAY = 86400;

export const convertSecToHHMMSS = (totalSeconds: number): string => {
  if (totalSeconds >= SECONDS_IN_ONE_DAY) return `> 24h`;

  return new Date(totalSeconds * 1000).toISOString().substr(11, 8);
};
