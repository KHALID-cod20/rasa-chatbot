FROM rasa/rasa:3.6.21

WORKDIR /app

COPY . /app

USER root
RUN chown -R 1001:1001 /app

USER 1001

CMD ["run", "--enable-api", "--model", "models/20260707-015207-worried-bright.tar.gz", "-i", "0.0.0.0", "-p", "5005"]