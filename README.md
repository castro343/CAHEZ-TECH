<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CAHEZ TECH</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Roboto&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Roboto', sans-serif;
      background: #0c1f26;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      animation: fadeInBody 1s ease-in;
    }

    @keyframes fadeInBody {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    header {
      background: #101010;
      padding: 1em 2em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 255, 255, 0.1);
      animation: slideDown 0.8s ease-in-out;
    }

    @keyframes slideDown {
      from { transform: translateY(-30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .logo {
      font-family: 'Orbitron', sans-serif;
      font-size: 1.5em;
      color: #00ffe1;
      letter-spacing: 2px;
    }

    .nav-links {
      list-style: none;
      display: flex;
      gap: 1.5em;
    }

    .nav-links li a {
      color: #00ffc8;
      text-decoration: none;
      font-weight: bold;
      transition: 0.3s ease;
    }

    .nav-links li a:hover {
      color: #00a97f;
    }

    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 3em 1em;
      animation: fadeInMain 1.2s ease-in-out;
    }

    @keyframes fadeInMain {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h1 {
      font-size: 2.8em;
      color: #00ffc8;
      margin-bottom: 0.5em;
    }

    p {
      max-width: 600px;
      font-size: 1.1em;
      color: #ccc;
      margin-bottom: 2em;
    }

    a.button {
      padding: 1em 2em;
      background: #00c896;
      color: black;
      font-weight: bold;
      border-radius: 30px;
      text-decoration: none;
      transition: 0.3s ease;
      animation: popIn 1s ease;
    }

    a.button:hover {
      background: #00a97f;
      transform: scale(1.05);
    }

    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    footer {
      text-align: center;
      padding: 1em;
      font-size: 0.9em;
      background-color: #111;
      color: #777;
      animation: fadeInBody 1s ease-in 0.5s;
    }

    @media (max-width: 600px) {
      header {
        flex-direction: column;
        align-items: flex-start;
      }

      .nav-links {
        flex-direction: column;
        margin-top: 1em;
        align-items: flex-start;
        gap: 1em;
      }

      main h1 {
        font-size: 2em;
      }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header>
    <div class="logo">CAHEZ TECH</div>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
    </ul>
  </header>

  <!-- Main content -->
  <main>
    <h1>Welcome to CAHEZ TECH</h1>
    <p>We build sleek, smart, and scalable solutions. Click below to explore our tech services and see how we can build your vision.</p>
    <a class="button" href="services.html">View Our Services</a>
  </main>

  <!-- Footer -->
  <footer>
    &copy; 2025 CAHEZ TECH. Simple. Sharp. Smart.
  </footer>

</body>
</html>