export const error2String = (error: any): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
};

export const renderError = (error: any) => {
  if (error instanceof Error) {
    console.error(error.message);
    return;
  }
  console.error(error);
};
