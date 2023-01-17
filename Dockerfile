FROM jarredsumner/bun:edge

WORKDIR /opt/app

COPY . .

RUN bun install

CMD ["bun", "run", "index.ts"]