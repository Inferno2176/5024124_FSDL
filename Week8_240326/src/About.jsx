function About() {
  return (
    <section>
      <h2>Summary page</h2>
      <p>
        This app demonstrates React Router navigation between routes, a controlled list using hooks,
        and a focused input element managed with <strong>refs</strong>.
      </p>
      <ul>
        <li>Route: <code>/</code> shows the home item manager.</li>
        <li>Route: <code>/about</code> shows this summary.</li>
        <li>Keys are used when rendering list items.</li>
        <li>useRef is used to keep the text input active.</li>
      </ul>
    </section>
  );
}

export default About;
