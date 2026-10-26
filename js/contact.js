// Sends the contact form in the background so visitors stay on the site,
// then shows a thank-you or error message in place. If this script
// doesn't run, the form still submits normally to Formspree.
const form = document.getElementById('contact-form');

if (form) {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = 'Sending…';
    status.className = 'form-status';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        status.classList.add('is-success');
        status.textContent = "Thanks, your message was sent. We'll get back to you soon.";
      } else {
        const data = await response.json().catch(() => ({}));
        const detail = data.errors ? data.errors.map((e) => e.message).join(' ') : '';
        status.classList.add('is-error');
        status.textContent = `Sorry, your message didn't send. ${detail}`.trim();
      }
    } catch {
      status.classList.add('is-error');
      status.textContent = "Sorry, your message didn't send. Please check your connection and try again.";
    } finally {
      button.disabled = false;
      button.textContent = 'Send';
    }
  });
}
