export const dataUrlToFile = (
  dataUrl: string | null | undefined,
  fileName: string
): File => {
  const arr = (dataUrl ? dataUrl : '').split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const uBarr = new Uint8Array(n);

  while (n--) {
    uBarr[n] = bstr.charCodeAt(n);
  }

  return new File([uBarr], fileName, { type: mime });
};
