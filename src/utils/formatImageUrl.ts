const UPLOAD_URL = 'https://balloons.thetc.se/';
/**
 * A utility function that's used to append the domain to the path so that we can serve up images correctly
 * @param path the unformated image path
 * @returns the formated URL for the image
 */
export const formatImageUrl = (path: string): string => {
  return UPLOAD_URL + path;
};
