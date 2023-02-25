async function sendContact(ev) {
  ev.preventDefault();

  const senderSubject = document.getElementById("subjectInput").value;
  const senderDescription = document.getElementById("descriptionInput").value;

  const webhookBody = {
    embeds: [
      {
        title: "Issue Reported Submitted",
        fields: [
          { name: "Subject", value: senderSubject },
          { name: "Description", value: senderDescription },
        ],
      },
    ],
  };

  const webhookUrlSupport =
    "https://discord.com/api/webhooks/1078737229326843904/ikxPIZj7Z9yw4OzwpTRURk_dKIK9uTjSJKOYG8QcoQCXZXZQL3hQv64I-EGJWrKkK1x1";

  const response = await fetch(webhookUrlSupport, {
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
