import type {HandlerContext, Handlers, PageProps} from '$fresh/server.ts';
import {getCookies} from 'std/http/cookie.ts';

interface Data {
  isAllowed: boolean;
  isValid: boolean;
}

function Login() {
  return (
    <form method='post' action='/api/login'>
      <input
        type='text'
        name='username'
        style='border: thick double gainsboro'
      />
      <input
        type='password'
        name='password'
        style='border: thick double gainsboro'
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const cookies = getCookies(req.headers);
    const headers = new Headers(req.headers);
    const url = new URL(req.url);

    const isInputValid = url.searchParams.get('invalid') || false;

    console.log('params: ' + url.searchParams);
    console.log(cookies);

    if (cookies.auth === 'bar') {
      return ctx.render!({isAllowed: true, isValid: true});
    } else {
      const url = new URL(req.url);
      url.pathname = '/';

      return ctx.render!({
        isAllowed: false,
        isValid: isInputValid,
      });
    }
  },
};

export default function Home({data}: PageProps<Data>) {
  console.log(data);
  return (
    <>
      <div>You currently {data.isAllowed ? 'are' : 'are not'} logged in.</div>
      {!data.isAllowed ? <Login /> : <a href='/logout'>Logout</a>}
      {data.isValid && !data.isAllowed && <div>Incorrect user input.</div>}
    </>
  );
}
