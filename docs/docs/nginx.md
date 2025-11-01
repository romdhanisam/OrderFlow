This configuration defines an NGINX reverse proxy that serves a frontend 
web application and routes API and WebSocket requests to a backend gateway service.


1. Defines a logical upstream group named **geteway-web**.
    - It points to the backend service gateway-service running on port 8000. 
    - This allows NGINX to forward (proxy) API and WebSocket requests to that backend container/service.
2. Serving the Frontend (Static Files)
3. Proxying API Requests 
     - Routes all requests starting with /api/ to the backend service geteway-web (port 8000).
4. WebSocket Connections
     - There are two WebSocket endpoints — /ws-orders and /ws-delivery — each forwarded to the backend.

```nginx
upstream geteway-web {
   server gateway-service:8000;
}

server {
   include /etc/nginx/extra-conf.d/*.conf;

   listen 80;
   server_name frontend;

   location / {
      root /usr/share/nginx/html;
      index index.html index.htm;
      try_files $uri $uri/ /index.html =404;
   }

   location /api/ {
      proxy_pass http://geteway-web;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
   }

   location /ws-orders {
      proxy_pass http://geteway-web/ws-orders;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
   }

   location /ws-delivery {
      proxy_pass http://geteway-web/ws-delivery;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
   }
}
```

