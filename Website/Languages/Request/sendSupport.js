async function sendContact(ev) {
  ev.preventDefault();

  const senderSubject = document.getElementById("subjectInput").value;
  const senderDescription = document.getElementById("descriptionInput").value;

  const webhookBody = {
    embeds: [
      {
        title: "Feature Request Submitted",
        fields: [
          { name: "Subject", value: senderSubject },
          { name: "Description", value: senderDescription },
        ],
      },
    ],
  };

  const webhookUrlRequest =
    "https://discord.com/api/webhooks/1078808327536001085/Bkirmb0jjx_tBeBBBaP9EudJp1DHdPNXVc5hjoA9mWCNzKgHu3sVlJzD6WuzbG32vk8j";

  const response = await fetch(webhookUrlRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(webhookBody),
  });

  if (response.ok) {
    alert("I have received your message!");
  } else {
    alert("There was an error! Try again later!");
  }
}
