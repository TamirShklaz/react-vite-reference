export class FetchError extends Error {
  info: unknown;
  status: number;

  constructor(message: string, info: unknown, status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

// eslint-disable-next-line
//@ts-ignore
export const fetcher = async (...args) => {


  // eslint-disable-next-line
  //@ts-ignore
  const res = await fetch(...args);

  if (!res.ok) {
    const info = await res.json();
    console.log(info);
    throw new FetchError(res.statusText || "An Error Occurred", info, res.status);
  }

  return res.json();


};
