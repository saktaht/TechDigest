dockerのコマンドまとめ
- docker compose up --build --detach
- docker exec -it express /bin/bash
- docker compose down 
- docker compose down --rmi all -v

npx prisma migrate dev --name init

Prisma Clientは、データベースとやり取りするためのクライアントライブラリです。以下のコマンドでPrisma Clientを生成します。
npx prisma generate
