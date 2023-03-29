import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const itemMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", itemMarkup);
galleryContainer.addEventListener("click", onImgClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li>
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>`;
    })
    .join("");
}

function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return;

  const isItemImage = e.target.classList.contains("gallery__image");
  if (!isItemImage) return;

  const currentImgUrl = e.target.dataset.source;

  const instance = basicLightbox.create(
    `
		<img src="${currentImgUrl}" width="1280" height="auto"/>
        `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", escKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", escKeyPress);
      },
    }
  );
  instance.show();

  function escKeyPress(e) {
    const escKeyCode = "Escape";
    const isEscKey = e.code === escKeyCode;
    if (!isEscKey) return;
    instance.close();
  }
}
