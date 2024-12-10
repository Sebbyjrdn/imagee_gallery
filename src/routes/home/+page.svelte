<script lang="ts">
  type Image = {
    id: number;
    image_path: string;
    title: string;
    uploader: string;
    upload_time: string | Date;
  };

// Static list of images
let images: Image[] = [
  {
    id: 1,
    image_path: '/images/aftergame.jpg', // Local image
    title: 'CCS Basketball Team',
    uploader: 'Sebby',
    upload_time: new Date().toISOString(),
  },
  {
    id: 2,
    image_path: '/images/team.jpg', // Placeholder image
    title: 'CCS VS CHTM',
    uploader: 'Sebby',
    upload_time: new Date().toISOString(),
  },
  {
    id: 3,
    image_path: '/images/freethrow.jpg', // Placeholder image
    title: 'Pictures',
    uploader: 'Seb',
    upload_time: new Date().toISOString(),
  },
  {
    id: 4,
    image_path: '/images/CCS.jpg', // Local image
    title: 'Huddle',
    uploader: 'CCS',
    upload_time: new Date().toISOString(),
  },
  {
    id: 5,
    image_path: '/images/ingame.jpg', // Placeholder image
    title: 'Jardin #16',
    uploader: 'Sebb',
    upload_time: new Date().toISOString(),
  },
  {
    id: 6,
    image_path: '/images/picture.jpg', // Placeholder image
    title: 'Photoshoot',
    uploader: 'Sebby Jardin',
    upload_time: new Date().toISOString(),
  },
  {
    id: 7,
    image_path: '/images/DSC_9042.jpeg',
    title: 'IN-GAME',
    uploader: 'Jeff',
    upload_time: new Date().toISOString(),
  },
  {
    id: 8,
    image_path: '/images/sunset.jpg', // Local image
    title: 'Sunset',
    uploader: 'Lexi',
    upload_time: new Date().toISOString(),
  },
  {
    id: 9,
    image_path: 'images/store.jpg',
    title: 'Korean Store',
    uploader: 'PSY',
    upload_time: new Date().toISOString(),
  },
  {
    id: 10,
    image_path: '/images/joker.jpg', // Local image
    title: 'JOKER',
    uploader: 'JOKER',
    upload_time: new Date().toISOString(),
  },
];


  let selectedImage: Image | null = null;
  let isModalOpen: boolean = false;

  const openModal = (image: Image) => {
    selectedImage = image;
    isModalOpen = true;
  };

  const closeModal = () => {
    selectedImage = null;
    isModalOpen = false;
  };
</script>

<main>
  <h1 class="title">Image Gallery</h1>
  <div class="image-grid">
    {#each images as image}
      <button
        class="image-item"
        on:click={() => openModal(image)}
        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openModal(image)}
        aria-label={`View details of ${image.title}`}
      >
        <img src={image.image_path} alt={image.title} />
        <div class="image-info">
          <h2>{image.title}</h2>
          <p>By {image.uploader}</p>
        </div>
      </button>
    {/each}
  </div>
</main>

<!-- Modal -->
{#if isModalOpen && selectedImage}
  <div
    class="modal-overlay"
    role="dialog"
    aria-modal="true"
    on:click={closeModal}
    on:keydown={(e) => e.key === 'Escape' && closeModal()}
  >
    <div
      class="modal-content"
      role="document"
      on:click|stopPropagation
      aria-label="Modal content"
    >
      <img src={selectedImage.image_path} alt={selectedImage.title} />
      <div class="modal-details">
        <h2>{selectedImage.title}</h2>
        <p><strong>Uploader:</strong> {selectedImage.uploader}</p>
        <p><strong>Upload Time:</strong> {new Date(selectedImage.upload_time).toLocaleString()}</p>
        <button on:click={closeModal}>Close</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Increased minmax size */
  gap: 30px; /* Reduced gap for better alignment */
}

.image-item {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow for a better look */
  transition: transform 0.2s ease-in-out;
  background: none;
  border: none;
  padding: 0;
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.image-item:hover {
  transform: scale(1.08); /* Slightly increased hover effect */
}

.image-info h2 {
  font-size: 1.25rem; /* Adjusted for readability with larger images */
  margin: 10px 0;
}

.image-info p {
  font-size: 1rem;
  margin: 0;
  color: #444;
}

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    animation: fadeIn 0.3s ease;
  }

  .modal-details h2 {
    margin: 10px 0;
  }

  .modal-details button {
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #4B5945;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .modal-details button:hover {
    background-color: #B2C9AD;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
