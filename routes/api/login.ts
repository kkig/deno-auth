import {Handlers} from '$fresh/server.ts';
import {setCookie} from 'std/http/cookie.ts';

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();

    // Hardcoding username & pass for test
    if (form.get('username') === 'deno' && form.get('password') === 'land') {
      const headers = new Headers();
      setCookie(headers, {
        name: 'auth',
        value: 'bar',
        maxAge: 120,
        sameSite: 'Lax', // Set to prevent CSRF attacks
        domain: url.hostname,
        path: '/',
        secure: true,
      });

      headers.set('location', '/');
      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      return new Response(null, {
        status: 403,
      });
    }
  },
};
