up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose up -d --build

network:
	docker network create cansho_development

create:
	docker compose exec app sh -c 'yarn create nuxt-app . --overwrite-dir'

ps:
	docker compose ps

node:
	docker compose exec app sh

dev:
	docker compose exec app sh -c 'yarn dev'