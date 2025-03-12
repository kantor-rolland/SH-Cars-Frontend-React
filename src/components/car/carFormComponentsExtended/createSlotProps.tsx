export const createSlotProps = (min: number, max?: number, step?: number) => {
  const props = {
    htmlInput: {
      min,
      ...(max && { max }),
      ...(step && { step }),
    },
  };
  return props;
};
