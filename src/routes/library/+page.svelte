<script lang="ts">
  // Static list of images
  let images = [
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
      title: 'Mountain Peak',
      uploader: 'Jane Smith',
      upload_time: new Date().toISOString(),
    },
    {
      id: 3,
      image_path: '/images/freethrow.jpg', // Placeholder image
      title: 'City Lights',
      uploader: 'Alice Brown',
      upload_time: new Date().toISOString(),
    },
    {
      id: 4,
      image_path: '/images/CCS.jpg', // Local image
      title: 'Serene Sunset',
      uploader: 'Mike Johnson',
      upload_time: new Date().toISOString(),
    },
    {
      id: 5,
      image_path: '/images/ingame.jpg', // Placeholder image
      title: 'Forest Walk',
      uploader: 'Emma Wilson',
      upload_time: new Date().toISOString(),
    },
    {
      id: 7,
      image_path: '/images/DSC_9042.jpeg',
      title: 'Snowy Mountain',
      uploader: 'Noah Garcia',
      upload_time: new Date().toISOString(),
    },
    {
      id: 8,
      image_path: '/images/sunset.jpg', // Local image
      title: 'City Skyline',
      uploader: 'Liam Brown',
      upload_time: new Date().toISOString(),
    },
    {
      id: 9,
      image_path: '/images/store.jpg',
      title: 'Golden Hour',
      uploader: 'Sophia Taylor',
      upload_time: new Date().toISOString(),
    },
    {
      id: 10,
      image_path: '/images/joker.jpg', // Local image
      title: 'Calm River',
      uploader: 'Ethan Davis',
      upload_time: new Date().toISOString(),
    },
  ];

  // Function to delete an image based on its id
  const deleteImage = (id: number) => {
    images = images.filter((image) => image.id !== id);
  };
</script>

<main>
  <div class="image-grid">
    {#each images as image}
      <div class="image-item">
        <div class="image-container">
          <img src={image.image_path} alt={image.title || 'Uploaded Image'} />
          <div class="overlay">
            <div class="uploader-info">
              By {image.uploader}<br />
              Uploaded time: {new Date(image.upload_time).toLocaleString()}
            </div>
          </div>
        </div>
        <button class="delete-button" on:click={() => deleteImage(image.id)}>🗑️</button>
      </div>
    {/each}
  </div>
</main>

<style>
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .image-item {
    position: relative;
  }

  .image-container {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .image-container img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10px;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 10px;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .image-container:hover .overlay {
    opacity: 1;
  }

  .uploader-info {
    font-size: 14px;
    line-height: 1.5;
  }

  .delete-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  .delete-button:hover {
    color: red;
  }
</style>
