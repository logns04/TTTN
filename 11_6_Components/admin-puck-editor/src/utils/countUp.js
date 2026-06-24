export const countUp = ({
  element,
  target,
  duration = 2000,
  suffix = '',
  formatter = (value) => value.toLocaleString()
}) => {

  if (!element) return;

  let start = 0;

  const step = target / (duration / 16);

  const animate = () => {

    start += step;

    if (start >= target) {
      element.innerText =
        formatter(target) + suffix;
      return;
    }

    element.innerText =
      formatter(Math.floor(start)) + suffix;

    requestAnimationFrame(animate);
  };

  animate();
};