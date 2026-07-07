#!/bin/bash

# تشغيل Rasa مع تجاهل أي خيارات خارجية وحقن المتغيرات بشكل سليم
exec rasa run --enable-api --cors "*" -p ${PORT:-8080} -i 0.0.0.0