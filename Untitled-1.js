<!DOCTYPE html>
<html>
<head>
  <title>AI Story to Video</title>
</head>
<body>
  <canvas id="canvas" width="1280" height="720"></canvas>
  <button onclick="start()">Generate AI Story Video</button>
  <video id="preview" controls></video>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const preview = document.getElementById('preview');

    // Example AI-generated story
    const story = [
      "Once upon a time in a digital realm,",
      "there lived a curious AI named Nova.",
      "Nova wanted to understand humans,",
      "so it learned to tell stories from their hearts."
    ];

    async function speak(text) {
      return new Promise(resolve => {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.onend = resolve;
        speechSynthesis.speak(utter);
      });
    }

    async function drawTextScene(text) {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "48px serif";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    async function start() {
      const stream = canvas.captureStream(30); // 30 fps
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        preview.src = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = preview.src;
        a.download = 'ai_story_video.webm';
        a.click();
      };

      recorder.start();

      for (let line of story) {
        await drawTextScene(line);
        await speak(line);
        await new Promise(r => setTimeout(r, 500)); // slight pause between lines
      }

      recorder.stop();
    }
  </script>
</body>
</html>
