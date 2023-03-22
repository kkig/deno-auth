import type {Handlers, PageProps} from '$fresh/server.ts';
import {getCookies} from 'std/http/cookie.ts';

interface Data {
  isAllowed: boolean;
}

function Login() {
  return (
    <form method='post' action='/api/login'>
      <input type='text' name='username' />
      <input type='password' name='password' />
      <button type='submit'>Submit</button>
    </form>
  );
}

export const handler: Handlers = {
  GET(req, ctx) {
    const headers = new Headers(req.headers);
    const cookies = getCookies(req.headers);
    console.log(cookies);
    return ctx.render!({isAllowed: cookies.auth === 'bar'});
  },
};

export default function Home({data}: PageProps<Data>) {
  return (
    <>
      <div>You currently {data.isAllowed ? 'are' : 'are not'} logged in.</div>
      {!data.isAllowed ? <Login /> : <a href='/logout'>Logout</a>}
    </>
  );
}
