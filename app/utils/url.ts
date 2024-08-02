export const getBaseURL = (request: Request, options?: { https?: boolean }) => {
  const url = new URL(request.url);
  if (options?.https) {
    return `https://${url.host}`;
  } else {
    return `${url.protocol}//${url.host}`;
  }
};

export const getDomainName = (request: Request) => {
  const url = new URL(request.url);
  return url.host;
};
