import { useRouter } from 'next/router';

const useRedirect = (prefix = '') => {
  const router = useRouter();

  const doRedirect = async (fallback: string) => {
    const redirectUrl = router.query.redirect as string;
    if (redirectUrl) {
      if (prefix) {
        const url = `${prefix}?redirect=${redirectUrl}`;
        await router.push(url);
      } else {
        await router.push(redirectUrl);
      }
    } else {
      await router.push(fallback);
    }
  };

  return {
    url: router.query.redirect as string,
    isReady: router.isReady,
    doRedirect
  };
};

export default useRedirect;
