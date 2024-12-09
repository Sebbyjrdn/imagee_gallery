<script lang="ts">
  import { onMount } from 'svelte';

  type Image = {
    id: number;
    image_path: string;
    title: string;
    uploader: string;
    upload_time: string | Date;
  };

  let images: Image[] = [];
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

  // Fetch images from the backend API dynamically
  onMount(async () => {
    try {
      const response = await fetch('/api/images');  // Make sure this path is correct
      const data = await response.json();

      if (data.success) {
        images = data.images;  // Assuming your API returns { success: true, images: [...] }
      } else {
        console.error('Failed to fetch images:', data.message);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  });
</script>

<!-- Home Page -->
<main>
  <h1 class="title">Image Gallery</h1>
  <div class="image-grid">
    {#each images as image}
      <button
        class="image-item"
        on:click={() => openModal(image)}
        on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? openModal(image) : null}
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
    on:keydown={(e) => (e.key === 'Escape' && closeModal())}
  >
    <div class="modal-content" role="document" on:click|stopPropagation aria-label="Modal content">
      <img src={selectedImage.image_path} alt={selectedImage.title} />
      <div class="modal-details">
        <h2>{selectedImage.title}</h2>
        <p><strong>Uploader:</strong> {selectedImage.uploader}</p>
        <p><strong>Upload Time:</strong> {new Date(selectedImage.upload_time).toLocaleString()}</p>
        <!-- Make the Close button accessible -->
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
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* Adjust the minimum size of the images */
    gap: 16px; /* Adjust the gap between images */
  }

  .image-item {
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .image-item:hover {
    transform: scale(1.05);
  }

  .image-item img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover; /* Ensures images fill the container properly */
  }

  .image-info {
    text-align: center;
    padding: 5px 0;
  }

  .image-info h2 {
    font-size: 1rem;
    margin: 5px 0;
  }

  .image-info p {
    font-size: 0.875rem;
    margin: 0;
    color: #555;
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
  }

  .modal-details h2 {
    margin: 10px 0;
  }

  .modal-details button {
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .modal-details button:hover {
    background-color: #d32f2f;
  }
</style>
