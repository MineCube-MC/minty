FROM jarredsumner/bun:edge

WORKDIR /opt/app

COPY . .

RUN bun install

CMD ["bun", "start", "index.ts"]