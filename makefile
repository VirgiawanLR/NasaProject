docker-build:
	docker build . -t virgiawanlr/nasa-project

docker-run:
	docker run -it -p 8000:8000 virgiawanlr/nasa-project