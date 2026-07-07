FROM rasa/rasa:3.6.21

WORKDIR /app

COPY . /app

USER root
RUN chown -R 1001:1001 /app

USER 1001

RUN rasa train

CMD ["run", "--enable-api", "--host", "0.0.0.0", "--port", "5005"]