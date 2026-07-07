FROM rasa/rasa:3.6.21

LABEL build=6

WORKDIR /app

COPY . /app

USER root
RUN chown -R 1001:1001 /app

USER 1001

RUN rasa train && \
    echo "===== MODELS =====" && \
    ls -lah /app/models

# تصفير الـ Entrypoint لمنع التداخل مع بارامترات Railway
ENTRYPOINT []

# تشغيل الأمر كـ Shell Form لتفسير متغير $PORT ديناميكياً وبدون مشاكل
CMD rasa run --enable-api --cors "*" -p $PORT -i 0.0.0.0