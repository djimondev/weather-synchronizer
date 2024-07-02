const BASE_URL = process.env.BASE_URL;

exports.getDevices = async () => {
    const response = await fetch(`${BASE_URL}/devices`);
    return response.json();
};

exports.getDevice = async id => {
    const response = await fetch(`${BASE_URL}/devices/${id}`);
    return response.json();
};

exports.createDevice = async device => {
    const response = await fetch(`${BASE_URL}/devices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(device)
    });
    return response.json();
};

exports.updateDevice = async device => {
    const response = await fetch(`${BASE_URL}/devices/${device.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...device,
            updatedAt: new Date()
        })
    });
    return response.json();
};

exports.patchDevice = async (id, param) => {
    const response = await fetch(`${BASE_URL}/devices/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...param,
            updatedAt: new Date()
        })
    });
    return response.json();
};

exports.deleteDevice = async id => {
    const response = await fetch(`${BASE_URL}/devices/${id}`, {
        method: "DELETE"
    });
    return response.json();
};
