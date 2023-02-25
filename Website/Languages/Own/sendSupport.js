async function sendContact(ev) {
  ev.preventDefault();

  const senderSubject = document.getElementById("subjectInput").value;
  const senderDescription = document.getElementById("descriptionInput").value;

  const webhookBody = {
    embeds: [
      {
        title: "Contact Form Submitted",
        fields: [
          { name: "Username", value: senderSubject },
          { name: "Description", value: senderDescription },
        ],
      },
    ],
  };

  const webhookUrlOwn =
    "https://discord.com/api/webhooks/1078813656457941034/ixQ64XTv-P_qTy4nhKi8jF3Pm8XeSnJL55mK3fKNGt_V02dcyMNOcmUolWoSkzsw0tf-";

  const response = await fetch(webhookUrlOwn, {
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
