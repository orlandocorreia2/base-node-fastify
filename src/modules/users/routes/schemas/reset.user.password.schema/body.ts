import { z } from 'zod';

export const body = z.object({
  token: z
    .string({ message: 'Token is required.' })
    .min(36)
    .describe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0ZjU2MjJjLTFiYmQtNGNjMC05YmQwLTI1NzBjYWFlZWMzZCIsImNyZWF0ZWRfYnlfaWQiOiJmM2VhNDgxOS0wOTU1LTQ4MzktODE1Zi1hOTJlMTNhYWRiYjMiLCJuYW1lIjoiT3JsYW5kbyBDb3JyZWlhIGRvIE5hc2NpbWVudG8iLCJlbWFpbCI6Im9ybGFuZG9jb3JyZWlhMkBob3RtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDdXaUl3UE1MMGdvaXdpM2lTLkVNRXVYM3lpRGY3OUltaGZreC5DYUhNUDZOQjVqYmp6Q0dLIiwiZXhwaXJlZF9hdCI6IjIwMjUtMDYtMTJUMDE6Mjg6MTIuNjA0WiIsInBob25lIjoiMTE5NDgxOTk4OCIsImFkZHJlc3MiOiJBdmVuaWRhIFBhdWxpc3RhLCAxMDAwIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDMtMjJUMDE6MjE6MjUuNzkzWiIsInVwZGF0ZWRfYXQiOiIyMDI1LTAzLTIyVDAxOjIxOjI1Ljc5M1oiLCJkZWxldGVkX2F0IjpudWxsLCJpYXQiOjE3NDI2MDY0ODYsImV4cCI6MTc0MjYxMDA4Nn0.gvyu7uZl_fj2mzdIoQsqir3N7iwh8RqN3rY8AdrhbNk"',
    ),
  password: z
    .string({ message: 'User password is required.' })
    .min(8, { message: 'User password is invalid.' })
    .describe('6rx2@AGFS9I'),
});
