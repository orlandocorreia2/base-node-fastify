import { z } from "zod";

export const response = {
  201: z.object({
    token: z.string().describe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxMTA4Y2Q5LTAzMDMtNDgxNS1hNTVmLWRmZGRjNzI5NThiMCIsImVtYWlsIjoib2NuYXNjaW1lbnRvMkBnbWFpbC5jb20iLCJuYW1lIjoiT3JsYW5kbyBOYXNjaW1lbnRvIiwiaWF0IjoxNzQxMTgyMjY2LCJleHAiOjE3NDExODU4NjZ9.Tt7gBnAeRe_GBjpGyl0WWxTUHOeCJmeOr_kNac9GkC8"),
  }),
  401: z.object({
    message: z.string().describe("Unauthorized"),
  }),
  422: z.object({
    message: z.string().describe("Unprocessable"),
  }),
  500: z.object({
    message: z.string().describe("Internal Server Error"),
  }),
};
