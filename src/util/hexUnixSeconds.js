const hexUnixSeconds = () => {
  const d = new Date();
  const seconds = Math.round(d.getTime() / 1000);

  return seconds.toString(16).toUpperCase();
};

export default hexUnixSeconds;
