FROM rasa/rasa:3.6.21

WORKDIR /app

COPY . /app

USER root

RUN echo "===== CHECK APP =====" && ls -la /app
RUN echo "===== CHECK MODELS =====" && ls -la /app/models

RUN chown -R 1001:1001 /app

USER 1001

CMD ["run", "--enable-api", "-i", "0.0.0.0", "-p", "5005"]