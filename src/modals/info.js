const infoModal = document.querySelector("#success-modal");
const infoModalCloseBtn = infoModal.querySelector(".btn-close-modal");

const showInfoModal = ({ title, subtitle }) => {
  infoModal.querySelector(".success-window__header").textContent = title;
  infoModal.querySelector(".success-window__message").textContent = subtitle;
  infoModal.classList.add("visible-modal");
};
export const hideInfoModal = () => infoModal.classList.remove("visible-modal");

export const showSuccessModal = () =>
  showInfoModal({
    title: "Congratulations!",
    subtitle: "The movie has been added  successfully",
  });
export const showFailModal = ({ title }) => showInfoModal({ title });

infoModalCloseBtn.addEventListener("click", hideInfoModal);
