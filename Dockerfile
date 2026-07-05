FROM rasa/rasa:3.6.21

WORKDIR /app

COPY . /app

USER root
RUN chown -R 1001:1001 /app
USER 1001

EXPOSE 5005

CMD ["run", "--enable-api", "--cors", "*", "--host", "0.0.0.0"]