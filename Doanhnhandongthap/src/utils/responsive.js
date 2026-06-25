export const getResponsiveValue = (
  desktop,
  tablet,
  mobile,
  screenWidth
) => {
  if (screenWidth <= 768) {
    return mobile ?? desktop;
  }

  if (screenWidth <= 1024) {
    return tablet ?? desktop;
  }

  return desktop;
};