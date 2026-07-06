FROM rasa/rasa:3.6.21

WORKDIR /app

COPY . /app

USER root
RUN chown -R 1001:1001 /app
USER 1001

CMD ["run", "--enable-api", "-i", "0.0.0.0", "-p", "5005"]