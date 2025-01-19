
const idInstanceInput = document.getElementById("idInstance");
const apiTokenInput = document.getElementById("apiTokenInstance");
const responseOutput = document.getElementById("response");


async function callApi(method, body = null) {
    const idInstance = idInstanceInput.value;
    const apiToken = apiTokenInput.value;

    if (!idInstance || !apiToken) {
        alert("Введите idInstance и ApiTokenInstance!");
        return;
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/${method}/${apiToken}`;
    try {
        const options = body
            ? {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
              }
            : { method: "GET" };

        const response = await fetch(url, options);
        const data = await response.json();

        responseOutput.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseOutput.textContent = `Ошибка: ${error.message}`;
    }
}


document.getElementById("getSettings").addEventListener("click", () => {
    callApi("getSettings");
});

document.getElementById("getStateInstance").addEventListener("click", () => {
    callApi("getStateInstance");
});

document.getElementById("sendMessage").addEventListener("click", () => {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const message = document.getElementById("message").value;

    if (!phoneNumber || !message) {
        alert("Введите номер телефона и сообщение!");
        return;
    }

    callApi("sendMessage", {
        chatId: `${phoneNumber}@c.us`,
        message: message,
    });
});

document.getElementById("sendFileByUrl").addEventListener("click", () => {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const fileUrl = document.getElementById("fileUrl").value;

    if (!phoneNumber || !fileUrl) {
        alert("Введите номер телефона и URL файла!");
        return;
    }

    callApi("sendFileByUrl", {
        chatId: `${phoneNumber}@c.us`,
        urlFile: fileUrl,
        fileName: "file",
    });
});
