FROM rasa/rasa:3.6.21

LABEL build=4

WORKDIR /app

COPY . /app

USER root
RUN chown -R 1001:1001 /app

USER 1001

RUN rasa train && \
    echo "===== MODELS =====" && \
    ls -lah /app/models

CMD bash -c "rasa run --enable-api --host 0.0.0.0 --port $PORT"