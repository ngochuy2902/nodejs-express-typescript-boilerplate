import { REGEX } from '../constant/extention.constant';

const getCurrentPath = (fileName: string) => {
  return `${fileName.replace(REGEX.EXT, '')}`;
};

export default { getCurrentPath };
