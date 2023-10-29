export const roundMinutes = (oldDate: Date): Date => {
    const date = new Date(oldDate);
    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

    return date;
}

export const roundedHourOnlyFormat = (date: Date): string => {
  const roundedDate = roundMinutes(date);
  return roundedDate.toLocaleString(['en-US'], {hour: '2-digit'});
}

export const hourMinuteFormat = (date: Date): string => {
  return date.toLocaleString(['en-US'], {hour: '2-digit', minute: '2-digit'});
}

export const dateOnlyFormat = (date: Date): string => {
  return date.toLocaleString(['en-US'], {month: 'short', day: 'numeric'});
}
