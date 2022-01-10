export default function alertMessage(message, alertType) {
  const alert = document.createElement('alert');
  alert.classList.add('alert', alertType);
  alert.textContent = message;
  alert.style.cssText =
    'position: absolute; top: 0; left: 50%;z-index: 10000; transform: translateX(-50%);';

  document.body.prepend(alert);

  // rmove this alert
  setTimeout(() => {
    alert.remove();
  }, 2000);
}
