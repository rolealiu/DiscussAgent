var dialogue;
var i = 0;
var rounds = 0;

document.getElementById('start').addEventListener('click', function () {
    var topic = document.getElementById('topic').value;
    var promptA = document.getElementById('promptA').value;
    var promptB = document.getElementById('promptB').value;
    rounds = document.getElementById('rounds').value;

    var dialogue = "";

    // 示例：在控制台打印获取的值
    console.log('话题:', topic);
    console.log('Role A Prompt:', promptA);
    console.log('Role B Prompt:', promptB);

    dialogue = {
        "model": "gpt-3.5-turbo-1106",
        "messages": [
            {
                "role": "assistant",
                "content": promptB
            },
            {
                "role": "user",
                "content": topic
            }
        ]
    };

    sendToRola(dialogue, "Role B");

});

function sendToRola(dialogue, role) {
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // 替换为您的API密钥
        },
        body: JSON.stringify(dialogue)
    })
        .then(response => response.json())
        .then(data => {
            let newMessage = {
                "role": "assistant", // 或 "user"，取决于消息的发送者
                "content": "#" + role + ":\n" + data.choices[0].message.content + "\n"
            };

            dialogue.messages.push(newMessage);
            console.log(data.choices[0].message.content + "\n");
            i++;
            console.log(i);
            if (i < rounds) {
                if (role == "Role B") {
                    role = "Role A";
                    sendToRola(dialogue, role);
                }
                if (role = "Role A") {
                    role = "Role B";
                    sendToRola(dialogue, role);
                }

            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
