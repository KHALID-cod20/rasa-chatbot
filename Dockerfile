FROM rasa/rasa:3.6.21

LABEL build=6

WORKDIR /app

# نسخ جميع ملفات المشروع
COPY . /app

USER root
# إعطاء صلاحيات التنفيذ لسكريبت التشغيل وضبط ملكية المجلد
RUN chmod +x /app/start.sh && chown -R 1001:1001 /app

USER 1001

# تدريب الموديل
RUN rasa train && \
    echo "===== MODELS =====" && \
    ls -lah /app/models

# تصفير الـ Entrypoint تماماً
ENTRYPOINT []

# استدعاء سكريبت التشغيل المحمي
CMD ["/app/start.sh"]