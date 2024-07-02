const mqtt = require("mqtt");
const { patchDevice } = require("./src/services/devices");

const protocol = "mqtt";
const host = "broker.emqx.io";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = process.env.MQTT_URL;
const topic = process.env.MQTT_TOPIC;

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: "emqx",
    password: "public",
    reconnectPeriod: 1000
});

client.on("connect", () => {
    console.log("Connected");
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
    });
});

client.on("message", (topic, payload) => {
    try {
        const data = JSON.parse(payload);
        if (data.id === undefined) return;
        patchDevice(data.id, data).then(() => {
            console.log("Device updated");
        });
    } catch (error) {
        console.log(error);
    }
});

client.on("error", error => {
    console.error("connection failed", error, connectUrl, topic);
});
