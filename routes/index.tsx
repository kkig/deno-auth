import {Head} from '$fresh/runtime.ts';
import type {Handlers, PageProps} from '$fresh/server.ts';
import {getCookies} from 'std/http/cookie.ts';

interface Data {
  isAllowed: boolean;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({isAllowed: cookies.auth === 'bar'});
  },
};

export function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class='p-4 mx-auto max-w-screen-md'>
        <img
          src='/logo.svg'
          class='w-32 h-32'
          alt='the fresh logo: a sliced lemon dripping with juice'
        />
        <p class='my-6'>
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
      </div>
    </>
  );
}
