import { readFileSync } from "fs";
import type { Context } from "hono";

export function serveStaticMiddleware(path:String, c:Context) {

      const pathname = c.req.url;
      const filePath = `${path}/${pathname}`;
  
      const fileContent = readFileSync(filePath);
  
      
      if (fileContent) {
        c.header('Content-Type', 'image/jpeg'); // Or appropriate MIME type
        c.body(fileContent);
        return c.res
      }
      return null
  }