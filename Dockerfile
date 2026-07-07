FROM rasa/rasa:3.6.21

LABEL build=2
LABEL debug=20260707

WORKDIR /app

COPY . /app

USER root
RUN chown -R 1001:1001 /app

USER 1001

RUN echo "===== BUILD DEBUG ====="
RUN pwd
RUN ls -lah /app
RUN ls -lah /app/models

RUN rasa train

CMD ["run", "--enable-api", "--host", "0.0.0.0", "--port", "5005"]