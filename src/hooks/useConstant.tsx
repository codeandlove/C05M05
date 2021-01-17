import constants from "../utils/constants";

//it does not work at all
const useConstant = (key: string) => {
  console.log(constants, key);
  // @ts-ignore
  return constants[key];
}

export default useConstant;