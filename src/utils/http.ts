const get = async (url: string) => {
  const respone = await fetch(url);

  if (!respone.ok) {
    throw new Error("Filed to fetch data");
  }

  const data = (await respone.json()) as unknown;
  return data;
};

export default get;
