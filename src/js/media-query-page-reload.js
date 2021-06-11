const mediaQueryList = [
  window.matchMedia('(max-width: 550px)'),
  window.matchMedia('(min-width: 551px) and (max-width: 650px)'),
  window.matchMedia('(min-width: 651px)'),
];

export default function mediaQuerySetup() {
  mediaQueryList.forEach(mediaQuery =>
    mediaQuery.addEventListener('change', () => {
      location.reload();
    }),
  );
}
